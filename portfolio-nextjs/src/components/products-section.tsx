"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X, Menu, Rocket, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { BeamsBackgroundLayer } from "@/components/ui/beams-background-layer";
import { ProductModalSidebar } from "@/components/product-modal-sidebar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PRODUCTS, Product as ProductData } from "@/lib/content";

interface KPI {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

interface OKR {
  objective: string;
  keyResults: string[];
  progress: number; // 0-100
}

interface ProductSection {
  title: string;
  content: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  technologies: string[];
  status: "live" | "development" | "concept";
  link?: string;
  github?: string;
  kpis: KPI[];
  okrs: OKR[];
  sections: {
    description: ProductSection;
    documents: ProductSection;
    technical: ProductSection;
    aiUsage: ProductSection;
    results: ProductSection;
    approach: ProductSection;
  };
  resources: {
    title: string;
    url: string;
    type: "documentation" | "demo" | "research";
  }[];
}

// Icon mapping for products
const getProductIcon = (index: number) => {
  const icons = [Rocket, Zap, Settings];
  return icons[index % icons.length];
};

// Convert products to the expected format
const productsData: Product[] = PRODUCTS.map((product, index) => ({
  id: index + 1,
  title: product.name,
  description: product.description,
  image: `https://images.unsplash.com/photo-${1551288049 + index * 1000}?w=800&q=80`,
  gallery: [`https://images.unsplash.com/photo-${1551288049 + index * 1000}?w=800&q=80`],
  technologies: ["AI/ML", "React", "TypeScript", "Next.js", "TailwindCSS"],
  status: index === 0 ? "live" as const : index === 1 ? "development" as const : "concept" as const,
  link: index === 0 ? "https://bitnbolt.com" : undefined,
  github: "#",
  kpis: [
    { label: "Development Progress", value: `${75 + (index * 5)}%`, trend: "up" as const },
    { label: "User Interest", value: "High", trend: "up" as const },
    { label: "Market Fit", value: "Validated", trend: "neutral" as const }
  ],
  okrs: [
    {
      objective: "Build and launch MVP",
      keyResults: ["Complete core features", "Onboard beta users", "Achieve product-market fit"],
      progress: 65 + (index * 10)
    }
  ],
  sections: {
    description: {
      title: "Description Details",
      content: product.description
    },
    documents: {
      title: "Product Documents",
      content: "Comprehensive documentation including product requirements, technical specifications, and user journey maps."
    },
    technical: {
      title: "Technical Specifications",
      content: "Built with modern web technologies including React, TypeScript, and AI/ML integration for enhanced user experience."
    },
    aiUsage: {
      title: "AI Usage",
      content: "Leverages advanced AI and machine learning capabilities to provide intelligent insights and automation."
    },
    results: {
      title: "Results",
      content: "Focused on delivering high-value solutions that address real market needs and user pain points."
    },
    approach: {
      title: "Approach",
      content: "User-centered design approach with rapid prototyping and iterative development methodology."
    }
  },
  resources: [
    { title: "Product Documentation", url: "#", type: "documentation" as const },
    { title: "Live Demo", url: "#", type: "demo" as const }
  ]
}));

interface ProductsSectionProps {
  className?: string;
}

export function ProductsSection({ className }: ProductsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, productsData.length - itemsPerPage);

  const navigateCarousel = (direction: number) => {
    setCurrentIndex(prev => Math.max(0, Math.min(prev + direction, maxIndex)));
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = '';
  };

  const getStatusColor = (status: string) => {
    // Use glassmorphism instead of colored badges
    return "glass text-white";
  };

  const visibleProducts = productsData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <>
      <section id="products" className={cn("relative py-20 px-4", className)}>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Featured Products
            </motion.h2>

            {/* Carousel Controls */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="hidden md:flex gap-2"
            >
              <button
                onClick={() => navigateCarousel(-1)}
                disabled={currentIndex === 0}
                className="bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 dark:text-white transition-all duration-300 hover:bg-black/20 dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateCarousel(1)}
                disabled={currentIndex >= maxIndex}
                className="bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 dark:text-white transition-all duration-300 hover:bg-black/20 dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onClick={() => openModal(product)}
              >
                <div className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:translate-y-[-8px] h-full overflow-hidden">
                  <div className="relative z-10 flex items-start gap-4 h-full">
                    {/* App Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        {(() => {
                          const IconComponent = getProductIcon(index);
                          return <IconComponent className="w-8 h-8 text-white" />;
                        })()}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      {/* Header with Title and Status */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 transition-colors duration-300">
                          {product.title}
                        </h3>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0",
                          "bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white"
                        )}>
                          {product.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-white/70 text-sm line-clamp-2 mb-3">
                        {product.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {product.technologies.length > 2 && (
                          <span className="px-2 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 rounded text-xs">
                            +{product.technologies.length - 2}
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

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            <button
              onClick={() => navigateCarousel(-1)}
              disabled={currentIndex === 0}
              className="bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 dark:text-white transition-all duration-300 hover:bg-black/20 dark:hover:bg-white/20 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateCarousel(1)}
              disabled={currentIndex >= maxIndex}
              className="bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 dark:text-white transition-all duration-300 hover:bg-black/20 dark:hover:bg-white/20 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Modal with Liquid Glass */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Glass Overlay Background */}
          <div className="absolute inset-0 bg-white dark:bg-black/30 backdrop-blur-2xl" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-black/40 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 rounded-2xl max-w-7xl w-full h-[90vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm border border-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex h-full overflow-hidden rounded-2xl">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-80 border-r border-white/20 bg-black/20 backdrop-blur-sm h-full overflow-y-auto rounded-l-2xl">
                <div className="p-6">
                  <ProductModalSidebar
                    status={selectedProduct.status}
                    technologies={selectedProduct.technologies}
                    kpis={selectedProduct.kpis}
                    okrs={selectedProduct.okrs}
                    link={selectedProduct.link}
                    github={selectedProduct.github}
                    resources={selectedProduct.resources}
                  />
                </div>
              </div>

              {/* Mobile Sidebar Overlay */}
              {isMobileSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}>
                  <motion.div
                    initial={{ x: -320 }}
                    animate={{ x: 0 }}
                    exit={{ x: -320 }}
                    className="w-80 h-full border-r border-white/20 bg-white/10 backdrop-blur-xl overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6">
                      <ProductModalSidebar
                        status={selectedProduct.status}
                        technologies={selectedProduct.technologies}
                        kpis={selectedProduct.kpis}
                        okrs={selectedProduct.okrs}
                        link={selectedProduct.link}
                        github={selectedProduct.github}
                        resources={selectedProduct.resources}
                      />
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-8 rounded-r-2xl">
                <div className="max-w-none mx-auto px-2">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="lg:hidden mb-4 bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </button>
                  {/* Image Carousel */}
                  {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                    <div className="mb-8">
                      <div className="aspect-video overflow-hidden rounded-xl">
                        <img
                          src={selectedProduct.gallery[0]}
                          alt={selectedProduct.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Title and Description */}
                  <div className="mb-8 px-2">
                    <h1 className="text-4xl font-bold text-white mb-4">{selectedProduct.title}</h1>
                    <p className="text-xl text-white/80 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {/* Expandable Content Sections */}
                  <div className="px-2 pb-4">
                  <Accordion>
                    <AccordionItem defaultOpen>
                      <AccordionTrigger>{selectedProduct.sections.description.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-white/70 leading-relaxed">{selectedProduct.sections.description.content}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionTrigger>{selectedProduct.sections.documents.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-white/70 leading-relaxed">{selectedProduct.sections.documents.content}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionTrigger>{selectedProduct.sections.technical.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-white/70 leading-relaxed">{selectedProduct.sections.technical.content}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionTrigger>{selectedProduct.sections.aiUsage.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-white/70 leading-relaxed">{selectedProduct.sections.aiUsage.content}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionTrigger>{selectedProduct.sections.results.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-white/70 leading-relaxed">{selectedProduct.sections.results.content}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionTrigger>{selectedProduct.sections.approach.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-white/70 leading-relaxed">{selectedProduct.sections.approach.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}