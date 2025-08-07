import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertArticleSchema } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { category, featured, latest, limit, search } = req.query;
      
      let articles;
      
      if (search) {
        articles = await storage.searchArticles(search as string);
      } else if (category) {
        articles = await storage.getArticlesByCategory(category as string);
      } else if (featured === 'true') {
        articles = await storage.getFeaturedArticles();
      } else if (latest === 'true') {
        articles = await storage.getLatestArticles(parseInt(limit as string) || 5);
      } else {
        articles = await storage.getArticles();
      }
      
      return res.json(articles);
    }

    if (req.method === 'POST') {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      return res.status(201).json(article);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Articles API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}