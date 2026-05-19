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
  { id: 't1', name: 'Mira Aldana', role: 'Co-founder, Design', bio: 'Leads brand and product design. Previously at Linear.', initials: 'MA', tone: '#3a5bff' },
  { id: 't2', name: 'Tobias Reinhardt', role: 'Co-founder, Engineering', bio: 'Leads the build team. Previously at Stripe and Vercel.', initials: 'TR', tone: '#6d4cff' },
  { id: 't3', name: 'Suri Patel', role: 'Head of Growth', bio: 'Runs marketing, paid media and lifecycle programs.', initials: 'SP', tone: '#a855f7' },
  { id: 't4', name: 'Jordan Wei', role: 'Editorial Lead', bio: 'Heads up the content and brand voice work.', initials: 'JW', tone: '#7a55ff' },
];

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: 'Available for new projects',
    headline: 'One team for',
    rotatingWords: [
      'Web Development',
      'Marketing',
      'Startup Launch',
      'Operations',
      'Content',
    ],
    sub: 'Design, build, and grow — without juggling agencies. We handle the whole thing.',
    primaryCta: 'Start a project',
    secondaryCta: 'See our work',
    stats: [
      { id: 's1', num: '20+', label: 'Projects shipped' },
      { id: 's2', num: '8', label: 'Active clients' },
      { id: 's3', num: '4.9', label: 'Client rating' },
      { id: 's4', num: '2026', label: 'Since' },
    ],
  },
  cta: {
    eyebrow: 'Open for new projects',
    title: 'Got an idea?',
    accentTitle: "Let's talk.",
    sub: 'A quick 30-minute call. No pitch, just your project.',
    primary: 'Book a call',
    secondary: 'hello@zenova.bd',
  },
  faqs: [
    { id: 'f1', q: 'How are you different from an agency?', a: "One team handles design, build, and growth. No handoffs between vendors — same people from start to finish." },
    { id: 'f2', q: 'How long is a typical project?', a: '6 to 10 weeks for a build. Many clients stay on monthly for ongoing growth work.' },
    { id: 'f3', q: 'Do we own the code and designs?', a: 'Yes. Everything sits in your accounts from day one — your GitHub, your Figma, your domain.' },
    { id: 'f4', q: 'How does pricing work?', a: 'Flat fee per phase for builds. Flat monthly fee for ongoing work. No hourly billing.' },
    { id: 'f5', q: 'Can you work with our team?', a: 'Yes. We often plug into existing teams and follow your conventions.' },
    { id: 'f6', q: 'How soon can we start?', a: 'Usually 1 to 2 weeks after our intro call.' },
  ],
  testimonials: [
    { id: 'q1', quote: 'They replaced three of our vendors. One team, one channel, one invoice.', name: 'Maya Okafor', role: 'COO, Northwind', tone: '#3a5bff' },
    { id: 'q2', quote: 'A working prototype in eleven days. Best momentum we’ve had in years.', name: 'Daniel Reyes', role: 'CEO, Stellar', tone: '#6d4cff' },
    { id: 'q3', quote: 'We came in for a site. We left with a full growth plan and real pipeline.', name: 'Priya Nair', role: 'Head of Growth, Aperture', tone: '#a855f7' },
    { id: 'q4', quote: 'The cleanest handoff we’ve ever seen. Our team picked it up the next morning.', name: 'Jonas Weber', role: 'CTO, Cobalt', tone: '#5b6cff' },
    { id: 'q5', quote: 'Traffic up 4x. CAC down a third. They run growth like a product team.', name: 'Aisha Mensah', role: 'Founder, Mosaic', tone: '#7a55ff' },
    { id: 'q6', quote: 'Most agencies sell a deck. Zenova built us a system and taught us how to run it.', name: 'Leo Castelli', role: 'COO, Verge', tone: '#9a4dff' },
  ],
  marquee: [
    { id: 'm1', label: 'Branding' },
    { id: 'm2', label: 'Web Design' },
    { id: 'm3', label: 'SEO' },
    { id: 'm4', label: 'Paid Ads' },
    { id: 'm5', label: 'Email' },
    { id: 'm6', label: 'Content' },
    { id: 'm7', label: 'Strategy' },
    { id: 'm8', label: 'Operations' },
  ],
  contactEmail: 'hello@zenova.bd',
};

const DEFAULT_BRAND: BrandSettings = {
  studioName: 'Zenova',
  tagline: 'Design, build, and grow — one team.',
  contactEmail: 'hello@zenova.bd',
  careersEmail: 'careers@zenova.bd',
  locations: [
    { id: 'l1', city: 'Brooklyn, NY', tz: 'EST', detail: 'Headquarters' },
    { id: 'l2', city: 'Berlin', tz: 'CET', detail: 'European hub' },
    { id: 'l3', city: 'Remote', tz: 'Global', detail: 'We hire worldwide' },
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
