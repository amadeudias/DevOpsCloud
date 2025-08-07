import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { insertArticleSchema } from '../../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const articleId = parseInt(id as string);

  if (isNaN(articleId)) {
    return res.status(400).json({ message: 'Invalid article ID' });
  }

  try {
    if (req.method === 'PATCH') {
      const articleData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(articleId, articleData);
      
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      return res.json(article);
    }

    if (req.method === 'DELETE') {
      const success = await storage.deleteArticle(articleId);
      
      if (!success) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      return res.json({ message: 'Article deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Article API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}