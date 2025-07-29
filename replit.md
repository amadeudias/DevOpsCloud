# DevOps Engineering Blog

## Overview

This is a modern full-stack blog application focused on DevOps and cloud engineering content. The application features a React frontend with TypeScript, an Express.js backend, and uses PostgreSQL with Drizzle ORM for data persistence. The UI is built with shadcn/ui components and styled with Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with a custom navy blue theme
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Pattern**: RESTful API design
- **Validation**: Zod schemas for data validation
- **Development**: tsx for TypeScript execution in development

### Project Structure
```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and query client
├── server/                 # Backend application
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data access layer
│   └── vite.ts             # Development server integration
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema and validation
└── migrations/             # Database migration files
```

## Key Components

### Data Models
- **Articles**: Blog posts with metadata (title, slug, content, category, tags, read time, featured status)
- **Categories**: Content organization (DevOps, Kubernetes, Security, AWS, Cloud, FinOps)
- **Author**: Single author profile with professional information

### Frontend Components
- **Layout**: Header with navigation and search, footer with links and social media
- **Blog Components**: Hero section, featured articles, categories grid, latest articles, about section, newsletter signup
- **UI Components**: Complete shadcn/ui component library (cards, buttons, forms, dialogs, etc.)

### Backend Services
- **Storage Interface**: Abstract storage layer with in-memory implementation for development
- **API Routes**: RESTful endpoints for articles, categories, and author information
- **Search**: Article search functionality by title and content

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express routes handle requests and validate data with Zod
3. **Data Access**: Storage layer abstracts database operations
4. **Response**: JSON responses sent back to client
5. **UI Updates**: React components re-render with new data

### API Endpoints
- `GET /api/articles` - List articles with optional filters (category, featured, latest, search)
- `GET /api/articles/:slug` - Get single article by slug
- `POST /api/articles` - Create new article
- `GET /api/categories` - List all categories
- `GET /api/categories/:slug` - Get single category
- `GET /api/author` - Get author information

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, Wouter for routing
- **UI/UX**: Radix UI primitives, Tailwind CSS, Lucide icons
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Hookform resolvers
- **Utilities**: date-fns for date handling, class-variance-authority for component variants

### Backend Dependencies
- **Server**: Express.js for HTTP server
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon Database driver
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution, Vite for frontend development server

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **CSS**: PostCSS with Tailwind CSS and Autoprefixer

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds the React application to `dist/public`
- **Backend**: esbuild bundles the Express server to `dist/index.js`
- **Database**: Drizzle migrations are applied with `drizzle-kit push`

### Environment Configuration
- **Development**: Uses tsx for hot reloading and Vite dev server
- **Production**: Serves built static files and runs compiled Node.js server
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Scripts
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start production server
- `npm run db:push` - Apply database schema changes

The application is designed for easy deployment to platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL support.