import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import SearchBar from "@/components/blog/search-bar";

const navigation = [
  { name: "Home", href: "/" },
  { name: "DevOps", href: "/category/devops" },
  { name: "Kubernetes", href: "/category/kubernetes" },
  { name: "Security", href: "/category/security" },
  { name: "AWS", href: "/category/aws" },
  { name: "Cloud", href: "/category/cloud" },
  { name: "FinOps", href: "/category/finops" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-navy-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold hover:text-navy-200 transition-colors cursor-pointer">
                DevOps Engineering
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    location === item.href 
                      ? 'bg-navy-700 text-white' 
                      : 'hover:bg-navy-700 text-white'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="relative w-64">
                  <SearchBar onClose={() => setSearchOpen(false)} />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hover:bg-navy-700 p-2 rounded-md transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:bg-navy-700 p-2 rounded-md transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-navy-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    location === item.href 
                      ? 'bg-navy-700 text-white' 
                      : 'hover:bg-navy-700 text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <div className="px-3 py-2">
              <SearchBar onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
