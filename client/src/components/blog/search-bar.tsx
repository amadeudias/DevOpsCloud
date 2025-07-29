import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Article } from "@shared/schema";

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/articles", "search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const response = await fetch(`/api/articles?search=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Failed to search articles");
      return response.json();
    },
    enabled: searchQuery.length > 2,
  });

  const handleClose = () => {
    setSearchQuery("");
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar artigos..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => setIsOpen(searchQuery.length > 0)}
          className="bg-navy-700 text-white placeholder-gray-300 pr-16 focus:ring-2 focus:ring-white focus:bg-navy-600 transition-colors"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Search className="h-4 w-4 text-gray-300" />
        </div>
      </div>

      {/* Search Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="shadow-xl border-2">
            <CardContent className="p-0 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Buscando artigos...
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="divide-y">
                  {searchResults.slice(0, 5).map((article: Article) => (
                    <Link key={article.id} href={`/article/${article.slug}`}>
                      <div
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={handleClose}
                      >
                        <div className="flex items-start gap-3">
                          {article.imageUrl && (
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 line-clamp-1">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                              <span className="text-xs text-gray-400">
                                {article.readTime} min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      e mais {searchResults.length - 5} resultados...
                    </div>
                  )}
                </div>
              ) : searchQuery.length > 2 ? (
                <div className="p-4 text-center text-gray-500">
                  Nenhum artigo encontrado para "{searchQuery}"
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Digite pelo menos 3 caracteres para buscar
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleClose}
        />
      )}
    </div>
  );
}
