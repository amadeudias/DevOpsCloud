import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Sparkles } from "lucide-react";

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
    <section id="newsletter" className="relative overflow-hidden py-20" style={{ background: "linear-gradient(135deg, hsl(224, 71%, 10%) 0%, hsl(224, 76%, 20%) 100%)" }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Newsletter Gratuita
        </div>

        <h2 className="text-4xl font-bold mb-4">Receba as Novidades</h2>
        <p className="text-lg text-blue-200 mb-10 leading-relaxed">
          Assine a newsletter e receba os melhores conteúdos sobre DevOps e Cloud diretamente no seu email — sem spam.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-3 bg-white/10 border border-white/20 rounded-xl p-2 backdrop-blur-sm">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 bg-transparent border-0 text-white placeholder:text-blue-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="bg-white text-navy-800 hover:bg-blue-50 font-semibold px-6 rounded-lg shrink-0"
            >
              {subscribeMutation.isPending ? "Enviando..." : "Assinar"}
            </Button>
          </div>
          <p className="text-xs text-blue-300 mt-4">
            Sem spam. Cancele a qualquer momento.
          </p>
        </form>
      </div>
    </section>
  );
}
