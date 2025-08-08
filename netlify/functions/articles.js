// Netlify Function for articles
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