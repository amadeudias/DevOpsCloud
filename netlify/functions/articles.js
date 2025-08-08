// Netlify Function for articles
const articles = [
  {
    id: 1,
    title: "Implementando CI/CD com Jenkins e Docker",
    slug: "implementando-cicd-jenkins-docker",
    excerpt: "Aprenda a configurar um pipeline completo de CI/CD usando Jenkins e Docker para automatizar seus deployments...",
    content: "Conteúdo completo do artigo sobre CI/CD com Jenkins e Docker...",
    category: "DevOps",
    tags: ["DevOps", "Jenkins", "Docker", "CI/CD"],
    readTime: 5,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    codePreview: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}`,
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Kubernetes: Gerenciamento de Recursos e Autoscaling",
    slug: "kubernetes-gerenciamento-recursos-autoscaling",
    excerpt: "Domine as estratégias de gerenciamento de recursos no Kubernetes e implemente autoscaling eficiente...",
    content: "Conteúdo completo do artigo sobre Kubernetes...",
    category: "Kubernetes",
    tags: ["Kubernetes", "Autoscaling", "Resources"],
    readTime: 8,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    codePreview: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
  minReplicas: 1
  maxReplicas: 10`,
    publishedAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: 3,
    title: "Segurança na AWS: IAM e Compliance",
    slug: "seguranca-aws-iam-compliance",
    excerpt: "Estratégias essenciais para implementar segurança robusta na AWS com foco em IAM policies e compliance...",
    content: "Conteúdo completo do artigo sobre segurança AWS...",
    category: "Security",
    tags: ["AWS", "Security", "IAM", "Compliance"],
    readTime: 6,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    codePreview: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mybucket/*"
    }
  ]
}`,
    publishedAt: "2024-01-05",
    updatedAt: "2024-01-05"
  }
];

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      const { category, featured, latest, limit, search } = event.queryStringParameters || {};
      
      let filteredArticles = [...articles];
      
      if (search) {
        const searchTerm = search.toLowerCase();
        filteredArticles = articles.filter(article => 
          article.title.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm)
        );
      } else if (category) {
        filteredArticles = articles.filter(article => 
          article.category.toLowerCase() === category.toLowerCase()
        );
      } else if (featured === 'true') {
        filteredArticles = articles.filter(article => article.featured);
      } else if (latest === 'true') {
        const limitNum = parseInt(limit) || 5;
        filteredArticles = articles
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, limitNum);
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(filteredArticles)
      };
    }

    if (event.httpMethod === 'POST') {
      const articleData = JSON.parse(event.body);
      const newArticle = {
        id: articles.length + 1,
        ...articleData,
        slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: articleData.content.slice(0, 150) + '...',
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      articles.push(newArticle);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newArticle)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};