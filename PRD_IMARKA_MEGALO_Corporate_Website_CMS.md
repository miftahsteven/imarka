# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## IMARKA MEGALO INDONESIA — Corporate Website + Headless CMS

**Document Version:** 1.0  
**Project:** IMARKA MEGALO Corporate Website  
**Product Type:** Corporate Profile Website + Custom Headless CMS  
**Primary Business:** Branding & Marketing Communication, Event Organizer & Experience, Training / People Development  
**Secondary Capability:** Procurement Support  
**Architecture:** Monorepo  
**Frontend:** Next.js + TypeScript  
**Backend API:** Node.js + TypeScript  
**CMS/Admin:** React + Vite + TypeScript  
**Database:** PostgreSQL  
**Status:** Ready for implementation / Antigravity development

---

# 1. Product Vision

Membangun website korporat IMARKA MEGALO INDONESIA yang tampil **modern, premium, kredibel, mature, dan setara corporate website perusahaan besar/BUMN Indonesia**, tetapi tetap terasa kreatif sebagai perusahaan yang bergerak di bidang branding, event, dan training.

Website harus berfungsi sebagai:

1. **Corporate credibility platform** — memperkuat kepercayaan calon client dan partner.
2. **Portfolio showcase** — menampilkan pengalaman lebih dari 20 tahun, event, activation, branding, training, dan berbagai engagement yang pernah dijalankan.
3. **Lead generation channel** — mendorong visitor melakukan inquiry melalui form, WhatsApp, email, atau meeting request.
4. **Brand storytelling platform** — menjelaskan value, pengalaman, cara kerja, service, team, dan impact IMARKA MEGALO.
5. **Content platform yang mudah dikelola** — seluruh konten penting dapat dikelola melalui CMS modern tanpa perlu developer.

Website **tidak boleh terlihat seperti template company profile generik**. Visual harus memiliki karakter kuat: corporate, editorial, experiential, clean, dan premium.

---

# 2. Source of Truth & Direction

## 2.1 Brand source

Gunakan materi company profile IMARKA MEGALO sebagai sumber utama untuk:

- Logo dan identitas visual.
- Warna brand merah, abu-abu/charcoal, putih.
- Narasi “Experiences That Inspire”.
- Company overview.
- Service categories.
- Industries served.
- Experience / portfolio.
- Team.
- Contact information.

Konten awal yang dapat digunakan sebagai seed berasal dari company profile IMARKA MEGALO.

## 2.2 Website reference direction

Website referensi yang diberikan client digunakan **hanya sebagai inspirasi UI/UX, hierarchy, composition, dan interaction pattern**.

Elemen visual yang dapat diadaptasi:

- White corporate navbar dengan CTA prominent.
- Hero besar dan cinematic.
- Hero carousel / highlighted message.
- Large typography.
- Service cards.
- Corporate statistics / credibility section.
- Portfolio / gallery showcase.
- Client / partner logo wall.
- Testimonials.
- Latest news / event cards.
- Strong CTA section.
- Corporate footer.
- Floating WhatsApp button.
- Modern interactive map atau industry/service visualization apabila relevan.

**PENTING:** Jangan menyalin claim, angka, nama client, copywriting, warna, atau konten milik website referensi. Website referensi hanya menjadi acuan visual dan UX.

---

# 3. Brand Positioning

## 3.1 Core positioning

IMARKA MEGALO INDONESIA adalah perusahaan experience dan marketing solutions dengan pengalaman lebih dari 20 tahun dalam menghasilkan program yang membangun koneksi, menggerakkan audiens, dan menciptakan impact.

### Primary positioning statement

> **Experiences That Inspire**
>
> We create meaningful connections that move people and drive impact.

### Supporting statement

> Over 20 Years of Excellence in Events, Communication & Experiences.

### Brand promise

> Turning ideas into impactful experiences that inspire change.

## 3.2 Brand personality

Website harus merepresentasikan karakter berikut:

- Experienced
- Strategic
- Creative
- Reliable
- Human
- Premium
- Collaborative
- Impact-driven
- Professional tanpa terlihat kaku

---

# 4. Visual Identity & Design System

## 4.1 Design principle

Gunakan prinsip visual:

**Corporate Precision + Creative Energy + Human Experience**

Hasil akhir harus terlihat seperti gabungan antara:

- corporate consulting company,
- event / experience agency,
- modern branding agency,
- professional training provider.

## 4.2 Recommended color palette

Warna berikut menjadi starting palette berdasarkan company profile dan logo. Final implementation harus tetap menyesuaikan asset logo asli apabila tersedia.

| Token | Suggested Color | Usage |
|---|---|---|
| `brand.red` | `#BE0F1C` | Primary brand, CTA, accent |
| `brand.redDark` | `#8F0A14` | Hover / deep accent |
| `brand.charcoal` | `#242629` | Heading / dark section |
| `brand.graphite` | `#4A4D52` | Secondary text |
| `brand.silver` | `#D9DADC` | Border / neutral decorative |
| `brand.light` | `#F5F5F4` | Section background |
| `brand.white` | `#FFFFFF` | Main background |
| `brand.black` | `#111214` | High contrast section |

Gunakan merah sebagai **accent premium**, bukan memenuhi seluruh layar.

## 4.3 Typography

Recommended:

- **Heading:** Plus Jakarta Sans / Manrope
- **Body:** Inter
- **Fallback:** system sans-serif

Style:

- Hero title besar: 56–80 px desktop.
- Section title: 38–56 px.
- Strong typographic hierarchy.
- Gunakan uppercase kecil untuk eyebrow label seperti `OUR SERVICES`, `OUR EXPERIENCE`, `WHO WE ARE`.

## 4.4 Shapes & visual language

Adaptasi karakter bentuk diagonal/angled yang ada pada company profile menjadi elemen digital:

- angled image mask,
- diagonal red accent,
- subtle line pattern,
- asymmetric image crops,
- layered cards,
- thin borders,
- subtle gradient from charcoal to transparent.

Jangan berlebihan menggunakan rounded card. Gunakan kombinasi corner radius 16–24 px dengan beberapa section yang lebih sharp agar tetap corporate.

## 4.5 Motion

Gunakan motion yang halus dan sophisticated:

- fade + upward reveal,
- stagger card animation,
- number counter,
- hover image zoom 1.02–1.04,
- underline / arrow microinteraction,
- hero carousel transition,
- marquee untuk partner/client logo apabila asset mencukupi,
- scroll-triggered portfolio reveal.

Durasi animasi 200–700 ms. Hindari animasi berlebihan yang memperlambat website.

---

# 5. Target Audience

Primary audience:

1. Corporate decision makers.
2. Government / public sector.
3. Marketing & Communication leaders.
4. HR / Learning & Development leaders.
5. Event & activation teams.
6. Procurement / project teams.
7. Financial services.
8. Healthcare.
9. Education.
10. FMCG.
11. Property.
12. Energy & Environment.

User harus dapat memahami dalam waktu kurang dari 10 detik:

- siapa IMARKA MEGALO,
- apa service utamanya,
- mengapa credible,
- bagaimana melihat portfolio,
- bagaimana menghubungi perusahaan.

---

# 6. Main Navigation

Recommended desktop navigation:

1. **Home**
2. **About Us**
3. **Services**
4. **Experiences**
5. **Insights**
6. **Gallery**
7. **Our Team**
8. **Contact**
9. Primary CTA: **Let’s Collaborate**

## 6.1 Services dropdown

Services memiliki mega menu / dropdown:

### Branding & Marketing Communication
- Brand & Communication Strategy
- Campaign & Activation
- Media Event
- Direct Marketing
- Loyalty & Member Program

### Event & Experience
- Corporate Event
- Conference & Seminar
- Product Launch
- Exhibition
- Annual / Award Event
- Roadshow
- School / Community Program

### Training & People Development
- Corporate Training
- Leadership Development
- Workshop
- Organizational Capability Program

### Supporting Capability
- Procurement Solutions

---

# 7. Information Architecture

Recommended routes:

```text
/
/about
/services
/services/[slug]
/experiences
/experiences/[slug]
/insights
/insights/[slug]
/gallery
/team
/contact
/privacy-policy
/terms
```

CMS routes:

```text
/admin/login
/admin
/admin/content/home
/admin/services
/admin/experiences
/admin/insights
/admin/gallery
/admin/team
/admin/clients
/admin/testimonials
/admin/media
/admin/navigation
/admin/site-settings
/admin/users
/admin/roles
/admin/audit-logs
```

---

# 8. Homepage Requirements

Homepage menjadi halaman paling kuat secara visual dan storytelling.

## Section 1 — Hero

Recommended structure:

**Eyebrow**  
`EXPERIENCES THAT INSPIRE`

**Headline**  
`We Create Meaningful Connections That Move People and Drive Impact.`

**Supporting copy**  
`Over 20 Years of Excellence in Events, Communication & Experiences.`

**CTA Primary**  
`Explore Our Experiences`

**CTA Secondary**  
`Let’s Collaborate`

### Hero visual direction

Gunakan:

- full-width editorial event photography,
- dark overlay / cinematic gradient,
- subtle red accent,
- diagonal/angled graphical shape dari visual brand,
- optional 3-slide carousel.

Recommended hero carousel:

**Slide 1 — Experiences That Inspire**  
Focus: overall brand.

**Slide 2 — Brands That Connect**  
Focus: branding & communication.

**Slide 3 — People That Grow**  
Focus: training / people development.

CMS harus dapat:

- add/edit/remove slide,
- reorder,
- set image/video,
- edit text,
- CTA,
- visibility,
- publish schedule.

---

## Section 2 — Credibility Strip

Tampilkan credibility secara ringkas.

Recommended content:

- **20+ Years** — Experience
- **Multi-Industry** — Government to Corporate
- **End-to-End** — Strategy to Execution
- **Impact Driven** — Experience with Purpose

Jangan mengarang jumlah client atau project apabila belum diberikan client.

---

## Section 3 — Who We Are

Suggested copy:

> IMARKA MEGALO INDONESIA is a full-service experience and marketing solutions company with more than 20 years of proven track record in delivering impactful programs that engage audiences and create lasting value.
>
> We combine strategic thinking, creative ideas, and flawless execution to produce experiences that inspire, educate, and drive results.

Layout:

- split 50:50,
- left: statement,
- right: curated event image / motion collage,
- link: `Discover IMARKA`.

---

## Section 4 — Core Services

Heading:

`Ideas Into Experiences. Experiences Into Impact.`

Tampilkan 3 primary cards besar:

### 1. Branding & Marketing Communication
Strategic branding and communication solutions designed to build relevance, strengthen brand presence, and connect meaningfully with audiences.

### 2. Event & Experience
From conferences and product launches to exhibitions and corporate gatherings, we design and execute seamless experiences from concept to completion.

### 3. Training & People Development
Training, leadership development, workshops, and capability programs designed to help people and organizations grow.

Secondary card kecil:

### Procurement Solutions
End-to-end procurement support for events, projects, and operational needs.

Interaction:

- image hover,
- animated arrow,
- service detail CTA,
- minimal icon treatment.

---

## Section 5 — How We Work

Gunakan 4-step visual flow dari company profile:

1. **Strategic Thinking**
2. **Creative Ideas**
3. **Flawless Execution**
4. **Meaningful Impact**

Desktop dapat menggunakan connected horizontal timeline. Mobile menjadi vertical steps.

---

## Section 6 — Featured Experiences

Heading:

`More Than 20 Years of Trust and Success.`

Featured content seed:

- Gerakan Waspada Cacingan with PKX & First Lady — 2019
- ARUP Singapore — Media Conference — 2019
- Commonwealth Insurance Gathering — Bali — 2019
- PASED Baby Tissue Activation & Roadshow — 2019–2020
- Garuda Indonesia End Year Travel Fair — 2019
- Mylea Hair Care Brand Activation — 2020
- GEF-8 Indonesia National Dialogue — 16–18 January 2023
- Energizing Maluku — 12 September 2026 — Governor’s Building, Ambon

Display:

- masonry / editorial grid,
- alternating large and small card,
- category badge,
- year,
- short excerpt,
- `View Experience`.

CMS dapat menentukan item `Featured`.

---

## Section 7 — Industries We Serve

Display as modern grid / interactive chips:

- Government & Public Sector
- Corporate
- Financial Services
- Healthcare
- Education
- FMCG
- Property
- Energy & Environment

Option desktop: visual industry orbit / horizontal interactive list.

---

## Section 8 — Latest Highlight

Dedicated highlight section untuk event terbaru.

Initial seed:

### Energizing Maluku
**12 September 2026**  
Governor’s Building, Ambon

Jadikan section ini mudah diganti dari CMS tanpa mengubah layout.

---

## Section 9 — Clients / Organizations

Logo wall yang clean dengan monochrome-to-color hover.

Requirements:

- Logo di-upload melalui CMS.
- Manual sorting.
- Optional category.
- Optional URL.
- Show/hide logo.
- Jangan menampilkan client tanpa approval / asset resmi.

---

## Section 10 — Testimonials

Tampilkan maksimal 3 cards di homepage.

Fields:

- quote,
- name,
- position,
- company,
- avatar,
- rating optional,
- visibility.

Gunakan testimonial asli saja. Jangan membuat testimonial dummy untuk production.

---

## Section 11 — Insights / News

3 latest content cards:

- News
- Event recap
- Thought leadership
- Training insight
- Branding insight

CTA: `View All Insights`

---

## Section 12 — Team Preview

Heading:

`The People Behind IMARKA MEGALO`

Seed team:

- Emmy Sidabutar — Project Director
- Nanang Suryana — Creative Director
- Michael Siregar — Digital Support

Summary production team roles:

- Show Director & Team
- Stage Lead & Team
- Floor Lead & Team
- Exhibition Lead & Team
- Technical Lead & Team

Homepage hanya menampilkan leadership / selected members. Full structure ada di Team page.

---

## Section 13 — Final CTA

Dark / red corporate CTA section.

Headline:

`Let’s Create an Experience That Inspires.`

Supporting text:

`Tell us your objective. We’ll help turn it into an experience that connects, engages, and makes a difference.`

CTA:

- `Start a Conversation`
- WhatsApp icon

---

# 9. About Us Page

Sections:

1. Hero — company positioning.
2. Company story.
3. 20+ years credibility.
4. Vision / philosophy.
5. Strategic Thinking → Creative Ideas → Flawless Execution → Meaningful Impact.
6. Core capabilities.
7. Industries served.
8. Team preview.
9. CTA.

Recommended copy source:

> IMARKA MEGALO INDONESIA is a full-service experience and marketing solutions company with more than 20 years of proven track record in delivering impactful programs that engage audiences and create lasting value.

---

# 10. Services Page

## 10.1 Services landing page

Large intro + 3 core service pillars + supporting procurement.

Each service should have:

- title,
- summary,
- hero image,
- icon,
- detail body,
- capabilities,
- relevant experience,
- gallery,
- CTA.

## 10.2 Branding & Marketing Communication

Capabilities seed:

- Strategic Marketing Communication
- Brand Activation
- Media Event
- Press Conference
- Media Gathering
- Press Trip
- Press Competition
- Media Monitoring & Reporting
- Direct Marketing
- Loyalty & Members Club
- In-store Promotion
- Sampling
- Booth Production

## 10.3 Event & Experience

Capabilities seed:

- Meetings
- Seminars
- Workshops
- Product Launches
- Annual Events
- Conventions
- Exhibitions
- School Programs
- Corporate Gathering
- Roadshow

## 10.4 Training & People Development

Capabilities seed:

- Training Programs
- Leadership Development
- Workshops
- Organizational Capability Programs
- Custom Learning Experiences

## 10.5 Procurement Solutions

Supporting capability:

- event procurement,
- project support,
- operational procurement.

---

# 11. Experiences / Portfolio

Portfolio adalah salah satu section terpenting.

## 11.1 Listing features

- Grid / masonry layout.
- Filter by service.
- Filter by industry.
- Filter by year.
- Search.
- Featured experience.
- Pagination / Load More.

## 11.2 Experience detail page

Fields:

- Project title.
- Client / organization.
- Year / date.
- Location.
- Service category.
- Industry.
- Hero media.
- Summary.
- Challenge.
- Approach.
- Execution.
- Outcome / impact.
- Gallery.
- Video URL optional.
- Related experiences.
- SEO metadata.

Important:

CMS tidak memaksa semua field diisi. Detail page harus gracefully hide field kosong.

---

# 12. Insights / News

Tujuan:

- membangun freshness,
- SEO,
- thought leadership,
- event recap,
- company update.

Categories:

- Company News
- Event
- Branding
- Training
- Insights

Article editor harus menggunakan WYSIWYG modern.

Article fields:

- title,
- slug,
- excerpt,
- cover image,
- category,
- tags,
- author,
- rich content,
- publish date,
- status,
- SEO title,
- SEO description,
- OG image,
- canonical URL optional.

---

# 13. Gallery

Gallery merupakan visual archive dari activity dan experience.

Features:

- album-based gallery,
- cover image,
- gallery title,
- date,
- category,
- project relation optional,
- multi image upload,
- drag & drop ordering,
- lightbox,
- lazy loading,
- image caption optional.

---

# 14. Team Page

Section 1 — leadership / core people.

Seed:

### Emmy Sidabutar
Project Director

### Nanang Suryana
Creative Director

Creative strategy, concept development, and visual execution.

### Michael Siregar
Digital Support

Digital strategy, content management, and technology support.

Section 2 — Production Team Structure:

- Show Director & Team
- Stage Lead & Team
- Floor Lead & Team
- Exhibition Lead & Team
- Technical Lead & Team

CMS dapat mengelola team member secara individual dan sorting.

---

# 15. Contact Page

Initial source contact:

- Email: `emmy@imarka-megalo.com`
- Phone / WhatsApp: `08569529955`
- Website: `www.imarka-megalo.com`

Contact page sections:

1. Contact intro.
2. Inquiry form.
3. WhatsApp quick contact.
4. Email.
5. Address / map apabila alamat resmi diberikan.
6. Social media links.

## Contact form fields

- Full Name *
- Company / Organization
- Email *
- WhatsApp / Phone
- Service Interest
- Event / Project Date optional
- Estimated Budget optional
- Message *
- Consent checkbox

Submission:

- store in database,
- send email notification,
- anti-spam,
- rate limiting,
- CMS status: New / Contacted / Qualified / Closed / Spam.

---

# 16. Footer

Footer structure:

### Brand
Logo + short positioning statement.

### Services
3 core services + procurement.

### Company
About, Experiences, Team, Insights.

### Contact
Email, WhatsApp, social media.

### Legal
Privacy Policy, Terms.

Bottom line:

`© IMARKA MEGALO INDONESIA. All rights reserved.`

---

# 17. CMS Product Requirements

CMS adalah custom CMS modern, bukan WordPress, tetapi UX dan content editing harus memiliki kemudahan yang setara atau lebih baik.

CMS fokus mengelola **konten yang memang penting**, bukan membebaskan user mengubah seluruh UI sehingga website mudah rusak.

Prinsip:

> **Structured content + flexible rich content + guarded page composition.**

Artinya:

- Layout inti dikontrol developer.
- Admin dapat mengubah konten, urutan, gambar, visibility, CTA, dan selected section.
- Rich content menggunakan WYSIWYG.
- Page builder hanya menggunakan block yang sudah disediakan.

---

# 18. CMS Modules

## 18.1 Dashboard

Dashboard menampilkan:

- Total published experiences.
- Draft content.
- Published insights.
- Contact inquiries.
- Recent activity.
- Quick create.
- Recent uploads.
- Content needing review.

Tidak perlu chart berlebihan.

## 18.2 Homepage Manager

Manage:

- Hero slides.
- Credibility items.
- Who We Are.
- Featured services.
- Featured experiences.
- Industries.
- Latest highlight.
- Selected clients.
- Testimonials.
- Latest insights.
- Team preview.
- CTA.

Support drag & drop ordering.

## 18.3 Service Management

CRUD:

- service,
- slug,
- category,
- short description,
- rich content,
- icon,
- hero image,
- gallery,
- capabilities,
- featured flag,
- ordering,
- SEO.

## 18.4 Experience Management

Full CRUD + draft/publish workflow.

## 18.5 Insights Management

WordPress-level content editing.

## 18.6 Gallery Management

Album + media management.

## 18.7 Team Management

CRUD + ordering + role + description.

## 18.8 Client Logo Management

Upload logo, display name, category, link, sorting, active status.

## 18.9 Testimonial Management

CRUD + publish visibility.

## 18.10 Contact Inquiry Management

- list,
- detail,
- status,
- notes,
- export CSV,
- delete / mark spam.

## 18.11 Navigation Management

CMS admin dapat:

- reorder menu,
- rename label,
- set internal/external URL,
- show/hide,
- choose parent menu.

Jangan izinkan arbitrary HTML pada navigation.

## 18.12 Site Settings

Manage:

- site name,
- logo light/dark,
- favicon,
- email,
- phone,
- WhatsApp,
- social links,
- company profile summary,
- footer content,
- default SEO,
- default OG image,
- analytics IDs,
- contact notification email.

---

# 19. WYSIWYG Editor Specification

Recommended editor: **Tiptap**.

WYSIWYG harus mendukung:

- paragraph,
- H2/H3/H4,
- bold,
- italic,
- underline,
- strike,
- bullet list,
- ordered list,
- blockquote,
- links,
- button link block,
- text alignment,
- image insert,
- image caption,
- image alt text,
- table,
- horizontal rule,
- callout,
- YouTube/Vimeo embed optional,
- undo/redo,
- drag blocks,
- fullscreen editor,
- source-safe sanitization.

Editor output:

- Primary: structured JSON.
- Optional rendered HTML cached by backend.

Security:

- HTML sanitization.
- Whitelist supported nodes.
- Prevent script / iframe injection except allowlisted embeds.

---

# 20. Publishing Workflow

Every important content entity supports:

```text
DRAFT
IN_REVIEW
SCHEDULED
PUBLISHED
ARCHIVED
```

Features:

- Save draft.
- Preview unpublished content.
- Publish now.
- Schedule publish.
- Unpublish.
- Revision history.
- Restore previous version.
- Author/editor information.
- Last edited timestamp.

---

# 21. Media Library

CMS Media Library harus terasa seperti WordPress modern.

Features:

- drag & drop upload,
- multiple upload,
- image preview,
- file metadata,
- alt text,
- caption,
- folder / collection optional,
- search,
- filter by type,
- file size,
- dimensions,
- usage reference,
- delete protection jika file sedang digunakan,
- image optimization.

Supported:

- JPG
- PNG
- WEBP
- AVIF
- SVG with sanitization
- PDF

Storage recommended:

- S3-compatible object storage.
- Cloudflare R2 / AWS S3 / MinIO.

Do not rely on local server storage for production.

---

# 22. User Management & RBAC

Roles recommended:

## Super Admin
Full access.

## Administrator
Full content + settings, limited system administration.

## Editor
Create/edit/publish content.

## Author
Create/edit own content, cannot publish unless permitted.

## Viewer
Read-only CMS access.

Permissions granular:

```text
content.read
content.create
content.update
content.delete
content.publish
media.manage
inquiries.manage
navigation.manage
settings.manage
users.manage
roles.manage
audit.read
```

---

# 23. CMS UX Requirements

CMS style:

- desktop-first but tablet usable,
- clean sidebar,
- global search,
- breadcrumbs,
- sticky action bar,
- unsaved changes warning,
- skeleton loading,
- toast feedback,
- destructive action confirmation,
- command palette optional,
- dark mode optional.

Recommended UI stack:

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Tiptap
- dnd-kit

---

# 24. Technology Architecture

## 24.1 Monorepo

Use:

- pnpm workspaces
- Turborepo

Recommended structure:

```text
imarka-megalo/
├── apps/
│   ├── web/                 # Next.js public website
│   ├── api/                 # Node.js backend API
│   └── cms/                 # Vite React CMS
│
├── packages/
│   ├── ui/                  # shared UI primitives where applicable
│   ├── types/               # shared TypeScript types
│   ├── validation/          # shared Zod schemas
│   ├── config/              # shared config
│   ├── eslint-config/
│   └── tsconfig/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── infra/
│   ├── docker/
│   ├── nginx/
│   └── scripts/
│
├── docs/
├── .github/workflows/
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

# 25. Frontend Specification

## apps/web

Use:

- Next.js current stable release
- App Router
- TypeScript strict mode
- Tailwind CSS
- next/image
- next/font
- React Server Components by default
- Client Component only when needed
- Motion for animation

Recommended frontend pattern:

- Server-side content fetch.
- ISR / cache tagging for content pages.
- Revalidation triggered after CMS publish.
- Static generation where possible.

Do not expose admin API secrets to browser.

---

# 26. Backend Specification

## apps/api

Recommended:

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Zod validation
- OpenAPI / Swagger
- JWT access token + secure refresh token
- Argon2 password hashing

API style:

REST API versioned:

```text
/api/v1/...
```

Public endpoints read-only. Admin endpoints require authorization.

---

# 27. Recommended API Design

## Public

```text
GET /api/v1/public/site
GET /api/v1/public/home
GET /api/v1/public/services
GET /api/v1/public/services/:slug
GET /api/v1/public/experiences
GET /api/v1/public/experiences/:slug
GET /api/v1/public/insights
GET /api/v1/public/insights/:slug
GET /api/v1/public/gallery
GET /api/v1/public/team
GET /api/v1/public/clients
GET /api/v1/public/testimonials
POST /api/v1/public/contact
```

## Auth

```text
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

## CMS CRUD

```text
/api/v1/admin/services
/api/v1/admin/experiences
/api/v1/admin/insights
/api/v1/admin/gallery
/api/v1/admin/team
/api/v1/admin/clients
/api/v1/admin/testimonials
/api/v1/admin/media
/api/v1/admin/navigation
/api/v1/admin/settings
/api/v1/admin/users
/api/v1/admin/roles
/api/v1/admin/inquiries
/api/v1/admin/audit-logs
```

---

# 28. Database Entities

Core entities:

```text
User
Role
Permission
UserRole
RolePermission

SiteSetting
NavigationItem
HeroSlide
HomepageSection
Service
ServiceCapability
Industry
Experience
ExperienceMedia
Post
PostCategory
PostTag
GalleryAlbum
MediaAsset
TeamMember
Client
Testimonial
ContactInquiry
ContentRevision
Redirect
AuditLog
```

## Important model behavior

All main content entities should support:

- `id` UUID
- `slug`
- `status`
- `sortOrder`
- `isFeatured`
- `publishedAt`
- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`

Use soft delete only where valuable; otherwise revision + archive is sufficient.

---

# 29. Content Revision System

Every publishable content update should create revision snapshot.

Store:

- entityType,
- entityId,
- version,
- snapshot JSON,
- change summary optional,
- createdBy,
- createdAt.

CMS provides:

- revision list,
- compare metadata,
- restore.

---

# 30. Search

Public site:

- experience search,
- insight search.

CMS:

- global content search.

Initial implementation can use PostgreSQL search (`ILIKE` / full-text search). No Elasticsearch required.

---

# 31. SEO Requirements

Mandatory:

- Dynamic title & meta description.
- Canonical URL.
- OG tags.
- Twitter card.
- Sitemap XML.
- robots.txt.
- Breadcrumb structured data.
- Organization schema.
- Article schema.
- Event schema where applicable.
- Image alt text.
- Human-readable slug.
- 301 redirect manager.

SEO should be manageable from CMS per page/content.

---

# 32. Performance Requirements

Target:

- Lighthouse Performance ≥ 90 on production representative pages.
- SEO ≥ 95.
- Accessibility ≥ 90.
- LCP < 2.5s on reasonable 4G.
- CLS < 0.1.

Implementation:

- AVIF/WebP.
- Responsive images.
- Lazy loading.
- Font optimization.
- Code splitting.
- Avoid huge client JS bundle.
- Server Components by default.
- Cache public content.

---

# 33. Accessibility

Minimum WCAG 2.1 AA direction.

Requirements:

- semantic HTML,
- keyboard navigation,
- visible focus state,
- sufficient contrast,
- alt text,
- accessible dialogs,
- aria-label for icon-only controls,
- reduced motion support.

---

# 34. Security

Mandatory:

- HTTPS production.
- secure cookies.
- CSRF protection where required.
- CORS allowlist.
- rate limiting.
- request validation.
- SQL injection protection via ORM.
- XSS sanitization for rich text.
- file upload validation.
- SVG sanitization.
- secure headers.
- Content Security Policy.
- audit logs.
- password policy.
- login brute-force protection.

Optional phase 2:

- TOTP 2FA.

---

# 35. Contact Form Security

Use:

- hidden honeypot,
- rate limit by IP,
- optional Cloudflare Turnstile,
- backend validation,
- email sanitization.

Do not expose SMTP credentials to frontend.

---

# 36. Analytics

Site settings can store:

- GA4 Measurement ID.
- Google Tag Manager ID.
- Meta Pixel ID optional.

Load only if configured.

Support cookie consent if tracking implementation requires it.

---

# 37. Audit Logging

Record sensitive CMS actions:

- login,
- failed login,
- publish,
- unpublish,
- delete,
- role change,
- settings update,
- restore revision.

Fields:

- actor,
- action,
- entity,
- entityId,
- metadata,
- IP,
- user agent,
- timestamp.

---

# 38. Deployment Architecture

Recommended domains:

```text
www.imarka-megalo.com     -> Next.js web
api.imarka-megalo.com     -> Node.js API
cms.imarka-megalo.com     -> Vite CMS
```

Recommended production:

- Nginx reverse proxy.
- Node services managed by PM2 or Docker.
- PostgreSQL dedicated database.
- Object storage for media.
- SSL via Let’s Encrypt / Cloudflare.

Monorepo must allow independent deployment of:

- `web`
- `api`
- `cms`

---

# 39. Docker & Local Development

Provide:

```text
docker-compose.yml
```

Local services:

- PostgreSQL
- MinIO optional
- Mailpit optional

Developer startup:

```bash
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Expected local ports example:

```text
web: 3000
api: 4000
cms: 5173
postgres: 5432
```

---

# 40. Environment Variables

Example:

```env
# Shared
NODE_ENV=development

# Web
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# API
PORT=4000
DATABASE_URL=postgresql://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
WEB_ORIGIN=http://localhost:3000
CMS_ORIGIN=http://localhost:5173

# Storage
S3_ENDPOINT=...
S3_REGION=...
S3_BUCKET=...
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
S3_PUBLIC_URL=...

# Mail
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
MAIL_FROM=...
CONTACT_NOTIFICATION_EMAIL=...

# Optional
TURNSTILE_SECRET_KEY=...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
```

Never commit actual secrets.

---

# 41. Seed Content

Seed initial production-style content using approved company profile content.

Minimum seed:

- Site settings.
- Main navigation.
- Homepage hero.
- 3 core services.
- Procurement support.
- Industries.
- Process steps.
- Existing experience list.
- Team data.
- Contact data.

Do not seed fake:

- testimonials,
- client counts,
- project counts,
- awards,
- partner logos,
- performance claims.

---

# 42. Responsive Requirements

Breakpoints:

- Mobile: 360+
- Tablet: 768+
- Desktop: 1024+
- Large: 1440+
- Wide: 1920+

Special attention:

- Hero title wrapping.
- Navigation mobile drawer.
- Gallery masonry fallback.
- Horizontal process to vertical process.
- CMS desktop/tablet usability.

---

# 43. Empty / Error States

Public:

- custom 404,
- 500 fallback,
- empty search result,
- unavailable content state.

CMS:

- empty list CTA,
- API error state,
- retry,
- loading state,
- unauthorized state,
- unsaved draft warning.

---

# 44. Acceptance Criteria — Public Website

Website dianggap memenuhi MVP jika:

- [ ] Homepage tampil premium, responsive, dan sesuai brand IMARKA.
- [ ] Navbar, dropdown, mobile navigation working.
- [ ] Hero carousel dapat dikelola CMS.
- [ ] Services listing dan detail working.
- [ ] Experiences listing, filter, dan detail working.
- [ ] Insights listing dan article detail working.
- [ ] Gallery working dengan lightbox.
- [ ] Team page working.
- [ ] Contact form tersimpan di database dan mengirim notifikasi.
- [ ] WhatsApp CTA working.
- [ ] SEO metadata dynamic.
- [ ] Sitemap dan robots working.
- [ ] CMS publish melakukan revalidation web.
- [ ] Semua media responsive dan optimized.
- [ ] Tidak ada lorem ipsum pada production seed.

---

# 45. Acceptance Criteria — CMS

- [ ] Secure login.
- [ ] RBAC working.
- [ ] Dashboard working.
- [ ] Homepage manager working.
- [ ] CRUD Services.
- [ ] CRUD Experiences.
- [ ] CRUD Insights.
- [ ] CRUD Gallery.
- [ ] CRUD Team.
- [ ] CRUD Clients.
- [ ] CRUD Testimonials.
- [ ] Media Library working.
- [ ] Navigation management working.
- [ ] Site Settings working.
- [ ] Contact inquiry management working.
- [ ] WYSIWYG editor working.
- [ ] Draft / review / publish workflow working.
- [ ] Content revision working.
- [ ] Preview unpublished content working.
- [ ] Audit log working.
- [ ] Form validation and user feedback complete.

---

# 46. UI Quality Rules

Antigravity / implementation agent MUST follow:

1. Jangan menghasilkan UI generik dengan semua section berupa card putih rounded.
2. Gunakan whitespace yang luas dan editorial.
3. Gunakan typography besar sebagai visual anchor.
4. Gunakan merah IMARKA sebagai accent terkontrol.
5. Gunakan foto experience/event yang kuat.
6. Hindari gradient warna-warni yang tidak sesuai brand.
7. Hindari icon stock yang berlebihan.
8. Semua section harus memiliki hierarchy yang jelas.
9. Desktop 1440 px harus terlihat polished.
10. Mobile bukan sekadar desktop yang diperkecil.
11. Gunakan real content dari company profile, bukan placeholder random.
12. Jangan menyalin visual identik dari website referensi.

---

# 47. Recommended Homepage Visual Sequence

```text
[Navbar]
[Hero Cinematic]
[Credibility Strip]
[Who We Are]
[Core Services]
[How We Work]
[Featured Experiences]
[Industries]
[Latest Highlight]
[Clients]
[Testimonials]
[Latest Insights]
[Team Preview]
[CTA]
[Footer]
[Floating WhatsApp]
```

---

# 48. Recommended CMS Sidebar

```text
Dashboard

Content
├── Homepage
├── Services
├── Experiences
├── Insights
├── Gallery
├── Team
├── Clients
└── Testimonials

Leads
└── Contact Inquiries

Assets
└── Media Library

Website
├── Navigation
├── Site Settings
├── SEO & Redirects
└── Preview

Administration
├── Users
├── Roles & Permissions
└── Audit Logs
```

---

# 49. Phase Plan

## Phase 1 — Foundation

- Monorepo.
- DB.
- Auth.
- RBAC.
- Design system.
- Base API.
- CMS shell.

## Phase 2 — Public Website Core

- Homepage.
- About.
- Services.
- Experiences.
- Team.
- Contact.

## Phase 3 — CMS Core

- Homepage manager.
- Content CRUD.
- Media library.
- WYSIWYG.
- Publishing.
- Preview.

## Phase 4 — Content & Growth

- Insights.
- Gallery.
- Client logo wall.
- Testimonials.
- SEO.
- Redirects.

## Phase 5 — Production Hardening

- performance,
- security,
- accessibility,
- analytics,
- backup,
- monitoring,
- deployment automation.

---

# 50. Definition of Done

Project dinyatakan production-ready ketika:

- public website memenuhi acceptance criteria,
- CMS dapat mengubah seluruh konten penting tanpa code deployment,
- build lint test pass,
- DB migration reproducible,
- seed tersedia,
- production env documented,
- backup strategy documented,
- no secrets committed,
- no broken links,
- no fake content,
- responsive QA complete,
- CMS permission QA complete,
- Lighthouse target reasonably achieved,
- client dapat menggunakan CMS tanpa developer untuk daily content update.

---

# 51. Final Product Direction

Hasil akhir website IMARKA MEGALO harus menyampaikan persepsi berikut kepada visitor:

> **“Perusahaan ini berpengalaman, memahami strategi, mampu mengeksekusi event besar, mengembangkan brand dan people, serta terlihat sangat reliable untuk menangani project corporate maupun institutional.”**

Visual tidak boleh terlalu “agency playful”, tetapi juga tidak boleh terlalu kaku seperti website pemerintahan.

Tone terbaik:

> **Established corporate experience company with modern creative execution.**

Tagline utama tetap:

# EXPERIENCES THAT INSPIRE

Dan ditutup dengan semangat:

> **Together, We Create Experiences That Inspire, Connect and Make a Difference.**

---

# 52. Antigravity Implementation Instruction

Gunakan dokumen ini sebagai **product and development source of truth**.

Prioritas implementasi:

1. Buat monorepo terlebih dahulu.
2. Definisikan Prisma schema dan API contract sebelum membangun seluruh UI CMS.
3. Buat reusable design token yang mengikuti brand IMARKA.
4. Implementasikan public homepage dengan kualitas visual production, bukan wireframe.
5. Implementasikan CMS berdasarkan structured content model.
6. Gunakan Tiptap sebagai rich text editor.
7. Implementasikan role & permission sejak awal.
8. Hindari hard-code content pada frontend kecuali fallback.
9. Semua konten utama harus berasal dari API/CMS.
10. Preview, draft, publish, dan revision harus dirancang sejak awal agar tidak menjadi technical debt.
11. Gunakan company profile IMARKA sebagai seed content.
12. Jangan mengarang client, testimonial, project count, award, atau angka pencapaian yang tidak tersedia di source material.

**Development objective:** menghasilkan corporate website yang secara visual layak dipresentasikan kepada perusahaan besar / BUMN dan secara teknis mudah dipelihara untuk jangka panjang.
