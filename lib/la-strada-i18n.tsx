"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";
export type Accent = "blue" | "cyan" | "green" | "yellow" | "red" | "purple";

export type Service = {
  title: string;
  shortTitle: string;
  description: string;
  accent: Accent;
  icon: "camera" | "film" | "sparkles" | "scissors" | "pen" | "share" | "code" | "megaphone";
};

export type SolutionPillar = {
  title: string;
  description: string;
  features: string[];
  accent: Accent;
  icon: "fingerprint" | "share" | "video" | "camera" | "target";
};

export type ReelChapter = {
  frame: string;
  title: string;
  service: string;
  body: string;
  accent: Accent;
};

export type AgencyStat = {
  value: string;
  label: string;
  accent: Accent;
};

export type AgencyValue = {
  title: string;
  description: string;
  accent: Accent;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  accent: Accent;
};

export type PortfolioFilter = {
  key: string;
  label: string;
};

export type PortfolioProject = {
  title: string;
  category: string;
  client: string;
  description: string;
  type: string;
  accent: Accent;
};

export type Testimonial = {
  content: string;
  author: string;
  role: string;
  company: string;
  accent: Accent;
};

export type EstimatorOption = {
  value: string;
  label: string;
};

export type PricingPlan = {
  name: string;
  description: string;
  price: string;
  accent: Accent;
  featured?: boolean;
  features: string[];
};

export type LaStradaContent = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  brand: {
    name: string;
    logo: string;
  };
  media: {
    heroVideo: string;
    heroPoster: string;
  };
  sourceSite: {
    url: string;
    email: string;
    facebook: string;
    phone: {
      display: string;
      href: string;
      whatsappLabel: string;
      whatsappHref: string;
      callLabel: string;
    };
    office: {
      country: string;
      address: string;
    };
  };
  hero: {
    brandName: string;
    agencyLabel: string;
    subtitle: string;
    tagline: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryLabel: string;
    scrollHint: string;
    sideNote: string;
    languageLabel: string;
  };
  servicesIntro: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  services: Service[];
  reelChapters: ReelChapter[];
  solutionPillarsIntro: {
    title: string;
    body: string;
  };
  solutionPillars: SolutionPillar[];
  agencyStory: {
    title: string;
    body: string;
    valuesTitle: string;
    valuesBody: string;
    visionTitle: string;
    vision: string;
    stats: AgencyStat[];
    values: AgencyValue[];
  };
  team: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    members: TeamMember[];
  };
  portfolio: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    filters: PortfolioFilter[];
    projects: PortfolioProject[];
  };
  testimonials: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    trustedByTitle: string;
    items: Testimonial[];
  };
  aiDemo: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    features: string[];
    calculatorTitle: string;
    labels: {
      projectType: string;
      complexity: string;
      timeline: string;
      teamSize: string;
    };
    options: {
      projectType: EstimatorOption[];
      complexity: EstimatorOption[];
      timeline: EstimatorOption[];
      teamSize: EstimatorOption[];
    };
    calculateButton: string;
    calculating: string;
    estimatedCost: string;
    currency: string;
    disclaimer: string;
  };
  pricing: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    save: string;
    perMonth: string;
    perYear: string;
    getStarted: string;
    customTitle: string;
    customSubtitle: string;
    contactSales: string;
    plans: PricingPlan[];
  };
  contactSection: {
    title: string;
    titleHighlight: string;
    body: string;
    ctaLabel: string;
    getInTouch: string;
    emailLabel: string;
    visitLabel: string;
    businessHoursLabel: string;
    businessHours: string;
    globalPresence: string;
    startProject: string;
    socialLabel: string;
    services: string[];
    budgets: string[];
    offices: Array<{
      country: string;
      address: string;
    }>;
    form: {
      name: string;
      email: string;
      company: string;
      service: string;
      budgetRange: string;
      projectDetails: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      companyPlaceholder: string;
      detailsPlaceholder: string;
      selectService: string;
      selectBudget: string;
      sendMessage: string;
      localNotice: string;
    };
    emailHref: string;
    facebookHref: string;
  };
  finalCta: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  footer: {
    brandName: string;
    brandDescription: string;
    stayUpdated: string;
    newsletterSubtitle: string;
    emailPlaceholder: string;
    madeWith: string;
    creditLabel: string;
    copyright: string;
    categoryTitles: {
      services: string;
      company: string;
      resources: string;
      industries: string;
    };
    links: {
      services: string[];
      company: string[];
      resources: string[];
      industries: string[];
    };
    legal: {
      privacyPolicy: string;
      termsOfService: string;
      cookiePolicy: string;
      gdprCompliance: string;
    };
  };
};

const staticBrand = {
  name: "LA STRADA",
  logo: "/brand/lastrada-logo.png",
};

const staticMedia = {
  heroVideo: "/media/hero-moon-reel.mp4",
  heroPoster: "/media/hero-moon-poster.svg",
};

const email = "info@lastrada.agency";
const emailHref = `mailto:${email}?subject=New%20project%20with%20LA%20STRADA`;
const facebookHref = "https://www.facebook.com/lastrada.marketing";
const phoneDisplay = "+962 7X XXX XXXX";
const phoneHref = "tel:+962700000000";
const whatsappHref = "https://wa.me/962700000000";

const en: LaStradaContent = {
  meta: {
    title: "LA STRADA | Marketing & Creative Solutions Agency",
    description:
      "LA STRADA is a creative marketing agency specializing in photography, content production, motion graphics, editing, graphic design, social media, web, and digital marketing.",
    keywords:
      "LA STRADA, LASTRADA Agency, creative agency, marketing agency, content production, photography, motion graphics, video editing, graphic design, social media management, web design, digital marketing",
  },
  brand: staticBrand,
  media: staticMedia,
  sourceSite: {
    url: "https://www.lastrada.agency/",
    email,
    facebook: facebookHref,
    phone: {
      display: phoneDisplay,
      href: phoneHref,
      whatsappLabel: "WhatsApp",
      whatsappHref,
      callLabel: "Call",
    },
    office: {
      country: "Jordan",
      address: "Irbid - Down Town - K . Talal .St",
    },
  },
  hero: {
    brandName: "LASTRADA",
    agencyLabel: "AGENCY",
    subtitle: "FOR CREATIVE SOLUTION",
    tagline: "not just a creative agency",
    ctaLabel: "Start Your Project",
    ctaHref: emailHref,
    secondaryLabel: "Explore the reel",
    scrollHint: "The reel begins below",
    sideNote: "A moving identity system for photography, content, motion, web, social, and marketing.",
    languageLabel: "AR",
  },
  servicesIntro: {
    title: "Beyond",
    titleHighlight: "Creation",
    subtitle: "We don’t just create ,we build brands that stand out and perform.",
  },
  services: [
    {
      title: "Photography",
      shortTitle: "Photo",
      description: "Professional photography that captures your brand essence and creates compelling visual narratives.",
      accent: "cyan",
      icon: "camera",
    },
    {
      title: "Content Production",
      shortTitle: "Content",
      description: "Concepts, scripts, shoots, and social-native production built to move across every channel.",
      accent: "blue",
      icon: "film",
    },
    {
      title: "Motion Graphics",
      shortTitle: "Motion",
      description: "Animated identity, explainers, launch films, and kinetic systems that make ideas feel alive.",
      accent: "purple",
      icon: "sparkles",
    },
    {
      title: "Editing",
      shortTitle: "Edit",
      description: "Sharp pacing, sound-led cuts, campaign reels, and visual rhythm for stories that land fast.",
      accent: "red",
      icon: "scissors",
    },
    {
      title: "Graphic Design",
      shortTitle: "Design",
      description: "Campaign design, brand assets, visual systems, and digital layouts with a premium finish.",
      accent: "yellow",
      icon: "pen",
    },
    {
      title: "Social Media",
      shortTitle: "Social",
      description: "Smart campaigns, content planning, account management, and community presence that turn engagement into results.",
      accent: "green",
      icon: "share",
    },
    {
      title: "Web",
      shortTitle: "Web",
      description: "Expressive websites, interfaces, landing pages, and digital experiences engineered for conversion.",
      accent: "cyan",
      icon: "code",
    },
    {
      title: "Digital Marketing",
      shortTitle: "Marketing",
      description: "Paid campaigns, launch strategy, content funnels, and performance thinking for measurable growth.",
      accent: "red",
      icon: "megaphone",
    },
  ],
  reelChapters: [
    {
      frame: "Frame 01",
      title: "Direct the first look.",
      service: "Photography + Content Production",
      body: "Every campaign starts with a visual signal: the frame, the pace, the story, and the reason to stop scrolling.",
      accent: "cyan",
    },
    {
      frame: "Frame 02",
      title: "Make the message move.",
      service: "Motion Graphics + Editing",
      body: "Animated systems, sharp cuts, and rhythm-led reels turn brand ideas into moments people can feel instantly.",
      accent: "purple",
    },
    {
      frame: "Frame 03",
      title: "Shape every touchpoint.",
      service: "Graphic Design + Social Media",
      body: "Design and publishing work together so the brand looks coherent, active, and unmistakably present.",
      accent: "yellow",
    },
    {
      frame: "Frame 04",
      title: "Build the digital stage.",
      service: "Web Design + Development",
      body: "Web experiences become the place where cinematic brand energy turns into action, trust, and conversion.",
      accent: "green",
    },
    {
      frame: "Frame 05",
      title: "Launch with momentum.",
      service: "Digital Marketing",
      body: "Strategy, content, and media performance align into a launch engine that keeps the story moving.",
      accent: "red",
    },
  ],
  solutionPillarsIntro: {
    title: "Beyond Creation",
    body: "We don’t just create ,we build brands that stand out and perform.",
  },
  solutionPillars: [
    {
      title: "Brand Identity",
      description: "Strategic visual identities that elevate your brand value and secure its market position.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
      accent: "blue",
      icon: "fingerprint",
    },
    {
      title: "Social Media Marketing",
      description: "Smart campaigns that turn engagement into results.",
      features: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics & Reporting"],
      accent: "green",
      icon: "share",
    },
    {
      title: "Video Production",
      description:
        "Cinematic video content that tells your story, captivates viewers, and delivers measurable business results.",
      features: ["Commercial Videos", "Podcast Videos", "Real Estate", "Event Coverage"],
      accent: "red",
      icon: "video",
    },
    {
      title: "Photography",
      description: "Professional photography that captures your brand essence and creates compelling visual narratives.",
      features: ["Product Photography", "Corporate Portraits", "Food Photography", "Commercial Shoots"],
      accent: "cyan",
      icon: "camera",
    },
    {
      title: "Digital Strategy",
      description: "Comprehensive digital strategies that align with your business goals and maximize your online presence.",
      features: ["Market Research", "Competitor Analysis", "Growth Hacking", "Performance Marketing"],
      accent: "purple",
      icon: "target",
    },
  ],
  agencyStory: {
    title: "About Our Story",
    body:
      "We are a collective of creative minds, strategic thinkers, and technology enthusiasts united by a shared vision: to create extraordinary brand experiences that leave lasting impressions and drive meaningful results.",
    valuesTitle: "Our Core Values",
    valuesBody: "",
    visionTitle: "Our Vision",
    vision: "At Lastrada, we guide our clients to achieve their marketing and sales goals through a creative path we strategically design for them.",
    stats: [
      { value: "500+", label: "Projects Completed", accent: "cyan" },
      { value: "150+", label: "Happy Clients", accent: "green" },
      { value: "25+", label: "Awards Won", accent: "yellow" },
      { value: "12+", label: "Years Experience", accent: "red" },
    ],
    values: [
      {
        title: "Innovation",
        description: "We push boundaries and embrace cutting-edge technologies to deliver groundbreaking creative solutions.",
        accent: "cyan",
      },
      {
        title: "Passion",
        description: "Our team is driven by genuine passion for creative excellence and client success.",
        accent: "red",
      },
      {
        title: "Results",
        description: "Every project is designed with measurable outcomes and business impact in mind.",
        accent: "green",
      },
      {
        title: "Global Vision",
        description: "We think globally while acting locally, creating campaigns that resonate across cultures.",
        accent: "purple",
      },
    ],
  },
  team: {
    title: "Meet Our",
    titleHighlight: "Team",
    subtitle: "",
    members: [
      {
        name: "Abdulrahman Al-Dabea",
        role: "CEO | Creative Leader | Visual Storyteller",
        bio: "With over 12 years of experience in the creative and media industry, I lead dynamic teams to craft impactful visual and marketing solutions. Passionate about photography and visual storytelling, I bring ideas to life that engage and inspire audiences.",
        accent: "cyan",
      },
      {
        name: "Al-Mounther Sobh",
        role: "Executive Manager | Advertising Campaign Specialist",
        bio: "With over 12 years of extensive experience in managing advertising campaigns, I lead projects that deliver measurable impact and creative results.",
        accent: "yellow",
      },
      {
        name: "Nada Mahmoud",
        role: "Art Director | Social Media Department",
        bio: "Over 8 years of experience in social media design and creative content development, with deep knowledge of the latest trends, design strategies, AI tools, and market insights to deliver impactful visual content.",
        accent: "purple",
      },
    ],
  },
  portfolio: {
    title: "Our",
    titleHighlight: "Creative Journey",
    subtitle:
      "Discover how we turn visions into reality. Browse our latest work and see the impact of creativity on brand growth",
    filters: [
      { key: "all", label: "All Work" },
      { key: "branding", label: "Branding" },
      { key: "video", label: "Video" },
      { key: "social", label: "Social Media" },
      { key: "motion", label: "Motion Graphics" },
      { key: "website", label: "Website" },
    ],
    projects: [
      {
        title: "Luxury Real Estate",
        category: "branding",
        client: "Premium Properties",
        description: "Complete brand identity and marketing campaign for luxury real estate developer",
        type: "Brand Identity",
        accent: "purple",
      },
      {
        title: "Tech Startup Launch",
        category: "video",
        client: "InnovateTech",
        description: "Product launch video and social media campaign for AI startup",
        type: "Video Production",
        accent: "cyan",
      },
      {
        title: "Fashion Brand Revival",
        category: "social",
        client: "Elite Fashion",
        description: "Social media strategy and content creation for fashion brand relaunch",
        type: "Social Media",
        accent: "red",
      },
      {
        title: "Corporate Identity System",
        category: "branding",
        client: "GlobalCorp",
        description: "Complete visual identity system for multinational corporation",
        type: "Brand Identity",
        accent: "blue",
      },
      {
        title: "Product Launch Campaign",
        category: "motion",
        client: "TechGiant",
        description: "Motion graphics and animation for product launch event",
        type: "Motion Graphics",
        accent: "yellow",
      },
      {
        title: "Hospitality Brand Experience",
        category: "photography",
        client: "Luxury Hotels",
        description: "Photography and brand experience design for luxury hotel chain",
        type: "Photography",
        accent: "green",
      },
    ],
  },
  testimonials: {
    title: "Client",
    titleHighlight: "Success Stories",
    subtitle: "Don't just take our word for it. Here's what our clients say about working with us.",
    trustedByTitle: "Trusted by Industry Leaders",
    items: [
      {
        content:
          "Working with this agency transformed our brand completely. Their creative vision and strategic approach delivered results beyond our expectations.",
        author: "David Miller",
        role: "CEO, TechInnovate",
        company: "Fortune 500 Technology Company",
        accent: "cyan",
      },
      {
        content:
          "The team's attention to detail and innovative approach helped us establish a strong market presence. Exceptional work quality and professional service.",
        author: "Sarah Chen",
        role: "Marketing Director, LuxuryHomes",
        company: "Premium Real Estate Developer",
        accent: "purple",
      },
      {
        content:
          "From concept to execution, they delivered a comprehensive brand strategy that elevated our market position and drove significant growth.",
        author: "Michael Rodriguez",
        role: "Founder, EliteFinance",
        company: "Financial Services Startup",
        accent: "yellow",
      },
    ],
  },
  aiDemo: {
    badge: "Smart Estimation",
    title: "Get Instant",
    titleHighlight: "Project Cost Estimates",
    subtitle:
      "Our intelligent system leverages data from hundreds of past projects to provide fast and reliable cost estimates tailored to your needs.",
    features: ["Instant cost estimation", "Based on 500+ projects", "Powered by AI insights"],
    calculatorTitle: "Project Cost Calculator",
    labels: {
      projectType: "projectType",
      complexity: "complexity",
      timeline: "timeline",
      teamSize: "teamSize",
    },
    options: {
      projectType: [
        { value: "web-app", label: "Web App" },
        { value: "mobile-app", label: "Mobile App" },
        { value: "ai-solution", label: "AI Solution" },
        { value: "custom-software", label: "Custom Software" },
      ],
      complexity: [
        { value: "simple", label: "Simple" },
        { value: "medium", label: "Medium" },
        { value: "complex", label: "Complex" },
      ],
      timeline: [
        { value: "urgent", label: "Urgent" },
        { value: "normal", label: "Normal" },
        { value: "flexible", label: "Flexible" },
      ],
      teamSize: [
        { value: "small", label: "1-3 Devs" },
        { value: "medium", label: "4-6 Devs" },
        { value: "large", label: "7+ Devs" },
      ],
    },
    calculateButton: "Calculate Cost",
    calculating: "Calculating...",
    estimatedCost: "Estimated Cost",
    currency: "EGP",
    disclaimer: "*Actual cost may vary depending on specific requirements",
  },
  pricing: {
    title: "Choose Your",
    titleHighlight: "Plan",
    subtitle: "Flexible pricing options designed to grow with your business and deliver exceptional value.",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "Save 17%",
    perMonth: "month",
    perYear: "year",
    getStarted: "Get Started",
    customTitle: "Need a Custom Solution?",
    customSubtitle: "We create tailored packages for enterprise clients with specific requirements and larger scale projects.",
    contactSales: "Contact Sales Team",
    plans: [
      {
        name: "Starter",
        description: "Perfect for startups and small businesses looking to establish their brand presence.",
        price: "",
        accent: "cyan",
        features: [
          "Brand Identity Package",
          "Social Media Strategy",
          "Basic Website Design",
          "Content Creation (10 posts/month)",
          "Monthly Performance Reports",
          "Email Support",
        ],
      },
      {
        name: "Professional",
        description: "Comprehensive solution for growing businesses ready to scale their marketing efforts.",
        price: "",
        accent: "purple",
        featured: true,
        features: [
          "Everything in Starter",
          "Video Production (2 videos/month)",
          "Advanced Analytics & Reporting",
          "Paid Advertising Management",
          "Content Creation (25 posts/month)",
          "Dedicated Account Manager",
          "Priority Support",
        ],
      },
      {
        name: "Enterprise",
        description: "Complete marketing ecosystem for established companies seeking market dominance.",
        price: "",
        accent: "red",
        features: [
          "Everything in Professional",
          "Custom Strategy Development",
          "Unlimited Content Creation",
          "Advanced Motion Graphics",
          "Multi-platform Campaigns",
          "Executive Team Access",
          "24/7 Premium Support",
        ],
      },
    ],
  },
  contactSection: {
    title: "Let's Create Something",
    titleHighlight: "Amazing",
    body: "Ready to transform your brand? Get in touch and let's discuss how we can bring your vision to life.",
    ctaLabel: "Start Your Project",
    getInTouch: "Get In Touch",
    emailLabel: "Email Us",
    visitLabel: "Visit Us",
    businessHoursLabel: "Business Hours",
    businessHours: "",
    globalPresence: "Global Presence",
    startProject: "Start Your Project",
    socialLabel: "",
    services: ["Marketing", "Web & App", "Branding", "Production", "Events Planning"],
    budgets: ["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k - $250k", "$250k+"],
    offices: [
      {
        country: "Jordan",
        address: "Irbid - Down Town - K . Talal .St",
      },
    ],
    form: {
      name: "Name *",
      email: "Email *",
      company: "Company",
      service: "Service *",
      budgetRange: "Budget Range",
      projectDetails: "Project Details *",
      selectService: "Select a service",
      selectBudget: "Select budget range",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your@email.com",
      companyPlaceholder: "Your company name",
      detailsPlaceholder: "Tell us about your project goals, timeline, and any specific requirements...",
      sendMessage: "Send Message",
      localNotice: "",
    },
    emailHref,
    facebookHref,
  },
  finalCta: {
    title: "Let your next campaign feel impossible to ignore.",
    body:
      "From strategy and identity to production, social, web, and performance, the final output should feel authored from the first frame to the last click.",
    ctaLabel: "Start a project",
    ctaHref: emailHref,
  },
  footer: {
    brandName: "LASTRADA",
    brandDescription:
      "We are a premier creative agency dedicated to crafting extraordinary brand experiences that captivate audiences and drive measurable results for forward-thinking companies.",
    stayUpdated: "Stay Updated",
    newsletterSubtitle: "Get the latest insights, trends, and exclusive content delivered to your inbox.",
    emailPlaceholder: "Enter your email",
    madeWith: "Made with",
    creditLabel: "",
    copyright: "© 2024 www.lastrada.agency. All rights reserved.",
    categoryTitles: {
      services: "Services",
      company: "Company",
      resources: "Resources",
      industries: "Industries",
    },
    links: {
      services: ["Brand Identity", "Social Media Marketing", "Video Production", "Motion Graphics", "Photography", "Digital Strategy"],
      company: ["About Us", "Our Team", "Careers", "News & Updates", "Case Studies", "Contact"],
      resources: ["Blog", "Design Resources", "Industry Reports", "Client Portal", "Support Center", "Privacy Policy"],
      industries: ["Technology", "Real Estate", "Luxury Brands", "Healthcare", "Financial Services", "E-commerce"],
    },
    legal: {
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      gdprCompliance: "GDPR Compliance",
    },
  },
};

const ar: LaStradaContent = {
  meta: {
    title: "لاسترادا | وكالة التسويق والحلول الإبداعية",
    description:
      "لاسترادا للحلول التسويقية والإبداعية تقدم خدمات التصوير، صناعة المحتوى، الموشن جرافيك، المونتاج، التصميم، إدارة السوشيال ميديا، تصميم المواقع، والتسويق الإلكتروني.",
    keywords:
      "لاسترادا, وكالة إبداعية, شركة تسويق, صناعة محتوى, تصوير, موشن جرافيك, مونتاج, تصميم جرافيك, إدارة سوشيال ميديا, تصميم مواقع, تسويق إلكتروني",
  },
  brand: staticBrand,
  media: staticMedia,
  sourceSite: {
    url: "https://www.lastrada.agency/",
    email,
    facebook: facebookHref,
    phone: {
      display: phoneDisplay,
      href: phoneHref,
      whatsappLabel: "واتساب",
      whatsappHref,
      callLabel: "اتصال",
    },
    office: {
      country: "الأردن",
      address: "إربد - وسط البلد - شارع الملك طلال",
    },
  },
  hero: {
    brandName: "LASTRADA",
    agencyLabel: "وكالة",
    subtitle: "للحلول الإبداعية",
    tagline: "ليست مجرد وكالة إبداعية",
    ctaLabel: "ابدأ مشروعك",
    ctaHref: emailHref,
    secondaryLabel: "استكشف الريل",
    scrollHint: "الريل يبدأ بالأسفل",
    sideNote: "منظومة هوية متحركة للتصوير، صناعة المحتوى، الموشن، الويب، السوشيال، والتسويق.",
    languageLabel: "EN",
  },
  servicesIntro: {
    title: "",
    titleHighlight: "ما وراء الإبداع",
    subtitle: "نحن لا نُبدع فقط, نحن نبني علامات تجارية تبرز وتحقق نتائج.",
  },
  services: [
    {
      title: "التصوير الاحترافي",
      shortTitle: "تصوير",
      description: "تصوير احترافي يجسد جوهر علامتك التجارية ويخلق روايات بصرية آسرة.",
      accent: "cyan",
      icon: "camera",
    },
    {
      title: "صناعة المحتوى",
      shortTitle: "محتوى",
      description: "أفكار، سكريبت، إنتاج، ومحتوى مناسب لكل منصة ليصنع حضوراً واضحاً ومتجدداً.",
      accent: "blue",
      icon: "film",
    },
    {
      title: "الموشن جرافيك",
      shortTitle: "موشن",
      description: "أنظمة حركة، فيديوهات شرح، إطلاقات، وهوية متحركة تجعل الأفكار أكثر حياة.",
      accent: "purple",
      icon: "sparkles",
    },
    {
      title: "المونتاج",
      shortTitle: "مونتاج",
      description: "إيقاع بصري حاد، قصات مدروسة، وريلز حملات تصل بسرعة وتترك أثراً.",
      accent: "red",
      icon: "scissors",
    },
    {
      title: "التصميم الجرافيكي",
      shortTitle: "تصميم",
      description: "تصميم حملات، أصول بصرية، أنظمة هوية، وتجارب رقمية بلمسة احترافية.",
      accent: "yellow",
      icon: "pen",
    },
    {
      title: "إدارة السوشيال ميديا",
      shortTitle: "سوشيال",
      description: "حملات ذكية، خطط محتوى، إدارة حسابات، وحضور مجتمعي يحول التفاعل إلى نتائج.",
      accent: "green",
      icon: "share",
    },
    {
      title: "برمجة وتصميم المواقع",
      shortTitle: "ويب",
      description: "مواقع، واجهات، صفحات هبوط، وتجارب رقمية مصممة للتحويل والثقة.",
      accent: "cyan",
      icon: "code",
    },
    {
      title: "التسويق الإلكتروني",
      shortTitle: "تسويق",
      description: "إعلانات، استراتيجيات إطلاق، قنوات محتوى، وتفكير قائم على الأداء والنمو.",
      accent: "red",
      icon: "megaphone",
    },
  ],
  reelChapters: [
    {
      frame: "فريم 01",
      title: "نوجّه النظرة الأولى.",
      service: "التصوير + صناعة المحتوى",
      body: "كل حملة تبدأ بإشارة بصرية واضحة: الكادر، الإيقاع، القصة، والسبب الذي يجعل الجمهور يتوقف.",
      accent: "cyan",
    },
    {
      frame: "فريم 02",
      title: "نجعل الرسالة تتحرك.",
      service: "الموشن جرافيك + المونتاج",
      body: "أنظمة الحركة والقصات السريعة والإيقاع المدروس تحول فكرة العلامة إلى لحظة يشعر بها الجمهور فوراً.",
      accent: "purple",
    },
    {
      frame: "فريم 03",
      title: "نصمم كل نقطة تواصل.",
      service: "التصميم الجرافيكي + السوشيال ميديا",
      body: "التصميم والنشر يعملان معاً لتظهر العلامة متماسكة، نشطة، وحاضرة بوضوح.",
      accent: "yellow",
    },
    {
      frame: "فريم 04",
      title: "نبني المسرح الرقمي.",
      service: "تصميم وبرمجة المواقع",
      body: "تتحول تجربة الويب إلى المكان الذي تصبح فيه طاقة العلامة السينمائية فعلاً وثقة وتحويلاً.",
      accent: "green",
    },
    {
      frame: "فريم 05",
      title: "نطلق بزخم.",
      service: "التسويق الإلكتروني",
      body: "تتحد الاستراتيجية والمحتوى والأداء الإعلامي في محرك إطلاق يحافظ على حركة القصة.",
      accent: "red",
    },
  ],
  solutionPillarsIntro: {
    title: "ما وراء الإبداع",
    body: "نحن لا نُبدع فقط, نحن نبني علامات تجارية تبرز وتحقق نتائج.",
  },
  solutionPillars: [
    {
      title: "الهوية البصرية",
      description: "هوية بصرية استراتيجية ترفع قيمة علامتك وتثبت مكانتها في السوق.",
      features: ["تصميم الشعار", "دليل العلامة التجارية", "الهوية البصرية", "استراتيجية العلامة"],
      accent: "blue",
      icon: "fingerprint",
    },
    {
      title: "التسويق عبر وسائل التواصل",
      description: "حملات ذكية تبني جمهورك وتحوّل التفاعل إلى نتائج.",
      features: ["استراتيجية المحتوى", "إدارة المجتمعات الرقمية", "الإعلانات المدفوعة", "التحليلات والتقارير"],
      accent: "green",
      icon: "share",
    },
    {
      title: "الإنتاج المرئي",
      description: "محتوى مرئي احترافي يروي قصتك، يأسر المشاهدين، ويحقق نتائج أعمال قابلة للقياس.",
      features: ["فيديو إعلاني", "بودكاست فيديو", "فيديو عقاري", "تغطية فعاليات"],
      accent: "red",
      icon: "video",
    },
    {
      title: "التصوير الاحترافي",
      description: "تصوير احترافي يجسد جوهر علامتك التجارية ويخلق روايات بصرية آسرة.",
      features: ["تصوير المنتجات", "الصور الشخصية المؤسسية", "تصوير الأطعمة", "الجلسات التجارية"],
      accent: "cyan",
      icon: "camera",
    },
    {
      title: "الاستراتيجية الرقمية",
      description: "استراتيجيات رقمية شاملة تتوافق مع أهدافك التجارية وتعظم تواجدك الرقمي.",
      features: ["دراسة وتحليل السوق", "تحليل المنافسين بعمق", "استراتيجيات النمو السريع", "التسويق القائم على الأداء"],
      accent: "purple",
      icon: "target",
    },
  ],
  agencyStory: {
    title: "قصتنا من نحن",
    body:
      "نحن مجموعة من العقول الإبداعية والمفكرين الاستراتيجيين وعشاق التكنولوجيا، تجمعنا رؤية مشتركة: خلق تجارب علامات تجارية استثنائية تترك انطباعات دائمة وتحقق نتائج حقيقية.",
    valuesTitle: "قيمنا الجوهرية",
    valuesBody: "",
    visionTitle: "رؤيتنا",
    vision: "في لاسترادا، نرشد عملاءنا لتحقيق أهدافهم التسويقية والبيعية من خلال طريق إبداعي نصممه لهم بشكل استراتيجي.",
    stats: [
      { value: "+500", label: "مشروع مكتمل", accent: "cyan" },
      { value: "+150", label: "عميل سعيد", accent: "green" },
      { value: "+25", label: "جائزة", accent: "yellow" },
      { value: "+12", label: "سنوات خبرة", accent: "red" },
    ],
    values: [
      {
        title: "الابتكار",
        description: "نتجاوز الحدود ونتبنى أحدث التقنيات لتقديم حلول إبداعية رائدة.",
        accent: "cyan",
      },
      {
        title: "الشغف",
        description: "فريقنا مدفوع بشغف حقيقي نحو التميز الإبداعي ونجاح العملاء.",
        accent: "red",
      },
      {
        title: "النتائج",
        description: "كل مشروع مصمم بأهداف قابلة للقياس وأثر تجاري حقيقي.",
        accent: "green",
      },
      {
        title: "الرؤية العالمية",
        description: "نفكر عالمياً ونتصرف محلياً، لنخلق حملات تتردد صداها عبر الثقافات.",
        accent: "purple",
      },
    ],
  },
  team: {
    title: "تعرف على",
    titleHighlight: "فريقنا",
    subtitle: "",
    members: [
      {
        name: "عبدالرحمن الضبع",
        role: "الرئيس التنفيذي | قائد إبداعي | صانع محتوى بصري",
        bio: "بخبرة تزيد عن 12 عاماً في المجال الإبداعي والإعلامي، أقود فرقاً ديناميكية لتقديم حلول بصرية وتسويقية مؤثرة. شغفي بالتصوير وفن السرد البصري يمكنني من تحويل الأفكار إلى محتوى يجذب ويلهم الجمهور.",
        accent: "cyan",
      },
      {
        name: "المنذر صبح",
        role: "مدير منفذ | متخصص في إدارة الحملات الإعلانية",
        bio: "يمتلك خبرة طويلة تزيد عن 12 عاماً في إدارة الحملات الإعلانية، ويقود المشاريع لتحقيق نتائج مبتكرة وقابلة للقياس.",
        accent: "yellow",
      },
      {
        name: "ندى محمود",
        role: "مديرة فنية – قسم السوشيال ميديا",
        bio: "خبرة تزيد عن 8 سنوات في تصميم المحتوى الإبداعي وإدارة الهوية البصرية لمنصات التواصل الاجتماعي.",
        accent: "purple",
      },
    ],
  },
  portfolio: {
    title: "رحلتنا",
    titleHighlight: "الإبداعية",
    subtitle:
      "اكتشف كيف نحول الرؤى إلى واقع ملموس. تصفح أحدث أعمالنا وشاهد أثر الإبداع على نمو العلامات التجارية",
    filters: [
      { key: "all", label: "جميع الأعمال" },
      { key: "branding", label: "الهوية التجارية" },
      { key: "video", label: "الفيديو" },
      { key: "social", label: "التواصل الاجتماعي" },
      { key: "motion", label: "الموشن جرافيك" },
      { key: "website", label: "المواقع الإلكترونية" },
    ],
    projects: [
      {
        title: "العقارات الفاخرة",
        category: "branding",
        client: "Premium Properties",
        description: "هوية تجارية متكاملة وحملة تسويقية لمطور عقاري فاخر",
        type: "الهوية البصرية",
        accent: "purple",
      },
      {
        title: "إطلاق شركة تقنية ناشئة",
        category: "video",
        client: "InnovateTech",
        description: "فيديو إطلاق المنتج وحملة التواصل الاجتماعي لشركة ذكاء اصطناعي ناشئة",
        type: "الإنتاج المرئي",
        accent: "cyan",
      },
      {
        title: "إحياء علامة أزياء",
        category: "social",
        client: "Elite Fashion",
        description: "استراتيجية التواصل الاجتماعي وإنشاء المحتوى لإعادة إطلاق علامة أزياء",
        type: "التواصل الاجتماعي",
        accent: "red",
      },
      {
        title: "نظام الهوية المؤسسية",
        category: "branding",
        client: "GlobalCorp",
        description: "نظام هوية بصرية متكامل لشركة متعددة الجنسيات",
        type: "الهوية البصرية",
        accent: "blue",
      },
      {
        title: "حملة إطلاق منتج",
        category: "motion",
        client: "TechGiant",
        description: "موشن جرافيك وأنيميشن لفعالية إطلاق منتج",
        type: "الموشن جرافيك",
        accent: "yellow",
      },
      {
        title: "تجربة العلامة الضيافية",
        category: "photography",
        client: "Luxury Hotels",
        description: "تصوير وتصميم تجربة العلامة لسلسلة فنادق فاخرة",
        type: "التصوير الاحترافي",
        accent: "green",
      },
    ],
  },
  testimonials: {
    title: "قصص نجاح",
    titleHighlight: "عملائنا",
    subtitle: "لا تأخذ كلامنا فقط. إليك ما يقوله عملاؤنا عن تجربة العمل معنا.",
    trustedByTitle: "يثق بنا قادة الصناعة",
    items: [
      {
        content:
          "العمل مع هذه الوكالة حوّل علامتنا التجارية تماماً. رؤيتهم الإبداعية ونهجهم الاستراتيجي حققا نتائج تجاوزت توقعاتنا.",
        author: "David Miller",
        role: "الرئيس التنفيذي، TechInnovate",
        company: "شركة تقنية Fortune 500",
        accent: "cyan",
      },
      {
        content:
          "اهتمام الفريق بالتفاصيل ونهجهم المبتكر ساعدنا على ترسيخ حضور قوي في السوق. جودة عمل استثنائية وخدمة احترافية.",
        author: "Sarah Chen",
        role: "مديرة التسويق، LuxuryHomes",
        company: "مطور عقاري متميز",
        accent: "purple",
      },
      {
        content:
          "من الفكرة إلى التنفيذ، قدموا استراتيجية علامة تجارية شاملة رفعت مكانتنا في السوق وحققت نمواً ملحوظاً.",
        author: "Michael Rodriguez",
        role: "المؤسس، EliteFinance",
        company: "شركة ناشئة في الخدمات المالية",
        accent: "yellow",
      },
    ],
  },
  aiDemo: {
    badge: "تقدير ذكي",
    title: "احصل على",
    titleHighlight: "تقدير فوري لتكلفة مشروعك",
    subtitle:
      "يستفيد نظامنا الذكي من بيانات مئات المشاريع السابقة لتقديم تقديرات تكلفة سريعة وموثوقة مصممة لاحتياجاتك.",
    features: ["تقدير فوري للتكلفة", "مبني على +500 مشروع", "مدعوم برؤى الذكاء الاصطناعي"],
    calculatorTitle: "حاسبة تكلفة المشروع",
    labels: {
      projectType: "نوع المشروع",
      complexity: "التعقيد",
      timeline: "الجدول الزمني",
      teamSize: "حجم الفريق",
    },
    options: {
      projectType: [
        { value: "web-app", label: "تطبيق ويب" },
        { value: "mobile-app", label: "تطبيق موبايل" },
        { value: "ai-solution", label: "حل ذكاء اصطناعي" },
        { value: "custom-software", label: "برمجيات مخصصة" },
      ],
      complexity: [
        { value: "simple", label: "بسيط" },
        { value: "medium", label: "متوسط" },
        { value: "complex", label: "معقد" },
      ],
      timeline: [
        { value: "urgent", label: "عاجل" },
        { value: "normal", label: "عادي" },
        { value: "flexible", label: "مرن" },
      ],
      teamSize: [
        { value: "small", label: "1-3 مطورين" },
        { value: "medium", label: "4-6 مطورين" },
        { value: "large", label: "+7 مطورين" },
      ],
    },
    calculateButton: "احسب التكلفة",
    calculating: "جارٍ الحساب...",
    estimatedCost: "التكلفة التقديرية",
    currency: "ج.م",
    disclaimer: "* قد تختلف التكلفة الفعلية حسب المتطلبات التفصيلية",
  },
  pricing: {
    title: "اختر",
    titleHighlight: "خطتك",
    subtitle: "خيارات أسعار مرنة مصممة للنمو مع أعمالك وتقديم قيمة استثنائية.",
    monthly: "شهري",
    yearly: "سنوي",
    save: "وفّر 17%",
    perMonth: "شهر",
    perYear: "سنة",
    getStarted: "ابدأ الآن",
    customTitle: "تحتاج حلاً مخصصاً؟",
    customSubtitle: "نصمم باقات مخصصة لعملاء المؤسسات ذوي المتطلبات الخاصة والمشاريع الكبيرة.",
    contactSales: "تواصل مع فريق المبيعات",
    plans: [
      {
        name: "البداية",
        description: "مثالي للشركات الناشئة والأعمال الصغيرة الراغبة في ترسيخ حضورها التجاري.",
        price: "",
        accent: "cyan",
        features: [
          "باقة الهوية التجارية",
          "استراتيجية التواصل الاجتماعي",
          "تصميم موقع أساسي",
          "إنشاء المحتوى (10 منشورات/شهر)",
          "تقارير الأداء الشهرية",
          "دعم عبر البريد الإلكتروني",
        ],
      },
      {
        name: "الاحترافية",
        description: "حل شامل للأعمال المتنامية الجاهزة لتوسيع جهودها التسويقية.",
        price: "",
        accent: "purple",
        featured: true,
        features: [
          "كل ما في باقة البداية",
          "إنتاج فيديو (2 فيديو/شهر)",
          "تحليلات وتقارير متقدمة",
          "إدارة الإعلانات المدفوعة",
          "إنشاء المحتوى (25 منشور/شهر)",
          "مدير حساب مخصص",
          "دعم ذو أولوية",
        ],
      },
      {
        name: "المؤسسات",
        description: "منظومة تسويق متكاملة للشركات الراسخة الساعية إلى هيمنة السوق.",
        price: "",
        accent: "red",
        features: [
          "كل ما في باقة الاحترافية",
          "تطوير استراتيجية مخصصة",
          "إنشاء محتوى غير محدود",
          "موشن جرافيك متقدم",
          "حملات متعددة المنصات",
          "الوصول إلى الفريق التنفيذي",
          "دعم مميز 24/7",
        ],
      },
    ],
  },
  contactSection: {
    title: "لنصنع شيئاً",
    titleHighlight: "مذهلاً",
    body: "هل أنت مستعد لتحويل علامتك التجارية؟ تواصل معنا ولنناقش كيف نجعل رؤيتك حقيقة.",
    ctaLabel: "ابدأ مشروعك",
    getInTouch: "تواصل معنا",
    emailLabel: "راسلنا",
    visitLabel: "زورنا",
    businessHoursLabel: "ساعات العمل",
    businessHours: "",
    globalPresence: "حضورنا العالمي",
    startProject: "ابدأ مشروعك",
    socialLabel: "",
    services: ["التسويق", "الويب والتطبيقات", "الهوية التجارية", "الإنتاج", "تنظيم الفعاليات"],
    budgets: ["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k - $250k", "$250k+"],
    offices: [
      {
        country: "الأردن",
        address: "إربد - وسط البلد - شارع الملك طلال",
      },
    ],
    form: {
      name: "الاسم *",
      email: "البريد الإلكتروني *",
      company: "الشركة",
      service: "الخدمة *",
      budgetRange: "الميزانية",
      projectDetails: "تفاصيل المشروع *",
      selectService: "اختر الخدمة",
      selectBudget: "اختر نطاق الميزانية",
      namePlaceholder: "الاسم الكامل",
      emailPlaceholder: "بريدك@الإلكتروني.com",
      companyPlaceholder: "اسم شركتك",
      detailsPlaceholder: "أخبرنا عن أهداف مشروعك والجدول الزمني وأي متطلبات خاصة...",
      sendMessage: "أرسل الرسالة",
      localNotice: "",
    },
    emailHref,
    facebookHref,
  },
  finalCta: {
    title: "اجعل حملتك القادمة مستحيلة التجاهل.",
    body:
      "من الاستراتيجية والهوية إلى الإنتاج والسوشيال والويب والأداء، يجب أن يشعر الناتج النهائي بأنه مصمم من أول فريم إلى آخر نقرة.",
    ctaLabel: "ابدأ مشروعك",
    ctaHref: emailHref,
  },
  footer: {
    brandName: "LASTRADA",
    brandDescription:
      "نحن وكالة إبداعية رائدة متخصصة في صناعة تجارب علامات تجارية استثنائية تأسر الجمهور وتحقق نتائج قابلة للقياس للشركات المبتكرة.",
    stayUpdated: "ابقَ على اطلاع",
    newsletterSubtitle: "احصل على أحدث الرؤى والاتجاهات والمحتوى الحصري في صندوق بريدك.",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    madeWith: "صُنع بـ",
    creditLabel: "",
    copyright: "© 2024 www.lastrada.agency. جميع الحقوق محفوظة.",
    categoryTitles: {
      services: "الخدمات",
      company: "الشركة",
      resources: "الموارد",
      industries: "القطاعات",
    },
    links: {
      services: ["الهوية البصرية", "تسويق التواصل الاجتماعي", "الإنتاج المرئي", "الموشن جرافيك", "التصوير الاحترافي", "الاستراتيجية الرقمية"],
      company: ["من نحن", "فريقنا", "الوظائف", "الأخبار والتحديثات", "دراسات الحالة", "تواصل معنا"],
      resources: ["المدونة", "موارد التصميم", "تقارير الصناعة", "بوابة العملاء", "مركز الدعم", "سياسة الخصوصية"],
      industries: ["التكنولوجيا", "العقارات", "العلامات الفاخرة", "الرعاية الصحية", "الخدمات المالية", "التجارة الإلكترونية"],
    },
    legal: {
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      cookiePolicy: "سياسة ملفات تعريف الارتباط",
      gdprCompliance: "الامتثال للائحة GDPR",
    },
  },
};

const translations: Record<Language, LaStradaContent> = { en, ar };

type LanguageContextValue = {
  language: Language;
  direction: Direction;
  content: LaStradaContent;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("lastrada-language");
  return stored === "ar" || stored === "en" ? stored : "en";
}

function updateMeta(content: LaStradaContent, language: Language) {
  document.title = content.meta.title;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute("content", content.meta.description);

  const keywords = document.querySelector('meta[name="keywords"]');
  keywords?.setAttribute("content", content.meta.keywords);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setLanguageState(getStoredLanguage());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    window.localStorage.setItem("lastrada-language", nextLanguage);
    setLanguageState(nextLanguage);
  }, []);

  const direction: Direction = language === "ar" ? "rtl" : "ltr";
  const content = translations[language];

  useEffect(() => {
    updateMeta(content, language);
  }, [content, language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      direction,
      content,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "ar" : "en"),
    }),
    [content, direction, language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div dir={direction} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLaStradaContent() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLaStradaContent must be used inside LanguageProvider");
  }
  return context;
}
