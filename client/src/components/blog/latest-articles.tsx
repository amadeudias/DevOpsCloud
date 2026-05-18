import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Clock, ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@shared/schema";

export default function LatestArticles() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles", "latest"],
    queryFn: async () => {
      const response = await fetch("/api/articles?latest=true&limit=3");
      if (!response.ok) throw new Error("Failed to fetch latest articles");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white border border-gray-100">
                <div className="md:flex">
                  <Skeleton className="md:w-72 h-52 md:h-auto flex-shrink-0" />
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-7 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-6" />
                    <Skeleton className="h-28 w-full mb-4 rounded-xl" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-36" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getCategoryColor = (category: string) => {
    const map: Record<string, string> = {
      DevOps: "bg-navy-800 text-white",
      Kubernetes: "bg-blue-600 text-white",
      Security: "bg-red-600 text-white",
      AWS: "bg-orange-500 text-white",
      Cloud: "bg-teal-600 text-white",
      FinOps: "bg-purple-600 text-white",
    };
    return map[category] || "bg-gray-700 text-white";
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Artigos Recentes</h2>
          <p className="text-gray-500 text-lg">Acompanhe as últimas publicações</p>
        </div>

        <div className="space-y-6">
          {articles?.map((article: Article) => (
            <div key={article.id} className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="md:flex">
                {/* Image */}
                <div className="relative md:w-72 h-52 md:h-auto flex-shrink-0 overflow-hidden">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags + read time */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {article.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded-full px-2.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                      <div className="flex items-center text-gray-400 text-xs ml-auto">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {article.readTime} min de leitura
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-navy-800 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-5">{article.excerpt}</p>

                    {/* Code Preview */}
                    {article.codePreview && (
                      <div className="rounded-xl overflow-hidden mb-5 border border-gray-800" style={{ background: "hsl(222, 84%, 6%)" }}>
                        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-700" style={{ background: "hsl(222, 84%, 8%)" }}>
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"></div>
                        </div>
                        <pre className="p-4 text-xs overflow-x-auto">
                          <code className="text-gray-300 font-mono">{article.codePreview}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(article.publishedAt!).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <Link href={`/article/${article.slug}`}>
                      <button className="inline-flex items-center gap-2 bg-navy-800 text-white px-5 py-2.5 rounded-lg hover:bg-navy-700 transition-all duration-200 text-sm font-medium group-hover:shadow-md">
                        Ler artigo completo
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/category/devops">
            <button className="inline-flex items-center gap-2 bg-white border-2 border-navy-800 text-navy-800 px-8 py-3.5 rounded-lg font-semibold hover:bg-navy-800 hover:text-white transition-all duration-200">
              Ver Todos os Artigos
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
