import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  // For development, use MemoryStore
  return session({
    secret: process.env.SESSION_SECRET || "dev-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  // In a real app, you would save user to database
  // For now, we'll just return the claims
  return {
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
  };
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Simple password authentication (no database needed)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "amadeu.dias@gmail.com";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Mudar@2025!"; // Change in production!
  const ADMIN_NAME = process.env.ADMIN_NAME || "Amadeu Dias";

  // Login page route
  app.get("/api/login", (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect("/admin");
    }

    // In development, auto-login for convenience
    if (process.env.NODE_ENV === "development") {
      const mockUser = {
        claims: {
          sub: "dev-user",
          email: ADMIN_EMAIL,
          first_name: ADMIN_NAME,
          last_name: "User"
        },
        access_token: "dev-token",
        expires_at: Math.floor(Date.now() / 1000) + 3600
      };
      
      req.login(mockUser, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        res.redirect("/admin");
      });
    } else {
      // In production, show login form
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Login - Admin Panel</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 400px; margin: 100px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { text-align: center; color: #1e3a8a; margin-bottom: 30px; }
            input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
            button { width: 100%; background: #1e3a8a; color: white; padding: 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
            button:hover { background: #1e40af; }
            .error { color: red; text-align: center; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Login Admin</h1>
            <form method="POST" action="/api/login">
              <input type="email" name="email" placeholder="Email" required>
              <input type="password" name="password" placeholder="Senha" required>
              <button type="submit">Entrar</button>
            </form>
            ${req.query.error ? '<div class="error">Email ou senha inválidos</div>' : ''}
          </div>
        </body>
        </html>
      `);
    }
  });

  // Login form submission
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    
    // Simple credential check (no database needed)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = {
        claims: {
          sub: "admin-user",
          email: email,
          first_name: ADMIN_NAME,
          last_name: ""
        },
        access_token: "admin-token",
        expires_at: Math.floor(Date.now() / 1000) + 86400 // 24 hours
      };
      
      req.login(user, (err) => {
        if (err) {
          return res.redirect("/api/login?error=1");
        }
        res.redirect("/admin");
      });
    } else {
      res.redirect("/api/login?error=1");
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as any;
  const now = Math.floor(Date.now() / 1000);
  
  if (user.expires_at && now > user.expires_at) {
    return res.status(401).json({ message: "Token expired" });
  }

  next();
};