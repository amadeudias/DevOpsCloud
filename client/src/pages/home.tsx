import HeroSection from "@/components/blog/hero-section";
import FeaturedArticles from "@/components/blog/featured-articles";
import CategoriesGrid from "@/components/blog/categories-grid";
import LatestArticles from "@/components/blog/latest-articles";
import AboutSection from "@/components/blog/about-section";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import AboutSidebar from "@/components/blog/about-sidebar";

export default function Home() {
  return (
    <div className="lg:flex lg:gap-8 lg:max-w-7xl lg:mx-auto lg:px-4 lg:pt-4">
      {/* Sidebar à esquerda - só aparece em telas grandes */}
      <div className="hidden lg:block lg:w-80 lg:shrink-0">
        <div className="sticky top-20">
          <AboutSidebar />
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="lg:flex-1 lg:min-w-0">
        <HeroSection />
        <FeaturedArticles />
        <CategoriesGrid />
        <LatestArticles />
        <div className="lg:hidden">
          <AboutSection />
        </div>
        <NewsletterSignup />
      </div>
    </div>
  );
}
