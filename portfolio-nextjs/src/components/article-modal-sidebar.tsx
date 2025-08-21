import React, { useState } from "react";
import { Heart, Share2, FileText, Video, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

interface ArticleModalSidebarProps {
  tableOfContents: TableOfContentsItem[];
  resources: ArticleResource[];
  tags: string[];
  socialMetrics: SocialMetric;
  relatedArticles: {
    id: number;
    title: string;
    category: string;
    slug: string;
  }[];
  onTocClick: (id: string) => void;
  activeSection?: string;
  className?: string;
  isMobile?: boolean;
  onRelatedArticleClick?: (articleId: number) => void;
}

export function ArticleModalSidebar({
  tableOfContents,
  resources,
  tags,
  socialMetrics,
  relatedArticles,
  onTocClick,
  activeSection,
  className,
  isMobile = false,
  onRelatedArticleClick
}: ArticleModalSidebarProps) {
  const [isLiked, setIsLiked] = useState(false);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "pdf":
        return FileText;
      default:
        return ExternalLink;
    }
  };

  const getResourceEmoji = (type: string) => {
    switch (type) {
      case "video":
        return "🎥";
      case "pdf":
        return "📄";
      default:
        return "🔗";
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this article',
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Mobile: Combined engagement at top */}
      {isMobile && (
        <div className="flex gap-2 mb-4">
          <Button
            variant={isLiked ? "gradient" : "glass"}
            size="sm"
            className="flex-1 text-xs"
            onClick={handleLike}
          >
            <Heart className={cn("w-3 h-3 mr-1", isLiked && "fill-current")} />
            {isLiked ? socialMetrics.likes + 1 : socialMetrics.likes} Like
          </Button>
          <Button
            variant="glass"
            size="sm"
            className="flex-1 text-xs"
            onClick={handleShare}
          >
            <Share2 className="w-3 h-3 mr-1" />
            {socialMetrics.shares} Share
          </Button>
        </div>
      )}
      
      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">📋 Table of Contents</h3>
          <div className={cn(
            "bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-3",
            isMobile ? "max-h-[25vh]" : "max-h-[33vh]"
          )}>
            <nav className="space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTocClick(item.id)}
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
          </div>
        </div>
      )}

      {/* Desktop: Social Actions */}
      {!isMobile && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Engagement</h3>
          <div className="space-y-3">
            {/* Social Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 rounded-lg p-3 text-center border border-white/20">
                <div className="text-white font-semibold">{isLiked ? socialMetrics.likes + 1 : socialMetrics.likes}</div>
                <div className="text-white/70 text-xs">Likes</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 text-center border border-white/20">
                <div className="text-white font-semibold">{socialMetrics.shares}</div>
                <div className="text-white/70 text-xs">Shares</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant={isLiked ? "gradient" : "glass"}
                size="sm"
                className="flex-1"
                onClick={handleLike}
              >
                <Heart className={cn("w-4 h-4 mr-2", isLiked && "fill-current")} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="glass"
                size="sm"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Related Articles</h3>
          <div className="space-y-2">
            {relatedArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => onRelatedArticleClick?.(article.id)}
                className="w-full p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors border border-white/20 hover:border-white/30 text-left"
              >
                <div className="text-white/80 text-sm hover:text-white font-medium mb-1">
                  {article.title}
                </div>
                <Badge variant="glass" className="text-xs">
                  {article.category}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="glass" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Resources */}
      {resources.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <div className="space-y-2">
            {resources.map((resource, index) => {
              const IconComponent = getResourceIcon(resource.type);
              return (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
                >
                  <span className="text-lg">{getResourceEmoji(resource.type)}</span>
                  <div className="flex-1">
                    <span className="text-white/80 text-sm hover:text-white block">
                      {resource.title}
                    </span>
                  </div>
                  <IconComponent className="w-4 h-4 text-white/40" />
                </a>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}