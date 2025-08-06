import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, GraduationCap, Linkedin, Github, Twitter } from "lucide-react";
import type { Author } from "@shared/schema";

export default function About() {
  const { data: author, isLoading } = useQuery({
    queryKey: ["/api/author"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
                </div>
                <div className="md:w-2/3">
                  <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">👤</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Informações do autor não encontradas</h1>
          <p className="text-gray-600">Não foi possível carregar as informações do autor.</p>
        </div>
      </div>
    );
  }

  const technologies = [
    "AWS, Azure, GCP",
    "Kubernetes, Docker", 
    "Terraform, Ansible",
    "Jenkins, GitLab CI"
  ];

  const certifications = [
    "AWS Certified Solutions Architect – Associate",
    "CyberOps Associate", 
    "AWS Certified Cloud Practitioner",
    "Google Cybersecurity"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="navy-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src={author.imageUrl} 
            alt={author.name}
            className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-white object-cover"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{author.name}</h1>
          <p className="text-xl text-navy-100 mb-2">{author.title}</p>
          <div className="flex items-center justify-center text-navy-200">
            <MapPin className="h-4 w-4 mr-2" />
            {author.location}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-center">
                  <div className="bg-navy-100 p-3 rounded-lg mr-4">
                    <GraduationCap className="h-6 w-6 text-navy-800" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Certificação Principal</div>
                    <div className="text-gray-600">{author.certification}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-navy-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-navy-800" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Localização</div>
                    <div className="text-gray-600">{author.location}</div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre Mim</h2>
                <div dangerouslySetInnerHTML={{ __html: author.bio.replace(/\n/g, '<br>') }} />
                
                <p className="mt-6">
                  Atualmente trabalho como Senior DevOps Engineer, onde lidero iniciativas de transformação digital e otimização de custos cloud. Tenho experiência prática com:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tecnologias</h3>
                  <div className="space-y-2">
                    {technologies.map((tech, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-navy-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Certificações</h3>
                  <div className="space-y-2">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-navy-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-6">
                  Compartilho meu conhecimento através deste blog, onde publico artigos técnicos, tutoriais práticos e insights sobre as melhores práticas em DevOps e Cloud Computing.
                </p>
                
                <div className="flex justify-center gap-4 mb-8">
                  <a 
                    href={author.linkedinUrl} 
                    className="bg-navy-800 text-white p-3 rounded-lg hover:bg-navy-700 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href={author.githubUrl} 
                    className="bg-navy-800 text-white p-3 rounded-lg hover:bg-navy-700 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href={author.twitterUrl} 
                    className="bg-navy-800 text-white p-3 rounded-lg hover:bg-navy-700 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>

                <div className="flex justify-center">
                  <button className="bg-navy-800 text-white px-8 py-3 rounded-lg hover:bg-navy-700 transition-colors">
                    Entre em Contato
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
