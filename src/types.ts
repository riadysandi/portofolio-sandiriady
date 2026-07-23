export type Language = 'en' | 'id';

export interface Project {
  id: string;
  title: { en: string; id: string };
  description: { en: string; id: string };
  tags: string[];
  link?: string;
  demo?: string;
  icon: string;
}

export interface LiveSite {
  id: string;
  name: string;
  url: string;
  description: { en: string; id: string };
  status: 'active' | 'maintenance' | 'development';
}

export interface Skill {
  name: string;
  category: 'core' | 'automation' | 'infra' | 'tools';
  level: number; // 1 to 5
}

export interface Experience {
  id: string;
  period: string;
  title: { en: string; id: string };
  company: string;
  points: { en: string[]; id: string[] };
}

export interface Education {
  id: string;
  period: string;
  field: { en: string; id: string };
  institution: string;
}

export interface Organization {
  id: string;
  period: string;
  role: { en: string; id: string };
  organization: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface Translation {
  navAbout: string;
  navSkills: string;
  navExperience: string;
  navProjects: string;
  navLiveSites: string;
  navContact: string;
  aboutTitle: string;
  skillsTitle: string;
  experienceTitle: string;
  projectsTitle: string;
  liveSitesTitle: string;
  contactTitle: string;
  downloadButton: string;
  downloading: string;
  searchPlaceholder: string;
  sendButton: string;
  sending: string;
  successMessage: string;
  formName: string;
  formEmail: string;
  formMsg: string;
  heroSubtitle: string;
  educationTitle: string;
  orgTitle: string;
  hobbiesTitle: string;
  personalityTitle: string;
  langTitle: string;
  contactSubtitle: string;
  experienceSubtitle: string;
  projectsSubtitle: string;
  liveSitesSubtitle: string;
  messageHistory: string;
  noMessages: string;
  noResults: string;
}
