"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Clock, X, Menu, Heart, Share2 } from "lucide-react";
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

// Convert markdown content to HTML with proper TOC IDs from JSON
const renderMarkdownWithTocIds = (content: string, tableOfContents: TableOfContentsItem[]): string => {
  const lines = content.split('\n');
  const tocTitleToId = new Map(
    tableOfContents.map(item => [item.title.toLowerCase(), item.id])
  );
  
  console.log('Homepage TOC Title-to-ID mapping:', Array.from(tocTitleToId.entries()));
  
  return lines.map(line => {
    if (line.startsWith('# ')) {
      const title = line.substring(2).trim();
      const id = tocTitleToId.get(title.toLowerCase()) || 
        title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      console.log(`Homepage H1: "${title}" -> ID: "${id}"`);
      return `<h1 id="${id}" class="text-3xl font-bold text-white mt-8 mb-4 scroll-mt-20">${title}</h1>`;
    } else if (line.startsWith('## ')) {
      const title = line.substring(3).trim();
      const id = tocTitleToId.get(title.toLowerCase()) || 
        title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      console.log(`Homepage H2: "${title}" -> ID: "${id}"`);
      return `<h2 id="${id}" class="text-2xl font-bold text-white mt-6 mb-3 scroll-mt-20">${title}</h2>`;
    } else if (line.startsWith('### ')) {
      const title = line.substring(4).trim();
      const id = tocTitleToId.get(title.toLowerCase()) || 
        title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      console.log(`Homepage H3: "${title}" -> ID: "${id}"`);
      return `<h3 id="${id}" class="text-xl font-semibold text-white mt-5 mb-2 scroll-mt-20">${title}</h3>`;
    } else if (line.startsWith('#### ')) {
      const title = line.substring(5).trim();
      const id = tocTitleToId.get(title.toLowerCase()) || 
        title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return `<h4 id="${id}" class="text-lg font-semibold text-white mt-4 mb-2 scroll-mt-20">${title}</h4>`;
    } else if (line.startsWith('```')) {
      return line.includes('python') ? '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-green-400">' :
             line.includes('yaml') ? '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-blue-400">' :
             line.includes('javascript') ? '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-yellow-400">' :
             line.includes('sql') ? '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-purple-400">' :
             line.includes('bash') ? '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-gray-300">' :
             line === '```' ? '</code></pre>' :
             '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-gray-300">';
    } else if (line.startsWith('**') && line.endsWith('**')) {
      const text = line.substring(2, line.length - 2);
      return `<p class="font-bold text-white mt-4 mb-2">${text}</p>`;
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      const text = line.substring(1, line.length - 1);
      return `<p class="italic text-white/80 text-center mb-4">${text}</p>`;
    } else if (line.startsWith('- ')) {
      const text = line.substring(2);
      return `<li class="text-white/80 mb-1">${text}</li>`;
    } else if (line.trim() === '') {
      return '<br>';
    } else {
      // Regular paragraph
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-blue-400">$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-green-400 px-2 py-1 rounded">$1</code>');
      
      return `<p class="text-white/80 leading-relaxed mb-4">${processedLine}</p>`;
    }
  }).join('\n');
};

export function ArticlesSection({ className }: ArticlesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileTab, setMobileTab] = useState<'toc' | 'tags' | 'resources' | 'related'>('toc');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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
    console.log(`Homepage TOC click handler called with ID: ${sectionId}`);
    const element = document.getElementById(sectionId);
    console.log(`Homepage element found:`, !!element, element);
    
    if (element) {
      if (isMobile) {
        // Mobile: regular scroll behavior
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Desktop: scroll within the content container
        const container = contentRef.current;
        if (container) {
          // Find the element's position relative to the scrollable content
          let offsetTop = 0;
          let currentElement = element;
          
          // Calculate cumulative offsetTop until we reach the container
          while (currentElement && currentElement !== container) {
            offsetTop += currentElement.offsetTop;
            currentElement = currentElement.offsetParent as HTMLElement;
          }
          
          const targetScrollTop = offsetTop - 20; // 20px offset for better visibility
          
          console.log(`Homepage desktop scroll: element offsetTop: ${offsetTop}, scrolling to: ${targetScrollTop}`);
          console.log(`Homepage container current scrollTop: ${container.scrollTop}`);
          
          container.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
          });
        } else {
          console.log('Homepage desktop content container not found, using fallback');
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      setActiveSection(sectionId);
    } else {
      console.log(`⚠️ Homepage element with ID "${sectionId}" not found in DOM`);
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
  
  const handleRelatedArticleClick = (articleId: number) => {
    const relatedArticle = articlesData.find(a => a.id === articleId);
    if (relatedArticle) {
      openModal(relatedArticle);
    }
  };

  const visibleArticles = articlesData;

  return (
    <>
      <section id="articles" className={cn("relative pt-10 pb-20 px-4", className)}>
        
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

            {/* Desktop Carousel Controls */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="hidden lg:flex gap-2 items-center"
            >
              <a
                href="/articles"
                className="px-4 py-2 bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-full text-gray-700 dark:text-white transition-all duration-300 hover:bg-black/20 dark:hover:bg-white/20 text-sm font-medium"
              >
                View All
              </a>
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

          {/* Mobile View All Button */}
          <div className="lg:hidden mb-6">
            <a
              href="/articles"
              className="inline-flex items-center px-4 py-2 bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-full text-gray-700 dark:text-white transition-all duration-300 hover:bg-black/20 dark:hover:bg-white/20 text-sm font-medium"
            >
              View All Articles
            </a>
          </div>

          {/* Articles Carousel */}
          <div className="relative">
            {/* Mobile: Scrollable */}
            <div className="lg:hidden -mx-4 px-4">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-4">
                  {visibleArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      className="flex-shrink-0 w-[85%] md:w-[45%] group cursor-pointer snap-start"
                      onClick={() => openModal(article)}
                    >
                      <div className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl p-4 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:translate-y-[-8px] h-full overflow-hidden">
                        <div className="relative z-10">
                          {/* Article Content */}
                          <div className="p-2">
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
              </div>
            </div>
            
            {/* Desktop: Controlled carousel */}
            <div className="hidden lg:block overflow-x-hidden py-2">
              <div 
                className="flex gap-6 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
              >
            {visibleArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="flex-shrink-0 w-full lg:w-[calc(33.333%-16px)] group cursor-pointer"
                  onClick={() => openModal(article)}
              >
                <div className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl p-4 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:translate-y-[-8px] h-full overflow-hidden">
                  
                  <div className="relative z-10">
                    {/* Article Content */}
                    <div className="p-2">
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
            </div>
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
              {/* Mobile Main Content - 60% */}
              <div className="flex-[0.6] overflow-y-auto p-6" ref={contentRef}>
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

                  {/* Mobile: No TOC in upper section - moved to bottom */}

                  {/* TL;DR Section */}
                  <div className="mb-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl p-6">
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
                        __html: renderMarkdownWithTocIds(selectedArticle.content, selectedArticle.tableOfContents)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile - Tabbed lower section - 40% */}
              <div className="flex-[0.4] flex flex-col bg-black/20 backdrop-blur-sm border-t border-white/20 min-h-0">
                {/* Combined engagement at top */}
                <div className="flex gap-2 p-4 pb-2">
                  <button
                    onClick={() => {}}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black/30 hover:bg-black/40 rounded-lg text-white/80 hover:text-white transition-all text-sm"
                  >
                    <Heart className="w-4 h-4" />
                    {selectedArticle.socialMetrics.likes} Like
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black/30 hover:bg-black/40 rounded-lg text-white/80 hover:text-white transition-all text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    {selectedArticle.socialMetrics.shares} Share
                  </button>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-white/20 px-4">
                  {[
                    { id: 'toc', label: 'Contents' },
                    { id: 'tags', label: 'Tags' },
                    { id: 'resources', label: 'Resources' },
                    { id: 'related', label: 'Related' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setMobileTab(tab.id as any)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-all border-b-2",
                        mobileTab === tab.id
                          ? "text-white border-blue-400"
                          : "text-white/60 border-transparent hover:text-white/80"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Tab Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4">
                  {mobileTab === 'toc' && (
                    <nav className="space-y-1">
                      {selectedArticle.tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleTocClick(item.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                            "hover:bg-white/10 hover:text-white",
                            item.level === 1 && "font-medium text-white",
                            item.level === 2 && "pl-6 text-white/70",
                            item.level === 3 && "pl-9 text-white/60",
                            activeSection === item.id && "bg-blue-500/20 text-blue-400 border-l-2 border-blue-400"
                          )}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  )}
                  
                  {mobileTab === 'tags' && (
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {mobileTab === 'resources' && (
                    <div className="space-y-2">
                      {selectedArticle.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
                        >
                          <ExternalLink className="w-4 h-4 text-white/60" />
                          <span className="text-white/80 text-sm">{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {mobileTab === 'related' && (
                    <div className="space-y-2">
                      {getRelatedArticles(selectedArticle).map((article) => (
                        <button
                          key={article.id}
                          onClick={() => handleRelatedArticleClick(article.id)}
                          className="w-full p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors border border-white/20 hover:border-white/30 text-left"
                        >
                          <div className="text-white/80 text-sm hover:text-white font-medium mb-1">
                            {article.title}
                          </div>
                          <span className="px-2 py-1 bg-white/10 text-white/60 rounded-full text-xs">
                            {article.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                    isMobile={false}
                    onRelatedArticleClick={handleRelatedArticleClick}
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
                        __html: renderMarkdownWithTocIds(selectedArticle.content, selectedArticle.tableOfContents)
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