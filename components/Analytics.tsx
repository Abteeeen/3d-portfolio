'use client';

import { useEffect } from 'react';

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Google Analytics Component
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics ID
export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return;

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId);

    return () => {
      // Cleanup if needed
      const scripts = document.querySelectorAll(`script[src*="${gaId}"]`);
      scripts.forEach(script => script.remove());
    };
  }, [gaId]);

  return null;
}

// Vercel Analytics (if using Vercel)
export function VercelAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Vercel Analytics is automatically injected in production
    // This is just a placeholder component
    console.log('Vercel Analytics ready');
  }, []);

  return null;
}

// Simple page view tracker (custom analytics)
export function usePageView(page?: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Track page view
    const pageName = page || window.location.pathname;
    console.log('Page view:', pageName);
    
    // You can send this to your own analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ page: pageName, timestamp: new Date().toISOString() })
    // });
  }, [page]);
}

