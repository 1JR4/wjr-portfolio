"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Clock, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { BeamsBackgroundLayer } from "@/components/ui/beams-background-layer";
import { ArticleModalSidebar } from "@/components/article-modal-sidebar";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS, BlogPost } from "@/lib/content";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number; // 1, 2, 3 for h1, h2, h3
}

interface SocialMetric {
  likes: number;
  shares: number;
}

interface ArticleResource {
  title: string;
  url: string;
  type: "link" | "pdf" | "video";
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  tldr: string[];
  tableOfContents: TableOfContentsItem[];
  content: string;
  resources: ArticleResource[];
  tags: string[];
  socialMetrics: SocialMetric;
  relatedArticles: number[]; // IDs of related articles
}

// Convert blog posts to article format for the component
const articlesData = BLOG_POSTS.map((post, index) => ({
  id: index + 1,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  description: post.excerpt,
  date: post.date || "2024-12-01",
  readTime: post.readTime || `${Math.ceil(post.content.split(' ').length / 200)} min read`,
  category: post.category || "Product Management",
  image: post.image || `https://images.unsplash.com/photo-${1677442136019 + index}?w=800&q=80`,
  author: post.author || "Wonjae Ra",
  content: post.content,
  tldr: post.tldr || [
    "Key insights from the article topic",
    "Main technical or business implications", 
    "Practical applications and use cases",
    "Future trends and considerations"
  ],
  tableOfContents: post.tableOfContents || [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'content', title: 'Main Content', level: 1 }
  ],
  resources: post.resources || [{ title: "Related Resources", url: "#", type: "link" as const }],
  tags: post.tags || ["Product Management", "AI", "Strategy", "Leadership"],
  socialMetrics: { likes: 42 + (index * 17), shares: 8 + (index * 3) },
  relatedArticles: []
}));

interface ArticlesSectionProps {
  className?: string;
}

export function ArticlesSection({ className }: ArticlesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, articlesData.length - itemsPerPage);

  const navigateCarousel = (direction: number) => {
    setCurrentIndex(prev => Math.max(0, Math.min(prev + direction, maxIndex)));
  };

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    setActiveSection("");
    document.body.style.overflow = '';
  };

  const handleTocClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      const container = contentRef.current;
      const elementTop = element.offsetTop - container.offsetTop;
      container.scrollTo({
        top: elementTop - 20,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll sync functionality
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || !selectedArticle) return;

      const container = contentRef.current;
      const scrollTop = container.scrollTop;
      
      // Find the currently visible section
      for (const section of selectedArticle.tableOfContents) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop - container.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollTop >= elementTop - 100 && scrollTop < elementBottom - 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [selectedArticle]);

  // Set initial active section when modal opens
  useEffect(() => {
    if (selectedArticle && selectedArticle.tableOfContents.length > 0) {
      setActiveSection(selectedArticle.tableOfContents[0].id);
    }
  }, [selectedArticle]);

  const getRelatedArticles = (article: Article) => {
    // Find articles that share at least one tag with the current article
    const relatedByTags = articlesData
      .filter(a => a.id !== article.id) // Exclude current article
      .map(a => ({
        article: a,
        sharedTags: a.tags.filter(tag => article.tags.includes(tag)).length
      }))
      .filter(item => item.sharedTags > 0) // Only articles with shared tags
      .sort((a, b) => b.sharedTags - a.sharedTags) // Sort by most shared tags
      .slice(0, 3); // Limit to 3 related articles
    
    // If no shared tags, return other articles from same category or just other articles
    if (relatedByTags.length === 0) {
      const fallbackArticles = articlesData
        .filter(a => a.id !== article.id)
        .slice(0, 2) // Just show 2 other articles as fallback
        .map(a => ({
          article: a,
          sharedTags: 0
        }));
      
      return fallbackArticles.map(item => ({
        id: item.article.id,
        title: item.article.title,
        category: item.article.category,
        slug: item.article.slug || `article-${item.article.id}`
      }));
    }
    
    return relatedByTags.map(item => ({
      id: item.article.id,
      title: item.article.title,
      category: item.article.category,
      slug: item.article.slug || `article-${item.article.id}`
    }));
  };

  const visibleArticles = articlesData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <>
      <section id="articles" className={cn("relative py-20 px-4", className)}>
        
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
              Latest Articles
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

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onClick={() => openModal(article)}
              >
                <div className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:translate-y-[-8px] h-full overflow-hidden">
                  
                  <div className="relative z-10">
                    {/* Article Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-gray-600 dark:text-white/60 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors duration-300">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-white/70 text-sm line-clamp-3 mb-4">
                        {article.description}
                      </p>

                      {/* Footer */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-white/60 text-xs">{article.date}</span>
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

      {/* Enhanced Article Modal with Liquid Glass */}
      {isModalOpen && selectedArticle && (
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

            {/* Mobile Layout: Stacked */}
            <div className="lg:hidden flex flex-col h-full rounded-2xl">
              {/* Mobile Main Content - 70% */}
              <div className="flex-[0.7] overflow-y-auto p-6 border-b border-white/20" ref={contentRef}>
                <div className="max-w-none mx-auto">
                  {/* Header */}
                  <div className="mb-6 px-2">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="info">{selectedArticle.category}</Badge>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedArticle.readTime}
                      </span>
                      <span className="text-white/60 text-sm">{selectedArticle.date}</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-white mb-4">{selectedArticle.title}</h1>
                    <p className="text-lg text-white/80 mb-4">By {selectedArticle.author}</p>
                    <p className="text-xl text-white/70 leading-relaxed">{selectedArticle.description}</p>
                  </div>

                  {/* TL;DR Section */}
                  <div className="mb-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl p-6 mx-2">
                    <h2 className="text-lg font-semibold text-white mb-4">📝 TL;DR</h2>
                    <ul className="space-y-2">
                      {selectedArticle.tldr.map((point, index) => (
                        <li key={index} className="text-white/80 flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-invert prose-lg max-w-none px-2 pb-4">
                    <div 
                      className="text-white/80 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: selectedArticle.content
                          .split('\n')
                          .map(line => {
                            if (line.startsWith('# ')) {
                              const title = line.substring(2);
                              const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                              return `<h1 id="${id}" class="text-2xl font-bold text-white mt-6 mb-3 scroll-mt-6">${title}</h1>`;
                            } else if (line.startsWith('## ')) {
                              const title = line.substring(3);
                              const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                              return `<h2 id="${id}" class="text-xl font-semibold text-white mt-5 mb-2 scroll-mt-6">${title}</h2>`;
                            } else if (line.startsWith('### ')) {
                              const title = line.substring(4);
                              const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                              return `<h3 id="${id}" class="text-lg font-medium text-white mt-4 mb-2 scroll-mt-6">${title}</h3>`;
                            } else if (line.startsWith('- ')) {
                              return `<li class="text-white/70 ml-4">${line.substring(2)}</li>`;
                            } else if (line.trim() === '') {
                              return '<br>';
                            } else {
                              return `<p class="text-white/70 mb-3 leading-relaxed">${line}</p>`;
                            }
                          })
                          .join('')
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Sidebar - 30% */}
              <div className="flex-[0.3] bg-black/20 backdrop-blur-sm overflow-y-auto p-4">
                <ArticleModalSidebar
                  tableOfContents={selectedArticle.tableOfContents}
                  resources={selectedArticle.resources}
                  tags={selectedArticle.tags}
                  socialMetrics={selectedArticle.socialMetrics}
                  relatedArticles={getRelatedArticles(selectedArticle)}
                  onTocClick={handleTocClick}
                  activeSection={activeSection}
                />
              </div>
            </div>

            {/* Desktop Layout: Side by Side */}
            <div className="hidden lg:flex h-full overflow-hidden rounded-2xl">
              {/* Desktop Sidebar */}
              <div className="w-80 border-r border-white/20 bg-black/20 backdrop-blur-sm h-full overflow-y-auto rounded-l-2xl">
                <div className="p-6">
                  <ArticleModalSidebar
                    tableOfContents={selectedArticle.tableOfContents}
                    resources={selectedArticle.resources}
                    tags={selectedArticle.tags}
                    socialMetrics={selectedArticle.socialMetrics}
                    relatedArticles={getRelatedArticles(selectedArticle)}
                    onTocClick={handleTocClick}
                    activeSection={activeSection}
                  />
                </div>
              </div>

              {/* Desktop Main Content */}
              <div className="flex-1 overflow-y-auto p-8 rounded-r-2xl" ref={contentRef}>
                <div className="max-w-none mx-auto">
                  
                  {/* Header */}
                  <div className="mb-8 px-2">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="info">{selectedArticle.category}</Badge>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedArticle.readTime}
                      </span>
                      <span className="text-white/60 text-sm">{selectedArticle.date}</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-white mb-4">{selectedArticle.title}</h1>
                    <p className="text-lg text-white/80 mb-4">By {selectedArticle.author}</p>
                    <p className="text-xl text-white/70 leading-relaxed">{selectedArticle.description}</p>
                  </div>

                  {/* TL;DR Section */}
                  <div className="mb-8 bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl p-6 mx-2">
                    <h2 className="text-lg font-semibold text-white mb-4">📝 TL;DR</h2>
                    <ul className="space-y-2">
                      {selectedArticle.tldr.map((point, index) => (
                        <li key={index} className="text-white/80 flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-invert prose-lg max-w-none px-2 pb-4">
                    <div 
                      className="text-white/80 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: selectedArticle.content
                          .split('\n')
                          .map(line => {
                            if (line.startsWith('# ')) {
                              const title = line.substring(2);
                              const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                              return `<h1 id="${id}" class="text-2xl font-bold text-white mt-6 mb-3 scroll-mt-6">${title}</h1>`;
                            } else if (line.startsWith('## ')) {
                              const title = line.substring(3);
                              const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                              return `<h2 id="${id}" class="text-xl font-semibold text-white mt-5 mb-2 scroll-mt-6">${title}</h2>`;
                            } else if (line.startsWith('### ')) {
                              const title = line.substring(4);
                              const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                              return `<h3 id="${id}" class="text-lg font-medium text-white mt-4 mb-2 scroll-mt-6">${title}</h3>`;
                            } else if (line.startsWith('- ')) {
                              return `<li class="text-white/70 ml-4">${line.substring(2)}</li>`;
                            } else if (line.trim() === '') {
                              return '<br>';
                            } else {
                              return `<p class="text-white/70 mb-3 leading-relaxed">${line}</p>`;
                            }
                          })
                          .join('')
                      }}
                    />
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