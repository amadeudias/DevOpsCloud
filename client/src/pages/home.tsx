import HeroSection from "@/components/blog/hero-section";
import FeaturedArticles from "@/components/blog/featured-articles";
import CategoriesGrid from "@/components/blog/categories-grid";
import LatestArticles from "@/components/blog/latest-articles";
import AboutSection from "@/components/blog/about-section";
import NewsletterSignup from "@/components/blog/newsletter-signup";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedArticles />
      <CategoriesGrid />
      <LatestArticles />
      <AboutSection />
      <NewsletterSignup />
    </>
  );
}
