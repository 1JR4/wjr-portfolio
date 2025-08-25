"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ExternalLink, Clock, X, Menu, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArticleModalSidebar } from "@/components/article-modal-sidebar";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS, BlogPost } from "@/lib/content";
import { useArticleAnalytics } from "@/hooks/use-article-analytics";
import { trackClick } from "@/lib/analytics";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
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
  relatedArticles: number[];
}

// Convert blog posts to article format
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

// Enhanced function to get TOC ID for a heading with better matching
const getTocId = (headingTitle: string, tableOfContents: TableOfContentsItem[]): string => {
  console.log(`Looking for TOC ID for heading: "${headingTitle}"`);
  
  // Strategy 1: Exact title match
  const exactMatch = tableOfContents.find(item => 
    item.title.toLowerCase() === headingTitle.toLowerCase()
  );
  if (exactMatch) {
    console.log(`✅ Exact match found: ${exactMatch.id}`);
    return exactMatch.id;
  }

  // Strategy 2: Clean title match (remove numbers, punctuation)
  const cleanHeading = headingTitle
    .replace(/^\d+\.\s*/, '') // Remove leading numbers like "1. "
    .replace(/[()]/g, '') // Remove parentheses
    .trim()
    .toLowerCase();
  
  console.log(`Clean heading: "${cleanHeading}"`);
  
  const cleanMatch = tableOfContents.find(item => {
    const cleanTocTitle = item.title
      .replace(/^\d+\.\s*/, '')
      .replace(/[()]/g, '')
      .trim()
      .toLowerCase();
    console.log(`  Comparing with TOC "${item.title}" -> "${cleanTocTitle}"`);
    return cleanTocTitle === cleanHeading;
  });
  if (cleanMatch) {
    console.log(`✅ Clean match found: ${cleanMatch.id}`);
    return cleanMatch.id;
  }

  // Strategy 3: Partial match using key words
  const keyWords = cleanHeading.split(/\s+/).filter(word => word.length > 3);
  console.log(`Key words: [${keyWords.join(', ')}]`);
  
  const partialMatch = tableOfContents.find(item => {
    const tocWords = item.title.toLowerCase().split(/\s+/);
    const hasMatch = keyWords.some(word => 
      tocWords.some(tocWord => tocWord.includes(word) || word.includes(tocWord))
    );
    if (hasMatch) console.log(`  Partial match candidate: ${item.title}`);
    return hasMatch;
  });
  if (partialMatch) {
    console.log(`✅ Partial match found: ${partialMatch.id}`);
    return partialMatch.id;
  }

  // Strategy 4: Fallback - generate ID from heading
  const fallbackId = headingTitle.toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  console.log(`⚠️ No match found, using fallback ID: ${fallbackId}`);
  return fallbackId;
};

export default function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileTab, setMobileTab] = useState<'toc' | 'tags' | 'resources' | 'related'>('toc');
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);

  // Analytics tracking
  const analytics = useArticleAnalytics({
    articleTitle: selectedArticle?.title || '',
    readTime: selectedArticle?.readTime,
    isOpen: isModalOpen
  });

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Track article card click
    trackClick('article_card', article.title);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    setActiveSection("");
    document.body.style.overflow = '';
  };

  const handleTocClick = (sectionId: string) => {
    console.log(`TOC click handler called with ID: ${sectionId}`);
    const element = document.getElementById(sectionId);
    console.log(`Element found:`, !!element, element);
    
    if (element) {
      if (isMobile) {
        // Mobile: regular scroll behavior
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Desktop: scroll within the content container
        const container = desktopContentRef.current;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const scrollTop = container.scrollTop + elementRect.top - containerRect.top - 20; // 20px offset
          
          console.log(`Desktop scroll: container scrollTop ${container.scrollTop} -> ${scrollTop}`);
          container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        } else {
          console.log('Desktop content container not found, using fallback');
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      setActiveSection(sectionId);
    } else {
      console.log(`⚠️ Element with ID "${sectionId}" not found in DOM`);
    }
  };

  // Scroll sync functionality
  useEffect(() => {
    const handleScroll = () => {
      const container = isMobile ? mobileContentRef.current : desktopContentRef.current;
      if (!container || !selectedArticle) return;

      const scrollTop = container.scrollTop;
      
      // Track scroll depth
      analytics?.trackScrollEvent(container);
      
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

    const container = isMobile ? mobileContentRef.current : desktopContentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [selectedArticle, isMobile]);

  // Set initial active section when modal opens
  useEffect(() => {
    if (selectedArticle && selectedArticle.tableOfContents.length > 0) {
      setActiveSection(selectedArticle.tableOfContents[0].id);
    }
  }, [selectedArticle]);

  const getRelatedArticles = (article: Article) => {
    const relatedByTags = articlesData
      .filter(a => a.id !== article.id)
      .map(a => ({
        article: a,
        sharedTags: a.tags.filter(tag => article.tags.includes(tag)).length
      }))
      .filter(item => item.sharedTags > 0)
      .sort((a, b) => b.sharedTags - a.sharedTags)
      .slice(0, 3);
    
    if (relatedByTags.length === 0) {
      const fallbackArticles = articlesData
        .filter(a => a.id !== article.id)
        .slice(0, 2)
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
      analytics?.trackRelatedClick(relatedArticle.title);
      openModal(relatedArticle);
    }
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
            All Articles
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore my thoughts on AI, product management, and technology innovation.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No articles found. Check console for debugging info.</p>
            </div>
          )}
          {console.log('Articles data length:', articlesData.length)}
          {articlesData.map((article) => (
            <motion.div
              key={article.id}
              className="group cursor-pointer"
              onClick={() => openModal(article)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 h-full">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-gray-600 dark:text-white/60 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors duration-300">
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Modal (same as before) */}
      {isModalOpen && selectedArticle && (
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

            {/* Mobile Layout: Stacked */}
            <div className="lg:hidden flex flex-col h-full rounded-2xl">
              {/* Mobile Main Content - 60% */}
              <div className="flex-[0.6] overflow-y-auto p-6" ref={mobileContentRef}>
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
                        __html: selectedArticle.content
                          .split('\n')
                          .map(line => {
                            if (line.startsWith('# ')) {
                              const title = line.substring(2).trim();
                              const id = getTocId(title, selectedArticle.tableOfContents);
                              return `<h1 id="${id}" class="text-2xl font-bold text-white mt-6 mb-3 scroll-mt-20">${title}</h1>`;
                            } else if (line.startsWith('## ')) {
                              const title = line.substring(3).trim();
                              const id = getTocId(title, selectedArticle.tableOfContents);
                              return `<h2 id="${id}" class="text-xl font-semibold text-white mt-5 mb-2 scroll-mt-20">${title}</h2>`;
                            } else if (line.startsWith('### ')) {
                              const title = line.substring(4).trim();
                              const id = getTocId(title, selectedArticle.tableOfContents);
                              return `<h3 id="${id}" class="text-lg font-medium text-white mt-4 mb-2 scroll-mt-20">${title}</h3>`;
                            } else if (line.startsWith('- ')) {
                              return `<li class="text-white/70 ml-4">${line.substring(2)}</li>`;
                            } else if (line.trim() === '') {
                              return '';
                            } else {
                              return `<p class="text-white/70 mb-1 leading-relaxed">${line}</p>`;
                            }
                          })
                          .join('')
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
                    onClick={() => analytics?.trackSocialClick('like')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black/30 hover:bg-black/40 rounded-lg text-white/80 hover:text-white transition-all text-sm"
                  >
                    <Heart className="w-4 h-4" />
                    {selectedArticle.socialMetrics.likes} Like
                  </button>
                  <button
                    onClick={() => analytics?.trackSocialClick('share')}
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
                          onClick={() => analytics?.trackExternalClick(resource.url, resource.title)}
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
              <div className="flex-1 overflow-y-auto p-8 rounded-r-2xl" ref={desktopContentRef}>
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
                              const title = line.substring(2).trim();
                              const id = getTocId(title, selectedArticle.tableOfContents);
                              return `<h1 id="${id}" class="text-2xl font-bold text-white mt-6 mb-3 scroll-mt-20">${title}</h1>`;
                            } else if (line.startsWith('## ')) {
                              const title = line.substring(3).trim();
                              const id = getTocId(title, selectedArticle.tableOfContents);
                              return `<h2 id="${id}" class="text-xl font-semibold text-white mt-5 mb-2 scroll-mt-20">${title}</h2>`;
                            } else if (line.startsWith('### ')) {
                              const title = line.substring(4).trim();
                              const id = getTocId(title, selectedArticle.tableOfContents);
                              return `<h3 id="${id}" class="text-lg font-medium text-white mt-4 mb-2 scroll-mt-20">${title}</h3>`;
                            } else if (line.startsWith('- ')) {
                              return `<li class="text-white/70 ml-4">${line.substring(2)}</li>`;
                            } else if (line.trim() === '') {
                              return '';
                            } else {
                              return `<p class="text-white/70 mb-1 leading-relaxed">${line}</p>`;
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
    </main>
  );
}