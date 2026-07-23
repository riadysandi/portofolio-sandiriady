import { supabase } from './supabase';

// Generate or retrieve a unique visitor ID
function getVisitorId(): string {
  const key = 'sr_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

// Track a page view (called once on each page load)
export async function trackPageView() {
  try {
    const visitorId = getVisitorId();
    
    // Prevent duplicate tracking within 30 seconds
    const lastTrack = sessionStorage.getItem('sr_last_track');
    if (lastTrack && Date.now() - parseInt(lastTrack) < 30000) return;
    sessionStorage.setItem('sr_last_track', Date.now().toString());

    await supabase.from('page_views').insert([{
      visitor_id: visitorId,
      path: window.location.pathname + window.location.hash,
      referrer: document.referrer || '',
      user_agent: navigator.userAgent,
    }]);
  } catch {
    // Silently fail - analytics should never break the site
  }
}

// Analytics query helpers (for admin dashboard)
export interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  dailyViews: { date: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  recentVisitors: { visitor_id: string; path: string; created_at: string; user_agent: string }[];
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).toISOString();

  // Fetch all views from last 30 days for analysis
  const { data: allViews } = await supabase
    .from('page_views')
    .select('*')
    .gte('created_at', monthStart)
    .order('created_at', { ascending: false });

  const views = allViews || [];

  // Total all-time views
  const { count: totalViews } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true });

  // Unique all-time visitors
  const { data: uniqueData } = await supabase
    .from('page_views')
    .select('visitor_id');
  const uniqueVisitors = new Set((uniqueData || []).map(v => v.visitor_id)).size;

  // Views today
  const viewsToday = views.filter(v => v.created_at >= todayStart).length;

  // Views this week
  const viewsThisWeek = views.filter(v => v.created_at >= weekStart).length;

  // Views this month
  const viewsThisMonth = views.length;

  // Daily views for chart (last 14 days)
  const dailyMap = new Map<string, number>();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = d.toISOString().split('T')[0];
    dailyMap.set(key, 0);
  }
  views.forEach(v => {
    const key = v.created_at.split('T')[0];
    if (dailyMap.has(key)) dailyMap.set(key, (dailyMap.get(key) || 0) + 1);
  });
  const dailyViews = Array.from(dailyMap.entries()).map(([date, views]) => ({ date, views }));

  // Top referrers
  const refMap = new Map<string, number>();
  views.forEach(v => {
    const ref = v.referrer || 'Direct';
    try {
      const host = ref === 'Direct' ? 'Direct' : new URL(ref).hostname;
      refMap.set(host, (refMap.get(host) || 0) + 1);
    } catch {
      refMap.set(ref || 'Direct', (refMap.get(ref || 'Direct') || 0) + 1);
    }
  });
  const topReferrers = Array.from(refMap.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Recent visitors (last 10)
  const recentVisitors = views.slice(0, 10).map(v => ({
    visitor_id: v.visitor_id,
    path: v.path,
    created_at: v.created_at,
    user_agent: v.user_agent,
  }));

  return {
    totalViews: totalViews || 0,
    uniqueVisitors,
    viewsToday,
    viewsThisWeek,
    viewsThisMonth,
    dailyViews,
    topReferrers,
    recentVisitors,
  };
}
