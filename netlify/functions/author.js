// Netlify Function for author
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
      body: JSON.stringify(author)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};