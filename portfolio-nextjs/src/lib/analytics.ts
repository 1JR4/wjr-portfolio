'use client';

import { analytics } from './firebase';
import { logEvent, setUserProperties, setUserId } from 'firebase/analytics';

// Analytics event types
type AnalyticsEvent = 
  | 'page_view'
  | 'article_read'
  | 'product_view'
  | 'cms_access'
  | 'contact_click'
  | 'social_click'
  | 'scroll_depth'
  | 'time_on_page'
  | 'search_term';

// Track page views
export const trackPageView = (page_title: string, page_location?: string) => {
  if (!analytics) return;
  
  logEvent(analytics, 'page_view', {
    page_title,
    page_location: page_location || window.location.href,
    page_referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString()
  });

  // Also track as custom event with more details
  logEvent(analytics, 'custom_page_view', {
    page: page_title,
    url: window.location.href,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    is_mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  });
};

// Track article engagement
export const trackArticleRead = (articleTitle: string, readingTime?: number) => {
  if (!analytics) return;
  
  logEvent(analytics, 'article_read', {
    article_title: articleTitle,
    reading_time_minutes: readingTime,
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct'
  });
};

// Track product views
export const trackProductView = (productName: string, category?: string, status?: string) => {
  if (!analytics) return;
  
  logEvent(analytics, 'product_view', {
    product_name: productName,
    product_category: category,
    product_status: status,
    timestamp: new Date().toISOString()
  });
};

// Track CMS access (admin panel)
export const trackCMSAccess = (action: string) => {
  if (!analytics) return;
  
  logEvent(analytics, 'cms_access', {
    cms_action: action,
    timestamp: new Date().toISOString(),
    user_type: 'admin'
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number, page: string) => {
  if (!analytics) return;
  
  logEvent(analytics, 'scroll_depth', {
    scroll_depth: depth,
    page_title: page,
    timestamp: new Date().toISOString()
  });
};

// Track time spent on page
export const trackTimeOnPage = (timeInSeconds: number, page: string) => {
  if (!analytics) return;
  
  logEvent(analytics, 'time_on_page', {
    time_seconds: timeInSeconds,
    time_minutes: Math.round(timeInSeconds / 60 * 100) / 100,
    page_title: page,
    timestamp: new Date().toISOString()
  });
};

// Track contact/social clicks
export const trackClick = (element: string, destination?: string) => {
  if (!analytics) return;
  
  logEvent(analytics, 'click', {
    click_element: element,
    click_destination: destination,
    page_location: window.location.href,
    timestamp: new Date().toISOString()
  });
};

// Track search terms (if you add search functionality)
export const trackSearch = (searchTerm: string, results?: number) => {
  if (!analytics) return;
  
  logEvent(analytics, 'search', {
    search_term: searchTerm,
    search_results: results,
    timestamp: new Date().toISOString()
  });
};

// Set user properties (for segmentation)
export const setUserProperty = (property: string, value: string) => {
  if (!analytics) return;
  
  setUserProperties(analytics, {
    [property]: value
  });
};

// Enhanced bot detection
export const isLikelyBot = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const botPatterns = [
    /bot|crawler|spider|crawling/i,
    /google|bing|yahoo|baidu|duckduckbot/i,
    /facebook|twitter|linkedin|pinterest/i,
    /headless|phantom|selenium|webdriver/i
  ];
  
  const userAgent = navigator.userAgent;
  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  
  // Additional bot signals
  const hasWebDriver = 'webdriver' in navigator;
  const hasHeadless = /headless/i.test(userAgent);
  const hasFakeScreen = screen.width === 0 || screen.height === 0;
  
  return isBot || hasWebDriver || hasHeadless || hasFakeScreen;
};

// Initialize analytics with bot detection
export const initAnalytics = () => {
  if (!analytics || typeof window === 'undefined') return;
  
  // Don't track if likely bot
  if (isLikelyBot()) {
    console.log('Bot detected, skipping analytics');
    return;
  }
  
  // Set initial user properties
  setUserProperty('visit_timestamp', new Date().toISOString());
  setUserProperty('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
  setUserProperty('language', navigator.language);
  setUserProperty('platform', navigator.platform);
  
  // Track initial page view
  trackPageView(document.title);
  
  console.log('Firebase Analytics initialized');
};

// Hook for tracking page changes in Next.js
export const useAnalytics = () => {
  if (typeof window === 'undefined') return null;
  
  return {
    trackPageView,
    trackArticleRead,
    trackProductView,
    trackCMSAccess,
    trackScrollDepth,
    trackTimeOnPage,
    trackClick,
    trackSearch,
    isBot: isLikelyBot()
  };
};

// Helper to get geographic info (from browser)
export const getGeographicInfo = () => {
  if (typeof window === 'undefined') return null;
  
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    languages: navigator.languages,
    platform: navigator.platform
  };
};

export default {
  trackPageView,
  trackArticleRead,
  trackProductView,
  trackCMSAccess,
  trackScrollDepth,
  trackTimeOnPage,
  trackClick,
  trackSearch,
  initAnalytics,
  isLikelyBot,
  useAnalytics
};