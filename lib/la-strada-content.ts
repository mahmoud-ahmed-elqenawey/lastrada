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

export const brand = {
  name: "LA STRADA",
  logo: "/brand/lastrada-logo.png",
};

export const sourceSite = {
  url: "https://www.lastrada.agency/",
  email: "info@lastrada.agency",
  facebook: "https://www.facebook.com/lastrada.marketing",
  office: {
    country: "Jordan",
    address: "Irbid - Down Town - K. Talal St.",
  },
};

export const media = {
  heroVideo: "/media/hero-moon-reel.mp4",
  heroPoster: "/media/hero-moon-poster.svg",
};

export const hero = {
  title: "LA STRADA",
  tagline:
    "Not just a creative agency. A cinematic marketing house for brands that need movement, memory, and momentum.",
  ctaLabel: "Start a project",
  ctaHref: `mailto:${sourceSite.email}?subject=New%20project%20with%20LA%20STRADA`,
  secondaryLabel: "Explore the reel",
  scrollHint: "The reel begins below",
};

export const services: Service[] = [
  {
    title: "Photography",
    shortTitle: "Photo",
    description: "Editorial images, campaign visuals, product stories, and brand moments with a directed point of view.",
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
    description: "Content calendars, account management, platform adaptation, and consistent community presence.",
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
];

export const reelChapters: ReelChapter[] = [
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
];

export const solutionPillarsIntro = {
  title: "Creative solutions with a cinematic operating system.",
  body:
    "Identity, social, production, photography, and digital strategy move together as one connected brand track.",
};

export const solutionPillars: SolutionPillar[] = [
  {
    title: "Brand Identity",
    description:
      "Distinctive brand systems, logo direction, guidelines, and visual language designed to make the brand recognizable at every touchpoint.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    accent: "blue",
    icon: "fingerprint",
  },
  {
    title: "Social Media Marketing",
    description:
      "Platform strategies, content planning, community presence, paid campaigns, and reporting that keep the brand active and measurable.",
    features: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics"],
    accent: "green",
    icon: "share",
  },
  {
    title: "Video Production",
    description:
      "Commercial films, product stories, corporate content, and live coverage shaped with cinematic pacing and clear business intent.",
    features: ["Commercial Videos", "Corporate Films", "Product Demos", "Live Events"],
    accent: "red",
    icon: "video",
  },
  {
    title: "Photography",
    description:
      "Product, corporate, event, and campaign photography that gives the brand a sharp visual archive and a premium editorial presence.",
    features: ["Product Photography", "Corporate Portraits", "Event Coverage", "Commercial Shoots"],
    accent: "cyan",
    icon: "camera",
  },
  {
    title: "Digital Strategy",
    description:
      "Market research, competitor insight, growth planning, and performance marketing connected into one strategic digital roadmap.",
    features: ["Market Research", "Competitor Analysis", "Growth Planning", "Performance Marketing"],
    accent: "purple",
    icon: "target",
  },
];

export const agencyStory = {
  title: "About Our Story",
  body:
    "La Strada brings creative direction, strategic thinking, and technology-minded execution into one team focused on memorable brand experiences and real outcomes.",
  valuesTitle: "Core Values",
  valuesBody:
    "A practical creative culture: ideas with craft, motion with purpose, and campaigns built to be measured.",
  visionTitle: "Our Vision",
  vision:
    "Creative excellence becomes stronger when design, production, strategy, and digital delivery move as one connected system.",
  stats: [
    { value: "500+", label: "Projects completed", accent: "cyan" },
    { value: "150+", label: "Happy clients", accent: "green" },
    { value: "25+", label: "Awards won", accent: "yellow" },
    { value: "12+", label: "Years experience", accent: "red" },
  ] satisfies AgencyStat[],
  values: [
    {
      title: "Innovation",
      description: "Pushing creative formats and adopting new tools when they add real value to the brand.",
      accent: "cyan",
    },
    {
      title: "Passion",
      description: "Treating every launch, visual system, and campaign as craft, not just delivery.",
      accent: "red",
    },
    {
      title: "Results",
      description: "Designing the creative work around measurable outcomes and business impact.",
      accent: "green",
    },
    {
      title: "Global Vision",
      description: "Building ideas that can travel across cultures while still feeling locally aware.",
      accent: "purple",
    },
  ] satisfies AgencyValue[],
};

export const contactSection = {
  title: "Let's Create Something Amazing",
  body:
    "Bring the next brand move, campaign, reel, website, or launch. La Strada will shape it into a sharper creative system.",
  ctaLabel: "Start Your Project",
  emailLabel: "Email Us",
  visitLabel: "Visit Us",
  socialLabel: "Follow the studio",
  services: ["Marketing", "Web & App", "Branding", "Production", "Events Planning"],
  emailHref: hero.ctaHref,
  facebookHref: sourceSite.facebook,
};

export const finalCta = {
  title: "Let your next campaign feel impossible to ignore.",
  body:
    "From strategy and identity to production, social, web, and performance, the final output should feel authored from the first frame to the last click.",
  ctaLabel: "Start a project",
  ctaHref: hero.ctaHref,
};
