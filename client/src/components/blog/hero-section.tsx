import { Link } from "wouter";
import { ArrowRight, Cloud, Shield, Server, GitBranch } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white" style={{ background: "linear-gradient(135deg, hsl(224, 71%, 10%) 0%, hsl(224, 76%, 20%) 50%, hsl(224, 82%, 28%) 100%)" }}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(hsl(224, 100%, 80%) 1px, transparent 1px), linear-gradient(90deg, hsl(224, 100%, 80%) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Floating accent circles */}
      <div className="absolute top-16 right-16 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, hsl(224, 100%, 70%), transparent)" }} />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full opacity-5" style={{ background: "radial-gradient(circle, hsl(200, 100%, 70%), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm text-navy-200 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Cloud Architect & DevOps Engineer
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Cloud Architecture{" "}
              <span style={{ background: "linear-gradient(90deg, hsl(200, 100%, 70%), hsl(224, 100%, 80%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                & AWS
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-200 mb-8 leading-relaxed max-w-xl">
              Compartilhando conhecimento sobre Cloud Architecture, AWS, DevOps, Kubernetes e FinOps — experiências reais de projetos e boas práticas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#featured">
                <button className="inline-flex items-center gap-2 bg-white text-navy-800 px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Ver Artigos Recentes
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/about">
                <button className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                  Sobre Mim
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-blue-300 text-sm mt-0.5">Anos de experiência</div>
              </div>
              <div className="border-l border-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">4</div>
                <div className="text-blue-300 text-sm mt-0.5">Certificações</div>
              </div>
              <div className="border-l border-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">60+</div>
                <div className="text-blue-300 text-sm mt-0.5">Artigos publicados</div>
              </div>
            </div>
          </div>

          {/* Right: terminal card */}
          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10" style={{ background: "hsl(222, 84%, 6%)" }}>
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10" style={{ background: "hsl(222, 84%, 8%)" }}>
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                <span className="ml-2 text-xs text-gray-500 font-mono">terraform apply</span>
              </div>
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm leading-7">
                <div className="text-green-400">$ terraform plan</div>
                <div className="text-gray-400 mt-1">Refreshing Terraform state...</div>
                <div className="text-blue-300 mt-1">Plan: 3 to add, 0 to change, 0 to destroy.</div>
                <div className="text-gray-400 mt-3">$ kubectl get pods -n production</div>
                <div className="text-gray-300 mt-1">NAME{"                   "}READY{"   "}STATUS</div>
                <div className="text-green-300">api-deployment-7d{"   "}2/2{"     "}Running</div>
                <div className="text-green-300">web-deployment-9f{"   "}3/3{"     "}Running</div>
                <div className="text-gray-400 mt-3">$ aws s3 ls s3://prod-bucket</div>
                <div className="text-yellow-300 mt-1">2024-01-15{"  "}configs/</div>
                <div className="text-yellow-300">2024-01-15{"  "}artifacts/</div>
                <div className="mt-3 flex items-center gap-1">
                  <span className="text-green-400">$</span>
                  <span className="w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="flex gap-3 mt-4 justify-end">
              {[
                { icon: Cloud, label: "AWS" },
                { icon: Server, label: "Kubernetes" },
                { icon: GitBranch, label: "CI/CD" },
                { icon: Shield, label: "Security" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs text-blue-200 backdrop-blur-sm">
                  <Icon className="h-3 w-3" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
