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
    "AWS Solutions Architect",
    "Certified Kubernetes Administrator",
    "HashiCorp Terraform Associate", 
    "FinOps Certified Practitioner"
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-navy-800 p-8 text-white">
              <img 
                src={author.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
                alt={author.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white"
              />
              <h3 className="text-2xl font-bold text-center mb-2">{author.name}</h3>
              <p className="text-navy-200 text-center mb-6">{author.title}</p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{author.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-3" />
                  <span>{author.experience}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-3" />
                  <span>{author.certification}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <a href={author.linkedinUrl} className="text-white hover:text-navy-200 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={author.githubUrl} className="text-white hover:text-navy-200 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href={author.twitterUrl} className="text-white hover:text-navy-200 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre Mim</h2>
              <div className="prose prose-lg text-gray-600 space-y-4 mb-6">
                <p>{author.bio}</p>
                
                <p>Atualmente trabalho como Senior DevOps Engineer, onde lidero iniciativas de transformação digital e otimização de custos cloud. Tenho experiência prática com:</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tecnologias</h4>
                  <ul className="space-y-1 text-sm">
                    {technologies.map((tech, index) => (
                      <li key={index}>• {tech}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Certificações</h4>
                  <ul className="space-y-1 text-sm">
                    {certifications.map((cert, index) => (
                      <li key={index}>• {cert}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8">
                Compartilho meu conhecimento através deste blog, onde publico artigos técnicos, tutoriais práticos e insights sobre as melhores práticas em DevOps e Cloud Computing.
              </p>
              
              <div className="flex gap-4">
                <button className="bg-navy-800 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors">
                  Download CV
                </button>
                <Link href="/about">
                  <button className="border-2 border-navy-800 text-navy-800 px-6 py-3 rounded-lg hover:bg-navy-800 hover:text-white transition-colors">
                    Entre em Contato
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
