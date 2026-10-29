// Generator for high-resolution 3D Lanyard ID Card textures
import heroFigure from '../assets/hero-figure.png';

export interface BadgeTextures {
  front: string;
  back: string;
  strap: string;
}

// Cache textures in memory so we only generate them once
let cachedTextures: BadgeTextures | null = null;
let generatingPromise: Promise<BadgeTextures> | null = null;

export function getCachedBadgeTextures(): BadgeTextures | null {
  return cachedTextures;
}

export async function getBadgeTextures(): Promise<BadgeTextures> {
  if (cachedTextures) return cachedTextures;
  if (generatingPromise) return generatingPromise;

  generatingPromise = (async () => {
    const [front, back, strap] = await Promise.all([
      createFrontBadge(heroFigure),
      createBackBadge(),
      createStrapTexture()
    ]);

    cachedTextures = { front, back, strap };
    return cachedTextures;
  })();

  return generatingPromise;
}

/**
 * Creates the front of the ID badge (1024 x 1440)
 */
function createFrontBadge(photoSrc: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve('');

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const drawCard = (photoImg?: HTMLImageElement) => {
      const W = canvas.width;
      const H = canvas.height;

      // ── 1. Base Gradient Background ──
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#0c0d14');
      bgGrad.addColorStop(0.5, '#121422');
      bgGrad.addColorStop(1, '#07080d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // ── 2. High-Tech Dot Matrix Grid ──
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      const dotSpacing = 32;
      for (let x = 32; x < W; x += dotSpacing) {
        for (let y = 32; y < H; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 3. Background Watermark Typography ──
      ctx.save();
      ctx.translate(W - 40, 260);
      ctx.rotate(Math.PI / 2);
      ctx.font = '900 64px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillText('INFRASTRUCTURE', 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(60, H - 240);
      ctx.rotate(-Math.PI / 2);
      ctx.font = '900 52px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(204, 255, 0, 0.05)';
      ctx.fillText('SYSADMIN • DEVOPS', 0, 0);
      ctx.restore();

      // ── 4. Header Section ──
      // Top Slot Cutout Area Guard
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      roundRect(ctx, W / 2 - 130, 20, 260, 48, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Title & Tags below slot
      ctx.fillStyle = '#ccff00';
      ctx.beginPath();
      ctx.arc(80, 110, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 22px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('IT INFRASTRUCTURE SUPPORT', 96, 118);

      ctx.font = 'bold 18px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ccff00';
      ctx.textAlign = 'right';
      ctx.fillText('ID: SR-2026', W - 80, 118);
      ctx.textAlign = 'left';

      // Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 140);
      ctx.lineTo(W - 80, 140);
      ctx.stroke();

      // Sub-tag bar
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
      ctx.fillText('SYSADMIN // LINUX & DEVOPS', 80, 172);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('SECURITY CLEARANCE: LVL 1', W - 80, 172);
      ctx.textAlign = 'left';

      // ── 5. Main Photo Frame ──
      const photoX = 80;
      const photoY = 200;
      const photoW = W - 160; // 864
      const photoH = 780;

      // Photo frame background with dark radial glow
      const photoBgGrad = ctx.createRadialGradient(
        photoX + photoW / 2, photoY + photoH / 2, 50,
        photoX + photoW / 2, photoY + photoH / 2, photoW / 1.5
      );
      photoBgGrad.addColorStop(0, '#1a1d2e');
      photoBgGrad.addColorStop(1, '#0a0b12');
      ctx.fillStyle = photoBgGrad;
      ctx.beginPath();
      roundRect(ctx, photoX, photoY, photoW, photoH, 20);
      ctx.fill();

      // Clip for Photo
      ctx.save();
      ctx.beginPath();
      roundRect(ctx, photoX, photoY, photoW, photoH, 20);
      ctx.clip();

      if (photoImg) {
        // Draw Sandi's portrait nicely centered
        // hero-figure.png is 682 x 1024. Head & chest are in top 60%
        const srcW = photoImg.width;
        const srcH = photoImg.height * 0.65; // crop upper body
        const destW = photoW * 1.05;
        const destH = (srcH / srcW) * destW;
        const destX = photoX + (photoW - destW) / 2;
        const destY = photoY + 20;

        ctx.drawImage(photoImg, 0, 40, srcW, srcH, destX, destY, destW, destH);
      } else {
        // Fallback silhouette if image fails
        ctx.fillStyle = '#24283b';
        ctx.beginPath();
        ctx.arc(photoX + photoW / 2, photoY + 300, 140, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(photoX + photoW / 2, photoY + 680, 240, 0, Math.PI * 2);
        ctx.fill();
      }

      // Vignette shadow at bottom of photo
      const photoVignette = ctx.createLinearGradient(0, photoY + photoH - 250, 0, photoY + photoH);
      photoVignette.addColorStop(0, 'rgba(10, 11, 18, 0)');
      photoVignette.addColorStop(1, '#0c0d14');
      ctx.fillStyle = photoVignette;
      ctx.fillRect(photoX, photoY + photoH - 250, photoW, 250);

      ctx.restore();

      // Cyber Frame Border & Corner Brackets
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      roundRect(ctx, photoX, photoY, photoW, photoH, 20);
      ctx.stroke();

      // Neon Lime Corner Accents
      const cLen = 40;
      ctx.strokeStyle = '#ccff00';
      ctx.lineWidth = 5;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(photoX, photoY + cLen);
      ctx.lineTo(photoX, photoY);
      ctx.lineTo(photoX + cLen, photoY);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(photoX + photoW - cLen, photoY);
      ctx.lineTo(photoX + photoW, photoY);
      ctx.lineTo(photoX + photoW, photoY + cLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(photoX, photoY + photoH - cLen);
      ctx.lineTo(photoX, photoY + photoH);
      ctx.lineTo(photoX + cLen, photoY + photoH);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(photoX + photoW - cLen, photoY + photoH);
      ctx.lineTo(photoX + photoW, photoY + photoH);
      ctx.lineTo(photoX + photoW, photoY + photoH - cLen);
      ctx.stroke();

      // Target Crosshairs `+`
      drawCrosshair(ctx, photoX + 30, photoY + 30);
      drawCrosshair(ctx, photoX + photoW - 30, photoY + 30);

      // ── 6. Name Banner & Identity ──
      const bannerY = 1010;

      // Name background badge
      ctx.fillStyle = '#0f1019';
      ctx.beginPath();
      roundRect(ctx, 80, bannerY, W - 160, 115, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(204, 255, 0, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Name text
      ctx.font = '900 48px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SANDI RIADY', 110, bannerY + 60);

      // Role subtitle
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ccff00';
      ctx.fillText('IT INFRASTRUCTURE SPECIALIST', 112, bannerY + 95);

      // Status Pill
      ctx.fillStyle = '#ccff00';
      ctx.beginPath();
      roundRect(ctx, W - 230, bannerY + 28, 120, 36, 18);
      ctx.fill();
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.fillText('● ONLINE', W - 170, bannerY + 52);
      ctx.textAlign = 'left';

      // ── 7. Barcode & Tech Specs Bar ──
      const barY = 1160;

      // Core skills chips
      const chips = ['LINUX', 'DOCKER', 'PROXMOX', 'ZIMBRA', 'ERPNEXT'];
      let chipX = 80;
      chips.forEach((chip) => {
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        const tw = ctx.measureText(chip).width + 24;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        roundRect(ctx, chipX, barY, tw, 34, 8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.fillText(chip, chipX + 12, barY + 23);
        chipX += tw + 10;
      });

      // Barcode simulation
      const barcodeY = 1225;
      const barcodeH = 55;
      const barcodeW = W - 160;

      ctx.fillStyle = '#ffffff';
      let bx = 80;
      const barPattern = [
        3, 2, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 4, 1, 2, 2, 3, 1, 4, 2, 1, 3,
        2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 4, 1, 2, 2, 3, 1, 4, 2, 1, 3, 2, 3, 1, 4,
        2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 4, 1, 2, 2, 3, 1, 4, 2, 1, 3, 3, 2, 1, 4
      ];

      for (let i = 0; i < barPattern.length && bx < W - 80; i++) {
        const bw = barPattern[i] * 2.2;
        if (i % 2 === 0) {
          ctx.fillRect(bx, barcodeY, bw, barcodeH);
        }
        bx += bw + 2;
      }

      // Barcode Serial Text
      ctx.font = 'bold 17px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'center';
      ctx.fillText('* SR-884926880-2026-AUTH *', W / 2, barcodeY + barcodeH + 28);
      ctx.textAlign = 'left';

      // Bottom tagline
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.textAlign = 'center';
      ctx.fillText('PORTFOLIO BADGE // SANDIRIADY.MY.ID // TOUCH TO SWING', W / 2, H - 36);
      ctx.textAlign = 'left';

      resolve(canvas.toDataURL('image/png'));
    };

    img.onload = () => drawCard(img);
    img.onerror = () => drawCard();
    img.src = photoSrc;
  });
}

/**
 * Creates the back of the ID badge (1024 x 1440)
 */
function createBackBadge(): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve('');

    const W = canvas.width;
    const H = canvas.height;

    // ── 1. Base Gradient Background ──
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#0a0b10');
    bgGrad.addColorStop(0.5, '#10121d');
    bgGrad.addColorStop(1, '#06070a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Top Slot Cutout Guard
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    roundRect(ctx, W / 2 - 130, 20, 260, 48, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ── 2. Magnetic Stripe ──
    const magY = 120;
    const magH = 150;
    const magGrad = ctx.createLinearGradient(0, magY, 0, magY + magH);
    magGrad.addColorStop(0, '#151722');
    magGrad.addColorStop(0.5, '#25293d');
    magGrad.addColorStop(1, '#151722');
    ctx.fillStyle = magGrad;
    ctx.fillRect(0, magY, W, magH);

    // Magnetic track lines
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(0, magY + 30, W, 2);
    ctx.fillRect(0, magY + 75, W, 2);
    ctx.fillRect(0, magY + 120, W, 2);

    // ── 3. Gold Smartcard Chip (SIM) ──
    const chipX = 80;
    const chipY = 320;
    const chipW = 200;
    const chipH = 160;

    const goldGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    goldGrad.addColorStop(0, '#fcd34d');
    goldGrad.addColorStop(0.3, '#fbbf24');
    goldGrad.addColorStop(0.6, '#fef08a');
    goldGrad.addColorStop(1, '#d97706');

    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    roundRect(ctx, chipX, chipY, chipW, chipH, 16);
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Chip contact lines
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(chipX + chipW / 3, chipY);
    ctx.lineTo(chipX + chipW / 3, chipY + chipH);
    ctx.moveTo(chipX + (chipW * 2) / 3, chipY);
    ctx.lineTo(chipX + (chipW * 2) / 3, chipY + chipH);
    ctx.moveTo(chipX, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW, chipY + chipH / 2);
    ctx.stroke();

    // Chip center loop
    ctx.beginPath();
    ctx.arc(chipX + chipW / 2, chipY + chipH / 2, 28, 0, Math.PI * 2);
    ctx.stroke();

    // NFC Signal Waves next to chip
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    const nfcX = chipX + chipW + 40;
    const nfcY = chipY + chipH / 2;
    for (let r = 20; r <= 60; r += 16) {
      ctx.beginPath();
      ctx.arc(nfcX, nfcY, r, -Math.PI / 3, Math.PI / 3);
      ctx.stroke();
    }
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('NFC RFID READY', nfcX + 75, nfcY + 6);

    // ── 4. Monogram Logo Center: "SR" ──
    const logoY = 540;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    roundRect(ctx, 80, logoY, W - 160, 260, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Large Monogram
    ctx.font = '900 120px "Space Grotesk", sans-serif';
    ctx.fillStyle = 'rgba(204, 255, 0, 0.2)';
    ctx.textAlign = 'center';
    ctx.fillText('SR', W / 2, logoY + 160);
    ctx.textAlign = 'left';

    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('SANDI RIADY // HOMELAB & INFRASTRUCTURE', W / 2, logoY + 205);
    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ccff00';
    ctx.fillText('SECURITY BADGE • OPERATOR CLEARANCE', W / 2, logoY + 235);
    ctx.textAlign = 'left';

    // ── 5. System Specifications Matrix ──
    const specY = 840;
    const specs = [
      { label: 'ENGINEER', value: 'Sandi Riady' },
      { label: 'TITLE', value: 'IT Infrastructure Support & MIS Specialist' },
      { label: 'CORE STACK', value: 'Linux (Ubuntu/Debian) • Proxmox VE • Docker' },
      { label: 'SERVICES', value: 'Zimbra Mail • ERPNext • GLPI • n8n Automations' },
      { label: 'NETWORK', value: 'Tailscale • MikroTik • WireGuard VPN' },
      { label: 'CONTACT', value: 'riadysandi@gmail.com | +62 858-8492-6880' },
      { label: 'DOMAIN', value: 'https://sandiriady.my.id' }
    ];

    specs.forEach((s, idx) => {
      const y = specY + idx * 46;
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(s.label.padEnd(12, ' '), 80, y);

      ctx.fillStyle = idx === specs.length - 1 ? '#ccff00' : '#ffffff';
      ctx.fillText(`:  ${s.value}`, 220, y);
    });

    // ── 6. Bottom Hologram Seal Simulation ──
    const sealY = 1220;
    const sealHolo = ctx.createLinearGradient(80, sealY, W - 80, sealY + 110);
    sealHolo.addColorStop(0, 'rgba(204, 255, 0, 0.15)');
    sealHolo.addColorStop(0.3, 'rgba(56, 189, 248, 0.2)');
    sealHolo.addColorStop(0.6, 'rgba(139, 92, 246, 0.2)');
    sealHolo.addColorStop(1, 'rgba(204, 255, 0, 0.15)');

    ctx.fillStyle = sealHolo;
    ctx.beginPath();
    roundRect(ctx, 80, sealY, W - 160, 110, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('AUTHORIZED ACCESS ONLY • REVERSE SIDE SIGNATURE', W / 2, sealY + 45);
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('If found, return to systems owner: riadysandi@gmail.com', W / 2, sealY + 75);
    ctx.textAlign = 'left';

    resolve(canvas.toDataURL('image/png'));
  });
}

/**
 * Creates the repeating lanyard strap texture
 */
function createStrapTexture(): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve('');

    const W = canvas.width;
    const H = canvas.height;

    // Dark woven ribbon background
    ctx.fillStyle = '#0a0b12';
    ctx.fillRect(0, 0, W, H);

    // Fine woven texture lines
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let x = 0; x < W; x += 6) {
      ctx.fillRect(x, 0, 2, H);
    }

    // Top and bottom accent borders
    ctx.fillStyle = '#ccff00';
    ctx.fillRect(0, 0, W, 4);
    ctx.fillRect(0, H - 4, W, 4);

    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(0, 4, W, 2);
    ctx.fillRect(0, H - 6, W, 2);

    // Repeating text
    ctx.font = '900 38px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';

    const text = '★  SANDI RIADY  •  IT INFRASTRUCTURE SUPPORT  •  SYSTEMS ADMINISTRATOR  ';
    ctx.fillText(text, 20, H / 2);

    resolve(canvas.toDataURL('image/png'));
  });
}

// Helper: Rounded Rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
}

// Helper: Target crosshair
function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.strokeStyle = 'rgba(204, 255, 0, 0.6)';
  ctx.lineWidth = 2;
  const len = 10;
  ctx.beginPath();
  ctx.moveTo(x - len, y);
  ctx.lineTo(x + len, y);
  ctx.moveTo(x, y - len);
  ctx.lineTo(x, y + len);
  ctx.stroke();
}
