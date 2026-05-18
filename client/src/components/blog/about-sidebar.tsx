import { useQuery } from "@tanstack/react-query";
import { MapPin, GraduationCap, Linkedin, Github, Instagram, ExternalLink, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function AboutSidebar() {
  const { data: author } = useQuery({
    queryKey: ['/api/author'],
  });

  if (!author) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 animate-pulse">
        <div className="bg-navy-800 p-6">
          <div className="h-5 bg-navy-700 rounded mx-auto mb-2 w-32"></div>
          <div className="h-4 bg-navy-700 rounded mx-auto mb-4 w-24"></div>
        </div>
        <div className="p-6 bg-white">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
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
    "AWS Solutions Architect – Associate",
    "CyberOps Associate",
    "AWS Cloud Practitioner",
    "Google Cybersecurity"
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
      {/* Header section */}
      <div className="relative p-6 text-white" style={{ background: "linear-gradient(135deg, hsl(224, 71%, 12%) 0%, hsl(224, 76%, 22%) 100%)" }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }} />

        {/* Avatar initials */}
        <div className="relative flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/30 shadow-lg" style={{ background: "linear-gradient(135deg, hsl(224, 100%, 40%), hsl(200, 100%, 50%))" }}>
            AD
          </div>
        </div>

        <div className="relative text-center">
          <h3 className="text-lg font-bold mb-0.5">{author.name}</h3>
          <p className="text-blue-300 text-sm mb-4">{author.title}</p>

          <div className="space-y-1.5 text-xs text-blue-200">
            <div className="flex items-center justify-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{author.location}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{author.certification}</span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-3 mt-5">
            <a href={author.linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-xs transition-colors">
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a href={author.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-xs transition-colors">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a href={author.twitterUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-xs transition-colors">
              <Instagram className="h-3.5 w-3.5" />
              Insta
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-white">
        {/* Bio */}
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900 text-sm mb-2">Sobre</h4>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-5">{author.bio}</p>
        </div>

        {/* Tech stack */}
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900 text-sm mb-2">Tecnologias</h4>
          <div className="flex flex-wrap gap-1.5">
            {["AWS", "Azure", "GCP", "K8s", "Docker", "Terraform", "Ansible", "CI/CD"].map((tech) => (
              <span key={tech} className="text-xs bg-gray-100 border border-gray-200 text-gray-600 rounded-md px-2 py-0.5">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900 text-sm mb-2">Certificações</h4>
          <ul className="space-y-1.5">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-start gap-1.5 text-xs text-gray-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                {cert}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link href="/about">
          <button className="w-full flex items-center justify-center gap-2 bg-navy-800 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-navy-700 transition-colors">
            <ExternalLink className="h-4 w-4" />
            Entre em Contato
          </button>
        </Link>
      </div>
    </div>
  );
}
