"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ExternalLink, Github, X, Rocket, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCTS, Product as ProductData } from "@/lib/content";
import { trackProductView, trackClick } from "@/lib/analytics";

interface KPI {
  label: string;
  value: string;
  icon: any;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  status: string;
  image: string;
  gallery: string[];
  tags: string[];
  kpis: KPI[];
  links: {
    github?: string;
    demo?: string;
    website?: string;
  };
  sections: {
    description: { title: string; content: string };
    documents: { title: string; content: string };
    technical: { title: string; content: string };
    aiUsage: { title: string; content: string };
    results: { title: string; content: string };
    approach: { title: string; content: string };
  };
}

// App icons mapping for each product
const appIcons: { [key: string]: string } = {
  'bitnbolt': 'https://img.icons8.com/fluency/200/web.png',
  'conductor': 'https://img.icons8.com/fluency/200/project-management.png', 
  'nimbus': 'https://img.icons8.com/fluency/200/crystal-ball.png',
  'arcadia': 'https://img.icons8.com/fluency/200/news.png'
};

// Convert products data with actual status/category values
const productsData = PRODUCTS.map((product, index) => ({
  id: index + 1,
  title: product.name,
  slug: product.slug,
  description: product.description,
  longDescription: product.fullDescription || `${product.description}. This innovative solution demonstrates cutting-edge technology implementation and strategic product thinking.`,
  category: product.category,
  status: product.status === 'live' ? 'Live' : product.status === 'mvp' ? 'MVP' : product.status === 'development' ? 'In Development' : 'Concept',
  image: appIcons[product.slug] || product.icon || `https://images.unsplash.com/photo-${1677442136019 + index}?w=800&q=80`,
  gallery: product.gallery || [
    appIcons[product.slug] || product.icon || `https://images.unsplash.com/photo-${1677442136019 + index}?w=800&q=80`,
    `https://images.unsplash.com/photo-${1677442136020 + index}?w=800&q=80`,
    `https://images.unsplash.com/photo-${1677442136021 + index}?w=800&q=80`
  ],
  tags: product.technologies?.slice(0, 4) || ["AI", "Product Management", "Innovation", "Technology"],
  kpis: product.kpis?.map((kpi: any) => ({
    label: kpi.label,
    value: kpi.value,
    icon: kpi.label.toLowerCase().includes('user') ? Rocket : kpi.label.toLowerCase().includes('revenue') || kpi.label.toLowerCase().includes('growth') ? Zap : Settings
  })) || [
    { label: "Users", value: "10K+", icon: Rocket },
    { label: "Growth", value: "+150%", icon: Zap },
    { label: "Features", value: "25+", icon: Settings }
  ],
  links: {
    github: product.github || "#",
    demo: product.demo || "#",
    website: product.link || "#"
  },
  sections: {
    description: {
      title: "Project Overview",
      content: `${product.description}. This project showcases innovative approaches to modern product development challenges.`
    },
    documents: {
      title: "Documentation",
      content: "Comprehensive documentation including API specifications, user guides, and technical references."
    },
    technical: {
      title: "Technical Implementation",
      content: "Built with modern technologies focusing on scalability, performance, and user experience."
    },
    aiUsage: {
      title: "AI Integration",
      content: "Leveraging artificial intelligence to enhance user experience and automate complex workflows."
    },
    results: {
      title: "Results & Impact",
      content: "Significant improvements in user engagement, operational efficiency, and business metrics."
    },
    approach: {
      title: "Development Approach",
      content: "Agile methodology with continuous integration, user feedback loops, and iterative improvements."
    }
  }
}));

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Track product view
    trackProductView(product.title, product.category, product.status);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = '';
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Back to Home */}
        <div className="mb-8">
          <a 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the products and solutions I've built to solve real-world problems.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product) => (
            <motion.div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => openModal(product)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 h-full overflow-hidden">
                <div className="relative z-10 h-full">
                  {/* App Icon - Top Left */}
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-lg overflow-hidden shadow-md">
                    {appIcons[product.slug] ? (
                      <img 
                        src={appIcons[product.slug]} 
                        alt={`${product.title} icon`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span class="text-white font-bold text-lg">${product.title.charAt(0)}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{product.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details - Adjusted padding for icon */}
                  <div className="pl-14 pr-2">
                    {/* Header with Title and Pills */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 transition-colors duration-300 pr-2">
                        {product.title}
                      </h3>
                      <div className="flex flex-col gap-1 flex-shrink-0 items-end">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          product.status === "Live" 
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                            : product.status === "In Development"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800"
                            : product.status === "MVP"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                            : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800"
                        )}>
                          {product.status}
                        </span>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium text-center",
                          "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        )}>
                          {product.category.split('/')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-white/70 text-sm line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {product.tags.length > 2 && (
                        <span className="px-2 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 rounded text-xs">
                          +{product.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end">
                      <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-white dark:bg-black/30 backdrop-blur-2xl" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-black/40 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 rounded-2xl max-w-7xl w-full h-[90vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm border border-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="p-8 h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProduct.title}</h2>
                <p className="text-white/80 text-lg mb-6">{selectedProduct.longDescription}</p>
                
                {/* KPIs */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {selectedProduct.kpis.map((kpi, idx) => (
                    <div key={idx} className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold text-white">{kpi.value}</div>
                      <div className="text-white/60">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mb-8">
                  {selectedProduct.links.github && (
                    <a href={selectedProduct.links.github} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {selectedProduct.links.demo && (
                    <a href={selectedProduct.links.demo} className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>

                {/* Sections */}
                <div className="space-y-6">
                  {Object.entries(selectedProduct.sections).map(([key, section]) => (
                    <div key={key} className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                      <p className="text-white/70 leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}