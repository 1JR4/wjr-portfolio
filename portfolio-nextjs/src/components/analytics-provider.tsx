'use client';

import { useEffect } from 'react';
import { initAnalytics, trackPageView, isLikelyBot } from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    // Skip if bot detected
    if (isLikelyBot()) {
      console.log('Bot detected, analytics disabled');
      return;
    }

    // Initialize Firebase Analytics
    initAnalytics();
  }, []);

  // Track page changes
  useEffect(() => {
    if (isLikelyBot()) return;

    // Get page title based on path
    const getPageTitle = (path: string) => {
      switch (path) {
        case '/': return 'Home - Wonjae Ra';
        case '/articles': return 'Articles - Wonjae Ra';
        case '/products': return 'Products - Wonjae Ra';
        case '/admin': return 'CMS Admin - Content Manager';
        default: return `${path.replace('/', '')} - Wonjae Ra`;
      }
    };

    const pageTitle = getPageTitle(pathname);
    
    // Track page view with delay to ensure proper initialization
    const timeoutId = setTimeout(() => {
      trackPageView(pageTitle, `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export default AnalyticsProvider;