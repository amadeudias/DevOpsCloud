// Netlify Function for categories
const categories = [
  {
    id: 1,
    name: "DevOps",
    slug: "devops",
    description: "Artigos sobre DevOps, automação e melhores práticas de desenvolvimento",
    color: "#1e40af"
  },
  {
    id: 2,
    name: "Kubernetes",
    slug: "kubernetes",
    description: "Guias e tutoriais sobre orquestração de containers com Kubernetes",
    color: "#0369a1"
  },
  {
    id: 3,
    name: "AWS",
    slug: "aws",
    description: "Serviços e soluções na Amazon Web Services",
    color: "#0c4a6e"
  },
  {
    id: 4,
    name: "Security",
    slug: "security",
    description: "Segurança em ambientes cloud e práticas de DevSecOps",
    color: "#075985"
  },
  {
    id: 5,
    name: "Cloud",
    slug: "cloud",
    description: "Arquiteturas e estratégias para cloud computing",
    color: "#0e7490"
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