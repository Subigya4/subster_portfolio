/* ------------------------------------------------------------------------
   Site content — edit this file to update the portfolio.
   Long-form text for blog posts / project pages lives in /content/*.mdx
   ------------------------------------------------------------------------ */

export type IconName =
  | 'home' | 'folder' | 'briefcase' | 'wrench' | 'edit'
  | 'layers' | 'layout' | 'arrowRight' | 'arrowUpRight' | 'flame'
  | 'github' | 'linkedin' | 'twitter' | 'mail';

export const site = {
  name: 'Subster Paudel',
  role: 'Aspiring AI Engineer',
  title: 'Subster Paudel — Aspiring AI Engineer',
  description:
    'Subster Paudel — Computing student, software developer and tech founder passionate about artificial intelligence, building intelligent applications and real-world products.',
  url: 'https://substerpaudel.com',
  email: 'hello@substerpaudel.com',
  /** Form endpoint accepting POST + `Accept: application/json` (e.g. https://formspree.io/f/xxxx).
   *  Leave empty to fall back to a mailto: link. */
  formEndpoint: '',
};

export const profile = {
  /** Transparent cut-out (WebP with alpha), shown in colour on the orange frame */
  photo: '/assets/profile-cutout.webp',
  photoSize: { width: 755, height: 700 },
  photoAlt: 'Portrait of Subster Paudel',
  bio: 'A Software Engineer who turns complex problems into clean, scalable products.',
};

export const socials: { label: string; href: string; icon: IconName }[] = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'Twitter / X', href: 'https://twitter.com/', icon: 'twitter' },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'mail' },
];

export const navItems: { label: string; href: string; icon: IconName; section: string }[] = [
  { label: 'Home', href: '/#home', icon: 'home', section: 'home' },
  { label: 'Projects', href: '/#projects', icon: 'folder', section: 'projects' },
  { label: 'Experience', href: '/#experience', icon: 'briefcase', section: 'experience' },
  { label: 'Tools', href: '/#tools', icon: 'wrench', section: 'tools' },
  { label: 'Thoughts', href: '/#thoughts', icon: 'edit', section: 'thoughts' },
];

export const hero = {
  /** [white line, ghosted line] — rendered uppercase */
  headline: ['Aspiring AI', 'Engineer'] as const,
  lead:
    "I'm a Computing student, software developer, and tech founder passionate about artificial intelligence. I build intelligent applications and turn ambitious ideas into real-world products.",
};

export const stats: { value: string; label: [string, string] }[] = [
  { value: '3+', label: ['Years of', 'Experience'] },
  { value: '10+', label: ['Projects', 'Completed'] },
];

/** Written in capitals on purpose (the design uses uppercase; CSS would turn "APIs" into "APIS") */
export const skills: { tone: 'orange' | 'lime'; icon: IconName; title: [string, string]; href: string }[] = [
  { tone: 'orange', icon: 'layers', title: ['WEB APPS,', 'APIs & CLOUD'], href: '/#projects' },
  { tone: 'lime', icon: 'layout', title: ['REACT, NEXT.JS,', 'NODE, TYPESCRIPT'], href: '/#tools' },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  thumb: string;
  cover?: string;
  year: string;
  tags: string[];
  links?: { live?: string; source?: string };
};

export const projects: Project[] = [
  {
    slug: 'flowdesk',
    title: 'FlowDesk',
    subtitle: 'SaaS Project Management App',
    thumb: '/assets/project-1.svg',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    links: { live: 'https://example.com', source: 'https://github.com/' },
  },
  {
    slug: 'shopnest',
    title: 'ShopNest',
    subtitle: 'E-commerce Storefront & Admin',
    thumb: '/assets/project-2.svg',
    year: '2025',
    tags: ['React', 'Node.js', 'Stripe', 'Redis'],
    links: { live: 'https://example.com' },
  },
  {
    slug: 'vitalis',
    title: 'Vitalis',
    subtitle: 'Health & Fitness Tracking App',
    thumb: '/assets/project-3.svg',
    year: '2024',
    tags: ['React Native', 'GraphQL', 'AWS'],
    links: { source: 'https://github.com/' },
  },
];

export const experience: { company: string; description: string; period: string; href?: string }[] = [
  {
    company: 'Techverse Labs',
    description:
      'Lead full-stack engineer building scalable SaaS platforms with React, Next.js and Node — improving performance, reliability and developer experience across the stack.',
    period: 'Jan 2024 - Present',
  },
  {
    company: 'CloudNova Solutions',
    description:
      'Designed and shipped REST and GraphQL APIs, automated cloud deployments and collaborated closely with designers and product managers.',
    period: 'Jun 2022 - Dec 2023',
  },
  {
    company: 'Pixelcraft Studio',
    description:
      'Built responsive, accessible web interfaces for e-commerce and marketing sites, focusing on usability and pixel-perfect implementation.',
    period: 'Mar 2021 - May 2022',
  },
];

export const tools: { name: string; description: string; icon: string; href: string }[] = [
  { name: 'GitHub', description: 'Version Control', icon: '/assets/icons/github.svg', href: 'https://github.com/' },
  { name: 'Figma', description: 'Design Tool', icon: '/assets/icons/figma.svg', href: 'https://www.figma.com/' },
  { name: 'Docker', description: 'Containerization', icon: '/assets/icons/docker.svg', href: 'https://www.docker.com/' },
  { name: 'Postman', description: 'API Testing', icon: '/assets/icons/postman.svg', href: 'https://www.postman.com/' },
  { name: 'Vercel', description: 'Deployment Platform', icon: '/assets/icons/vercel.svg', href: 'https://vercel.com/' },
  { name: 'Notion', description: 'Productivity Tool', icon: '/assets/icons/notion.svg', href: 'https://www.notion.so/' },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. 2026-09-12 */
  date: string;
  readTime: string;
};

export const posts: Post[] = [
  {
    slug: 'building-scalable-web-apps-with-nextjs',
    title: 'Building Scalable Web Apps with Next.js',
    excerpt:
      'From routing and data fetching to caching and deployment — a practical guide to structuring Next.js projects that stay fast and maintainable as they grow.',
    date: '2026-09-12',
    readTime: '6min read',
  },
  {
    slug: 'clean-code-practices-every-developer-should-know',
    title: 'Clean Code Practices Every Developer Should Know',
    excerpt:
      'Naming, small functions, meaningful tests and honest comments — the habits that make a codebase pleasant to work in long after the first commit.',
    date: '2026-08-03',
    readTime: '5min read',
  },
  {
    slug: 'how-ai-is-changing-the-way-we-write-software',
    title: 'How AI Is Changing the Way We Write Software',
    excerpt:
      'AI pair programmers are reshaping daily workflows. Here is how to use them well, where they fall short, and why fundamentals matter more than ever.',
    date: '2026-07-20',
    readTime: '7min read',
  },
];

export const budgetOptions = ['<$3k', '$3k - $5k', '$5k - $10k', '>$10k'];

/** "2026-09-12" → "Sep 12, 2026" (same format as the reference design) */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
