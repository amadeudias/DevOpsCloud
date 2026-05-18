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

          {/* Right: expertise card */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="px-6 pt-6 pb-4 border-b border-white/10">
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">Especialidades</p>
                <h4 className="text-white font-bold text-lg">O que você vai encontrar aqui</h4>
              </div>

              <div className="p-6 space-y-4">
                {[
                  { icon: Cloud, color: "bg-orange-500/20 text-orange-300 border-orange-500/30", label: "Cloud Architecture", desc: "AWS, Azure e GCP — design de soluções escaláveis" },
                  { icon: Server, color: "bg-blue-500/20 text-blue-300 border-blue-500/30", label: "DevOps & Automação", desc: "CI/CD, Infrastructure as Code, Docker e Kubernetes" },
                  { icon: Shield, color: "bg-red-500/20 text-red-300 border-red-500/30", label: "Segurança em Cloud", desc: "IAM, compliance e boas práticas de segurança" },
                  { icon: GitBranch, color: "bg-purple-500/20 text-purple-300 border-purple-500/30", label: "FinOps", desc: "Otimização de custos e governança financeira" },
                ].map(({ icon: Icon, color, label, desc }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{label}</p>
                      <p className="text-blue-300 text-xs mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse block"></span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Conteúdo novo toda semana</p>
                    <p className="text-blue-300 text-xs">Experiências reais de projetos e certificações</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
