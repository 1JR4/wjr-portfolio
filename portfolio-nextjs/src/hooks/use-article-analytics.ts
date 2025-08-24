'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackArticleRead, trackScrollDepth, trackTimeOnPage, trackClick } from '@/lib/analytics';

interface UseArticleAnalyticsProps {
  articleTitle: string;
  readTime?: string;
  isOpen?: boolean;
}

export function useArticleAnalytics({ 
  articleTitle, 
  readTime, 
  isOpen = false 
}: UseArticleAnalyticsProps) {
  const startTimeRef = useRef<Date>();
  const scrollThresholds = useRef<Set<number>>(new Set());
  const hasTrackedRead = useRef(false);

  // Track article open
  useEffect(() => {
    if (!isOpen || hasTrackedRead.current) return;

    // Track article read event
    const readTimeMinutes = readTime ? parseInt(readTime.match(/\d+/)?.[0] || '5') : 5;
    trackArticleRead(articleTitle, readTimeMinutes);
    hasTrackedRead.current = true;

    // Start timing
    startTimeRef.current = new Date();

    console.log(`📖 Analytics: Article opened - ${articleTitle}`);
  }, [isOpen, articleTitle, readTime]);

  // Track time on page when closing
  useEffect(() => {
    return () => {
      if (startTimeRef.current && isOpen) {
        const timeSpent = Math.round((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
        if (timeSpent > 5) { // Only track if spent more than 5 seconds
          trackTimeOnPage(timeSpent, articleTitle);
          console.log(`⏱️ Analytics: Time spent - ${timeSpent}s on ${articleTitle}`);
        }
      }
    };
  }, [isOpen, articleTitle]);

  // Track scroll depth
  const trackScrollEvent = useCallback((scrollElement: HTMLElement | null) => {
    if (!scrollElement || !isOpen) return;

    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

    // Track at 25%, 50%, 75%, 100% thresholds
    const thresholds = [25, 50, 75, 100];
    for (const threshold of thresholds) {
      if (scrollPercent >= threshold && !scrollThresholds.current.has(threshold)) {
        scrollThresholds.current.add(threshold);
        trackScrollDepth(threshold, articleTitle);
        console.log(`📊 Analytics: Scroll depth ${threshold}% - ${articleTitle}`);
      }
    }
  }, [isOpen, articleTitle]);

  // Track social interactions
  const trackSocialClick = useCallback((action: 'like' | 'share') => {
    trackClick(`article_${action}`, articleTitle);
    console.log(`👍 Analytics: ${action} clicked - ${articleTitle}`);
  }, [articleTitle]);

  // Track related article clicks
  const trackRelatedClick = useCallback((relatedTitle: string) => {
    trackClick('related_article', relatedTitle);
    console.log(`🔗 Analytics: Related article clicked - ${relatedTitle}`);
  }, []);

  // Track external link clicks
  const trackExternalClick = useCallback((url: string, linkText: string) => {
    trackClick('external_link', url);
    console.log(`🌐 Analytics: External link clicked - ${linkText} (${url})`);
  }, []);

  // Reset tracking when article changes
  useEffect(() => {
    scrollThresholds.current.clear();
    hasTrackedRead.current = false;
    startTimeRef.current = undefined;
  }, [articleTitle]);

  return {
    trackScrollEvent,
    trackSocialClick,
    trackRelatedClick,
    trackExternalClick
  };
}

export default useArticleAnalytics;