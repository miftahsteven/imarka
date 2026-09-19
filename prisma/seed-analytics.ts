import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PAGES = [
  { path: '/', title: 'Homepage — Experiences That Inspire' },
  { path: '/services', title: 'Our Services — 4 Pilar Strategis' },
  { path: '/experiences', title: 'Experiences & Portofolio — Studi Kasus' },
  { path: '/pages/sustainability-esg', title: 'Sustainability & ESG Commitment' },
  { path: '/about', title: 'About Us — 20+ Tahun Dedikasi' },
  { path: '/insights', title: 'Insights & News — Editorial Industri' },
  { path: '/contact', title: 'Contact & Inquiry — Penawaran Proyek' },
  { path: '/team', title: 'Our Team — Leadership & Produksi' },
  { path: '/gallery', title: 'Visual Archive — Galeri Acara' },
];

const SOURCES = [
  { source: 'Google (Organic Search)', sourceType: 'SEARCH', weight: 38 },
  { source: 'Instagram (@imarka.megalo)', sourceType: 'SOCIAL', weight: 26 },
  { source: 'LinkedIn Corporate', sourceType: 'SOCIAL', weight: 19 },
  { source: 'WhatsApp Direct Share', sourceType: 'SOCIAL', weight: 11 },
  { source: 'Direct / Organik (Company Profile)', sourceType: 'DIRECT', weight: 6 },
];

const DEVICES = [
  { device: 'DESKTOP', weight: 56 },
  { device: 'MOBILE', weight: 39 },
  { device: 'TABLET', weight: 5 },
];

function pickWeighted<T extends { weight: number }>(items: T[]): T {
  const total = items.reduce((acc, i) => acc + i.weight, 0);
  let random = Math.random() * total;
  for (const item of items) {
    if (random < item.weight) return item;
    random -= item.weight;
  }
  return items[0];
}

async function main() {
  console.log('Seeding authentic visitor analytics data for the last 14 days...');

  // Check if already seeded
  const count = await prisma.analyticsVisit.count();
  if (count > 500) {
    console.log(`Already has ${count} analytics records. Skipping seed.`);
    return;
  }

  const now = new Date();
  const records = [];

  // Generate for the last 14 days
  for (let dayOffset = 14; dayOffset >= 0; dayOffset--) {
    const dayDate = new Date(now);
    dayDate.setDate(dayDate.getDate() - dayOffset);

    // Base volume with weekday/weekend variance and growth trend
    const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;
    const growthMultiplier = 1 + (14 - dayOffset) * 0.04;
    const baseVisits = Math.round((isWeekend ? 140 : 260) * growthMultiplier + (Math.random() * 30 - 15));

    for (let i = 0; i < baseVisits; i++) {
      const src = pickWeighted(SOURCES);
      const dev = pickWeighted(DEVICES);
      const pageIndex = Math.floor(Math.random() * 100);
      let page = PAGES[0];
      if (pageIndex < 32) page = PAGES[0]; // Homepage
      else if (pageIndex < 54) page = PAGES[1]; // Services
      else if (pageIndex < 72) page = PAGES[2]; // Experiences
      else if (pageIndex < 82) page = PAGES[3]; // Custom Page: sustainability-esg
      else if (pageIndex < 90) page = PAGES[4]; // About
      else if (pageIndex < 95) page = PAGES[5]; // Insights
      else page = PAGES[6]; // Contact

      const hour = Math.floor(Math.random() * 15) + 8; // 08:00 to 23:00
      const minute = Math.floor(Math.random() * 60);
      const visitTime = new Date(dayDate);
      visitTime.setHours(hour, minute, Math.floor(Math.random() * 60));

      records.push({
        path: page.path,
        pageTitle: page.title,
        source: src.source,
        sourceType: src.sourceType,
        device: dev.device,
        browser: Math.random() > 0.4 ? 'Chrome' : Math.random() > 0.5 ? 'Safari' : 'Edge',
        country: 'Indonesia',
        city: Math.random() > 0.5 ? 'Jakarta' : Math.random() > 0.5 ? 'Surabaya' : 'Bandung',
        duration: Math.floor(Math.random() * 180) + 20,
        createdAt: visitTime,
      });
    }
  }

  console.log(`Inserting ${records.length} analytics events in batches...`);
  const chunkSize = 500;
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    await prisma.analyticsVisit.createMany({
      data: chunk,
    });
  }

  console.log('✓ Successfully seeded visitor analytics!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
