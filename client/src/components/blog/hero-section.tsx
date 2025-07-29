import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="navy-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            DevOps & Cloud Engineering
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-navy-100">
            Compartilhando conhecimento sobre DevOps, Kubernetes, Segurança, AWS, Cloud e FinOps
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#featured">
              <button className="bg-white text-navy-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Ver Artigos Recentes
              </button>
            </Link>
            <Link href="/about">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy-800 transition-colors">
                Sobre Mim
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
