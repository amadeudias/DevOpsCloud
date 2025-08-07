import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Lock, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Article, InsertArticle } from "@shared/schema";

export default function Admin() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Always call hooks at the top level - never conditionally
  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['/api/articles'],
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: (article: InsertArticle) => 
      apiRequest('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      setIsDialogOpen(false);
      setSelectedArticle(null);
      toast({ description: "Artigo criado com sucesso!" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Sessão Expirada",
          description: "Fazendo login novamente...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Erro",
        description: "Falha ao criar artigo.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, article }: { id: number, article: Partial<InsertArticle> }) => 
      apiRequest(`/api/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      setIsDialogOpen(false);
      setSelectedArticle(null);
      setIsEditing(false);
      toast({ description: "Artigo atualizado com sucesso!" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Sessão Expirada", 
          description: "Fazendo login novamente...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Erro",
        description: "Falha ao atualizar artigo.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/articles/${id}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      toast({ description: "Artigo excluído com sucesso!" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Sessão Expirada",
          description: "Fazendo login novamente...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Erro",
        description: "Falha ao excluir artigo.",
        variant: "destructive",
      });
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Acesso Restrito",
        description: "Você precisa fazer login para acessar o painel admin.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 2000);
    }
  }, [isAuthenticated, isLoading, toast]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Don't render admin panel if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">Você precisa fazer login para acessar o painel admin.</p>
          <Button onClick={() => window.location.href = "/api/login"}>
            Fazer Login
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const article: InsertArticle = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      featured: formData.get('featured') === 'on',
      tags: formData.get('tags') ? (formData.get('tags') as string).split(',').map(t => t.trim()) : [],
      readTime: parseInt(formData.get('readTime') as string) || 5,
    };

    if (isEditing && selectedArticle) {
      updateMutation.mutate({ id: selectedArticle.id, article });
    } else {
      createMutation.mutate(article);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      deleteMutation.mutate(id);
    }
  };

  const openCreateDialog = () => {
    setSelectedArticle(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (article: Article) => {
    setSelectedArticle(article);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="mt-1 text-gray-500">
                Olá, {user?.name || user?.email} - Gerencie seus artigos do blog
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/api/logout"}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Artigos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artigos em Destaque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {articles?.filter(a => a.featured).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Artigos</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openCreateDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Artigo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      {isEditing ? 'Editar Artigo' : 'Criar Novo Artigo'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input 
                        name="title"
                        placeholder="Título do artigo"
                        defaultValue={selectedArticle?.title || ''}
                        required
                      />
                    </div>
                    <div>
                      <Textarea 
                        name="content"
                        placeholder="Conteúdo do artigo..."
                        defaultValue={selectedArticle?.content || ''}
                        rows={10}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Select name="category" defaultValue={selectedArticle?.category || ''}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((cat) => (
                              <SelectItem key={cat.slug} value={cat.slug}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input 
                          name="readTime"
                          type="number"
                          placeholder="Tempo de leitura (min)"
                          defaultValue={selectedArticle?.readTime || 5}
                          min="1"
                        />
                      </div>
                    </div>
                    <div>
                      <Input 
                        name="tags"
                        placeholder="Tags (separadas por vírgula)"
                        defaultValue={selectedArticle?.tags?.join(', ') || ''}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        name="featured"
                        defaultChecked={selectedArticle?.featured || false}
                      />
                      <label>Artigo em destaque</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        {createMutation.isPending || updateMutation.isPending ? 'Salvando...' : 
                         isEditing ? 'Atualizar' : 'Criar'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {articlesLoading ? (
              <div className="text-center py-4">Carregando artigos...</div>
            ) : (
              <div className="space-y-4">
                {articles?.map((article) => (
                  <div 
                    key={article.id} 
                    className="border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{article.title}</h3>
                        {article.featured && (
                          <Badge variant="secondary">Destaque</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {article.content.substring(0, 150)}...
                      </p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime} min leitura</span>
                        {article.tags && article.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{article.tags.join(', ')}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditDialog(article)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDelete(article.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {!articles || articles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum artigo encontrado. Crie seu primeiro artigo!
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}