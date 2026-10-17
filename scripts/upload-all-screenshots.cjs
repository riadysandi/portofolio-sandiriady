const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://gqonqrwgvfqioxcghrmg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_hDM2H9lkTMFl3yAg4OXtPA_kMzn4O8c';
const MANAGER_DIR = 'D:\\PROJECT\\MANAGER';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Natural sort for filenames like 01_..., 02_..., 10_...
function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

async function uploadFolder(folderName) {
  const folderPath = path.join(MANAGER_DIR, folderName);
  if (!fs.existsSync(folderPath)) {
    console.warn(`Folder not found: ${folderPath}`);
    return [];
  }

  const files = fs.readdirSync(folderPath)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort(naturalSort);

  console.log(`\n=== Uploading ${folderName} (${files.length} images) ===`);
  const uploadedUrls = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const filePath = path.join(folderPath, fileName);
    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = `projects/${folderName}/${fileName}`;
    const ext = path.extname(fileName).toLowerCase();
    const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : 'image/png';

    process.stdout.write(`[${i + 1}/${files.length}] Uploading ${fileName}... `);
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
        cacheControl: '86400'
      });

    if (uploadError) {
      console.error(`FAILED: ${uploadError.message}`);
    } else {
      const { data: pubData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(storagePath);

      console.log(`OK -> ${pubData.publicUrl}`);
      uploadedUrls.push(pubData.publicUrl);
    }
  }

  return uploadedUrls;
}

async function main() {
  console.log('Signing in to Supabase...');
  const { data: auth, error: authError } = await supabase.auth.signInWithPassword({
    email: 'riadysandi@gmail.com',
    password: 'mesi1234'
  });

  if (authError) {
    console.error('Authentication failed:', authError.message);
    process.exit(1);
  }
  console.log('Authenticated as:', auth.user.email);

  // Upload all 6 folders
  const portfolioUrls = await uploadFolder('01_Portofolio-Sandi-Riady');
  const pilkadesUrls = await uploadFolder('02_Website-Kampanye-Pilkades');
  const ultahUrls = await uploadFolder('03_Ultah-Dinnda-Ochtaffia');
  const maferoUrls = await uploadFolder('04_Mafero-ECommerce');
  const undanganUrls = await uploadFolder('05_Undangan-Digital');
  const monasysUrls = await uploadFolder('06_Monasys-Internal');

  console.log('\nAll images uploaded successfully!');
  console.log({
    portfolio: portfolioUrls.length,
    pilkades: pilkadesUrls.length,
    ultah: ultahUrls.length,
    mafero: maferoUrls.length,
    undangan: undanganUrls.length,
    monasys: monasysUrls.length
  });

  // Prepare updated live_projects array
  const updatedLiveProjects = [
    {
      id: 'site1784796145202',
      url: 'https://itpma-ticketing.pinusmerahabadi.co.id/',
      name: 'MONASYS',
      status: 'active',
      description: {
        en: 'Monasys is a Laravel and Filament based operations portal designed for internal IT workflows. It combines an application directory, uptime dashboard, Prometheus monitoring, public portal, knowledge base, news, and realtime live support in one focused admin experience.\n\nThe project favors Filament-native tables, forms, modals, actions, notifications, and lightweight Blade/Livewire pages over a separate SPA admin layer.',
        id: 'Monasys adalah portal operasional berbasis Laravel dan Filament yang dirancang untuk alur kerja TI internal. Sistem ini memadukan direktori aplikasi, dasbor *uptime*, pemantauan Prometheus, portal publik, basis pengetahuan, berita, dan dukungan langsung (*live support*) waktu nyata ke dalam satu pengalaman administrasi yang terpadu.\n\nProyek ini lebih mengutamakan penggunaan komponen bawaan Filament—seperti tabel, formulir, modal, aksi, dan notifikasi—serta halaman Blade/Livewire yang ringan, dibandingkan menggunakan lapisan administrasi SPA yang terpisah.'
      },
      image: monasysUrls[0] || '',
      screenshots: monasysUrls
    },
    {
      id: 'site1792142940748',
      url: 'https://mafero-production.up.railway.app/',
      name: 'Mafero - E-Commerce & Inventory Management Platform',
      status: 'active',
      description: {
        en: 'Mafero (TokoNiaga.ID) is a production-grade full-stack e-commerce and retail management web application. Built using a modern monolith architecture with Laravel and React 18 (Inertia.js), it delivers complete commerce capabilities: an interactive customer catalog with search/filter and multi-address checkout, automated inventory reservation and CSV restock import/export, shipping tracking and return/refund management, Google OAuth & phone OTP verification, and role-based access control with Dockerized environment.',
        id: 'Mafero (TokoNiaga.ID) adalah aplikasi web e-commerce dan manajemen retail full-stack siap produksi. Dibangun menggunakan arsitektur monolit modern Laravel dan React 18 (Inertia.js), platform ini mencakup alur bisnis menyeluruh: katalog pelanggan interaktif dengan pencarian/filter dan multi-alamat, reservasi stok otomatis serta ekspor/impor restock CSV, pelacakan pengiriman dan retur barang, autentikasi Google & verifikasi OTP HP, serta kontrol akses berbasis peran (RBAC) dengan lingkungan Docker.'
      },
      image: maferoUrls[0] || '',
      screenshots: maferoUrls
    },
    {
      id: 'site1792142924525',
      url: 'https://undangan-digital-production-e6fd.up.railway.app/',
      name: 'UndanganDigital - Interactive SaaS Digital Wedding Platform',
      status: 'active',
      description: {
        en: 'Architected and developed UndanganDigital, a production-grade SaaS platform for bespoke digital wedding invitations built with Laravel 11, Inertia.js v2, Vue 3 (TypeScript), and Tailwind CSS. Features an interactive visual editor with 0ms bidirectional postMessage sync, multi-tiered subscription billing with automated QRIS & Midtrans integration, and a QR-code guest management system for RSVP and on-site check-in. Engineered immersive 60 FPS HTML5 Canvas physics simulations and 3D animations (including interactive koi ponds, ascending sky lanterns, and pearl oyster mini-games), delivering high-performance, fluid mobile-first user experiences.',
        id: 'Merancang dan membangun UndanganDigital, platform SaaS undangan pernikahan digital modern berbasis Laravel 11, Inertia.js v2, Vue 3 (TypeScript), dan Tailwind CSS. Dilengkapi editor visual interaktif dengan sinkronisasi instan dua arah (postMessage 0ms), sistem langganan multi-tier dengan pembayaran otomatis QRIS & Midtrans, serta manajemen tamu berbasis QR-code untuk RSVP dan check-in lokasi acara. Mengembangkan simulasi fisika kanvas HTML5 60 FPS dan animasi 3D interaktif (seperti kolam ikan koi, pelepasan lentera terbang, dan mini-game kerang mutiara laut) yang responsif dan berkinerja tinggi.'
      },
      image: undanganUrls[0] || '',
      screenshots: undanganUrls
    },
    {
      id: 'site1792142884085',
      url: 'https://website-kampanye-pilkades.vercel.app',
      name: 'Digital Election Campaign Platform (Pilkades)',
      status: 'active',
      description: {
        en: 'A full-stack, responsive digital campaign platform built for local democratic elections. Features an interactive volunteer recruitment portal with Leaflet.js geospatial mapping (down to RT/RW level), public citizen aspiration submission, campaign agenda scheduling, press releases, and a custom Twibbon generator. Powered by Next.js 14 App Router, TypeScript, Tailwind CSS, and integrated with Supabase (PostgreSQL) with role-based admin controls.',
        id: 'Platform digital kampanye pemilu dan pilkades berbasis full-stack. Dilengkapi sistem pendaftaran & pemetaan sebaran relawan interaktif menggunakan Leaflet.js hingga tingkat RT/RW, kanal aspirasi warga langsung, publikasi agenda & rilis pers, serta generator twibbon kampanye. Dibangun dengan Next.js 14 App Router, TypeScript, Tailwind CSS, dan terintegrasi dengan database cloud Supabase (PostgreSQL) serta dasbor manajemen admin berbasis hak akses.'
      },
      image: pilkadesUrls[0] || '',
      screenshots: pilkadesUrls
    },
    {
      id: 'site1792143000002',
      url: 'https://ultah-dinnda-ochtaffia.vercel.app',
      name: 'Ultah Dinnda Ochtaffia - Interactive Celebration Web App',
      status: 'active',
      description: {
        en: 'Interactive celebration web application crafted with React 18, Vite, Tailwind CSS, Canvas-Confetti, and Howler.js audio player. Includes dynamic celebration animations, memory timeline journey, celebration photo gallery, and interactive mini-games for a delightful user experience.',
        id: 'Aplikasi web perayaan ulang tahun interaktif modern yang dibuat dengan React 18, Vite, Tailwind CSS, Canvas-Confetti, dan audio player Howler.js. Dilengkapi animasi perayaan dinamis, linimasa perjalanan memori, galeri foto perayaan, serta mini-game interaktif yang menghibur.'
      },
      image: ultahUrls[0] || '',
      screenshots: ultahUrls
    },
    {
      id: 'site1792143000001',
      url: 'https://portofolio-sandiriady.vercel.app',
      name: 'Portofolio & CV - Sandi Riady',
      status: 'active',
      description: {
        en: 'Modern interactive portfolio and curriculum vitae web application. Built with React 19, TypeScript, Tailwind CSS, Framer Motion, and Supabase integration. Features dark cybernetic styling, active live sites showcase, automatic PDF resume generator, and protected admin dashboard.',
        id: 'Aplikasi web portofolio dan kurikulum vitae interaktif modern. Dibangun dengan React 19, TypeScript, Tailwind CSS, Framer Motion, dan integrasi backend Supabase. Menampilkan estetika bertema dark cybernetic, showcase web aktif, generator resume PDF otomatis, dan dasbor manajemen admin terproteksi.'
      },
      image: portfolioUrls[0] || '',
      screenshots: portfolioUrls
    }
  ];

  console.log('\nUpdating site_data in Supabase...');
  const { error: updateError } = await supabase
    .from('site_data')
    .update({
      live_projects: updatedLiveProjects,
      updated_at: new Date().toISOString()
    })
    .eq('id', 'main');

  if (updateError) {
    console.error('Failed to update site_data:', updateError.message);
  } else {
    console.log('SUCCESS: site_data.live_projects updated in Supabase!');
  }

  // Save JSON locally for fallback data
  fs.writeFileSync(
    path.join(__dirname, 'uploaded_live_projects.json'),
    JSON.stringify(updatedLiveProjects, null, 2)
  );
  console.log('Saved uploaded_live_projects.json for reference.');
}

main().catch(console.error);
