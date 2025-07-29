import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Você foi inscrito na newsletter com sucesso.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao se inscrever na newsletter. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    subscribeMutation.mutate(email);
  };

  return (
    <section id="newsletter" className="py-16 bg-navy-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Receba as Novidades</h2>
        <p className="text-xl text-navy-200 mb-8">
          Assine a newsletter e receba os melhores conteúdos sobre DevOps diretamente no seu email
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white"
              required
            />
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="bg-white text-navy-800 hover:bg-gray-100 font-semibold px-6"
            >
              {subscribeMutation.isPending ? "Enviando..." : "Assinar"}
            </Button>
          </div>
          <p className="text-sm text-navy-300 mt-4">
            Sem spam. Cancele a qualquer momento.
          </p>
        </form>
      </div>
    </section>
  );
}
