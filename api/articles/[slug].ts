import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Simple in-memory storage for Vercel (shared with articles.ts)
let articles = [
  {
    id: 1,
    title: "Implementando CI/CD com Jenkins e Docker",
    slug: "ci-cd-jenkins-docker",
    content: "Guia completo para implementar pipelines de CI/CD usando Jenkins e Docker para automatizar deployments e melhorar a eficiência da equipe de desenvolvimento.",
    excerpt: "Aprenda a configurar pipelines automatizados com Jenkins e Docker",
    category: "DevOps",
    tags: ["CI/CD", "Jenkins", "Docker", "Automation"],
    readTime: 8,
    featured: true,
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Kubernetes na AWS: Guia Completo do EKS",
    slug: "kubernetes-aws-eks-guia",
    content: "Tutorial detalhado sobre como configurar e gerenciar clusters Kubernetes na AWS usando o Amazon EKS, incluindo melhores práticas de segurança.",
    excerpt: "Configuração completa de clusters Kubernetes na AWS",
    category: "Kubernetes",
    tags: ["Kubernetes", "AWS", "EKS", "Cloud"],
    readTime: 12,
    featured: true,
    publishedAt: "2024-01-10",
    updatedAt: "2024-01-10"
  }
];

const insertArticleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()),
  readTime: z.number().optional(),
  featured: z.boolean().optional()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { slug } = req.query;
  const slugStr = slug as string;

  try {
    if (req.method === 'GET') {
      // Check if it's a numeric ID (for admin operations)
      const numericId = parseInt(slugStr);
      if (!isNaN(numericId)) {
        const article = articles.find(a => a.id === numericId);
        if (!article) {
          return res.status(404).json({ message: 'Article not found' });
        }
        return res.json(article);
      }
      
      // Otherwise treat as slug
      const article = articles.find(a => a.slug === slugStr);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      return res.json(article);
    }

    if (req.method === 'PATCH') {
      const articleId = parseInt(slugStr);
      if (isNaN(articleId)) {
        return res.status(400).json({ message: 'Invalid article ID for update' });
      }
      
      const articleData = insertArticleSchema.partial().parse(req.body);
      const articleIndex = articles.findIndex(a => a.id === articleId);
      
      if (articleIndex === -1) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      articles[articleIndex] = {
        ...articles[articleIndex],
        ...articleData,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      return res.json(articles[articleIndex]);
    }

    if (req.method === 'DELETE') {
      const articleId = parseInt(slugStr);
      if (isNaN(articleId)) {
        return res.status(400).json({ message: 'Invalid article ID for deletion' });
      }
      
      const articleIndex = articles.findIndex(a => a.id === articleId);
      
      if (articleIndex === -1) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      articles.splice(articleIndex, 1);
      return res.json({ message: 'Article deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Article API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}