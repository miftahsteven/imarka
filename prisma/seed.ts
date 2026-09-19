import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding IMARKA MEGALO INDONESIA database...');

  // 1. Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin123!', salt);

  await prisma.user.upsert({
    where: { email: 'admin@imarka-megalo.com' },
    update: {},
    create: {
      email: 'admin@imarka-megalo.com',
      name: 'Imarka Super Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✓ Admin user seeded');

  // 2. Site Setting
  await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'IMARKA MEGALO INDONESIA',
      tagline: 'Experiences That Inspire',
      description: 'We Create Meaningful Connections That Move People and Drive Impact. Over 20 Years of Excellence in Events, Communication & Experiences.',
      logoUrl: '/images/imarka-symbol.png',
      logoWhiteUrl: '/images/imarka-symbol.png',
      faviconUrl: '/images/imarka-symbol.png',
      contactEmail: 'emmy@imarka-megalo.com',
      contactPhone: '08569529955',
      contactWhatsapp: '628569529955',
      address: 'Jakarta, Indonesia',
      socialInstagram: 'https://instagram.com',
      socialLinkedin: 'https://linkedin.com',
      metaTitleDefault: 'IMARKA MEGALO INDONESIA — Experiences That Inspire',
      metaDescriptionDefault: 'Over 20 Years of Excellence in Events, Communication & Experiences. Turning Ideas into Impactful Experiences That Inspire Change.',
      ogImageDefault: '/images/hero-keynote.jpg',
    },
  });
  console.log('✓ Site settings seeded');

  // 3. Navigation
  const navItems = [
    { label: 'Home', url: '/', order: 1 },
    { label: 'About Us', url: '/about', order: 2 },
    { label: 'Services', url: '/services', order: 3 },
    { label: 'Experiences', url: '/experiences', order: 4 },
    { label: 'Insights', url: '/insights', order: 5 },
    { label: 'Gallery', url: '/gallery', order: 6 },
    { label: 'Our Team', url: '/team', order: 7 },
    { label: 'Contact', url: '/contact', order: 8 },
  ];

  for (const item of navItems) {
    const existing = await prisma.navigationItem.findFirst({ where: { label: item.label, parentId: null } });
    if (!existing) {
      await prisma.navigationItem.create({
        data: item,
      });
    }
  }
  console.log('✓ Navigation items seeded');

  // 4. Hero Slides
  const heroSlides = [
    {
      eyebrow: 'EXPERIENCES THAT INSPIRE',
      headline: 'We Create Meaningful Connections That Move People and Drive Impact.',
      subheadline: 'Over 20 Years of Excellence in Events, Communication & Experiences. Turning Ideas into Impactful Experiences That Inspire Change.',
      primaryCtaText: 'Explore Our Experiences',
      primaryCtaUrl: '/experiences',
      secondaryCtaText: "Let's Collaborate",
      secondaryCtaUrl: '/contact',
      imageUrl: '/images/hero-keynote.jpg',
      order: 1,
      isActive: true,
    },
    {
      eyebrow: 'STRATEGIC BRANDING & ACTIVATION',
      headline: 'Brands That Connect. Campaigns That Deliver Results.',
      subheadline: 'Transforming corporate vision into high-engagement media events, roadshows, and multi-channel marketing campaigns.',
      primaryCtaText: 'Explore Branding',
      primaryCtaUrl: '/services/branding-marketing',
      secondaryCtaText: 'View Case Studies',
      secondaryCtaUrl: '/experiences',
      imageUrl: '/images/highlight-energizing-maluku-hd.jpg',
      order: 2,
      isActive: true,
    },
    {
      eyebrow: 'TRAINING & PEOPLE DEVELOPMENT',
      headline: 'People That Grow. Organizations That Excel.',
      subheadline: 'Empowering teams through tailored leadership development, corporate workshops, and impactful capability building.',
      primaryCtaText: 'Explore Training',
      primaryCtaUrl: '/services/training-development',
      secondaryCtaText: 'Get in Touch',
      secondaryCtaUrl: '/contact',
      imageUrl: '/images/highlight-gef8-bali-hd.jpg',
      order: 3,
      isActive: true,
    },
  ];

  for (const slide of heroSlides) {
    const existing = await prisma.heroSlide.findFirst({ where: { headline: slide.headline } });
    if (!existing) {
      await prisma.heroSlide.create({ data: slide });
    }
  }
  console.log('✓ Hero slides seeded');

  // 5. Services & Capabilities
  const services = [
    {
      slug: 'branding-marketing',
      name: 'Branding & Marketing Communication',
      shortDescription: 'Strategic marketing communication that builds brands and connects with people.',
      fullDescription: 'IMARKA Megalo provides end-to-end strategic marketing communication designed to elevate brand presence, sharpen market positioning, and create high-resonance dialogue with diverse consumer and institutional audiences. From press conferences and media relations to national brand activations and loyalty clubs, our solutions bridge creative vision and measurable business results.',
      iconName: 'Megaphone',
      heroImageUrl: '/images/event-arup-hd.jpg',
      isPillar: true,
      order: 1,
      capabilities: [
        'Strategic Marketing Communication',
        'Brand & Communication Strategy',
        'Media Event & Press Conferences',
        'Media Gathering, Press Trip & Monitoring',
        'Direct Marketing & Loyalty Programs',
        'Sampling & In-Store Promotion',
        'Custom Booth Design & Production',
      ],
    },
    {
      slug: 'event-experience',
      name: 'Event & Experience Solutions',
      shortDescription: 'Creative concepts and flawless execution of seamless events, conferences, and brand experiences.',
      fullDescription: 'With over two decades of track record executing state-level symposiums, international conferences, corporate gala summits, and nation-wide roadshows, IMARKA Megalo orchestrates events with absolute precision. We handle every detail—from concept ideation, stage architecture, lighting and multimedia production, to artist management and floor protocol.',
      iconName: 'CalendarCheck',
      heroImageUrl: '/images/highlight-energizing-maluku-hd.jpg',
      isPillar: true,
      order: 2,
      capabilities: [
        'Conferences, Seminars & Workshops',
        'Product Launches & Brand Reveals',
        'Annual Corporate Events & Award Ceremonies',
        'Exhibitions & Commercial Conventions',
        'School, University & Community Programs',
        'Nationwide Roadshows & Experiential Activations',
        'VIP & State Protocol Operations',
      ],
    },
    {
      slug: 'training-development',
      name: 'Training & People Development',
      shortDescription: 'Training, leadership development, and organizational capability programs.',
      fullDescription: 'Behind every winning organization are empowered people. IMARKA Megalo designs tailored human capital development interventions—from Frontliners Academy customer service excellence, managerial leadership incubators, to experiential team synergy retreats—transforming employee mindset and driving organizational performance.',
      iconName: 'Users',
      heroImageUrl: '/images/event-commonwealth-hd.jpg',
      isPillar: true,
      order: 3,
      capabilities: [
        'Corporate Training & Competency Development',
        'Leadership Development & Management Training',
        'Frontliners Academy & Service Excellence',
        'Organizational Capability Programs',
        'Interactive Skill Workshops & Team Synergy',
        'Custom Experiential Learning Programs',
      ],
    },
    {
      slug: 'procurement-solutions',
      name: 'Procurement Solutions',
      shortDescription: 'End-to-end procurement support for events, projects, and operational needs.',
      fullDescription: 'Leveraging our extensive network of verified suppliers and production partners across Indonesia, IMARKA provides transparent, compliant, and cost-efficient procurement services. We support corporate and institutional clients with specialized equipment sourcing, event merchandise, display fabrications, and turnkey logistics.',
      iconName: 'PackageCheck',
      heroImageUrl: '/images/event-pased-hd.jpg',
      isPillar: false,
      order: 4,
      capabilities: [
        'Event Production & Equipment Procurement',
        'Turnkey Merchandise & Collateral Sourcing',
        'Exhibition Booth & Custom Fabrication Materials',
        'Project Support & Supply Chain Logistics',
      ],
    },
  ];

  for (const s of services) {
    const existing = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (!existing) {
      await prisma.service.create({
        data: {
          slug: s.slug,
          name: s.name,
          shortDescription: s.shortDescription,
          fullDescription: s.fullDescription,
          iconName: s.iconName,
          heroImageUrl: s.heroImageUrl,
          isPillar: s.isPillar,
          order: s.order,
          capabilities: {
            create: s.capabilities.map((c, idx) => ({
              name: c,
              order: idx + 1,
            })),
          },
        },
      });
    }
  }
  console.log('✓ Services seeded');

  // 6. Industries
  const industries = [
    { name: 'Government & Public Sector', description: 'Ministries, provincial administrations, state-owned initiatives' },
    { name: 'Corporate', description: 'Multinational corporations, conglomerates, enterprise operations' },
    { name: 'Financial Services', description: 'Banking institutions, life insurance companies, investment networks' },
    { name: 'Healthcare', description: 'Pharmaceutical leaders, medical councils, public health initiatives' },
    { name: 'Education', description: 'Academic institutions, university roadshows, youth education programs' },
    { name: 'FMCG', description: 'Fast-moving consumer goods, retail brands, nationwide product sampling' },
    { name: 'Property', description: 'Real estate developers, architectural engineering, hospitality groups' },
    { name: 'Energy & Environment', description: 'Renewable energy consortiums, conservation dialogues, sustainability summits' },
  ];

  for (const ind of industries) {
    await prisma.industry.upsert({
      where: { name: ind.name },
      update: {},
      create: ind,
    });
  }
  console.log('✓ Industries seeded');

  // 7. Experiences / Portfolio
  const experiences = [
    {
      slug: 'energizing-maluku',
      title: 'Energizing Maluku',
      clientName: 'Pemerintah Provinsi Maluku & Strategic Stakeholders',
      year: 2026,
      location: "Governor's Building, Ambon",
      serviceCategory: 'Event & Experience Solutions',
      industry: 'Energy & Environment',
      coverImageUrl: '/images/highlight-energizing-maluku-hd.jpg',
      summary: "A high-level strategic regional initiative and energy symposium held at the Governor's Building in Ambon, bringing together regional leaders, environmental planners, and industry experts.",
      challenge: 'Coordinating an impactful state-level gathering with rigorous protocol, multi-stakeholder participation across eastern Indonesia, and high-impact media presence.',
      approach: 'Developed an inspiring visual identity, cinematic multimedia presentations, and synchronized on-site flow ensuring seamless coordination between regional dignitaries and delegates.',
      execution: 'Full turnkey execution covering stage fabrication, high-definition LED displays, live broadcast feeds, protocol assistance, and post-event reporting.',
      outcome: 'Successfully united key stakeholders around eastern Indonesia energy infrastructure roadmaps, gaining wide praise from provincial leadership.',
      isFeatured: true,
      order: 1,
    },
    {
      slug: 'gef-8-indonesia-national-dialogue',
      title: 'GEF-8 Indonesia National Dialogue',
      clientName: 'Ministry of Environment and Forestry (KLHK) & GEF',
      year: 2023,
      location: 'The Westin Resort Nusa Dua, Bali',
      serviceCategory: 'Event & Experience Solutions',
      industry: 'Government & Public Sector',
      coverImageUrl: '/images/highlight-gef8-bali-hd.jpg',
      summary: 'High-level multilateral national conference hosted by the Ministry of Environment and Forestry at The Westin Resort Nusa Dua, Bali to align national environmental priorities under GEF-8 funding.',
      challenge: 'Managing international-standard conference facilities, multilateral delegation requirements, and high security protocols in Bali.',
      approach: 'Designed an elegant, environmentally conscious stage and conference ambiance reflecting Indonesia biodiversity and international diplomacy standards.',
      execution: 'Managed registration systems, multi-track breakout sessions, VIP plenary proceedings, bilingual simultaneous interpretation, and gala dinners.',
      outcome: 'A smooth three-day convention that received highest commendation from international representatives and ministry leadership.',
      isFeatured: true,
      order: 2,
    },
    {
      slug: 'gerakan-waspada-cacingan',
      title: 'Gerakan Waspada Cacingan with PKX & First Lady',
      clientName: 'PKX & OASE Kabinet Kerja',
      year: 2019,
      location: 'Jakarta, Indonesia',
      serviceCategory: 'Branding & Marketing Communication',
      industry: 'Healthcare',
      coverImageUrl: '/images/event-cacingan-hd.jpg',
      summary: 'Nationwide public health advocacy campaign and community activation attended by the First Lady and leading pediatric health advocates.',
      challenge: 'Communicating critical public health hygiene awareness to thousands of school children and families in an engaging, memorable format.',
      approach: 'Created interactive educational games, mascot storytelling, and coordinated massive live demonstrations on healthy hygiene habits.',
      execution: 'Comprehensive event logistics, stage direction, VVIP First Lady security coordination, and national press conference.',
      outcome: 'Widespread national media coverage and engagement with over 10,000 direct participants and schools nationwide.',
      isFeatured: true,
      order: 3,
    },
    {
      slug: 'commonwealth-insurance-gathering',
      title: 'Commonwealth Insurance Gathering — Bali',
      clientName: 'Commonwealth Life Indonesia',
      year: 2019,
      location: 'Bali, Indonesia',
      serviceCategory: 'Event & Experience Solutions',
      industry: 'Financial Services',
      coverImageUrl: '/images/event-commonwealth-hd.jpg',
      summary: 'Star Awards & Sales Summit bringing together top national agents, financial advisors, and executive board members for a multi-day celebration.',
      challenge: 'Creating an inspiring and rewarding atmosphere that celebrates extraordinary sales milestones and motivates future performance.',
      approach: 'Thematic island gala experience combining motivational business sessions by day and spectacular entertainment awards night.',
      execution: 'Handled hotel accommodations, bespoke stage construction, dynamic theatrical lighting, customized trophy ceremonies, and live band performances.',
      outcome: 'Record-high attendee satisfaction rating and renewed enthusiasm across national sales agency teams.',
      isFeatured: true,
      order: 4,
    },
    {
      slug: 'arup-singapore-media-conference',
      title: 'ARUP Singapore — Media Conference',
      clientName: 'ARUP Singapore',
      year: 2019,
      location: 'Jakarta / Regional',
      serviceCategory: 'Branding & Marketing Communication',
      industry: 'Property',
      coverImageUrl: '/images/event-arup-hd.jpg',
      summary: 'International media conference and press engagement generating comprehensive print and online editorial coverage across national publications.',
      challenge: 'Distilling complex architectural and structural engineering concepts into engaging, press-friendly stories for business and lifestyle media.',
      approach: 'Targeted media relations campaign, customized media kits, and tailored Q&A briefing materials for ARUP leadership.',
      execution: 'Press conference management, exclusive one-on-one executive interviews, and media monitoring and sentiment analysis.',
      outcome: 'Secured extensive front-page and business section coverage across leading Indonesian national dailies and online portals.',
      isFeatured: false,
      order: 5,
    },
    {
      slug: 'garuda-indonesia-travel-fair',
      title: 'Garuda Indonesia End Year Travel Fair',
      clientName: 'PT Garuda Indonesia (Persero) Tbk',
      year: 2019,
      location: 'Jakarta Convention Center (JCC)',
      serviceCategory: 'Event & Experience Solutions',
      industry: 'Corporate',
      coverImageUrl: '/images/event-garuda-hd.jpg',
      summary: 'Flagship national travel fair and aviation exhibition managing thousands of daily visitors, travel agents, and partner bank booths.',
      challenge: 'Massive crowd management, complex multi-exhibitor logistics, and strict scheduling over a high-volume exhibition weekend.',
      approach: 'Optimized floor plan layouts, rapid badge scanning registration, and vibrant main-stage flight launch shows.',
      execution: 'Exhibition booth fabrication, sound reinforcement, queue management systems, and emergency operations protocol.',
      outcome: 'Flawless execution accommodating over 50,000 visitors and record holiday travel booking sales.',
      isFeatured: true,
      order: 6,
    },
    {
      slug: 'pased-baby-tissue-activation',
      title: 'PASED Baby Tissue Activation & Roadshow',
      clientName: 'PASED Brand Indonesia',
      year: 2020,
      location: 'Jabodetabek & Major Malls',
      serviceCategory: 'Branding & Marketing Communication',
      industry: 'FMCG',
      coverImageUrl: '/images/event-pased-hd.jpg',
      summary: 'High-touch consumer brand activation, sampling roadshow, and educational family booths promoting gentle baby care products.',
      challenge: 'Directly reaching modern mothers and families in high-traffic shopping centers with tactile product sampling.',
      approach: 'Created welcoming, pastel-hued pop-up nursery experience booths with sensory baby tissue demonstration stations.',
      execution: 'Turnkey fabrication of branded mobile booths, trained brand ambassadors, social media photobooths, and direct consumer giveaways.',
      outcome: 'Over 30,000 product trial samples distributed and substantial uplift in retail sales across partner hypermarkets.',
      isFeatured: false,
      order: 7,
    },
    {
      slug: 'mylea-hair-care-activation',
      title: 'Mylea Hair Care Brand Activation',
      clientName: 'Mylea Hair Care',
      year: 2020,
      location: 'Jakarta, Indonesia',
      serviceCategory: 'Branding & Marketing Communication',
      industry: 'FMCG',
      coverImageUrl: '/images/event-mylea-hd.jpg',
      summary: 'Interactive brand activation featuring hair consultation bars, salon influencer gatherings, and direct consumer trial zones.',
      challenge: 'Rejuvenating brand awareness among younger demographic while celebrating professional salon heritage.',
      approach: 'Integrated micro-influencer events with live scalp analysis diagnostics and instant styling transformations.',
      execution: 'Stage design, audiovisual setup, VIP beauty creator hospitality, and retail display integration.',
      outcome: 'Over 2 million social media impressions and strong positive sentiment for newly launched product lines.',
      isFeatured: false,
      order: 8,
    },
  ];

  for (const exp of experiences) {
    const existing = await prisma.experience.findUnique({ where: { slug: exp.slug } });
    if (!existing) {
      await prisma.experience.create({ data: exp });
    }
  }
  console.log('✓ Experiences seeded');

  // 8. Team Members (from PDF page 4)
  const team = [
    {
      name: 'Emmy Sidabutar',
      role: 'Project Director',
      bio: 'Leading strategic project execution, high-level client relations, and operational excellence across 20+ years of corporate event management.',
      imageUrl: '/images/team-emmy-hd.jpg',
      email: 'emmy@imarka-megalo.com',
      category: 'LEADERSHIP',
      order: 1,
    },
    {
      name: 'Nanang Suryana',
      role: 'Creative Director',
      bio: 'Leads creative strategy, concept development and visual execution with innovation and impact across branding and spatial experiences.',
      imageUrl: '/images/team-nanang-hd.jpg',
      email: 'nanang@imarka-megalo.com',
      category: 'LEADERSHIP',
      order: 2,
    },
    {
      name: 'Michael Siregar',
      role: 'Digital Support',
      bio: 'Provides digital strategy, content management, and technology support for maximum audience engagement.',
      imageUrl: '/images/team-michael-hd.jpg',
      email: 'michael@imarka-megalo.com',
      category: 'LEADERSHIP',
      order: 3,
    },
    // Production Team structure from company profile
    {
      name: 'Show Director & Team',
      role: 'Show Direction & Creative Flow',
      bio: 'Oversees overall show flow, run down, timing, and artistic direction for high-impact stage productions.',
      imageUrl: '/images/event-commonwealth-hd.jpg',
      category: 'PRODUCTION',
      order: 4,
    },
    {
      name: 'Stage Lead & Team',
      role: 'Stage Construction & On-Stage Ops',
      bio: 'Manages stage design, structural build, layout, and seamless backstage & on-stage operations.',
      imageUrl: '/images/highlight-energizing-maluku-hd.jpg',
      category: 'PRODUCTION',
      order: 5,
    },
    {
      name: 'Floor Lead & Team',
      role: 'Floor Logistics & Venue Operations',
      bio: 'Ensures smooth venue operations, crowd logistics, participant flow, and premium guest experience.',
      imageUrl: '/images/event-garuda-hd.jpg',
      category: 'PRODUCTION',
      order: 6,
    },
    {
      name: 'Exhibition Lead & Team',
      role: 'Exhibition & Booth Management',
      bio: 'Handles master exhibition planning, custom booth fabrications, and exhibitor relations.',
      imageUrl: '/images/event-pased-hd.jpg',
      category: 'PRODUCTION',
      order: 7,
    },
    {
      name: 'Technical Lead & Team',
      role: 'Technical, AV, Light & Sound',
      bio: 'Manages technical production, multimedia visuals, dynamic lighting, sound reinforcement, and live stream engineering.',
      imageUrl: '/images/highlight-gef8-bali-hd.jpg',
      category: 'PRODUCTION',
      order: 8,
    },
  ];

  for (const member of team) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }
  console.log('✓ Team members seeded');

  // 9. Posts / Insights
  const posts = [
    {
      slug: 'the-art-of-high-impact-corporate-events',
      title: 'The Art of High-Impact Corporate Events: Connecting Vision to Memory',
      excerpt: 'How modern enterprises transform standard meetings and summits into unforgettable brand experiences that mobilize stakeholders.',
      content: `<h2>Transforming Corporate Gatherings into Experiential Moments</h2><p>In today's fast-moving business ecosystem, corporate events can no longer afford to be mundane. When decision-makers gather, whether for an annual shareholders meeting, an international symposium, or an executive award summit, the environment must communicate purpose, momentum, and trust.</p><blockquote>"We don't simply manage events; we design moments that linger in the minds of attendees long after the lights fade."</blockquote><h3>1. Strategic Alignment from Inception</h3><p>Every lighting cue, keynote pacing, and stage dimension must reinforce the host organization's strategic narrative. By combining strategic thinking with creative stage architecture, companies create an emotional resonance that purely transactional events cannot match.</p><h3>2. Flawless Technical Choreography</h3><p>From crystal-clear sound reinforcement to synchronized LED visuals, the technical backbone of an event is what allows the human story to take center stage without distraction.</p>`,
      coverImageUrl: '/images/hero-keynote.jpg',
      category: 'Insights',
      authorName: 'IMARKA Editorial Team',
    },
    {
      slug: 'sustainable-initiatives-and-environmental-dialogues',
      title: 'Orchestrating Multilateral Environmental Summits: Lessons from GEF-8',
      excerpt: 'Key considerations in producing international environmental conventions that require diplomatic protocol and eco-conscious event practices.',
      content: `<h2>Setting the Stage for Global Environmental Action</h2><p>Hosting international dialogues such as the GEF-8 National Dialogue requires a harmonious blend of diplomatic protocol, seamless multi-room logistics, and conscious sustainable production.</p><h3>Eco-Friendly Event Practices</h3><p>From minimizing single-use print collaterals through digital delegates platforms to sourcing local sustainable materials for stage decorations, large events can demonstrate corporate social responsibility in action.</p>`,
      coverImageUrl: '/images/highlight-gef8-bali-hd.jpg',
      category: 'Event',
      authorName: 'Nanang Suryana',
    },
    {
      slug: 'empowering-frontliners-customer-experience-excellence',
      title: 'Frontliners Academy: Building Service Culture that Elevates Corporate Brands',
      excerpt: 'Why training front-facing teams is the highest return investment for corporate reputation and customer loyalty.',
      content: `<h2>Empowering the Human Face of Your Brand</h2><p>A corporate brand is only as strong as the real-world experience delivered by its frontliners. Through our Frontliners Academy programs, we equip service staff and brand ambassadors with empathy, crisis resolution tools, and deep pride in customer care.</p>`,
      coverImageUrl: '/images/event-commonwealth-hd.jpg',
      category: 'Training',
      authorName: 'Emmy Sidabutar',
    },
  ];

  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.post.create({ data: post });
    }
  }
  console.log('✓ Insights posts seeded');

  // 10. Gallery Albums
  const albums = [
    {
      title: 'Energizing Maluku Regional Summit',
      slug: 'energizing-maluku-summit',
      description: "Official event documentation at Governor's Building, Ambon.",
      date: 'September 2026',
      coverImageUrl: '/images/highlight-energizing-maluku-hd.jpg',
      category: 'Regional Summit',
      photos: [
        { url: '/images/highlight-energizing-maluku-hd.jpg', caption: 'Opening Plenary Session', order: 1 },
        { url: '/images/hero-keynote.jpg', caption: 'Keynote Address on Energy Infrastructure', order: 2 },
      ],
    },
    {
      title: 'GEF-8 Indonesia National Dialogue Bali',
      slug: 'gef-8-dialogue-bali',
      description: 'Multilateral conference hosted by Ministry of Environment and Forestry at Nusa Dua.',
      date: 'January 2023',
      coverImageUrl: '/images/highlight-gef8-bali-hd.jpg',
      category: 'Conference',
      photos: [
        { url: '/images/highlight-gef8-bali-hd.jpg', caption: 'Delegation Assembly at The Westin Bali', order: 1 },
        { url: '/images/event-arup-hd.jpg', caption: 'Stakeholder Workshop Sessions', order: 2 },
      ],
    },
    {
      title: 'Commonwealth Life Star Awards & Gathering',
      slug: 'commonwealth-life-awards',
      description: 'Annual sales celebration and executive summit in Bali.',
      date: '2019',
      coverImageUrl: '/images/event-commonwealth-hd.jpg',
      category: 'Corporate Award',
      photos: [
        { url: '/images/event-commonwealth-hd.jpg', caption: 'Gala Night Stage Celebration', order: 1 },
      ],
    },
    {
      title: 'Garuda Indonesia Travel Fair Operations',
      slug: 'garuda-indonesia-travel-fair-archive',
      description: 'Nationwide aviation exhibition at Jakarta Convention Center.',
      date: '2019',
      coverImageUrl: '/images/event-garuda-hd.jpg',
      category: 'Exhibition',
      photos: [
        { url: '/images/event-garuda-hd.jpg', caption: 'Exhibition Arena & Pavilion Operations', order: 1 },
      ],
    },
  ];

  for (const album of albums) {
    const existing = await prisma.galleryAlbum.findUnique({ where: { slug: album.slug } });
    if (!existing) {
      await prisma.galleryAlbum.create({
        data: {
          title: album.title,
          slug: album.slug,
          description: album.description,
          date: album.date,
          coverImageUrl: album.coverImageUrl,
          category: album.category,
          photos: {
            create: album.photos,
          },
        },
      });
    }
  }
  console.log('✓ Gallery albums seeded');

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
