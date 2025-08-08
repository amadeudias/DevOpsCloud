// Netlify Function for author
const author = {
  name: "Amadeu Dias",
  title: "Cloud Architect",
  bio: "Sou especialista em Cloud Computing, com foco em AWS, DevOps, infraestrutura como código (Terraform) e modernização de aplicações. Tenho experiência prática com arquitetura de soluções, automação de ambientes, segurança na nuvem, containers (Docker, Kubernetes) e CI/CD. No blog, compartilho experiências reais de projetos, aprendizados em certificações, boas práticas e tutoriais técnicos voltados para profissionais de tecnologia que buscam evoluir na carreira em cloud e DevOps.",
  location: "Goiânia - GO",
  certification: "Solutions Architect AWS",
  imageUrl: "/profile-photo.jpeg",
  linkedinUrl: "https://www.linkedin.com/in/amadeu-dias-158b8a146/",
  githubUrl: "https://github.com/amadeudias",
  twitterUrl: "https://www.instagram.com/amadeudiasaws/",
  id: "f69833b8-df23-4b3e-996f-f064ef74d2d1"
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