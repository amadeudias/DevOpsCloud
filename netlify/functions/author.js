// Netlify Function for author
const author = {
  name: "Amadeu Dias",
  title: "Cloud Architect",
  bio: "Sou especialista em Cloud Computing, com foco em AWS, DevOps, infraestrutura como código (Terraform) e modernização de aplicações. Tenho experiência prática com arquitetura de soluções, automação de ambientes, segurança na nuvem, containers (Docker, Kubernetes) e CI/CD. No blog, compartilho experiências reais de projetos, aprendizados em certificações, boas práticas e tutoriais técnicos voltados para profissionais de tecnologia que buscam evoluir na carreira em cloud e DevOps.",
  location: "Goiânia - GO",
  experience: "10+ anos",
  certification: "Solutions Architect AWS",
  imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23003366;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%231e40af;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='90' fill='url(%23grad)' stroke='%23ffffff' stroke-width='4'/%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='100' cy='60' r='8'/%3E%3Ccircle cx='60' cy='100' r='8'/%3E%3Ccircle cx='140' cy='100' r='8'/%3E%3Ccircle cx='100' cy='140' r='8'/%3E%3Cline x1='100' y1='68' x2='100' y2='92' stroke='%23ffffff' stroke-width='3'/%3E%3Cline x1='100' y1='108' x2='100' y2='132' stroke='%23ffffff' stroke-width='3'/%3E%3Cline x1='68' y1='100' x2='92' y2='100' stroke='%23ffffff' stroke-width='3'/%3E%3Cline x1='108' y1='100' x2='132' y2='100' stroke='%23ffffff' stroke-width='3'/%3E%3Ctext x='100' y='105' text-anchor='middle' fill='%23ffffff' font-family='Arial, sans-serif' font-size='16' font-weight='bold'%3EAD%3C/text%3E%3C/g%3E%3C/svg%3E",
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