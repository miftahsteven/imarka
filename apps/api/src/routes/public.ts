import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { z } from 'zod';

const router = Router();

// GET /api/v1/public/site
router.get('/site', async (_req: Request, res: Response) => {
  try {
    const site = await prisma.siteSetting.findUnique({ where: { id: 'default' } });
    const navigation = await prisma.navigationItem.findMany({
      where: { isVisible: true, parentId: null },
      orderBy: { order: 'asc' },
      include: {
        children: {
          where: { isVisible: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return res.json({ site, navigation });
  } catch (err: any) {
    console.error('Error fetching site info:', err);
    return res.status(500).json({ error: 'Failed to fetch site settings' });
  }
});

// GET /api/v1/public/home
router.get('/home', async (_req: Request, res: Response) => {
  try {
    const site = await prisma.siteSetting.findUnique({ where: { id: 'default' } });
    const heroSlides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    const coreServices = await prisma.service.findMany({
      orderBy: { order: 'asc' },
      include: { capabilities: { orderBy: { order: 'asc' } } },
    });
    const featuredExperiences = await prisma.experience.findMany({
      where: { isFeatured: true, status: 'PUBLISHED' },
      orderBy: { order: 'asc' },
      take: 6,
    });
    const industries = await prisma.industry.findMany({
      orderBy: { order: 'asc' },
    });
    const latestInsights = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });
    const leadershipTeam = await prisma.teamMember.findMany({
      where: { category: 'LEADERSHIP' },
      orderBy: { order: 'asc' },
    });
    const clients = await prisma.client.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 3,
    });

    // Credibility, who we are, and how we work data from company profile
    const credibility = {
      yearsOfExperience: '20+ Years',
      industriesLabel: 'Multi-Industry',
      deliveryLabel: 'End-to-End',
      impactLabel: 'Impact Driven',
    };

    const whoWeAre = {
      title: 'IMARKA MEGALO INDONESIA',
      paragraphs: [
        'IMARKA Megalo Indonesia is a full-service experience and marketing solutions company with more than 20 years of proven track record in delivering impactful programs that engage audiences and create lasting value.',
        'We combine strategic thinking, creative ideas, and flawless execution to produce experiences that inspire, educate, and drive results.',
      ],
      highlightImage: '/images/hero-keynote.jpg',
    };

    const howWeWork = [
      { step: 1, title: 'Strategic Thinking', description: 'Deep situational analysis and strategic clarity aligning every program directly with client objectives.' },
      { step: 2, title: 'Creative Ideas', description: 'Bold, innovative concepts and spatial storytelling that capture attention and create emotional connection.' },
      { step: 3, title: 'Flawless Execution', description: 'Meticulous on-ground choreography, staging, timing, and technical mastery delivered without compromise.' },
      { step: 4, title: 'Meaningful Impact', description: 'Measurable resonance, elevated brand reputation, and long-lasting stakeholder connections.' },
    ];

    const latestHighlight = {
      title: 'Energizing Maluku',
      date: '12 September 2026',
      location: "Governor's Building, Ambon",
      description: 'Strategic high-level regional initiative and multi-stakeholder symposium connecting public leadership, clean energy transition, and local communities.',
      imageUrl: '/images/highlight-energizing-maluku-hd.jpg',
      slug: 'energizing-maluku',
    };

    return res.json({
      site,
      heroSlides,
      credibility,
      whoWeAre,
      coreServices,
      howWeWork,
      featuredExperiences,
      industries,
      latestHighlight,
      clients,
      testimonials,
      latestInsights,
      leadershipTeam,
    });
  } catch (err: any) {
    console.error('Error fetching home data:', err);
    return res.status(500).json({ error: 'Failed to fetch homepage data' });
  }
});

// GET /api/v1/public/services
router.get('/services', async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
      include: { capabilities: { orderBy: { order: 'asc' } } },
    });
    return res.json(services);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/v1/public/services/:slug
router.get('/services/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const service = await prisma.service.findUnique({
      where: { slug },
      include: { capabilities: { orderBy: { order: 'asc' } } },
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Also get related experiences
    const relatedExperiences = await prisma.experience.findMany({
      where: { serviceCategory: service.name, status: 'PUBLISHED' },
      take: 3,
      orderBy: { year: 'desc' },
    });

    return res.json({ service, relatedExperiences });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch service detail' });
  }
});

// GET /api/v1/public/experiences
router.get('/experiences', async (req: Request, res: Response) => {
  try {
    const { service, industry, year, search } = req.query;

    const where: any = { status: 'PUBLISHED' };
    if (service && service !== 'all') {
      where.serviceCategory = { contains: String(service), mode: 'insensitive' };
    }
    if (industry && industry !== 'all') {
      where.industry = { contains: String(industry), mode: 'insensitive' };
    }
    if (year && year !== 'all') {
      where.year = Number(year);
    }
    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { clientName: { contains: String(search), mode: 'insensitive' } },
        { summary: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const experiences = await prisma.experience.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { year: 'desc' }, { order: 'asc' }],
    });

    return res.json(experiences);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// GET /api/v1/public/experiences/:slug
router.get('/experiences/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const experience = await prisma.experience.findUnique({
      where: { slug },
      include: { media: { orderBy: { order: 'asc' } } },
    });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Related experiences
    const related = await prisma.experience.findMany({
      where: {
        id: { not: experience.id },
        serviceCategory: experience.serviceCategory,
        status: 'PUBLISHED',
      },
      take: 3,
      orderBy: { year: 'desc' },
    });

    return res.json({ experience, related });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch experience detail' });
  }
});

// GET /api/v1/public/insights
router.get('/insights', async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
    });
    return res.json(posts);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// GET /api/v1/public/insights/:slug
router.get('/insights/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const related = await prisma.post.findMany({
      where: {
        id: { not: post.id },
        status: 'PUBLISHED',
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    });

    return res.json({ post, related });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch post detail' });
  }
});

// GET /api/v1/public/gallery
router.get('/gallery', async (_req: Request, res: Response) => {
  try {
    const albums = await prisma.galleryAlbum.findMany({
      orderBy: { createdAt: 'desc' },
      include: { photos: { orderBy: { order: 'asc' } } },
    });
    return res.json(albums);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch gallery albums' });
  }
});

// GET /api/v1/public/team
router.get('/team', async (_req: Request, res: Response) => {
  try {
    const leadership = await prisma.teamMember.findMany({
      where: { category: 'LEADERSHIP' },
      orderBy: { order: 'asc' },
    });
    const production = await prisma.teamMember.findMany({
      where: { category: 'PRODUCTION' },
      orderBy: { order: 'asc' },
    });
    return res.json({ leadership, production });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// POST /api/v1/public/contact
const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phoneWhatsapp: z.string().optional(),
  serviceInterest: z.string().optional(),
  estimatedDate: z.string().optional(),
  estimatedBudget: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

router.post('/contact', async (req: Request, res: Response) => {
  try {
    const parsed = contactSchema.parse(req.body);
    const inquiry = await prisma.contactInquiry.create({
      data: {
        fullName: parsed.fullName,
        company: parsed.company || null,
        email: parsed.email,
        phoneWhatsapp: parsed.phoneWhatsapp || null,
        serviceInterest: parsed.serviceInterest || null,
        estimatedDate: parsed.estimatedDate || null,
        estimatedBudget: parsed.estimatedBudget || null,
        message: parsed.message,
        status: 'NEW',
      },
    });

    console.log(`[New Lead Inquiry Received] From ${inquiry.fullName} (${inquiry.email}) - Service: ${inquiry.serviceInterest}`);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Our team will contact you shortly.',
      inquiryId: inquiry.id,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('Contact form submission error:', err);
    return res.status(500).json({ error: 'Failed to submit contact inquiry' });
  }
});

// GET /api/v1/public/navigation
router.get('/navigation', async (req: Request, res: Response) => {
  try {
    const { location } = req.query;
    const whereClause: any = { isVisible: true, parentId: null };
    if (location && typeof location === 'string') {
      whereClause.location = location;
    }

    const items = await prisma.navigationItem.findMany({
      where: whereClause,
      orderBy: { order: 'asc' },
      include: {
        children: {
          where: { isVisible: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return res.json(items);
  } catch (err: any) {
    console.error('Error fetching public navigation:', err);
    return res.status(500).json({ error: 'Failed to fetch navigation' });
  }
});

// GET /api/v1/public/pages
router.get('/pages', async (_req: Request, res: Response) => {
  try {
    const pages = await prisma.customPage.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        heroImageUrl: true,
        excerpt: true,
        updatedAt: true,
      },
    });
    return res.json(pages);
  } catch (err: any) {
    console.error('Error fetching public pages:', err);
    return res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// GET /api/v1/public/pages/:slug
router.get('/pages/:slug', async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug);
    const page = await prisma.customPage.findUnique({
      where: { slug },
    });
    if (!page || page.status !== 'PUBLISHED') {
      return res.status(404).json({ error: 'Page not found' });
    }
    return res.json(page);
  } catch (err: any) {
    console.error('Error fetching public page:', err);
    return res.status(500).json({ error: 'Failed to fetch page' });
  }
});

// POST /api/v1/public/track
router.post('/track', async (req: Request, res: Response) => {
  try {
    const { path, pageTitle, referrer, utmSource, device = 'DESKTOP' } = req.body;
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }

    let source = 'Direct / Organik (Company Profile)';
    let sourceType = 'DIRECT';

    const ref = `${String(referrer || '')} ${String(utmSource || '')}`.toLowerCase();
    if (ref.includes('google')) {
      source = 'Google (Organic Search)';
      sourceType = 'SEARCH';
    } else if (ref.includes('instagram') || ref.includes('ig')) {
      source = 'Instagram (@imarka.megalo)';
      sourceType = 'SOCIAL';
    } else if (ref.includes('linkedin')) {
      source = 'LinkedIn Corporate';
      sourceType = 'SOCIAL';
    } else if (ref.includes('whatsapp') || ref.includes('wa.me') || ref.includes('wa')) {
      source = 'WhatsApp Direct Share';
      sourceType = 'SOCIAL';
    } else if (ref.trim().length > 0 && !ref.includes('localhost') && !ref.includes('imarka')) {
      source = 'Referral / External Partner';
      sourceType = 'REFERRAL';
    }

    await prisma.analyticsVisit.create({
      data: {
        path: String(path),
        pageTitle: pageTitle ? String(pageTitle) : null,
        source,
        sourceType,
        device: ['DESKTOP', 'MOBILE', 'TABLET'].includes(device) ? device : 'DESKTOP',
        browser: 'Browser User',
      },
    });

    return res.json({ success: true });
  } catch (err: any) {
    // Non-blocking telemetry
    return res.json({ success: false });
  }
});

export default router;

