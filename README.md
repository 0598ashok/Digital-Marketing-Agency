# Premium Digital Marketing Agency Website & SaaS Client Dashboard

A conversion-focused, modern, high-contrast website template built for digital agencies, combined with a premium client-facing portal dashboard.

## File Structure

```text
digital-marketing-agency/
├── assets/
│   ├── css/
│   │   ├── main.css         # Global design styles, variables, light/dark mode overrides
│   │   └── dashboard.css    # Dashboard panels layout and widget styling
│   └── js/
│       ├── main.js          # Interactive public page features, theme states, modals
│       └── dashboard.js     # Live chat replying, approvals center actions, Stripe pay, SVG charts
├── pages/
│   ├── about.html           # Agency values, leadership team list, certifications
│   ├── services.html        # Comprehensive offerings overview
│   ├── service-seo.html     # SEO detailing with timeline roadmaps
│   ├── service-ppc.html     # Paid ads detail with Google/Meta structures
│   ├── service-social.html  # Content, community, and influencer targets
│   ├── service-content.html # Blogging layouts and lead magnet tools
│   ├── service-email.html   # Email sequence mapping and automation drip structures
│   ├── service-cro.html     # Funnels optimizing and interactive Headline testing splits
│   ├── case-studies.html    # Success logs with interactive channel categories filters
│   ├── pricing.html         # Pricing matrices with interactive Monthly/Annual billing switcher
│   ├── resources.html       # Marketing hub (blogs, guides downloads)
│   ├── contact.html         # Contact details, office location pins, Calendly appointment wizard
│   └── login.html           # Client portal login credential gateway splash card
├── dashboard/
│   ├── index.html           # Dashboard Overview (Total leads, ROI, spent, live SVG metrics charts)
│   ├── campaigns.html       # Impressions, CPC, CPL, revenue attribution logs
│   ├── creatives.html       # Facebook/Google Display banners, feedback request log, client approvals
│   ├── reports.html         # Periodic performance summary downloads with loader states
│   ├── invoices.html        # Billing transactions grid, Stripe secure payment form simulator
│   ├── messaging.html       # Direct support inbox chat, auto-replies typing indicators simulator
│   ├── goals.html           # Target progress checklist tracks, milestone timelines
│   └── settings.html        # Profile company settings and notifications alert configurations
├── documentation/
│   └── instructions.md      # Developer guide detailing custom parameters config
├── index.html               # Main website landing page
└── README.md                # Project index and capabilities checklist
```

---

## High-Fidelity Features Checklist

1. **Light/Dark Mode Toggler:** Predefined CSS variables automatically switch components formatting.
2. **RTL Direction Support:** Floating widgets toggle logical properties and alignments dynamically.
3. **Interactive ROI Calculator:** Instant estimation updates of Leads, Revenue targets, and ROAS.
4. **Marketing Audit Tool (Lead Gen):** Multi-step audit questionnaire wizard producing scoring metrics.
5. **Interactive A/B Testing Simulator:** Simulates Headline conversions adjustments in real time on the CRO page.
6. **Dynamic Stripe Payments Simulator:** Card validations checkout mockup updating status from Pending to Paid.
7. **Interactive Creative Approvals Center:** Clients accept designs or trigger comments updates.
8. **Live Chat Simulator:** Multi-threaded inbox chat with auto-reply typing delays.
9. **Dynamic SVG Charts Rendering:** Renders line trends matching theme configurations dynamically.
10. **State Persistence System:** LocalStorage synchronizes changes (approvals, chats, payments, company name) across pages automatically.

---

## Quick Viewing Guide

Since this is a fully static vanilla HTML5/CSS3 template:
- Open `index.html` directly in any web browser to view, or
- Run a simple local HTTP server from the root directory:
  ```bash
  # Using Node.js
  npx static-server
  # OR Using Python
  python -m http.server 8000
  ```
