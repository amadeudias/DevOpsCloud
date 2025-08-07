import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory storage for Vercel
const author = {
  name: "Amadeu Dias",
  title: "Cloud Architect & DevOps Engineer",
  bio: "Especialista em Cloud Computing, DevOps e Arquitetura de Soluções com mais de 10 anos de experiência em transformação digital e automação de infraestrutura.",
  email: "amadeu.dias@example.com",
  linkedin: "https://linkedin.com/in/amadeu-dias",
  github: "https://github.com/amadeu-dias",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  location: "São Paulo, Brasil",
  company: "Tech Solutions Inc."
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    return res.json(author);
  } catch (error) {
    console.error('Author API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}