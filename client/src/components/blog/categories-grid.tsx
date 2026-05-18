import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Settings2, Network, ShieldCheck, Cloud, CloudCog, TrendingUp } from "lucide-react";
import type { Category } from "@shared/schema";

const categoryIcons: Record<string, React.ReactNode> = {
  devops: <Settings2 className="h-6 w-6" />,
  kubernetes: <Network className="h-6 w-6" />,
  security: <ShieldCheck className="h-6 w-6" />,
  aws: <Cloud className="h-6 w-6" />,
  cloud: <CloudCog className="h-6 w-6" />,
  finops: <TrendingUp className="h-6 w-6" />,
};

const categoryGradients: Record<string, string> = {
  navy: "from-blue-900 to-blue-700",
  blue: "from-blue-600 to-cyan-500",
  red: "from-red-600 to-rose-500",
  orange: "from-orange-500 to-amber-400",
  green: "from-teal-600 to-emerald-500",
  purple: "from-purple-600 to-violet-500",
};

const categoryBg: Record<string, string> = {
  navy: "bg-blue-50 border-blue-100 hover:border-blue-200",
  blue: "bg-cyan-50 border-cyan-100 hover:border-cyan-200",
  red: "bg-red-50 border-red-100 hover:border-red-200",
  orange: "bg-orange-50 border-orange-100 hover:border-orange-200",
  green: "bg-teal-50 border-teal-100 hover:border-teal-200",
  purple: "bg-purple-50 border-purple-100 hover:border-purple-200",
};

export default function CategoriesGrid() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl p-6 border border-gray-100">
                <Skeleton className="h-14 w-14 rounded-xl mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Áreas de Especialização</h2>
          <p className="text-gray-500 text-lg">Explore conteúdos organizados por categoria</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category: Category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <div className={`group rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${categoryBg[category.color] || "bg-gray-50 border-gray-100 hover:border-gray-200"}`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${categoryGradients[category.color] || "from-gray-600 to-gray-500"} text-white mb-5 shadow-md`}>
                  {categoryIcons[category.slug] || <Cloud className="h-6 w-6" />}
                </div>

                {/* Content */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  <span className="text-xs font-medium text-gray-400 bg-white/80 border border-gray-200 rounded-full px-2.5 py-0.5 ml-2 mt-0.5 whitespace-nowrap">
                    {category.articleCount} artigos
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">{category.description}</p>

                <div className="flex items-center gap-1 font-semibold text-sm text-gray-700 group-hover:text-navy-800 transition-colors">
                  Ver artigos
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
