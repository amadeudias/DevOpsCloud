import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import type { Article, Category } from "@shared/schema";

export default function Category() {
  const { slug } = useParams();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["/api/categories", slug],
    enabled: !!slug,
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ["/api/articles", "category", slug],
    queryFn: async () => {
      const response = await fetch(`/api/articles?category=${slug}`);
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json();
    },
    enabled: !!slug,
  });

  if (categoryLoading || articlesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className={`bg-${category?.color}-100 p-4 rounded-lg mr-4`}>
              <i className={`${category?.icon} text-${category?.color}-800 text-3xl`}></i>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category?.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category?.description}</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary">
              {articles?.length || 0} {articles?.length === 1 ? 'artigo' : 'artigos'}
            </Badge>
          </div>
        </div>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: Article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {article.imageUrl && (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime} min de leitura
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {new Date(article.publishedAt!).toLocaleDateString('pt-BR')}
                    </span>
                    <Link href={`/article/${article.slug}`}>
                      <button className="flex items-center text-navy-800 font-semibold hover:text-navy-600 transition-colors">
                        Ler mais
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum artigo encontrado</h3>
            <p className="text-gray-600 mb-8">Não há artigos nesta categoria ainda.</p>
            <Link href="/">
              <button className="bg-navy-800 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors">
                Voltar ao Início
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
