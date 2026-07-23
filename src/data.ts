import { Project, Skill, Experience, Education, Organization, Translation, LiveSite } from './types';

export const PERSONAL_INFO = {
  name: 'Sandi Riady',
  title: 'Management Information System',
  profileImage: new URL('../assets/sandiriady.jpg', import.meta.url).href, // user uploaded profile photo
  contacts: {
    whatsapp: '+6285884926880',
    email: 'riadysandi@gmail.com',
    instagram: '@sandiriady',
    twitter: '@sandi_riady',
    facebook: 'sandi riady',
  },
  aboutMe: {
    en: 'IT Infrastructure Support with hands-on experience in daily endpoint & server ops, basic network, mail ops (Zimbra), helpdesk/ticketing, and open-source automation. Comfortable with Linux & Docker deployments, Frappe/ERPNext administration, asset monitoring workflows, and multi-level approvals. Focus is efficient solutions, clean documentation, and responsive support for business users.',
    id: 'Dukungan Infrastruktur TI dengan pengalaman langsung dalam operasional endpoint & server harian, jaringan dasar, operasional email (Zimbra), helpdesk/tiketing, dan otomatisasi sumber terbuka. Nyaman dengan penerapan Linux & Docker, administrasi Frappe/ERPNext, alur kerja pemantauan aset, dan persetujuan multi-level. Fokus saya adalah solusi yang efisien, dokumentasi rapi, dan layanan responsif bagi user bisnis.'
  }
};

export const TRANSLATIONS: Record<'en' | 'id', Translation> = {
  en: {
    navAbout: 'About',
    navSkills: 'Skills',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navLiveSites: 'Live Sites',
    navContact: 'Contact',
    aboutTitle: 'About Me',
    skillsTitle: 'Core Capabilities',
    experienceTitle: 'Professional Experience',
    projectsTitle: 'Featured Projects',
    liveSitesTitle: 'Live Web Projects',
    contactTitle: 'Get in Touch',
    downloadButton: 'Download CV PDF',
    downloading: 'Generating PDF...',
    searchPlaceholder: 'Search skills, projects, experience...',
    sendButton: 'Send Message',
    sending: 'Sending...',
    successMessage: 'Message sent successfully! Thank you.',
    formName: 'Your Name',
    formEmail: 'Your Email',
    formMsg: 'Message',
    heroSubtitle: 'IT Infrastructure Support & Open-Source Automation Specialist',
    educationTitle: 'Education',
    orgTitle: 'Organizational Activity',
    hobbiesTitle: 'Hobbies & Interests',
    personalityTitle: 'Personal Strengths',
    langTitle: 'Languages',
    contactSubtitle: 'Have a project or job opportunity? Send me a direct message or connect on social media.',
    experienceSubtitle: 'Chronology of my professional career, technical operations, and achievements.',
    projectsSubtitle: 'Implementation gallery showcasing technical workflows, scripts, and automation engines.',
    liveSitesSubtitle: 'Active domains and web applications currently running in production.',
    messageHistory: 'Message Inbox (Simulation)',
    noMessages: 'No messages sent yet. Use the contact form to write something!',
    noResults: 'No results found matching your search query.',
  },
  id: {
    navAbout: 'Tentang',
    navSkills: 'Keahlian',
    navExperience: 'Pengalaman',
    navProjects: 'Proyek',
    navLiveSites: 'Web Aktif',
    navContact: 'Kontak',
    aboutTitle: 'Tentang Saya',
    skillsTitle: 'Keahlian Utama',
    experienceTitle: 'Pengalaman Profesional',
    projectsTitle: 'Galeri Proyek',
    liveSitesTitle: 'Proyek Web Aktif',
    contactTitle: 'Hubungi Saya',
    downloadButton: 'Unduh CV PDF',
    downloading: 'Membuat PDF...',
    searchPlaceholder: 'Cari keahlian, proyek, pengalaman...',
    sendButton: 'Kirim Pesan',
    sending: 'Mengirim...',
    successMessage: 'Pesan berhasil dikirim! Terima kasih.',
    formName: 'Nama Anda',
    formEmail: 'Email Anda',
    formMsg: 'Isi Pesan',
    heroSubtitle: 'Spesialis Dukungan Infrastruktur TI & Otomatisasi Sumber Terbuka',
    educationTitle: 'Pendidikan',
    orgTitle: 'Aktivitas Organisasi',
    hobbiesTitle: 'Hobi & Minat',
    personalityTitle: 'Karakter & Kepribadian',
    langTitle: 'Bahasa',
    contactSubtitle: 'Punya proyek atau peluang kerja? Kirim pesan langsung atau hubungi via media sosial.',
    experienceSubtitle: 'Kronologi perjalanan karier profesional, operasional teknis, dan pencapaian saya.',
    projectsSubtitle: 'Galeri implementasi yang menampilkan alur kerja teknis, skrip, dan sistem otomatisasi.',
    liveSitesSubtitle: 'Domain aktif dan aplikasi web yang saat ini berjalan di tahap produksi.',
    messageHistory: 'Kotak Masuk Pesan (Simulasi)',
    noMessages: 'Belum ada pesan yang dikirim. Gunakan formulir di atas untuk menulis sesuatu!',
    noResults: 'Tidak ada hasil yang cocok dengan pencarian Anda.',
  },
};

export const SKILLS: Skill[] = [
  { name: 'Linux Server', category: 'core', level: 5 },
  { name: 'Docker', category: 'core', level: 5 },
  { name: 'Frappe / ERPNext', category: 'core', level: 4 },
  { name: 'Network Basic Ops', category: 'infra', level: 4 },
  { name: 'Automation (n8n, Postman)', category: 'automation', level: 5 },
  { name: 'Zimbra Admin', category: 'infra', level: 4 },
  { name: 'Bash Scripting', category: 'automation', level: 4 },
  { name: 'GLPI Helpdesk', category: 'tools', level: 5 },
  { name: 'Device Policy (Android/Win)', category: 'tools', level: 4 },
  { name: 'Git Version Control', category: 'tools', level: 4 },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    period: '2024 - PRESENT',
    title: {
      en: 'IT INFRASTRUCTURE SPECIALIST',
      id: 'SPESIALIS INFRASTRUKTUR TI',
    },
    company: 'IT INFRA SERVICES',
    points: {
      en: [
        'Manage helpdesk & ticketing; implement multi-level approvals for asset disposal.',
        'Deploy & administer Linux, Docker, and Frappe/ERPNext with integrated Helpdesk workflows.',
        'Evaluate & implement open-source stacks: GLPI, Rocket.Chat, Raven, n8n, Flyve MDM, Dashy.',
        'Operate Zimbra mail, monitor IT assets, and support device policy for Android/Windows.',
        'Automate daily ops and maintain clear SOP/documentation for the team.'
      ],
      id: [
        'Mengelola helpdesk & tiketing; menerapkan alur persetujuan multi-level untuk pembuangan aset.',
        'Mendeploy & mengadministrasi server Linux, Docker, dan Frappe/ERPNext terintegrasi dengan alur helpdesk.',
        'Mengevaluasi & mengimplementasikan stack open-source: GLPI, Rocket.Chat, Raven, n8n, Flyve MDM, Dashy.',
        'Mengoperasikan email Zimbra, memonitor aset TI, dan mendukung kebijakan perangkat untuk Android/Windows.',
        'Mengotomatiskan operasional harian dan memelihara dokumentasi SOP yang jelas untuk tim.'
      ],
    },
  },
  {
    id: 'exp2',
    period: '2022 - 2024',
    title: {
      en: 'RESTAURANT MANAGER',
      id: 'MANAJER RESTORAN',
    },
    company: 'RESTAURANT OPERATION GROUP',
    points: {
      en: [
        'Supervised daily operations to ensure process consistency & service quality.',
        'Trained staff & ensured schedules aligned with operational requirements.',
        'Handled customer issues & performed service quality evaluations for improvement.',
        'Prepared operational reports & monitored store performance metrics.',
        'Standardized restaurant operational procedures and compiled daily logs.'
      ],
      id: [
        'Mengawasi operasional harian untuk memastikan konsistensi proses dan kualitas layanan.',
        'Melatih staf & memastikan jadwal kerja selaras dengan persyaratan operasional.',
        'Menangani masalah pelanggan & melakukan evaluasi kualitas layanan untuk perbaikan.',
        'Menyusun laporan operasional & memantau metrik kinerja toko.',
        'Menstandarisasi prosedur operasional restoran dan menyusun catatan harian.'
      ],
    },
  },
];

export const EDUCATION: Education[] = [
  {
    id: 'edu1',
    period: '2018 - 2022',
    field: {
      en: 'Management Information Systems',
      id: 'Sistem Informasi Manajemen',
    },
    institution: 'UNIVERSITAS RAHARJA',
  },
];

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org1',
    period: '2019 - 2022',
    role: {
      en: 'Head of Department 4 KOMASI (HMJ)',
      id: 'Kepala Departemen 4 KOMASI (HMJ)',
    },
    organization: 'UNIVERSITAS RAHARJA',
  },
  {
    id: 'org2',
    period: '2015 - 2018',
    role: {
      en: 'Secretary of FORMA (Mosque Youth Forum)',
      id: 'Sekretaris FORMA (Forum Remaja Masjid Ar-Rahmah)',
    },
    organization: 'FORUM REMAJA MASJID AR-RAHMAH',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: {
      en: 'Helpdesk Ticket Automation Engine',
      id: 'Sistem Otomatisasi Tiket Helpdesk',
    },
    description: {
      en: 'Integrated GLPI ticketing with n8n and Rocket.Chat to automate support notifications, decreasing critical issue response times by 40%.',
      id: 'Mengintegrasikan tiket GLPI dengan n8n dan Rocket.Chat untuk mengotomatiskan notifikasi dukungan, mempercepat waktu respons hingga 40%.',
    },
    tags: ['n8n', 'GLPI', 'Rocket.Chat', 'Docker', 'Automation'],
    icon: 'Cpu',
  },
  {
    id: 'proj2',
    title: {
      en: 'ERPNext Enterprise Deployments',
      id: 'Penerapan ERPNext Skala Perusahaan',
    },
    description: {
      en: 'Containerized Frappe/ERPNext infrastructure with customized asset tracking modules, database backups, and hierarchical approval layers.',
      id: 'Infrastruktur kontainerisasi Frappe/ERPNext dengan modul pelacakan aset khusus, cadangan basis data, dan persetujuan bertingkat.',
    },
    tags: ['ERPNext', 'Frappe', 'Docker', 'PostgreSQL', 'Linux'],
    icon: 'Database',
  },
  {
    id: 'proj3',
    title: {
      en: 'Corporate Zimbra Mail Server',
      id: 'Server Email Korporat Zimbra',
    },
    description: {
      en: 'Engineered a highly resilient mail server for 500+ corporate users featuring customized spam filtering, active directory syncing, and SPF/DKIM verification.',
      id: 'Membangun server email tangguh untuk 500+ pengguna dengan penyaringan spam, sinkronisasi direktori aktif, dan verifikasi SPF/DKIM.',
    },
    tags: ['Zimbra Admin', 'Linux Server', 'DKIM/SPF', 'Mail Ops'],
    icon: 'Mail',
  },
  {
    id: 'proj4',
    title: {
      en: 'IT Asset Dashy & Flyve Hub',
      id: 'Dasbor Aset TI & Hub Flyve',
    },
    description: {
      en: 'Created a centralized dashboard using Dashy unified with Flyve MDM for tracking, hardware profiling, and remote policy enforcement on corporate endpoints.',
      id: 'Membuat dasbor terpusat menggunakan Dashy yang terpadu dengan Flyve MDM untuk pelacakan, profil perangkat keras, dan kebijakan jarak jauh.',
    },
    tags: ['Dashy', 'Flyve MDM', 'Asset Tracking', 'Device Policy'],
    icon: 'LayoutDashboard',
  },
  {
    id: 'proj5',
    title: {
      en: 'Linux Network Basic Ops Monitor',
      id: 'Pemantau Jaringan Dasar Linux',
    },
    description: {
      en: 'Designed an automated suite using bash scripts and Postman api polling to perform routing checks, connectivity verification, and alert triggers.',
      id: 'Merancang rangkaian otomatis menggunakan skrip bash dan jajak pendapat api Postman untuk pemeriksaan rute, verifikasi konektivitas, dan pemicu alarm.',
    },
    tags: ['Postman API', 'Network Ops', 'Bash Script', 'Syslog'],
    icon: 'Network',
  },
];

export const PERSONALITY: Record<'en' | 'id', string[]> = {
  en: ['On-time Delivery', 'Optimistic Mindset', 'Highly Adaptable', 'Socially Active', 'Fast Learner'],
  id: ['Tepat Waktu', 'Optimis', 'Cepat Beradaptasi', 'Gampang Berbaur', 'Cepat Belajar'],
};

export const HOBBIES: Record<'en' | 'id', { name: string; icon: string }[]> = {
  en: [
    { name: 'Playing Guitar', icon: 'Music' },
    { name: 'Exercising', icon: 'Dumbbell' },
    { name: 'Traveling', icon: 'Compass' },
  ],
  id: [
    { name: 'Bermain Gitar', icon: 'Music' },
    { name: 'Berolahraga', icon: 'Dumbbell' },
    { name: 'Liburan', icon: 'Compass' },
  ],
};

export const LANGUAGES: Record<'en' | 'id', { name: string; level: string }[]> = {
  en: [
    { name: 'Indonesian', level: 'Native / Active' },
    { name: 'English', level: 'Conversational / Passive' },
  ],
  id: [
    { name: 'Indonesia', level: 'Asli / Aktif' },
    { name: 'Inggris', level: 'Konversasional / Pasif' },
  ],
};

export const LIVE_SITES: LiveSite[] = [
  {
    id: 'site1',
    name: 'Portfolio Sandbox',
    url: 'https://riadysandi.github.io/portofolio-sandiriady/',
    description: {
      en: 'My personal portfolio and sandbox environment for experimenting with React, Vite, and modern web technologies.',
      id: 'Portofolio pribadi dan lingkungan sandbox saya untuk bereksperimen dengan React, Vite, dan teknologi web modern.'
    },
    status: 'active'
  }
];
