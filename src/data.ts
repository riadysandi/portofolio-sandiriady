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
    "id": "site1784796145202",
    "url": "https://itpma-ticketing.pinusmerahabadi.co.id/",
    "name": "MONASYS",
    "status": "active",
    "description": {
      "en": "Monasys is a Laravel and Filament based operations portal designed for internal IT workflows. It combines an application directory, uptime dashboard, Prometheus monitoring, public portal, knowledge base, news, and realtime live support in one focused admin experience.\n\nThe project favors Filament-native tables, forms, modals, actions, notifications, and lightweight Blade/Livewire pages over a separate SPA admin layer.",
      "id": "Monasys adalah portal operasional berbasis Laravel dan Filament yang dirancang untuk alur kerja TI internal. Sistem ini memadukan direktori aplikasi, dasbor *uptime*, pemantauan Prometheus, portal publik, basis pengetahuan, berita, dan dukungan langsung (*live support*) waktu nyata ke dalam satu pengalaman administrasi yang terpadu.\n\nProyek ini lebih mengutamakan penggunaan komponen bawaan Filament—seperti tabel, formulir, modal, aksi, dan notifikasi—serta halaman Blade/Livewire yang ringan, dibandingkan menggunakan lapisan administrasi SPA yang terpisah."
    },
    "image": "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/01_public_portal_full.png",
    "screenshots": [
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/01_public_portal_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/01_public_portal.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/02_auth_login.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/03_panel_portal_overview.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/04_dashboard_uptime_monitoring.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/05_asset_inventory_hardware.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/06_asset_deploy_provisioning.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/07_asset_availability_loans.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/08_log_agent_submissions.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/09_config_receiver_agent.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/10_cctv_devices_monitoring.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/11_password_management_vault.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/12_prometheus_metrics.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/13_mail_security_zimbra.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/14_security_center_alerts.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/15_system_notifications.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/16_service_renewals_reminder.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/17_support_analytics_kpi.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/18_approval_requests_workflow.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/19_application_directory.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/20_user_management_access.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/21_system_reports.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/22_administration_settings.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/23_knowledge_base_sop.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/06_Monasys-Internal/24_configuration_audit_log.png"
    ]
  },
  {
    "id": "site1792142940748",
    "url": "https://mafero-production.up.railway.app/",
    "name": "Mafero - E-Commerce & Inventory Management Platform",
    "status": "active",
    "description": {
      "en": "Mafero (TokoNiaga.ID) is a production-grade full-stack e-commerce and retail management web application. Built using a modern monolith architecture with Laravel and React 18 (Inertia.js), it delivers complete commerce capabilities: an interactive customer catalog with search/filter and multi-address checkout, automated inventory reservation and CSV restock import/export, shipping tracking and return/refund management, Google OAuth & phone OTP verification, and role-based access control with Dockerized environment.",
      "id": "Mafero (TokoNiaga.ID) adalah aplikasi web e-commerce dan manajemen retail full-stack siap produksi. Dibangun menggunakan arsitektur monolit modern Laravel dan React 18 (Inertia.js), platform ini mencakup alur bisnis menyeluruh: katalog pelanggan interaktif dengan pencarian/filter dan multi-alamat, reservasi stok otomatis serta ekspor/impor restock CSV, pelacakan pengiriman dan retur barang, autentikasi Google & verifikasi OTP HP, serta kontrol akses berbasis peran (RBAC) dengan lingkungan Docker."
    },
    "image": "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/01_landing_storefront.png",
    "screenshots": [
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/01_landing_storefront.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/02_landing_storefront_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/03_auth_login.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/04_auth_register.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/05_superadmin_control_center.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/06_admin_inventory_management.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/07_superadmin_discounts_campaign.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/08_superadmin_master_settings.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/09_admin_sales_analytics.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/10_admin_monthly_report.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/11_superadmin_users_roles.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/12_orders_transactions_management.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/13_superadmin_system_backups.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/14_superadmin_system_audit_logs.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/15_customer_catalog_experience.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/04_Mafero-ECommerce/16_order_shipment_tracking.png"
    ]
  },
  {
    "id": "site1792142924525",
    "url": "https://undangan-digital-production-e6fd.up.railway.app/",
    "name": "UndanganDigital - Interactive SaaS Digital Wedding Platform",
    "status": "active",
    "description": {
      "en": "Architected and developed UndanganDigital, a production-grade SaaS platform for bespoke digital wedding invitations built with Laravel 11, Inertia.js v2, Vue 3 (TypeScript), and Tailwind CSS. Features an interactive visual editor with 0ms bidirectional postMessage sync, multi-tiered subscription billing with automated QRIS & Midtrans integration, and a QR-code guest management system for RSVP and on-site check-in. Engineered immersive 60 FPS HTML5 Canvas physics simulations and 3D animations (including interactive koi ponds, ascending sky lanterns, and pearl oyster mini-games), delivering high-performance, fluid mobile-first user experiences.",
      "id": "Merancang dan membangun UndanganDigital, platform SaaS undangan pernikahan digital modern berbasis Laravel 11, Inertia.js v2, Vue 3 (TypeScript), dan Tailwind CSS. Dilengkapi editor visual interaktif dengan sinkronisasi instan dua arah (postMessage 0ms), sistem langganan multi-tier dengan pembayaran otomatis QRIS & Midtrans, serta manajemen tamu berbasis QR-code untuk RSVP dan check-in lokasi acara. Mengembangkan simulasi fisika kanvas HTML5 60 FPS dan animasi 3D interaktif (seperti kolam ikan koi, pelepasan lentera terbang, dan mini-game kerang mutiara laut) yang responsif dan berkinerja tinggi."
    },
    "image": "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/01_landing_showcase.png",
    "screenshots": [
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/01_landing_showcase.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/02_landing_showcase_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/03_pricing_packages.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/04_layanan_bantu_buat.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/05_demo_template_ningrum-fairytale-3d.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/06_auth_login.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/07_auth_register.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/08_customer_dashboard_active_invitation_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/08_customer_dashboard_active_invitation.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/08_customer_dashboard_after_action.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/08_customer_dashboard_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/08_customer_dashboard_overview.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/08_customer_dashboard_with_invitation_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/08_customer_dashboard_with_invitation.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/09_invitation_create_wizard_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/09_invitation_create_wizard.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/10_visual_canvas_editor.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/11_guest_rsvp_management_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/11_guest_rsvp_management.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/05_Undangan-Digital/12_reception_qr_checkin.png"
    ]
  },
  {
    "id": "site1792142884085",
    "url": "https://website-kampanye-pilkades.vercel.app",
    "name": "Digital Election Campaign Platform (Pilkades)",
    "status": "active",
    "description": {
      "en": "A full-stack, responsive digital campaign platform built for local democratic elections. Features an interactive volunteer recruitment portal with Leaflet.js geospatial mapping (down to RT/RW level), public citizen aspiration submission, campaign agenda scheduling, press releases, and a custom Twibbon generator. Powered by Next.js 14 App Router, TypeScript, Tailwind CSS, and integrated with Supabase (PostgreSQL) with role-based admin controls.",
      "id": "Platform digital kampanye pemilu dan pilkades berbasis full-stack. Dilengkapi sistem pendaftaran & pemetaan sebaran relawan interaktif menggunakan Leaflet.js hingga tingkat RT/RW, kanal aspirasi warga langsung, publikasi agenda & rilis pers, serta generator twibbon kampanye. Dibangun dengan Next.js 14 App Router, TypeScript, Tailwind CSS, dan terintegrasi dengan database cloud Supabase (PostgreSQL) serta dasbor manajemen admin berbasis hak akses."
    },
    "image": "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/01_beranda_landing_full.png",
    "screenshots": [
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/01_beranda_landing_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/02_profil_calon.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/03_visi_misi_program.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/04_berita_publikasi.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/05_agenda_kegiatan.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/06_kanal_aspirasi_warga.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/07_formulir_relawan.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/08_cek_fakta_klarifikasi.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/09_galeri_dokumentasi.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/10_panduan_pemilih.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/11_twibbon_dukungan.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/12_kontak_posko_pemenangan.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/13_admin_login_screen.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/14_admin_dashboard_overview_full.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/14_admin_dashboard_overview.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/15_admin_agenda_management.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/15_admin_berita_management.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/15_admin_relawan_management.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/02_Website-Kampanye-Pilkades/15_admin_settings_management.png"
    ]
  },
  {
    "id": "site1792143000002",
    "url": "https://ultah-dinnda-ochtaffia.vercel.app",
    "name": "Ultah Dinnda Ochtaffia - Interactive Celebration Web App",
    "status": "active",
    "description": {
      "en": "Interactive celebration web application crafted with React 18, Vite, Tailwind CSS, Canvas-Confetti, and Howler.js audio player. Includes dynamic celebration animations, memory timeline journey, celebration photo gallery, and interactive mini-games for a delightful user experience.",
      "id": "Aplikasi web perayaan ulang tahun interaktif modern yang dibuat dengan React 18, Vite, Tailwind CSS, Canvas-Confetti, dan audio player Howler.js. Dilengkapi animasi perayaan dinamis, linimasa perjalanan memori, galeri foto perayaan, serta mini-game interaktif yang menghibur."
    },
    "image": "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/03_Ultah-Dinnda-Ochtaffia/01_landing_hero.png",
    "screenshots": [
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/03_Ultah-Dinnda-Ochtaffia/01_landing_hero.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/03_Ultah-Dinnda-Ochtaffia/02_full_celebration_page.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/03_Ultah-Dinnda-Ochtaffia/03_interactive_section.png"
    ]
  },
  {
    "id": "site1792143000001",
    "url": "https://portofolio-sandiriady.vercel.app",
    "name": "Portofolio & CV - Sandi Riady",
    "status": "active",
    "description": {
      "en": "Modern interactive portfolio and curriculum vitae web application. Built with React 19, TypeScript, Tailwind CSS, Framer Motion, and Supabase integration. Features dark cybernetic styling, active live sites showcase, automatic PDF resume generator, and protected admin dashboard.",
      "id": "Aplikasi web portofolio dan kurikulum vitae interaktif modern. Dibangun dengan React 19, TypeScript, Tailwind CSS, Framer Motion, dan integrasi backend Supabase. Menampilkan estetika bertema dark cybernetic, showcase web aktif, generator resume PDF otomatis, dan dasbor manajemen admin terproteksi."
    },
    "image": "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/01_Portofolio-Sandi-Riady/01_hero_overview.png",
    "screenshots": [
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/01_Portofolio-Sandi-Riady/01_hero_overview.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/01_Portofolio-Sandi-Riady/02_full_portfolio_page.png",
      "https://gqonqrwgvfqioxcghrmg.supabase.co/storage/v1/object/public/portfolio-images/projects/01_Portofolio-Sandi-Riady/03_admin_login_portal.png"
    ]
  }
];
