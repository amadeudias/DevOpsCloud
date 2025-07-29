import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import type { Category } from "@shared/schema";

export default function CategoriesGrid() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-lg mr-4" />
                  <div>
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-20" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      navy: "bg-navy-100 text-navy-800",
      blue: "bg-blue-100 text-blue-800",
      red: "bg-red-100 text-red-800",
      orange: "bg-orange-100 text-orange-800",
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
    };
    return colorMap[color] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Áreas de Especialização</h2>
          <p className="text-gray-600 text-lg">Explore conteúdos organizados por categoria</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category: Category) => (
            <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${getColorClasses(category.color)}`}>
                  <i className={`${category.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {category.articleCount} {category.articleCount === 1 ? 'artigo' : 'artigos'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Link href={`/category/${category.slug}`}>
                <button className="flex items-center text-navy-800 font-semibold hover:text-navy-600 transition-colors">
                  Ver artigos
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
