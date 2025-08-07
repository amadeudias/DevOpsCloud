import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Simple in-memory storage for Vercel
const articles = [
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { category, featured, latest, limit, search } = req.query;
      
      let filteredArticles = [...articles];
      
      if (search) {
        const searchTerm = (search as string).toLowerCase();
        filteredArticles = articles.filter(article => 
          article.title.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm)
        );
      } else if (category) {
        filteredArticles = articles.filter(article => 
          article.category.toLowerCase() === (category as string).toLowerCase()
        );
      } else if (featured === 'true') {
        filteredArticles = articles.filter(article => article.featured);
      } else if (latest === 'true') {
        const limitNum = parseInt(limit as string) || 5;
        filteredArticles = articles
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, limitNum);
      }
      
      return res.json(filteredArticles);
    }

    if (req.method === 'POST') {
      const articleData = insertArticleSchema.parse(req.body);
      const newArticle = {
        id: articles.length + 1,
        ...articleData,
        slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: articleData.content.slice(0, 150) + '...',
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      articles.push(newArticle);
      return res.status(201).json(newArticle);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Articles API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}