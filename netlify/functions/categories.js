// Netlify Function for categories
const categories = [
  {
    name: "DevOps",
    slug: "devops",
    description: "Automação, CI/CD, infraestrutura como código e melhores práticas de DevOps.",
    icon: "fas fa-cogs",
    color: "navy",
    articleCount: 12
  },
  {
    name: "Kubernetes",
    slug: "kubernetes",
    description: "Orquestração de containers, deployment strategies e gerenciamento de clusters.",
    icon: "fas fa-dharmachakra",
    color: "blue",
    articleCount: 8
  },
  {
    name: "Security",
    slug: "security",
    description: "Segurança em cloud, compliance, monitoramento e gestão de vulnerabilidades.",
    icon: "fas fa-shield-alt",
    color: "red",
    articleCount: 10
  },
  {
    name: "AWS",
    slug: "aws",
    description: "Serviços AWS, arquiteturas cloud-native e otimização de custos.",
    icon: "fab fa-aws",
    color: "orange",
    articleCount: 15
  },
  {
    name: "Cloud",
    slug: "cloud",
    description: "Estratégias multi-cloud, migração e arquiteturas distribuídas.",
    icon: "fas fa-cloud",
    color: "green",
    articleCount: 9
  },
  {
    name: "FinOps",
    slug: "finops",
    description: "Otimização de custos cloud, governança financeira e métricas de ROI.",
    icon: "fas fa-chart-line",
    color: "purple",
    articleCount: 6
  }
];

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(categories)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};