import { supabase } from './supabase';

// Types matching the JSONB structure in Supabase
interface SiteData {
  personal_info: {
    name: string;
    title: string;
    contacts: {
      whatsapp: string;
      email: string;
      instagram: string;
      twitter: string;
      facebook: string;
    };
    aboutMe: { en: string; id: string };
  };
  skills: { name: string; category: string; level: number }[];
  experiences: {
    id: string;
    period: string;
    title: { en: string; id: string };
    company: string;
    points: { en: string[]; id: string[] };
  }[];
  education: {
    id: string;
    period: string;
    field: { en: string; id: string };
    institution: string;
  }[];
  organizations: {
    id: string;
    period: string;
    role: { en: string; id: string };
    organization: string;
  }[];
  projects: {
    id: string;
    title: { en: string; id: string };
    description: { en: string; id: string };
    tags: string[];
    icon: string;
    link?: string;
    demo?: string;
  }[];
  personality: { en: string[]; id: string[] };
  hobbies: { en: { name: string; icon: string }[]; id: { name: string; icon: string }[] };
  languages: { en: { name: string; level: string }[]; id: { name: string; level: string }[] };
  live_projects?: {
    id: string;
    name: string;
    url: string;
    description: { en: string; id: string };
    status: 'active' | 'maintenance' | 'development';
  }[];
}

// Fetch all site data from Supabase
export async function fetchSiteData(): Promise<SiteData | null> {
  try {
    const { data, error } = await supabase
      .from('site_data')
      .select('*')
      .eq('id', 'main')
      .single();

    if (error) {
      console.warn('Supabase fetch failed, falling back to static data:', error.message);
      return null;
    }

    return data as SiteData;
  } catch (err) {
    console.warn('Supabase connection failed, falling back to static data:', err);
    return null;
  }
}

// Send a contact message to Supabase
export async function sendContactMessage(name: string, email: string, message: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }]);

    return !error;
  } catch {
    return false;
  }
}

export type { SiteData };
