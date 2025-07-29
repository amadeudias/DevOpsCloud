import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Skeleton className="w-full h-64" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-32 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Artigos Recentes</h2>
          <p className="text-gray-600 text-lg">Acompanhe as últimas publicações</p>
        </div>

        <div className="space-y-8">
          {articles?.map((article: Article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  {article.imageUrl && (
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{article.category}</Badge>
                    {article.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime} min de leitura
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  
                  {/* Code Preview */}
                  {article.codePreview && (
                    <div className="code-navy rounded-lg p-4 mb-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code className="text-gray-300 font-mono">
                          {article.codePreview}
                        </code>
                      </pre>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {new Date(article.publishedAt!).toLocaleDateString('pt-BR')}
                    </span>
                    <Link href={`/article/${article.slug}`}>
                      <button className="bg-navy-800 text-white px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors">
                        Ler artigo completo
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/">
            <button className="bg-navy-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-navy-700 transition-colors">
              Ver Todos os Artigos
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
