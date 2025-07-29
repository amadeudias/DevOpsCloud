import { Link } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 ${featured ? 'ring-2 ring-navy-200' : ''}`}>
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
          {featured && <Badge className="bg-navy-800 text-white">Destaque</Badge>}
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
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
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
  );
}
