import { Link } from "wouter";
import { Linkedin, Github, Twitter, Youtube } from "lucide-react";

const categories = [
  { name: "DevOps", href: "/category/devops" },
  { name: "Kubernetes", href: "/category/kubernetes" },
  { name: "Security", href: "/category/security" },
  { name: "AWS", href: "/category/aws" },
  { name: "Cloud", href: "/category/cloud" },
  { name: "FinOps", href: "/category/finops" },
];

const resources = [
  { name: "Todos os Artigos", href: "/" },
  { name: "Tutoriais", href: "/" },
  { name: "Guias", href: "/" },
  { name: "Newsletter", href: "/#newsletter" },
  { name: "RSS Feed", href: "/rss" },
];

const contact = [
  { name: "Sobre", href: "/about" },
  { name: "Contato", href: "/about#contact" },
  { name: "Colaborações", href: "/about#contact" },
  { name: "Consultoria", href: "/about#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DevOps Engineering</h3>
            <p className="text-gray-400 mb-4">
              Compartilhando conhecimento sobre DevOps, Cloud Computing e melhores práticas de engenharia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href}>
                    <a className="hover:text-white transition-colors">
                      {category.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-400">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link href={resource.href}>
                    <a className="hover:text-white transition-colors">
                      {resource.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              {contact.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a className="hover:text-white transition-colors">
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DevOps Engineering Blog. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
