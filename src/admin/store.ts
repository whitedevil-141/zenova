import { useEffect, useReducer, useRef } from 'react';
import { SERVICES as DEFAULT_SERVICES, type ServiceDetail } from '@/data/services';
import { PROJECTS as DEFAULT_PROJECTS, type ProjectDetail } from '@/data/projects';

type Listener = () => void;

const KEY_PREFIX = 'zenova.admin.';

class Store<T> {
  private value: T;
  private listeners = new Set<Listener>();
  readonly key: string;

  constructor(key: string, private defaults: T) {
    this.key = KEY_PREFIX + key;
    this.value = this.load();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === this.key) {
          this.value = this.load();
          this.emit();
        }
      });
    }
  }

  private load(): T {
    if (typeof window === 'undefined') return this.defaults;
    try {
      const raw = window.localStorage.getItem(this.key);
      if (raw) return JSON.parse(raw) as T;
    } catch {
      /* ignore */
    }
    return this.defaults;
  }

  private save() {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(this.key, JSON.stringify(this.value));
    } catch {
      /* ignore (private mode, quota) */
    }
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  get(): T {
    return this.value;
  }

  set(updater: T | ((prev: T) => T)) {
    this.value =
      typeof updater === 'function' ? (updater as (p: T) => T)(this.value) : updater;
    this.save();
    this.emit();
  }

  reset() {
    this.set(this.defaults);
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getDefaults(): T {
    return this.defaults;
  }
}

export function useStore<T>(store: Store<T>) {
  const [, force] = useReducer((x: number) => x + 1, 0);
  const ref = useRef(store);
  useEffect(() => ref.current.subscribe(force), []);
  return [store.get(), (v: T | ((prev: T) => T)) => store.set(v)] as const;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  tone: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  tone: string;
}

export interface MarqueeItem {
  id: string;
  label: string;
}

export interface SiteContent {
  hero: {
    badge: string;
    headline: string;
    rotatingWords: string[];
    sub: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Array<{ id: string; num: string; label: string }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    accentTitle: string;
    sub: string;
    primary: string;
    secondary: string;
  };
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  marquee: MarqueeItem[];
  contactEmail: string;
}

export interface BrandSettings {
  studioName: string;
  tagline: string;
  contactEmail: string;
  careersEmail: string;
  locations: Array<{ id: string; city: string; tz: string; detail: string }>;
}

const DEFAULT_TEAM: TeamMember[] = [
  { id: 't1', name: 'Mira Aldana', role: 'Co-founder · Design & strategy', bio: 'Previously design lead at Spectral and Linear. Runs the brand and product-design practice.', initials: 'MA', tone: '#3a5bff' },
  { id: 't2', name: 'Tobias Reinhardt', role: 'Co-founder · Engineering', bio: 'Shipped infra at Stripe and platform at Vercel. Owns the build stack and engineering hires.', initials: 'TR', tone: '#6d4cff' },
  { id: 't3', name: 'Suri Patel', role: 'Head of growth', bio: 'Ran paid + lifecycle at three Series-B startups before joining. Lives in the attribution dashboard.', initials: 'SP', tone: '#a855f7' },
  { id: 't4', name: 'Jordan Wei', role: 'Editorial lead', bio: 'Long-form for The Verge and Stripe Press. Heads the content engine and brand voice work.', initials: 'JW', tone: '#7a55ff' },
  { id: 't5', name: 'Noor Bashir', role: 'Principal engineer', bio: 'Built design systems at Notion and Vercel. Leads the build squad and on-call rotation.', initials: 'NB', tone: '#4f8cff' },
  { id: 't6', name: 'Eitan Brody', role: 'Brand director', bio: 'Founder of two studios before Zenova. Logos, type and motion direction.', initials: 'EB', tone: '#5b6cff' },
  { id: 't7', name: 'Yuki Sato', role: 'Head of operations', bio: 'Ex-COO at a Series B fintech. Owns the fractional-ops practice and our internal cadence.', initials: 'YS', tone: '#6d4cff' },
  { id: 't8', name: 'Cassidy Lam', role: 'Producer', bio: 'Holds every engagement together. The voice on Friday demos, the calendar on Monday plans.', initials: 'CL', tone: '#9a4dff' },
];

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: 'Modern digital solutions, end-to-end.',
    headline: 'One agency for',
    rotatingWords: [
      'Website Development',
      'Marketing Solutions',
      'Startup Support',
      'Business Management',
      'Content Writing',
    ],
    sub: 'Zenova combines design, development, marketing, and startup support into one seamless partnership for ambitious modern businesses.',
    primaryCta: 'Start a project',
    secondaryCta: 'Explore services',
    stats: [
      { id: 's1', num: '20+', label: 'Projects shipped' },
      { id: 's2', num: '8', label: 'Active clients' },
      { id: 's3', num: '4.9', label: 'Client rating' },
      { id: 's4', num: '2026', label: 'Building since' },
    ],
  },
  cta: {
    eyebrow: '★ Now booking Q3 engagements',
    title: "Let's build something",
    accentTitle: 'worth shipping.',
    sub: '30-minute intro call. No deck, no sales pitch — just your goals and where we’d start.',
    primary: 'Book an intro call',
    secondary: 'hello@zenova.bd',
  },
  faqs: [
    { id: 'f1', q: 'How is Zenova different from a traditional agency?', a: "We're one accountable team across design, build and growth — not a handoff between vendors. Same Slack channel, same Figma, same engineers from kickoff to month twelve." },
    { id: 'f2', q: 'What does a typical engagement look like?', a: 'Most clients start with a 6–10 week build (Discover → Design → Build) and continue into a monthly Grow retainer. Quarter-long minimums; month-to-month after that.' },
    { id: 'f3', q: 'Do we own the code and design files?', a: 'Always. Repos sit in your GitHub from day one and Figma files transfer at handoff. Nothing about your stack is hostage to us continuing the engagement.' },
    { id: 'f4', q: 'How do you price projects?', a: 'Fixed-fee per phase for the build, then a flat monthly retainer for ongoing growth work. We send a single invoice with everything broken out — no per-hour surprises.' },
    { id: 'f5', q: 'Can you work with our existing team or codebase?', a: 'Yes — about a third of our engagements augment an in-house team. We adapt to your conventions, sit in your standups, and write code your engineers can read on day one.' },
    { id: 'f6', q: 'How quickly can we start?', a: 'Discovery usually kicks off 1–2 weeks after the intro call. We hold one onboarding slot per month so we never overload an engagement.' },
  ],
  testimonials: [
    { id: 'q1', quote: 'Zenova replaced three vendors for us. The brand, the site, the content pipeline — all one team, one Slack channel, one invoice.', name: 'Maya Okafor', role: 'COO, Northwind Labs', tone: '#3a5bff' },
    { id: 'q2', quote: "They shipped a working prototype in eleven days. That's the kind of momentum we hadn't felt since the founding team was three people.", name: 'Daniel Reyes', role: 'CEO, Stellar Capital', tone: '#6d4cff' },
    { id: 'q3', quote: 'We came in for a website and walked out with a full GTM plan and the first $40k in pipeline. They actually care about the outcome.', name: 'Priya Nair', role: 'Head of Growth, Aperture Health', tone: '#a855f7' },
    { id: 'q4', quote: "The handoff was the cleanest I've ever seen. Our engineers picked up the codebase the next morning and shipped a feature by lunch.", name: 'Jonas Weber', role: 'CTO, Cobalt Studio', tone: '#5b6cff' },
    { id: 'q5', quote: 'Two months in, traffic was up 4x and our CAC was down by a third. They run growth the way a product team runs sprints.', name: 'Aisha Mensah', role: 'Founder, Mosaic', tone: '#7a55ff' },
    { id: 'q6', quote: 'Most agencies sell a deck. Zenova sold us a system — and then taught our team how to run it ourselves.', name: 'Leo Castelli', role: 'COO, Verge', tone: '#9a4dff' },
    { id: 'q7', quote: 'They write better marketing copy than our last three writers combined, and the page actually converts. Wild.', name: 'Sana Iqbal', role: 'CMO, Halcyon', tone: '#4f8cff' },
    { id: 'q8', quote: 'From pitch deck to seed close in eleven weeks. I have no idea how we would have done it without them embedded.', name: 'Marcus Lin', role: 'Founder, Lumen', tone: '#8b5cf6' },
  ],
  marquee: [
    { id: 'm1', label: 'Brand systems' },
    { id: 'm2', label: 'Web engineering' },
    { id: 'm3', label: 'Performance SEO' },
    { id: 'm4', label: 'Paid media' },
    { id: 'm5', label: 'Lifecycle automation' },
    { id: 'm6', label: 'Content engines' },
    { id: 'm7', label: 'Pitch & narrative' },
    { id: 'm8', label: 'Fractional ops' },
  ],
  contactEmail: 'hello@zenova.bd',
};

const DEFAULT_BRAND: BrandSettings = {
  studioName: 'Zenova',
  tagline: 'Modern digital solutions, end-to-end.',
  contactEmail: 'hello@zenova.bd',
  careersEmail: 'careers@zenova.studio',
  locations: [
    { id: 'l1', city: 'Brooklyn, NY', tz: 'UTC −4', detail: 'HQ · 12 people · founding studio' },
    { id: 'l2', city: 'Berlin', tz: 'UTC +2', detail: '6 people · EU client base, engineering core' },
    { id: 'l3', city: 'Remote', tz: '—', detail: 'Time zones permitting, hire anywhere' },
  ],
};

export const servicesStore = new Store<ServiceDetail[]>('services', DEFAULT_SERVICES);
export const projectsStore = new Store<ProjectDetail[]>('projects', DEFAULT_PROJECTS);
export const teamStore = new Store<TeamMember[]>('team', DEFAULT_TEAM);
export const contentStore = new Store<SiteContent>('content', DEFAULT_CONTENT);
export const brandStore = new Store<BrandSettings>('brand', DEFAULT_BRAND);

export function useServices() {
  return useStore(servicesStore);
}
export function useProjects() {
  return useStore(projectsStore);
}
export function useTeam() {
  return useStore(teamStore);
}
export function useContent() {
  return useStore(contentStore);
}
export function useBrand() {
  return useStore(brandStore);
}

export function findServiceLive(slug: string): ServiceDetail | undefined {
  return servicesStore.get().find((s) => s.slug === slug);
}

export function findProjectLive(slug: string): ProjectDetail | undefined {
  return projectsStore.get().find((p) => p.slug === slug);
}

export function resetAll() {
  servicesStore.reset();
  projectsStore.reset();
  teamStore.reset();
  contentStore.reset();
  brandStore.reset();
}

export function exportAll() {
  return {
    services: servicesStore.get(),
    projects: projectsStore.get(),
    team: teamStore.get(),
    content: contentStore.get(),
    brand: brandStore.get(),
  };
}

export function importAll(data: ReturnType<typeof exportAll>) {
  if (data.services) servicesStore.set(data.services);
  if (data.projects) projectsStore.set(data.projects);
  if (data.team) teamStore.set(data.team);
  if (data.content) contentStore.set(data.content);
  if (data.brand) brandStore.set(data.brand);
}

const AUTH_KEY = 'zenova.admin.auth';
const PASSCODE = 'zenova-admin';

export function isAuthed(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(AUTH_KEY) === '1';
}

export function login(passcode: string): boolean {
  if (passcode !== PASSCODE) return false;
  window.localStorage.setItem(AUTH_KEY, '1');
  return true;
}

export function logout() {
  window.localStorage.removeItem(AUTH_KEY);
}

export const ADMIN_PASSCODE_HINT = 'zenova-admin';
