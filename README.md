# Saket Kumar Tiwari — Civil Engineering & Construction Management Portfolio

> **"Crafting Exceptional Spaces. Delivering Engineering Excellence."**  
> A bespoke, editorial portfolio website built for **Saket Kumar Tiwari**, civil engineer and construction management professional with 9+ years of documented experience delivering luxury residential developments, high-rise buildings, high-end interiors, and hospitality conversions across India.

---

## 🏛️ Project Architecture & Design System

The portfolio is designed with an editorial aesthetic inspired by leading contemporary architectural studios, high-end real estate publications, and luxury European construction monographs:

- **Color Palette**:
  - Background: Warm Ivory (`#FBF9F5`)
  - Secondary Surfaces: Pale Stone Grey (`#F2EFE9`, `#EDEAE3`)
  - Primary Text: Deep Charcoal (`#1A1B1E`)
  - Subdued Text: Architectural Slate & Taupe (`#595C62`, `#646770`)
  - Accent: Architectural Bronze (`#947854`, `#7D6444`)
  - Borders: Thin Stone Hairlines (`#E2DDD4`)
- **Typography**:
  - Headings & Monogram: **Cormorant Garamond** (Refined serif display)
  - Body & Technical Metrics: **Plus Jakarta Sans** (Contemporary, crisp sans-serif)
- **Visual Integrity**:
  - High-resolution architectural photography is paired with clear labels distinguishing illustrative architectural reference concepts from documented project facts.
  - Zero invented metrics, testimonials, or projects.

---

## 📑 Structure & Modular Components

All portfolio content is maintained in a centralized TypeScript file: [`src/data/portfolio.ts`](file:///Users/aryanjaiswal/Downloads/saket%20/src/data/portfolio.ts).

1. **[`Navbar`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/Navbar.tsx)**: Typographic "SKT" monogram, active section spy tracking, desktop navigation, and accessible mobile drawer menu.
2. **[`Hero`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/Hero.tsx)**: Cinematic villa photography background, high-contrast typography, dual CTAs ("Explore My Work" and "Get in Touch"), and subtle scroll indicator.
3. **[`ImpactStrip`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/ImpactStrip.tsx)**: Restrained professional statistics (9+ Years Experience, ₹700Cr+ Documented Project Value Delivered, 7 Professional Organizations & Experiences, 100% Quality Adherence).
4. **[`About`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/About.tsx)**: Split-screen editorial layout with architectural imagery, first-person narrative, and 4 execution pillars.
5. **[`Expertise`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/Expertise.tsx)**: 10 core engineering and management competencies with minimal line icons and deliverables.
6. **[`FeaturedProjects`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/FeaturedProjects.tsx)**: Image-led editorial project gallery with dynamic category filtering (Luxury Residential, High-Rise, Luxury Interiors, Hospitality).
7. **[`ProjectModal`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/ProjectModal.tsx)**: Interactive case study modal for deep-diving into execution standards, responsibilities, and documented outcomes.
8. **[`ExperienceTimeline`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/ExperienceTimeline.tsx)**: Chronological vertical career journey with exact dates from `Profile.pdf` and outcome-focused bullets.
9. **[`Achievements`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/Achievements.tsx)**: Documented metrics with strict employer attribution (15% delay reduction at Aamor Inox, 20% ISO compliance & 10% rework reduction at La Sorogeeka, 19 on-time launches & 12% procurement savings at OYO).
10. **[`Education`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/Education.tsx)**: Formal academic credentials (B.Tech Civil Engineering), Lean Six Sigma Green Belt (LSSGB I), professional training courses, and documented honors.
11. **[`Contact`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/Contact.tsx)**: Verified LinkedIn connection card, geography indicators, and an interactive contact form with honest validation and demonstration state.
12. **[`Footer`](file:///Users/aryanjaiswal/Downloads/saket%20/src/components/Footer.tsx)**: Minimalist footer with sitemap links, smooth back-to-top button, and copyright notice.

---

## 🛠️ Local Development & Scripts

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type check and production build
npm run build

# Run linter
npm run lint

# Start production server
npm run start -- -p 3000
```

---

## 📬 Contact Form Backend Integration Guide

The contact form in `src/components/Contact.tsx` is currently equipped with client-side validation and a demonstration response state. To wire this to an active email service or database, consider any of the following standard options:

### Option A: Resend API (Recommended)
1. Install Resend:
   ```bash
   npm install resend
   ```
2. Create an API route in `src/app/api/contact/route.ts`:
   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(req: Request) {
     const body = await req.json();
     await resend.emails.send({
       from: 'Inquiries <onboarding@resend.dev>',
       to: process.env.CONTACT_EMAIL || 'verified-email@domain.com',
       subject: `New Portfolio Inquiry: ${body.projectType} from ${body.name}`,
       text: `Name: ${body.name}\nOrganization: ${body.organization}\nEmail: ${body.email}\n\nMessage:\n${body.message}`
     });
     return Response.json({ success: true });
   }
   ```
3. Update `Contact.tsx` to `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })`.

### Option B: Formspree / Formspark (Zero-code backend)
Replace the form `onSubmit` with a direct POST to a Formspree endpoint:
```html
<form action="https://formspree.io/f/YOUR_ENDPOINT" method="POST">
```

---

## 📜 Verified Data Attribution
All role titles, dates, project scopes, credentials, and achievements strictly match the official **Profile.pdf** sourced from Saket Kumar Tiwari's LinkedIn credentials.
# Saket-Kumar-tiwari
