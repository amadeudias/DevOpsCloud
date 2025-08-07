import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

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

  const { slug } = req.query;

  try {
    const article = await storage.getArticleBySlug(slug as string);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.json(article);
  } catch (error) {
    console.error('Article slug API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}