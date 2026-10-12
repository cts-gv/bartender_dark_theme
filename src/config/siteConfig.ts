/* ===============================================
 * SITE CONFIGURATION — EDIT THIS FILE TO CUSTOMIZE
 * ===============================================
 *
 * This is the single source of truth for all text,
 * images, videos, and contact info on the site.
 * Change values here and they update everywhere.
 *
 * IMAGE/VIDEO PATHS FOR CLOUDFLARE PAGES:
 * - Remote URLs (https://...) work as-is.
 * - Local files: place them in /public and reference
 *   with an absolute path like "/images/my-photo.jpg"
 *   (Cloudflare Pages serves /public at the root).
 * =============================================== */

export const siteConfig = {
  // ---- BUSINESS NAME (shown in nav, footer, hero) ----
  businessName: 'Business Name',
  tagline: 'Mobile Bartending',
  location: 'Sunnyside, Washington',

  // ---- HERO SECTION ----
  hero: {
    // VIDEO: Replace with your own video URL.
    // For a local file, put it in /public and use "/videos/cocktail.mp4"
    // This is a free Pexels stock video of a bartender making a cocktail.
    // NOTE: Use the direct .mp4 file URL, not a Pexels download page URL.
    videoUrl: 'https://videos.pexels.com/video-files/4485541/4485541-hd_1920_1080_25fps.mp4',
    // Poster image shown while video loads
    posterImage: 'https://images.pexels.com/photos/15750727/pexels-photo-15750727.jpeg?auto=compress&cs=tinysrgb&w=1920',
    headline: 'We Bring the Bar to You',
    subheadline: 'Premium mobile bartending for weddings, corporate events, and private celebrations in Sunnyside, Washington.',
    primaryCtaText: 'Book Your Event',
    secondaryCtaText: 'View Services',
  },

  // ---- SCROLLING BANNER (marquee under hero) ----
  banner: {
    // These words scroll across the screen in a continuous loop
    items: [
      'Weddings',
      'Corporate Events',
      'Private Parties',
      'Custom Cocktails',
      'Craft Mixology',
      'Full Bar Service',
      'Wine Service',
      'Signature Drinks',
    ],
  },

  // ---- ABOUT SECTION ----
  about: {
    // IMAGE: Replace with your own photo
    // Local file: put in /public and use "/images/about.jpg"
    image: 'https://images.pexels.com/photos/9199092/pexels-photo-9199092.jpeg?auto=compress&cs=tinysrgb&w=1200',
    // Parallax background image behind the about text
    parallaxImage: 'https://images.pexels.com/photos/17511065/pexels-photo-17511065.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'About Us',
    paragraphs: [
      'Business Name brings exceptional bartending directly to your venue. Based in Sunnyside, Washington, we serve the greater Yakima Valley and beyond with passion, professionalism, and a commitment to craft.',
      'From intimate gatherings to grand celebrations, our experienced team handles everything — from menu design and ingredient sourcing to setup, service, and cleanup. You relax and enjoy; we handle the rest.',
    ],
    stats: [
      { label: 'Events Served', value: '500+' },
      { label: 'Years Experience', value: '8' },
      { label: 'Signature Cocktails', value: '60+' },
      { label: 'Happy Clients', value: '100%' },
    ],
  },

  // ---- PROJECTS / GALLERY SECTION ----
  projects: {
    title: 'Recent Events',
    subtitle: 'A glimpse of the experiences we pour — from elegant weddings to vibrant private celebrations.',
    // Replace these images with your own event photos
    items: [
      {
        title: 'Vineyard Wedding',
        category: 'Wedding',
        image: 'https://images.pexels.com/photos/17315481/pexels-photo-17315481.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Full bar service for 150 guests at a scenic vineyard ceremony.',
      },
      {
        title: 'Corporate Gala',
        category: 'Corporate',
        image: 'https://images.pexels.com/photos/30206584/pexels-photo-30206584.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Premium cocktail bar for an evening of networking and celebration.',
      },
      {
        title: 'Garden Party',
        category: 'Private',
        image: 'https://images.pexels.com/photos/30232926/pexels-photo-30232926.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Signature cocktails and refreshing spritzes under the open sky.',
      },
      {
        title: 'Elegant Reception',
        category: 'Wedding',
        image: 'https://images.pexels.com/photos/16985164/pexels-photo-16985164.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Champagne tower and craft cocktail service for 200 guests.',
      },
      {
        title: 'Sunset Soiree',
        category: 'Private',
        image: 'https://images.pexels.com/photos/27176323/pexels-photo-27176323.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Tropical-inspired cocktails at a poolside birthday celebration.',
      },
      {
        title: 'Anniversary Dinner',
        category: 'Private',
        image: 'https://images.pexels.com/photos/10477132/pexels-photo-10477132.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Curated cocktail pairing menu for an intimate anniversary dinner.',
      },
    ],
  },

  // ---- SERVICES SECTION ----
  services: {
    title: 'What We Offer',
    subtitle: 'Tailored bar packages designed around your event, your taste, and your guests.',
    items: [
      {
        icon: 'Wine',
        title: 'Full Bar Service',
        description: 'A complete mobile bar with spirits, wine, beer, and mixers. Our team handles setup, service, and teardown.',
      },
      {
        icon: 'Martini',
        title: 'Signature Cocktails',
        description: 'Custom cocktail menus crafted around your theme, season, or brand. Each drink is a conversation starter.',
      },
      {
        icon: 'Users',
        title: 'Professional Staff',
        description: 'Licensed, experienced bartenders who deliver fast, friendly service with a smile — every single time.',
      },
      {
        icon: 'Package',
        title: 'Event Planning',
        description: 'We collaborate with your planner or venue to coordinate timing, layout, and beverage logistics seamlessly.',
      },
      {
        icon: 'GlassWater',
        title: 'Non-Alcoholic Options',
        description: 'Elevated mocktails and zero-proof cocktails so every guest enjoys something special.',
      },
      {
        icon: 'Truck',
        title: 'We Travel to You',
        description: 'Serving Sunnyside and the greater Yakima Valley. Distance is no obstacle to great drinks.',
      },
    ],
    // Parallax image behind the services section
    parallaxImage: 'https://images.pexels.com/photos/16807992/pexels-photo-16807992.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },

  // ---- CONTACT SECTION ----
  contact: {
    title: 'Get in Touch',
    subtitle: 'Ready to elevate your next event? Send us a message and we will respond within 24 hours.',
    // Replace with your actual contact details
    email: 'hello@businessname.com',
    phone: '(509) 555-0100',
    // Digits only, with country code. Used for the tel: link so it works on every phone.
    phoneHref: '+15095550100',
    // Options in the "Event type" dropdown. Keep in sync with EVENT_TYPES in functions/api/contact.ts
    eventTypes: ['Wedding', 'Corporate Event', 'Private Party', 'Other'],
    // Parallax background for the contact section
    parallaxImage: 'https://images.pexels.com/photos/27219794/pexels-photo-27219794.jpeg',
    social: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  },

  // ---- NAVIGATION LINKS ----
  navLinks: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
