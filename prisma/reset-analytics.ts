import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PAGES = [
  { path: '/', title: 'Homepage — Experiences That Inspire', weight: 32 },
  { path: '/services', title: 'Our Services — 4 Pilar Strategis', weight: 22 },
  { path: '/experiences', title: 'Experiences & Portofolio — Studi Kasus', weight: 17 },
  { path: '/pages/sustainability-esg', title: 'Sustainability & ESG Commitment', weight: 12 },
  { path: '/about', title: 'About Us — 20+ Tahun Dedikasi', weight: 9 },
  { path: '/contact', title: 'Contact & Inquiry — Penawaran Proyek', weight: 8 },
  { path: '/insights', title: 'Insights & News — Editorial Industri', weight: 6 },
];

const SOURCES = [
  { source: 'WhatsApp Direct Share', sourceType: 'SOCIAL', weight: 32 },
  { source: 'Google (Organic Search)', sourceType: 'SEARCH', weight: 28 },
  { source: 'LinkedIn Corporate', sourceType: 'SOCIAL', weight: 19 },
  { source: 'Instagram (@imarka.megalo)', sourceType: 'SOCIAL', weight: 14 },
  { source: 'Direct / Organik (Company Profile)', sourceType: 'DIRECT', weight: 7 },
];

const DEVICES = [
  { device: 'DESKTOP', weight: 54 },
  { device: 'MOBILE', weight: 41 },
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
  console.log('Resetting analytics visit records to realistic starter volume (not 4000an)...');

  // Clear previous records
  const deleted = await prisma.analyticsVisit.deleteMany({});
  console.log(`Deleted ${deleted.count} existing records.`);

  const now = new Date();
  const records = [];

  // Realistic daily counts for a newly launched corporate site over 14 days
  // Range: 5 to 16 visits/day -> Total ~145-155 visits
  const dailyCounts = [6, 8, 5, 7, 9, 10, 11, 8, 9, 12, 13, 14, 15, 16];

  for (let dayOffset = 13; dayOffset >= 0; dayOffset--) {
    const dayIndex = 13 - dayOffset;
    const targetCount = dailyCounts[dayIndex] || 10;

    const dayDate = new Date(now);
    dayDate.setDate(dayDate.getDate() - dayOffset);

    for (let i = 0; i < targetCount; i++) {
      const src = pickWeighted(SOURCES);
      const dev = pickWeighted(DEVICES);
      const page = pickWeighted(PAGES);

      const hour = Math.floor(Math.random() * 14) + 8; // 08:00 - 22:00
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
        duration: Math.floor(Math.random() * 160) + 30,
        createdAt: visitTime,
      });
    }
  }

  console.log(`Inserting ${records.length} realistic starter visits...`);
  await prisma.analyticsVisit.createMany({
    data: records,
  });

  const totalNow = await prisma.analyticsVisit.count();
  console.log(`✓ Analytics successfully reset! Total records now: ${totalNow}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
