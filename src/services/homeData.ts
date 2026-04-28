import type { FAQ, Feature, NavLink, Stat, Step, Testimonial } from "../types/home";


export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

export const HERO = {
  badge: "Trusted workflows for modern healthcare teams",
  headline: "Manage patient operations, alerts, and insights in one platform.",
  subheadline:
    "CarePulse helps healthcare teams track patient workflows, monitor critical cases, and gain operational clarity from a single dashboard built for fast-moving care environments.",
  primaryCta: "Get Started",
  secondaryCta: "View Dashboard",
  trustBadges: ["Security-first workflows", "Real-time operational visibility"],
};

export const STATS: Stat[] = [
  { value: "10k+", label: "Patient records monitored" },
  { value: "98.6%", label: "Workflow accuracy" },
  { value: "40%", label: "Faster operational response" },
  { value: "24/7", label: "Critical case visibility" },
];

export const FEATURES: Feature[] = [
  {
    iconKey: "hospital",
    title: "Unified patient operations",
    desc: "Track admissions, patient flow, case status, and care coordination from one workspace.",
  },
  {
    iconKey: "analytics",
    title: "Actionable analytics",
    desc: "Turn patient and operational data into trends, performance insights, and faster decision-making.",
  },
  {
    iconKey: "monitor",
    title: "Critical alerts",
    desc: "Surface urgent cases quickly so teams can respond before issues escalate.",
  },
  {
    iconKey: "security",
    title: "Enterprise-ready trust",
    desc: "Built for healthcare teams that care about privacy, role-based access, and secure workflows.",
  },
  {
    iconKey: "groups",
    title: "Team collaboration",
    desc: "Give admins, doctors, and staff a shared view of activity without scattered systems.",
  },
  {
    iconKey: "insights",
    title: "Live operational visibility",
    desc: "Measure patient load, recovery progress, and bottlenecks with a clear dashboard view.",
  },
];

export const STEPS: Step[] = [
  {
    no: "01",
    title: "Capture",
    desc: "Bring patient workflows, statuses, and records into a centralized system your team can trust.",
  },
  {
    no: "02",
    title: "Monitor",
    desc: "Track trends, critical cases, and department activity in real time through one dashboard.",
  },
  {
    no: "03",
    title: "Act",
    desc: "Move faster with clear alerts, better coordination, and insight-backed decisions.",
  },
];

export const CASE_SNAPSHOT = {
  overline: "Case Snapshot",
  headline:
    "Reduced coordination delays and improved response time across care teams",
  body: "Healthcare teams that centralize patient workflows report clearer ownership, faster escalation, and fewer coordination gaps across care roles.",
  stat: "64%",
  statLabel:
    "faster internal escalation visibility after workflow centralization",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Meera Sharma",
    role: "Operations Lead, NovaCare Clinics",
    initials: "MS",
    quote:
      "CarePulse gave our team one clear view of patient operations. We reduced back-and-forth coordination and responded to critical cases much faster.",
  },
  {
    name: "Rohan Verma",
    role: "Admin Manager, HealBridge Network",
    initials: "RV",
    quote:
      "The dashboard made it easier to understand workload, admissions, and recovery trends without pulling reports from multiple tools.",
  },
];

export const CTA_SECTION = {
  headline: "Ready to give your healthcare team one clear operational view?",
  body: "Join healthcare teams already using CarePulse to reduce coordination friction, monitor critical cases, and make faster decisions.",
  primaryCta: "Book a Demo",
  secondaryCta: "Start Now",
};

export const FAQS: FAQ[] = [
  {
    q: "Is CarePulse built for clinics only?",
    a: "It is designed for healthcare teams that need better patient workflow visibility, from clinics to multi-unit care operations.",
  },
  {
    q: "Can teams use it without a complex setup?",
    a: "Yes. The product experience is designed to be easy to understand, fast to adopt, and usable by both admins and care staff.",
  },
  {
    q: "Is patient data kept secure?",
    a: "Absolutely. CarePulse is built with security-first principles including role-based access controls and encrypted data handling.",
  },
];

export const FOOTER_LINKS = ["Security", "Compliance", "Contact"];

export const HERO_PREVIEW = {
  activePatients: "1,284",
  criticalAlerts: 38,
  recoveryBars: [72, 84, 68, 91, 78],
  urgentCases: ["ICU Escalation", "Cardiac Review", "Emergency Follow-up"],
  teamAvatars: [
    { letter: "A", bg: "#DBEAFE", color: "#1D4ED8" },
    { letter: "M", bg: "#CFFAFE", color: "#0891B2" },
    { letter: "R", bg: "#DCFCE7", color: "#15803D" },
  ],
};
