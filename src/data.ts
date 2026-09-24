import { Project, Skill, Experience, Education, Organization, Translation, LiveSite } from './types';

export const PERSONAL_INFO = {
  name: 'Sandi Riady',
  title: 'IT Infrastructure Support & MIS Specialist',
  profileImage: new URL('../assets/sandiriady.jpg', import.meta.url).href,
  contacts: {
    whatsapp: '+6285884926880',
    email: 'riadysandi@gmail.com',
    instagram: '@sandiriady',
    twitter: '@sandi_riady',
    facebook: 'sandi riady',
  },
  aboutMe: {
    en: 'IT Infrastructure Support & MIS professional experienced in Linux server management, Docker containerization, corporate Zimbra email administration, and ERPNext/Frappe deployment. Proficient in configuring helpdesk ticketing (GLPI), automating routine tasks with n8n/bash, managing multi-level approval workflows, and supporting daily business user operations.',
    id: 'Praktisi IT Infrastructure Support & Sistem Informasi Manajemen dengan pengalaman menangani operasional server Linux, Docker container, administrasi email korporat (Zimbra), dan implementasi ERPNext/Frappe. Terbiasa mengelola sistem helpdesk/tiketing (GLPI), otomatisasi alur kerja harian (n8n & skrip bash), pengaturan alur persetujuan bertingkat, serta dukungan teknis harian bagi pengguna bisnis.'
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
    skillsTitle: 'Technical Skills',
    experienceTitle: 'Work Experience',
    projectsTitle: 'Featured Implementations',
    liveSitesTitle: 'Live Systems & Demos',
    contactTitle: 'Get in Touch',
    downloadButton: 'Download CV (PDF)',
    downloading: 'Generating PDF...',
    searchPlaceholder: 'Search skills, projects, tools, experience...',
    sendButton: 'Send Message',
    sending: 'Sending...',
    successMessage: 'Message sent successfully! I will get back to you soon.',
    formName: 'Your Name',
    formEmail: 'Your Email Address',
    formMsg: 'Your Message',
    heroSubtitle: 'IT Infrastructure Support & Systems Administrator',
    educationTitle: 'Education',
    orgTitle: 'Organizational Experience',
    hobbiesTitle: 'Interests & Activities',
    personalityTitle: 'Work Ethic & Strengths',
    langTitle: 'Languages',
    contactSubtitle: 'Interested in discussing a job opportunity, IT infrastructure project, or collaboration? Feel free to reach out.',
    experienceSubtitle: 'Professional career history, daily operational responsibilities, and systems managed.',
    projectsSubtitle: 'Real-world systems, containerized deployments, and automation workflows I have implemented.',
    liveSitesSubtitle: 'Active web platforms and project environments currently running in production.',
    messageHistory: 'Recent Inquiries',
    noMessages: 'No messages received yet. Feel free to use the contact form!',
    noResults: 'No results found matching your search.',
  },
  id: {
    navAbout: 'Tentang',
    navSkills: 'Keahlian',
    navExperience: 'Pengalaman',
    navProjects: 'Proyek',
    navLiveSites: 'Web Aktif',
    navContact: 'Kontak',
    aboutTitle: 'Tentang Saya',
    skillsTitle: 'Keahlian & Teknologi',
    experienceTitle: 'Pengalaman Kerja',
    projectsTitle: 'Implementasi Sistem & Proyek',
    liveSitesTitle: 'Layanan & Web Aktif',
    contactTitle: 'Hubungi Saya',
    downloadButton: 'Unduh CV (PDF)',
    downloading: 'Membuat PDF...',
    searchPlaceholder: 'Cari keahlian, proyek, tools, pengalaman...',
    sendButton: 'Kirim Pesan',
    sending: 'Mengirim...',
    successMessage: 'Pesan berhasil dikirim! Saya akan segera merespons.',
    formName: 'Nama Lengkap',
    formEmail: 'Alamat Email',
    formMsg: 'Isi Pesan',
    heroSubtitle: 'IT Infrastructure Support & Systems Administrator',
    educationTitle: 'Pendidikan',
    orgTitle: 'Pengalaman Organisasi',
    hobbiesTitle: 'Minat & Aktivitas',
    personalityTitle: 'Etos Kerja & Karakter',
    langTitle: 'Bahasa',
    contactSubtitle: 'Tertarik mendiskusikan peluang kerja, implementasi infrastruktur IT, atau konsultasi sistem? Silakan hubungi saya.',
    experienceSubtitle: 'Perjalanan karier, tanggung jawab operasional harian, dan sistem yang saya kelola.',
    projectsSubtitle: 'Sistem nyata, konfigurasi server, dan otomatisasi alur kerja yang pernah saya bangun.',
    liveSitesSubtitle: 'Aplikasi web dan lingkungan proyek yang sedang aktif berjalan.',
    messageHistory: 'Daftar Pesan Masuk',
    noMessages: 'Belum ada pesan masuk. Silakan gunakan formulir kontak di atas!',
    noResults: 'Tidak ada data yang sesuai dengan kata kunci pencarian.',
  },
};

export const SKILLS: Skill[] = [
  { name: 'Linux Server (Ubuntu/Debian)', category: 'core', level: 5 },
  { name: 'Docker & Containerization', category: 'core', level: 5 },
  { name: 'Frappe Framework & ERPNext', category: 'core', level: 4 },
  { name: 'Zimbra Collaboration Suite (Mail Ops)', category: 'infra', level: 4 },
  { name: 'GLPI Helpdesk & Asset Management', category: 'tools', level: 5 },
  { name: 'Workflow Automation (n8n, Webhooks)', category: 'automation', level: 5 },
  { name: 'Bash Scripting & Scheduled Tasks', category: 'automation', level: 4 },
  { name: 'Basic Network Ops (LAN, Routing, DNS)', category: 'infra', level: 4 },
  { name: 'Device Policy & MDM (Flyve/Dashy)', category: 'tools', level: 4 },
  { name: 'Git & Version Control', category: 'tools', level: 4 },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    period: '2024 - SEKARANG',
    title: {
      en: 'IT INFRASTRUCTURE SPECIALIST',
      id: 'SPESIALIS INFRASTRUKTUR TI',
    },
    company: 'IT INFRA SERVICES',
    points: {
      en: [
        'Administer daily IT helpdesk ticketing, user troubleshooting, and approval workflows for asset disposal.',
        'Deploy and maintain Linux servers, Dockerized services, and Frappe/ERPNext business applications.',
        'Evaluate and implement open-source operational tools: GLPI, Rocket.Chat, n8n, Flyve MDM, and Dashy dashboard.',
        'Manage Zimbra corporate mail server operations, email deliverability (SPF/DKIM), and user mailbox quotas.',
        'Create and maintain standard operating procedures (SOPs), system documentation, and automated backup routines.'
      ],
      id: [
        'Mengelola sistem helpdesk & penanganan tiket gangguan harian, troubleshooting user, serta alur persetujuan aset TI.',
        'Mendeploy dan merawat server Linux, layanan berbasis Docker container, dan aplikasi ERPNext/Frappe.',
        'Mengimplementasikan tools open-source untuk operasional kantor: GLPI, Rocket.Chat, n8n, Flyve MDM, dan Dashy.',
        'Mengelola operasional server email Zimbra, konfigurasi keamanan SPF/DKIM, dan kuota akun pengguna.',
        'Menyusun Standard Operating Procedure (SOP), dokumentasi teknis infrastruktur, serta jadwal backup otomatis.'
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
        'Supervised daily store operations, ensuring consistency in service standards and inventory compliance.',
        'Coordinated staff scheduling, conducted team training, and handled escalated operational issues.',
        'Monitored POS data, daily sales records, and prepared structured operational reports for management.',
        'Standardized opening/closing store procedures and improved inter-departmental communication.'
      ],
      id: [
        'Memimpin operasional harian outlet, memastikan standar pelayanan, kebersihan, dan kepatuhan inventaris berjalan konsisten.',
        'Mengatur jadwal kerja shift staf, membina tim baru, serta menangani keluhan dan kebutuhan eskalasi.',
        'Memantau transaksi POS, menyusun laporan operasional harian/bulanan, dan mengontrol biaya operasional.',
        'Menstandarisasi SOP pembukaan/penutupan toko serta meningkatkan koordinasi antardivisi.'
      ],
    },
  },
];

export const EDUCATION: Education[] = [
  {
    id: 'edu1',
    period: '2018 - 2022',
    field: {
      en: 'Bachelor of Management Information Systems (S.Kom)',
      id: 'Sarjana Sistem Informasi Manajemen (S.Kom)',
    },
    institution: 'UNIVERSITAS RAHARJA',
  },
];

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org1',
    period: '2019 - 2022',
    role: {
      en: 'Head of Department 4 - KOMASI (Student Association)',
      id: 'Ketua Departemen 4 - KOMASI (Himpunan Mahasiswa Jurusan)',
    },
    organization: 'UNIVERSITAS RAHARJA',
  },
  {
    id: 'org2',
    period: '2015 - 2018',
    role: {
      en: 'Secretary of FORMA (Youth Community Organization)',
      id: 'Sekretaris FORMA (Forum Remaja Masjid Ar-Rahmah)',
    },
    organization: 'FORUM REMAJA MASJID AR-RAHMAH',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: {
      en: 'GLPI Helpdesk & Notification Bot Integration',
      id: 'Integrasi Helpdesk GLPI & Notifikasi Otomatis',
    },
    description: {
      en: 'Connected GLPI ticketing with n8n and Rocket.Chat webhook triggers to instantly notify technical support channels when high-priority tickets are logged, improving response time.',
      id: 'Mengintegrasikan sistem tiket GLPI dengan n8n dan webhook Rocket.Chat untuk mengirimkan notifikasi otomatis ke tim teknis saat ada tiket prioritas tinggi, mempercepat penanganan kendala.',
    },
    tags: ['GLPI', 'n8n', 'Rocket.Chat', 'Docker', 'Webhooks'],
    icon: 'Cpu',
  },
  {
    id: 'proj2',
    title: {
      en: 'ERPNext & Frappe Self-Hosted Deployment',
      id: 'Implementasi & Manajemen ERPNext Mandiri',
    },
    description: {
      en: 'Deployed Frappe and ERPNext on Linux Docker stack, configured custom asset management modules, user role permissions, and scheduled daily MariaDB/PostgreSQL database backups.',
      id: 'Mendeploy ERPNext dan framework Frappe di lingkungan Docker Linux, mengonfigurasi modul pelacakan aset, hak akses peran user, serta jadwal backup database harian.',
    },
    tags: ['ERPNext', 'Frappe', 'Docker Compose', 'MariaDB', 'Linux'],
    icon: 'Database',
  },
  {
    id: 'proj3',
    title: {
      en: 'Corporate Zimbra Mail Server Administration',
      id: 'Administrasi Server Email Korporat Zimbra',
    },
    description: {
      en: 'Administered multi-user Zimbra Collaboration Suite on Linux, configured spam filtering, DNS records (SPF, DKIM, DMARC), and SSL certificates for reliable email delivery.',
      id: 'Mengelola server email Zimbra Collaboration Suite, konfigurasi penyaring spam, pencatatan DNS (SPF, DKIM, DMARC), serta sertifikat SSL untuk menjamin keterkiriman email yang aman.',
    },
    tags: ['Zimbra Admin', 'Linux Ubuntu', 'SPF/DKIM/DMARC', 'DNS Records'],
    icon: 'Mail',
  },
  {
    id: 'proj4',
    title: {
      en: 'Centralized IT Dashboard & Hardware Asset Inventory',
      id: 'Dasbor Terpusat & Inventarisasi Aset TI',
    },
    description: {
      en: 'Built an internal navigation dashboard using Dashy unified with Flyve MDM for tracking computer hardware specifications, OS versions, and network service statuses across office endpoints.',
      id: 'Membangun dasbor navigasi internal menggunakan Dashy yang dipadukan dengan Flyve MDM untuk memantau spesifikasi perangkat keras, versi sistem operasi, dan status layanan TI kantor.',
    },
    tags: ['Dashy', 'Flyve MDM', 'IT Asset Tracking', 'Internal Portal'],
    icon: 'LayoutDashboard',
  },
  {
    id: 'proj5',
    title: {
      en: 'Automated Network & Server Health Monitoring Script',
      id: 'Skrip Otomatisasi Pemantauan Jaringan & Server',
    },
    description: {
      en: 'Developed lightweight Bash monitoring scripts and scheduled cron jobs that verify internet gateway connectivity, disk storage usage, and send alerts upon downtime.',
      id: 'Mengembangkan skrip Bash ringan dan cron jobs untuk memeriksa konektivitas gateway internet, sisa kapasitas penyimpanan server, serta mengirimkan peringatan jika ada layanan yang mati.',
    },
    tags: ['Bash Scripting', 'Linux Cron', 'System Monitoring', 'Network Ops'],
    icon: 'Network',
  },
];

export const PERSONALITY: Record<'en' | 'id', string[]> = {
  en: ['Problem Solver', 'Punctual & Dependable', 'Quick Learner', 'Clear Communicator', 'Team Player'],
  id: ['Fokus Solusi', 'Tepat Waktu & Bertanggung Jawab', 'Cepat Mempelajari Hal Baru', 'Komunikasi Rapi & Jelas', 'Mudah Beradaptasi'],
};

export const HOBBIES: Record<'en' | 'id', { name: string; icon: string }[]> = {
  en: [
    { name: 'Playing Guitar', icon: 'Music' },
    { name: 'Fitness & Sports', icon: 'Dumbbell' },
    { name: 'Tech Exploration & Homelab', icon: 'Compass' },
  ],
  id: [
    { name: 'Bermain Gitar', icon: 'Music' },
    { name: 'Olahraga & Kebugaran', icon: 'Dumbbell' },
    { name: 'Eksplorasi Teknologi & Homelab', icon: 'Compass' },
  ],
};

export const LANGUAGES: Record<'en' | 'id', { name: string; level: string }[]> = {
  en: [
    { name: 'Indonesian', level: 'Native / Fluent' },
    { name: 'English', level: 'Working Proficiency' },
  ],
  id: [
    { name: 'Bahasa Indonesia', level: 'Bahasa Utama / Fasih' },
    { name: 'Bahasa Inggris', level: 'Kemampuan Kerja / Pasif-Aktif' },
  ],
};

export const LIVE_SITES: LiveSite[] = [
  {
    id: 'site1',
    name: 'Live Portfolio & CV Site',
    url: 'https://riadysandi.github.io/portofolio-sandiriady/',
    description: {
      en: 'Interactive portfolio and CV web application built with React, Vite, Tailwind CSS, and Supabase integration.',
      id: 'Aplikasi web portofolio & CV interaktif yang dibangun dengan React, Vite, Tailwind CSS, dan integrasi Supabase.'
    },
    status: 'active'
  }
];
