import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Article, InsertArticle } from "@shared/schema";

export default function Admin() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['/api/articles'],
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  const createMutation = useMutation({
    mutationFn: (article: InsertArticle) => 
      apiRequest('/api/articles', { method: 'POST', body: article }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      setIsDialogOpen(false);
      setSelectedArticle(null);
      toast({ description: "Artigo criado com sucesso!" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, article }: { id: number; article: Partial<InsertArticle> }) =>
      apiRequest(`/api/articles/${id}`, { method: 'PATCH', body: article }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      setIsDialogOpen(false);
      setSelectedArticle(null);
      setIsEditing(false);
      toast({ description: "Artigo atualizado com sucesso!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/articles/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      toast({ description: "Artigo deletado com sucesso!" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const article: InsertArticle = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean),
      readTime: parseInt(formData.get('readTime') as string),
      featured: formData.get('featured') === 'true',
      imageUrl: formData.get('imageUrl') as string,
    };

    if (isEditing && selectedArticle) {
      updateMutation.mutate({ id: selectedArticle.id, article });
    } else {
      createMutation.mutate(article);
    }
  };

  const openDialog = (article?: Article) => {
    if (article) {
      setSelectedArticle(article);
      setIsEditing(true);
    } else {
      setSelectedArticle(null);
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-white rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Artigo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título</label>
                    <Input 
                      name="title" 
                      required 
                      defaultValue={selectedArticle?.title || ''} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input 
                      name="slug" 
                      required 
                      defaultValue={selectedArticle?.slug || ''} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Resumo</label>
                  <Textarea 
                    name="excerpt" 
                    rows={2} 
                    required 
                    defaultValue={selectedArticle?.excerpt || ''} 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Conteúdo</label>
                  <Textarea 
                    name="content" 
                    rows={10} 
                    required 
                    defaultValue={selectedArticle?.content || ''} 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <Select name="category" defaultValue={selectedArticle?.category || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat: any) => (
                          <SelectItem key={cat.slug} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tempo de Leitura (min)</label>
                    <Input 
                      name="readTime" 
                      type="number" 
                      required 
                      defaultValue={selectedArticle?.readTime || 5} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Artigo em Destaque</label>
                    <Select name="featured" defaultValue={selectedArticle?.featured ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">Não</SelectItem>
                        <SelectItem value="true">Sim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tags (separadas por vírgula)</label>
                    <Input 
                      name="tags" 
                      defaultValue={selectedArticle?.tags?.join(', ') || ''} 
                      placeholder="DevOps, AWS, Kubernetes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                    <Input 
                      name="imageUrl" 
                      type="url" 
                      defaultValue={selectedArticle?.imageUrl || ''} 
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {isEditing ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {articles?.map((article: Article) => (
            <Card key={article.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                      {article.featured && <Badge>Destaque</Badge>}
                    </div>
                    <p className="text-gray-600 mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Categoria: {article.category}</span>
                      <span>Leitura: {article.readTime} min</span>
                      <span>Tags: {article.tags?.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`/articles/${article.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openDialog(article)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(article.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}