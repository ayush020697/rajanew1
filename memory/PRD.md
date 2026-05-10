# Rajan Wines - Premium Liquor Store Website

## Project Overview
Premium liquor store website for Rajan Wines with elegant dark theme, wine red & gold accents, featuring an informational catalog of wines and spirits.

**Date Started:** February 10, 2026
**Project Type:** Informational Website (Frontend-only MVP)


## Changelog
- **Feb 10, 2026** - Logo refinement (circular, muted gold, halo, Cormorant Garamond serif), contact info standardised.
- **Feb 10, 2026** - Content & UX overhaul:
  - Header: enlarged premium circular logo (w-16/w-20).
  - Hero: new tagline "Great Drinks, Great Times — Only at Rajan Wines"; stats updated to 25+ Years / 50+ Stores / 1000+ Brands / 100% Authentic.
  - Collection: merged all wine variants into single "Wine — 50+"; updated counts (Whiskey 200+, Scotch & Single Malt 100+, Vodka 50+, Rum 50+, Gin 50+, Beer 100+); added new "Liquor 20+" category.
  - Why Choose Us: "Since 2001" tile replaced with "Variety of Premium Brands".
  - Special Offers: cards renamed → Corporate Offers, For Marriage & Special Occasions (no description), Party Offers (Special Combo Offers), Membership Benefits — all cards now redirect to /contact on click (both Home and /offers).
  - Stores page: added prominent Corporate Office (225 Jaipur House, Agra) & Warehouse Office (61 Sector 3, Transport Nagar, Agra) cards; replaced previous 7 generic city stores with 11 real branch cards (Rajan Model Shop / Rajan Wine & Beer Shop / Rajan Wine Shop) across Agra, Greater Noida, Ghaziabad, Farrukhabad, Hathras.
  - Get Directions buttons now deep-link to Google Maps search; Call Store deep-links via tel:.

---

## Original Problem Statement
Design a premium, modern liquor store website for brand "Rajan Wines".
- **Theme:** Elegant, luxury, dark background with gold & wine-red accents
- **Style:** Clean typography, classy UI, smooth animations
- **Pages:** Home, About Us, Stores, Our Collection, Offers, Why Choose Us, Contact, Responsible Drinking
- **Features:** Age verification, store locations, premium product cards, social media integration
- **Requirements:** Mobile responsive, fast-loading, visually attractive

---

## User Personas
1. **Premium Buyer** - Looking for authentic, high-quality wines and spirits
2. **Celebration Planner** - Needs bulk purchases for events
3. **Connoisseur** - Seeks rare and exclusive bottles
4. **Local Customer** - Wants to find nearest store location

---

## Architecture & Tech Stack

### Frontend
- **Framework:** React 19.0.0
- **Styling:** Tailwind CSS with custom dark theme
- **UI Components:** Shadcn/UI
- **Icons:** Lucide React
- **Routing:** React Router DOM v7.5.1
- **Build Tool:** Create React App with Craco

### Design System
- **Primary Color:** Amber/Gold (#D97706, #B45309)
- **Accent Color:** Wine Red (#8B1538)
- **Background:** Zinc (950, 900, 800)
- **Typography:** System fonts with elegant spacing
- **Animations:** Smooth transitions, hover effects, micro-interactions

---

## Features Implemented

### ✅ Phase 1 - Frontend MVP (Completed: Feb 10, 2026)

#### Pages Created
1. **Home Page**
   - Age verification modal
   - Hero section with brand messaging
   - Featured collections preview
   - Why Choose Us section
   - Special offers
   - Store locator preview
   - Newsletter subscription

2. **About Page**
   - Brand story and history
   - Company values
   - Mission statement
   - Statistics showcase

3. **Collection Page**
   - Featured products
   - 8 product categories
   - Category browsing

4. **Stores Page**
   - Interactive map placeholder
   - 7 store location cards
   - Store details (address, phone, timings)
   - Get directions functionality

5. **Offers Page**
   - Current promotions
   - Seasonal offers
   - Loyalty program info

6. **Contact Page**
   - Contact form
   - Contact information cards
   - Multiple communication channels

7. **Responsible Drinking Page**
   - Drinking guidelines
   - Important facts
   - Help resources

#### Components Built
- Header with responsive navigation
- Footer with social links
- Age Verification modal
- Hero section
- Collection preview cards
- Store locator cards
- Why Choose Us feature cards
- Newsletter subscription form

#### Mock Data Structure
- 7 store locations (Agra, Noida, Ghaziabad, Jaipur, Mathura, Hathras, Farrukhabad)
- 8 product categories
- 4 featured products
- 4 special offers
- 6 value propositions

---

## Mock Data (Frontend Only)

All data is currently stored in `/app/frontend/src/mock.js`:
- Store locations with placeholder addresses
- Product categories (Whisky, Red Wine, White Wine, Sparkling Wine, Vodka, Rum, Gin, Beer)
- Featured products
- Promotional offers
- Company values and features

**Contact Details (Placeholders):**
- Email: support@rajanwines.com
- Phone: +91-XXXXXXXXXX
- Social: @rajanwines

---

## Prioritized Backlog

### P0 (Critical for Launch)
- [ ] Backend API development
- [ ] Database schema for products and stores
- [ ] Contact form backend integration
- [ ] Admin panel for content management

### P1 (High Priority)
- [ ] Google Maps integration for store locator
- [ ] Newsletter email service integration
- [ ] Product search and filtering
- [ ] Store-specific inventory display
- [ ] SEO optimization

### P2 (Nice to Have)
- [ ] Virtual sommelier chatbot
- [ ] Product reviews and ratings
- [ ] Age verification with ID upload
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Product recommendation engine

---

## Next Action Items

1. **Backend Development:**
   - Set up MongoDB models for products, stores, contacts
   - Create REST API endpoints
   - Integrate contact form submissions
   - Newsletter subscription backend

2. **Third-party Integrations:**
   - Google Maps API for store locator
   - Email service (SendGrid/Mailchimp) for newsletter

3. **Content Population:**
   - Replace placeholder content with real data
   - Add actual store addresses and contact numbers
   - Upload real product images and descriptions

4. **Testing & Optimization:**
   - Cross-browser testing
   - Performance optimization
   - Accessibility audit

---

## Design Guidelines Followed

✅ Dark theme with amber and wine-red accents
✅ NO dark colorful gradients
✅ NO purple/pink/blue gradient combinations
✅ Lucide React icons (no emojis)
✅ Shadcn UI components
✅ Generous whitespace and padding
✅ Smooth animations and transitions
✅ Mobile responsive design
✅ Elegant typography
✅ Premium, luxury aesthetic

---

## Success Metrics

**User Experience:**
- Fast page load times (<2s)
- Intuitive navigation
- Mobile-friendly experience
- Clear call-to-actions

**Business Goals:**
- Increase store visits
- Build brand credibility
- Drive customer inquiries
- Newsletter signups

---

## Technical Notes

- Frontend runs on port 3000
- Hot reload enabled for development
- All images hosted on Unsplash CDN
- Age verification uses localStorage
- Fully responsive grid layouts

---

**Last Updated:** February 10, 2026
