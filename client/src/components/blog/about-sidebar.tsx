import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { MapPin, Briefcase, GraduationCap, Linkedin, Github, Twitter } from "lucide-react";
import { Link } from "wouter";

export default function AboutSidebar() {
  const { data: author } = useQuery({
    queryKey: ['/api/author'],
  });

  if (!author) {
    return (
      <Card className="shadow-xl">
        <div className="bg-navy-800 p-6 text-white">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-navy-700 animate-pulse"></div>
          <div className="h-4 bg-navy-700 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-3 bg-navy-700 rounded mx-auto mb-4 animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </Card>
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
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Sobre</h4>
          <p className="text-xs text-gray-600 leading-relaxed">{author.bio}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
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
        
        <div>
          <Link href="/about">
            <button className="w-full bg-navy-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-navy-700 transition-colors">
              Entre em Contato
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
}