import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@shared/schema";

export default function FeaturedArticles() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles", "featured"],
    queryFn: async () => {
      const response = await fetch("/api/articles?featured=true");
      if (!response.ok) throw new Error("Failed to fetch featured articles");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section id="featured" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
                <Skeleton className="w-full h-52" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
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
    <section id="featured" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-navy-100 text-navy-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Tag className="h-3.5 w-3.5" />
            Conteúdo Selecionado
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Artigos em Destaque</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Os melhores conteúdos sobre DevOps e Cloud Engineering, curados para você</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article: Article) => (
            <div key={article.id} className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Image with overlay */}
              <div className="relative overflow-hidden h-52">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  {article.readTime} min
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-navy-800 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mb-5 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-gray-400 text-xs">
                    {new Date(article.publishedAt!).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <Link href={`/article/${article.slug}`}>
                    <button className="inline-flex items-center gap-1 text-navy-800 font-semibold text-sm hover:gap-2 transition-all duration-200">
                      Ler mais
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
