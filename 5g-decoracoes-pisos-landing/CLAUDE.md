# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **5G Decorações**, a Brazilian flooring installation business. Built with vanilla HTML/CSS/JavaScript + Tailwind CSS. All content is in Brazilian Portuguese (pt-BR).

**Active version**: [index3.html](index3.html) - Use this as the primary file unless instructed otherwise.

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **CSS Framework**: Tailwind CSS (CDN - v3.x)
- **Icons**: Font Awesome 6.4.0 (CDN)
- **Fonts**: Inter (Google Fonts)
- **Email Service**: EmailJS (optional, client-side email sending)
- **No build system**: Direct browser execution, no bundler or package manager

## Key Files & Architecture

### Configuration Layer
- **[config.js](config.js)**: Single source of truth for WhatsApp number and EmailJS credentials
  - `CONFIG.whatsappNumber`: Brazilian phone number (11 digits with DDD)
  - `CONFIG.whatsappMessage`: Pre-filled WhatsApp message template
  - `CONFIG.emailjs`: EmailJS service configuration (publicKey, serviceId, templateId)

### Core Application Files
- **[script.js](script.js)**: Main application logic (~412 lines)
  - WhatsApp link generation and phone formatting
  - Form validation with Brazilian phone mask: `(XX) XXXXX-XXXX`
  - EmailJS integration with graceful fallback to WhatsApp
  - Lightbox gallery with keyboard navigation (←/→/Esc)
  - Intersection Observer animations for cards
  - Mobile menu toggle
  - Smooth scroll behavior

### HTML Structure
- **index3.html**: Current production version
- Other index files (index.html, index2.html, index4.html, etc.): Variants/backups

### Standard Landing Page Sections (in order)
1. **Navbar**: Fixed top navigation with logo, links, WhatsApp CTA
2. **Hero**: Full-width background image with primary CTA
3. **Serviços** (#servicos): Service offerings grid
4. **Diferenciais** (#diferenciais): Competitive advantages grid
5. **Galeria** (#galeria): Image gallery with lightbox modal
6. **Depoimentos** (#depoimentos): Customer testimonials
7. **Contato** (#contato): Contact form with Email + WhatsApp dual submission
8. **Footer**: Company info, social links, copyright

### Media Assets
- **5g/**: Directory containing all media files
  - `logo.png`: Company logo (used in navbar)
  - `.webp` images: Gallery photos of flooring installations
  - `.mp4` videos: Installation videos (if used)

## Common Development Patterns

### WhatsApp Integration
All WhatsApp links are dynamically generated from `CONFIG.whatsappNumber` with the following IDs:
- `#whatsapp-hero`, `#whatsapp-cta`, `#whatsapp-footer`, `#whatsapp-float`, `#whatsapp-nav`, `#whatsapp-nav-mobile`

Generated URL format:
```javascript
`https://wa.me/55${whatsappNumber}?text=${whatsappMessage}`
```

### Form Submission Flow
1. Client-side validation (script.js:73-96)
2. **If EmailJS configured**: Send via EmailJS API
3. **If EmailJS fails/unconfigured**: Show error, user contacts via WhatsApp button
4. Template parameters sent to EmailJS:
   - `from_name`, `from_phone`, `from_city`, `message`

### Lightbox Gallery System
- Images must have attribute: `data-gallery="gallery"`
- Modal elements required:
  - `#lightbox-modal`: Full-screen overlay
  - `#lightbox-image`: Active image display
  - `#lightbox-close`, `#lightbox-prev`, `#lightbox-next`: Navigation controls
  - `#current-index`, `#total-images`: Counter display
- Supports click, keyboard (←/→/Esc), and touch navigation

### Animation System
Uses Intersection Observer to fade-in cards on scroll:
- Target selectors: `#servicos .grid > div`, `#diferenciais .grid > div`
- Initial state: `opacity: 0; transform: translateY(20px)`
- Animation: `transition: opacity 0.6s ease, transform 0.6s ease`

## Development Workflow

### Local Development
Simply open [index3.html](index3.html) in a browser. No server required for basic functionality.

For EmailJS testing or to avoid CORS issues:
```bash
python -m http.server 8000
# or
npx serve
```

Then navigate to `http://localhost:8000`

### Deployment
No build step required. Upload these files to any static host:
- HTML files (index3.html)
- [script.js](script.js)
- [config.js](config.js)
- `5g/` directory (all media assets)

**Supported hosts**: Netlify, Vercel, GitHub Pages, traditional web hosting

### Configuration Changes

**Update WhatsApp number**:
1. Edit [config.js](config.js) → `CONFIG.whatsappNumber`
2. Format: 11 digits (DDD + 9 digits), e.g., `11987654321` for São Paulo
3. Changes apply globally across all WhatsApp links

**Configure EmailJS** (optional):
1. Create account at https://www.emailjs.com
2. Set up email service and template (see [EMAILJS_SETUP.md](EMAILJS_SETUP.md))
3. Update [config.js](config.js) → `CONFIG.emailjs` with:
   - `publicKey`, `serviceId`, `templateId`

## Accessibility & SEO Implementation

Based on [SEO_ACESSIBILIDADE_MELHORIAS.md](SEO_ACESSIBILIDADE_MELHORIAS.md):

- **ARIA attributes**: `role`, `aria-label`, `aria-expanded`, `aria-controls`, `aria-required`, `aria-labelledby`
- **Focus management**: All interactive elements have `:focus` states with Tailwind ring utilities
- **Skip link**: `#skip-to-content` for keyboard navigation
- **Semantic HTML**: `<main>`, `<section>`, `<nav>`, proper heading hierarchy (h1→h2→h3)
- **Meta tags**: Complete OpenGraph, Twitter Cards, Schema.org LocalBusiness structured data
- **Form accessibility**: `autocomplete` attributes, associated `<label>` elements

## Important Development Notes

- **Brazilian context**: All user-facing content is in pt-BR. Phone numbers follow Brazilian format (DDD + 9 digits)
- **No test suite**: Manual testing in browser required
- **No linting/formatting**: Maintain existing code style consistency
- **Tailwind classes**: Use CDN classes directly in HTML; no custom build configuration
- **Browser compatibility**: Target modern browsers (ES6+ support required)
- **Mobile-first**: Responsive breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`

## Documentation Files

- [README.md](README.md): User-facing instructions for WhatsApp configuration and basic customization
- [EMAILJS_SETUP.md](EMAILJS_SETUP.md): Step-by-step EmailJS integration guide
- [SEO_ACESSIBILIDADE_MELHORIAS.md](SEO_ACESSIBILIDADE_MELHORIAS.md): Accessibility and SEO improvements checklist
