import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Briefcase, GraduationCap, Linkedin, Github, Twitter } from "lucide-react";
import type { Author } from "@shared/schema";

export default function AboutSection() {
  const { data: author, isLoading } = useQuery({
    queryKey: ["/api/author"],
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-navy-800 p-8 text-white">
                <Skeleton className="w-32 h-32 rounded-full mx-auto mb-6 bg-navy-600" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-navy-600" />
                <Skeleton className="h-4 w-1/2 mx-auto mb-6 bg-navy-600" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-3 bg-navy-600" />
                      <Skeleton className="h-4 w-32 bg-navy-600" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="space-y-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Skeleton className="h-6 w-24 mb-2" />
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full mb-1" />
                    ))}
                  </div>
                  <div>
                    <Skeleton className="h-6 w-24 mb-2" />
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full mb-1" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (!author) {
    return null;
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
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex gap-8">
          {/* Sidebar fixa à esquerda */}
          <div className="lg:w-80 lg:sticky lg:top-20 lg:self-start mb-8 lg:mb-0">
            <Card className="shadow-xl overflow-hidden">
              <div className="bg-navy-800 p-6 text-white">
                <img 
                  src={author.imageUrl} 
                  alt={author.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white object-cover"
                />
                <h3 className="text-xl font-bold text-center mb-1">{author.name}</h3>
                <p className="text-navy-200 text-center mb-4 text-sm">{author.title}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{author.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{author.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>{author.certification}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-3">
                  <a href={author.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-navy-200 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href={author.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-navy-200 transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href={author.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-navy-200 transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Tecnologias</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {technologies.map((tech, index) => (
                        <li key={index}>• {tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Certificações</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {certifications.map((cert, index) => (
                        <li key={index}>• {cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <button className="w-full bg-navy-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-navy-700 transition-colors">
                    Download CV
                  </button>
                  <Link href="/about">
                    <button className="w-full border-2 border-navy-800 text-navy-800 px-4 py-2 rounded-lg text-sm hover:bg-navy-800 hover:text-white transition-colors">
                      Entre em Contato
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Conteúdo principal */}
          <div className="lg:flex-1">
            <Card className="shadow-xl">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre Mim</h2>
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p>{author.bio}</p>
                  
                  <p>
                    Compartilho meu conhecimento através deste blog, onde publico artigos técnicos, tutoriais práticos e insights sobre as melhores práticas em Cloud Computing e DevOps.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
