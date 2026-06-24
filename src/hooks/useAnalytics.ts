import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function getUTMParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const utm: Record<string, string> = {};
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

function saveUTMToStorage(utm: Record<string, string>) {
  if (Object.keys(utm).length === 0) return;
  try {
    localStorage.setItem('spectr_utm', JSON.stringify({ ...utm, timestamp: Date.now() }));
  } catch { /* noop */ }
}

function getStoredUTM(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem('spectr_utm');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

function trackScrollDepth() {
  let maxDepth = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handler = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const depth = Math.round((scrollTop / docHeight) * 100);
    if (depth > maxDepth) maxDepth = depth;

    for (const t of thresholds) {
      if (depth >= t && !tracked.has(t)) {
        tracked.add(t);
        trackEvent('scroll_depth', { depth: t });
      }
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}

function trackTimeOnPage() {
  const start = Date.now();
  const intervals = [10, 30, 60, 120, 300];
  const tracked = new Set<number>();

  const handler = () => {
    const seconds = Math.floor((Date.now() - start) / 1000);
    for (const t of intervals) {
      if (seconds >= t && !tracked.has(t)) {
        tracked.add(t);
        trackEvent('time_on_page', { seconds: t });
      }
    }
  };

  const id = setInterval(handler, 1000);
  return () => clearInterval(id);
}

function trackButtonClicks() {
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('a[href*="payform"], button');
    if (!btn) return;

    const text = (btn as HTMLElement).innerText?.trim() || 'unknown';
    const utm = getStoredUTM();
    trackEvent('cta_click', {
      button_text: text,
      utm_source: utm?.utm_source || 'direct',
      utm_medium: utm?.utm_medium || 'none',
      utm_campaign: utm?.utm_campaign || 'none',
    });
  };

  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}

function trackPageView() {
  trackEvent('page_view', {
    page_path: window.location.pathname,
    referrer: document.referrer || 'none',
  });
}

export function useAnalytics() {
  useEffect(() => {
    const utm = getUTMParams();
    saveUTMToStorage(utm);
    trackPageView();

    const cleanupScroll = trackScrollDepth();
    const cleanupTime = trackTimeOnPage();
    const cleanupClicks = trackButtonClicks();

    return () => {
      cleanupScroll();
      cleanupTime();
      cleanupClicks();
    };
  }, []);
}

export { getStoredUTM, trackEvent };
