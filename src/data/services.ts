import type { IconName } from '@/components/icons/Icon';
import type { ServiceVisualKind } from '@/components/sections/ServiceVisual';

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  cadence: string;
  fits: string;
  includes: string[];
  featured?: boolean;
}

export interface ServicePhase {
  n: string;
  title: string;
  blurb: string;
  out: string;
}

export interface ServiceDetail {
  slug: string;
  icon: IconName;
  tag: string;
  title: string;
  short: string;
  lede: string;
  hero: string;
  bullets: string[];
  stat: [string, string];
  hue: string;
  visual: ServiceVisualKind;
  meta: Array<[string, string]>;
  deliverables: Array<{ title: string; blurb: string }>;
  phases: ServicePhase[];
  stack: string[];
  packages: ServicePackage[];
  faqs: ServiceFAQ[];
  related: string[];
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: 'web',
    icon: 'Code',
    tag: 'Build',
    title: 'Website Development',
    short: 'High-performance sites and web apps engineered for speed, accessibility and revenue.',
    lede: 'High-performance sites and web apps engineered for speed, accessibility and revenue.',
    hero: 'A site is a product. We build it like one — typed, tested, instrumented, and fast enough that your conversion graph notices.',
    bullets: [
      'Next.js & TypeScript engineering',
      'Headless CMS integration',
      'Core Web Vitals tuning',
      'Analytics & A/B testing',
    ],
    stat: ['<1.2s', 'Median LCP across recent ships'],
    hue: '#3a5bff',
    visual: 'browser',
    meta: [
      ['<1.2s', 'Median LCP'],
      ['98 / 100', 'Lighthouse target'],
      ['6 – 10 wks', 'Typical build'],
      ['12', 'Months of post-launch support'],
    ],
    deliverables: [
      {
        title: 'Production codebase',
        blurb: 'Next.js + TypeScript, fully typed, fully tested, hosted on Vercel or your infra of choice.',
      },
      {
        title: 'Headless CMS',
        blurb: 'Sanity, Contentful or Payload — wired so non-engineers can ship copy without a ticket.',
      },
      {
        title: 'Design system',
        blurb: 'Tokens, primitives and patterns documented in Storybook. Reuses across marketing and product.',
      },
      {
        title: 'Analytics & experimentation',
        blurb: 'Server-side events, GA4 / Plausible, a working A/B test on day one of launch.',
      },
      {
        title: 'Performance budget',
        blurb: 'Numbers we hold the line on: LCP, INP, CLS, JS payload. Regressions fail CI.',
      },
      {
        title: 'Handover docs',
        blurb: 'Architecture diagram, runbook, on-call cheatsheet — readable by an engineer on day one.',
      },
    ],
    phases: [
      {
        n: '01',
        title: 'Audit & architecture',
        blurb: 'Map current stack, traffic and pain points. Decide what to keep, replatform or kill.',
        out: 'Single-page architecture brief',
      },
      {
        n: '02',
        title: 'Design system & IA',
        blurb: 'Information architecture, tokens, primitives. Marketing site and product app share the foundation.',
        out: 'Figma library + Storybook',
      },
      {
        n: '03',
        title: 'Build in slices',
        blurb: 'Daily preview URLs. Weekly demos. Decisions stay reversible until the slice ships.',
        out: 'Staging URL, growing weekly',
      },
      {
        n: '04',
        title: 'Launch & instrument',
        blurb: 'Cut-over with a rollback plan. Performance budgets enforced in CI. First A/B test live.',
        out: 'Production traffic + dashboards',
      },
    ],
    stack: [
      'Next.js 15',
      'TypeScript',
      'React Server Components',
      'Sanity / Payload',
      'Tailwind / vanilla CSS',
      'Vercel / Cloudflare',
      'Playwright',
      'PostHog / GA4',
    ],
    packages: [
      {
        name: 'Marketing site',
        price: 'from $24k',
        cadence: 'one-time',
        fits: 'Series A teams replacing a legacy WordPress / template site.',
        includes: [
          '8 – 12 marketing pages',
          'Headless CMS + content model',
          'Animations & micro-interactions',
          '90-day post-launch support',
        ],
      },
      {
        name: 'Product + marketing',
        price: 'from $58k',
        cadence: '8 – 10 weeks',
        fits: 'Companies launching a new product surface alongside the site.',
        includes: [
          'Marketing site (full scope)',
          'Authenticated product shell',
          'Design system + Storybook',
          '6 months engineering retainer',
        ],
        featured: true,
      },
      {
        name: 'Replatform',
        price: 'custom',
        cadence: 'engagement',
        fits: 'Teams migrating off Webflow / WordPress / a tangled monorepo without losing SEO.',
        includes: [
          'Content + URL migration',
          'Performance + a11y audit',
          'Phased cut-over plan',
          'Org-wide enablement',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do we own the code?',
        a: 'Yes. The repo is yours from day one — your GitHub org, your domain, your deploys.',
      },
      {
        q: 'Can our team take over after launch?',
        a: 'That is the goal. Stack is intentionally boring. We hand over with a runbook and pair for two weeks if you want it.',
      },
      {
        q: 'What about SEO during a replatform?',
        a: 'We freeze the URL map, set up 301 graphs and run a parity diff before cut-over. We have not lost a top-100 keyword on a migration since 2022.',
      },
      {
        q: 'Does this include design?',
        a: 'Yes — visual design, IA and frontend engineering are one engagement. We do not hand off across vendors.',
      },
    ],
    related: ['marketing', 'startup', 'content'],
  },
  {
    slug: 'marketing',
    icon: 'Spark',
    tag: 'Grow',
    title: 'Marketing Solutions',
    short: 'Demand generation, SEO, paid media and lifecycle programs tied to actual revenue lines.',
    lede: 'Demand generation, SEO, paid media and lifecycle programs tied to actual revenue lines.',
    hero: 'We do not run campaigns. We run a pipeline. Every channel feeds one dashboard the founders, the CFO and the sales lead all trust.',
    bullets: [
      'Performance SEO programs',
      'Paid media (Meta, LinkedIn, Google)',
      'Email & lifecycle automation',
      'Attribution & MMM dashboards',
    ],
    stat: ['3.4×', 'Average pipeline lift in 90 days'],
    hue: '#5b6cff',
    visual: 'curve',
    meta: [
      ['3.4×', 'Avg pipeline lift'],
      ['90 days', 'To first signal'],
      ['$6 – 60k', 'Monthly media managed'],
      ['1', 'Source-of-truth dashboard'],
    ],
    deliverables: [
      {
        title: 'Channel strategy',
        blurb: 'Where to play, where not to. We turn down channels we cannot win — saves you 30% of the budget.',
      },
      {
        title: 'Paid media',
        blurb: 'Meta, LinkedIn, Google. Creative iteration weekly. Spend ramps with proof, not vibes.',
      },
      {
        title: 'Programmatic SEO',
        blurb: 'Cluster maps, internal linking, content briefs, technical fixes. We write or we edit your writers.',
      },
      {
        title: 'Lifecycle automation',
        blurb: 'Customer.io / Braze / native — onboarding, reactivation, win-back. All event-driven.',
      },
      {
        title: 'Attribution & MMM',
        blurb: 'Multi-touch, time-decay, and a quarterly MMM read so spend matches the ground truth.',
      },
      {
        title: 'Pipeline dashboard',
        blurb: 'One Linear-clean view. Revenue, CAC, payback, CAC:LTV — refreshed daily, shared with the board.',
      },
    ],
    phases: [
      {
        n: '01',
        title: 'Audit & baseline',
        blurb: 'Funnel teardown, attribution audit, channel-by-channel forecast. Honest about what is working.',
        out: 'Pipeline baseline doc',
      },
      {
        n: '02',
        title: 'Pilot quarter',
        blurb: 'Two channels, one hypothesis per channel. Weekly creative + asset cadence.',
        out: 'First quantified lift',
      },
      {
        n: '03',
        title: 'Scale & defend',
        blurb: 'Double down on what is compounding. Kill what is not. SEO and lifecycle move from pilot to program.',
        out: 'Multi-channel run book',
      },
      {
        n: '04',
        title: 'Hand the keys',
        blurb: 'You hire a director. We pair for one quarter, then drop to a strategic retainer.',
        out: 'In-house team running it',
      },
    ],
    stack: [
      'HubSpot / Salesforce',
      'Customer.io',
      'Segment',
      'GA4 + BigQuery',
      'PostHog',
      'Looker / Mode',
      'Ahrefs + SurferSEO',
      'Iterable',
    ],
    packages: [
      {
        name: 'Growth pilot',
        price: '$14k / mo',
        cadence: 'min. 3 months',
        fits: 'Seed / Series A testing the first scalable channel.',
        includes: ['1 paid channel', 'SEO baseline', 'Weekly creative', 'Pipeline dashboard'],
      },
      {
        name: 'Full pipeline',
        price: '$28k / mo',
        cadence: 'min. 6 months',
        fits: 'Teams with proven product-market fit ready to compound.',
        includes: [
          'All channels + lifecycle',
          'Brief + creative team',
          'Attribution + MMM',
          'Quarterly board readout',
        ],
        featured: true,
      },
      {
        name: 'Fractional CMO',
        price: 'from $9k / mo',
        cadence: 'strategic',
        fits: 'You have the team. You need the operator.',
        includes: ['Weekly leadership', 'Hiring + interviews', 'Vendor management', 'Quarterly OKRs'],
      },
    ],
    faqs: [
      {
        q: 'Do you require minimum ad spend?',
        a: 'We recommend a floor of $6k / mo per active paid channel — below that, creative iteration outweighs the data.',
      },
      {
        q: 'What if SEO is our only realistic channel?',
        a: 'Then we lean in. We have run SEO-only programs to $4M ARR. Not every business needs paid.',
      },
      {
        q: 'Do you handle creative?',
        a: 'Yes — copy, static, and motion. We have an in-house brief-to-asset pipeline so weekly creative is normal, not heroic.',
      },
      {
        q: 'How do we measure your impact specifically?',
        a: 'Pre-engagement baseline + month-over-month deltas + an incrementality test by month four. We name the numbers ourselves.',
      },
    ],
    related: ['content', 'web', 'ops'],
  },
  {
    slug: 'startup',
    icon: 'Rocket',
    tag: 'Launch',
    title: 'Startup Support',
    short: 'From pitch deck to MVP to first hundred customers — a partner that ships, not just advises.',
    lede: 'From pitch deck to MVP to first hundred customers — a partner that ships, not just advises.',
    hero: 'Founders have an idea, a runway and a calendar. We back-fill the missing co-founders — design, engineering, brand — for the eight weeks that matter most.',
    bullets: [
      'Pitch & investor narrative',
      'MVP scoping & build',
      'Brand & positioning sprint',
      'Go-to-market runway',
    ],
    stat: ['11 days', 'Fastest funded MVP we shipped'],
    hue: '#7a55ff',
    visual: 'rocket',
    meta: [
      ['11 days', 'Fastest funded MVP'],
      ['$58M+', 'Raised by our portfolio'],
      ['8 wks', 'Typical 0 → 1 sprint'],
      ['1', 'Slack channel, end-to-end'],
    ],
    deliverables: [
      {
        title: 'Investor narrative',
        blurb: 'Deck, memo, one-pager. Tight problem statement, defensible wedge, ten-slide arc.',
      },
      {
        title: 'Brand identity',
        blurb: 'Mark, type system, voice, motion. Enough to look like a Series A on day one.',
      },
      {
        title: 'MVP',
        blurb: 'Working product, not a clickable prototype. Auth, billing, the one core loop, instrumented.',
      },
      {
        title: 'Marketing site',
        blurb: 'Six pages. Above-the-fold that survives a Hacker News front page.',
      },
      {
        title: 'GTM runway',
        blurb: 'First 90-day plan: outbound list, content cadence, two channels, a weekly review.',
      },
      {
        title: 'Founder coaching',
        blurb: 'Weekly working session. Decision support, not theatre. We say what we would do.',
      },
    ],
    phases: [
      {
        n: '01',
        title: 'Sprint zero',
        blurb: 'Five-day intensive: positioning, wedge, what the MVP is and is not. No PowerPoint.',
        out: 'Signed-off product brief',
      },
      {
        n: '02',
        title: 'Brand + deck',
        blurb: 'Identity, narrative, deck and memo. Often paired with an actual fundraise.',
        out: 'Investor-ready package',
      },
      {
        n: '03',
        title: 'MVP build',
        blurb: 'Daily previews. The product ships before the deck is final.',
        out: 'Live product + first users',
      },
      {
        n: '04',
        title: 'First customers',
        blurb: 'GTM motion, outbound, content cadence. We pair until you have ten paying logos.',
        out: 'Repeatable acquisition motion',
      },
    ],
    stack: [
      'Next.js + Tailwind',
      'Supabase / Neon',
      'Stripe',
      'Resend / Loops',
      'Linear',
      'Notion',
      'Figma',
      'Vercel',
    ],
    packages: [
      {
        name: 'Pre-seed sprint',
        price: '$22k',
        cadence: '2 weeks',
        fits: 'Founders raising a pre-seed or angel round.',
        includes: ['Pitch deck', 'Memo + financials skeleton', 'Brand directional', 'Landing page'],
      },
      {
        name: '0 → 1',
        price: 'from $80k',
        cadence: '8 weeks',
        fits: 'Funded teams without senior in-house design / engineering.',
        includes: ['Brand + identity', 'MVP build', 'Marketing site', 'First GTM motion'],
        featured: true,
      },
      {
        name: 'Fractional team',
        price: 'from $24k / mo',
        cadence: 'rolling',
        fits: 'Founders who need a real team, not advisors.',
        includes: ['1 senior eng', '1 senior designer', '1 PM / strategist', 'Weekly leadership'],
      },
    ],
    faqs: [
      {
        q: 'Do you take equity?',
        a: 'Occasionally — alongside cash, not instead of. We pass on equity-only deals; they distort incentives.',
      },
      {
        q: 'Can you help us raise?',
        a: 'We produce the artifacts and prep the founders. We will not pitch on your behalf.',
      },
      {
        q: 'What if our co-founder is the engineer?',
        a: 'Great — we slot in as design + GTM and ship faster than working solo.',
      },
      {
        q: 'How fast is the fastest realistic MVP?',
        a: 'Eleven working days, once. Twenty days is the honest median for something investors and users can both touch.',
      },
    ],
    related: ['web', 'marketing', 'content'],
  },
  {
    slug: 'ops',
    icon: 'Layers',
    tag: 'Operate',
    title: 'Business Management',
    short: 'Fractional ops, finance and tooling that turn a busy team into a high-leverage one.',
    lede: 'Fractional ops, finance and tooling that turn a busy team into a high-leverage one.',
    hero: 'A ten-person team that runs like twenty. Tools wired together, SOPs that someone actually reads, and a weekly cadence that survives the founder taking a vacation.',
    bullets: [
      'Process design & SOPs',
      'CRM & tooling stack',
      'Hiring & onboarding playbooks',
      'Weekly reporting cadence',
    ],
    stat: ['38%', 'Average hours reclaimed monthly'],
    hue: '#9a4dff',
    visual: 'kanban',
    meta: [
      ['38%', 'Avg hours reclaimed'],
      ['7 → 22', 'Tools consolidated, typical'],
      ['1 day', 'Onboarding to first ship'],
      ['$0', 'New seats licensed in month 2'],
    ],
    deliverables: [
      {
        title: 'Tool stack audit',
        blurb: 'What you have, what overlaps, what to cut. Usually 30% of the line-items by month two.',
      },
      {
        title: 'CRM + RevOps',
        blurb: 'HubSpot or Salesforce, set up to be used — not a graveyard. Pipeline hygiene by default.',
      },
      {
        title: 'SOPs that survive',
        blurb: 'Living docs in Notion / Coda. Short. Owned. Reviewed quarterly.',
      },
      {
        title: 'Hiring playbook',
        blurb: 'Scorecards, intake forms, interview loops. We sit in on the first three hires.',
      },
      {
        title: 'Weekly cadence',
        blurb: 'Standups, reviews, retros. Calendar template, agenda templates, a default that holds.',
      },
      {
        title: 'Reporting suite',
        blurb: 'One dashboard for the founders, one for the team, one for the board. Same source of truth.',
      },
    ],
    phases: [
      {
        n: '01',
        title: 'Diagnose',
        blurb: 'Two weeks of interviews, ride-alongs and tool review. We surface what the team already knows.',
        out: 'Diagnostic memo + priorities',
      },
      {
        n: '02',
        title: 'Consolidate',
        blurb: 'Cut tools, document SOPs, rewire CRM. Quick wins first to build trust.',
        out: 'Lighter stack, faster cycles',
      },
      {
        n: '03',
        title: 'Cadence',
        blurb: 'Install the weekly + monthly + quarterly rhythm. Run it with you until it sticks.',
        out: 'Self-sustaining ops calendar',
      },
      {
        n: '04',
        title: 'Hand off',
        blurb: 'Hire your ops lead or COO. We pair for one quarter, then drop to a strategic check-in.',
        out: 'In-house ops function',
      },
    ],
    stack: [
      'HubSpot / Salesforce',
      'Notion / Coda',
      'Linear',
      'Slack',
      'Zapier / Make',
      'Stripe + Mercury',
      'Rippling / Gusto',
      'Looker / Mode',
    ],
    packages: [
      {
        name: 'Diagnostic',
        price: '$12k',
        cadence: '3 weeks',
        fits: 'Teams not sure what is actually broken.',
        includes: ['Interviews + ride-alongs', 'Tool audit', 'Priority memo', 'Roadmap'],
      },
      {
        name: 'Operate with us',
        price: '$16k / mo',
        cadence: 'min. 6 months',
        fits: 'Teams 10 – 40 without a head of ops.',
        includes: ['Fractional COO', 'Tooling overhaul', 'SOPs + cadence', 'Hiring + onboarding'],
        featured: true,
      },
      {
        name: 'COO-as-a-service',
        price: 'from $26k / mo',
        cadence: 'strategic',
        fits: 'Series B + teams between COOs.',
        includes: ['Senior operator embedded', 'Board reporting', 'Vendor + legal sync', 'Quarterly OKRs'],
      },
    ],
    faqs: [
      {
        q: 'Are you a fractional COO firm?',
        a: 'Close. We pair an operator with a tooling engineer — so SOPs are not just docs, they ship as automations.',
      },
      {
        q: 'Will you fight our SaaS sprawl?',
        a: 'Yes. We have killed more Notion clones than we can count. Net licenses always go down in month two.',
      },
      {
        q: 'How long is the engagement?',
        a: 'Six months is the floor. Most clients keep us on a strategic cadence after that — one call a month.',
      },
      {
        q: 'Do you help with the actual hiring?',
        a: 'We write the scorecards, sit in on the first three loops and debrief candidates. We do not source.',
      },
    ],
    related: ['marketing', 'web', 'content'],
  },
  {
    slug: 'content',
    icon: 'Pen',
    tag: 'Voice',
    title: 'Content Writing',
    short: 'Editorial, longform and brand copy that reads like a human and ranks like a machine.',
    lede: 'Editorial, longform and brand copy that reads like a human and ranks like a machine.',
    hero: 'Most marketing content is a tax. Ours is leverage — a publication people actually read, indexed for the queries that matter, written by editors with bylines you would recognize.',
    bullets: [
      'Brand voice & messaging',
      'SEO articles & guides',
      'Sales & landing copy',
      'Newsletter strategy',
    ],
    stat: ['+212%', 'Organic traffic lift, 6-month avg'],
    hue: '#a855f7',
    visual: 'editor',
    meta: [
      ['+212%', '6-mo organic lift'],
      ['4 / wk', 'Long-form cadence'],
      ['2.3k', 'Avg words per piece'],
      ['38', 'Active editorial clients'],
    ],
    deliverables: [
      {
        title: 'Brand voice',
        blurb: 'A short guide with examples. The kind a new hire can read in 20 minutes and write in your tone.',
      },
      {
        title: 'Editorial calendar',
        blurb: 'Six months ahead. Themes, briefs, owners and ship dates. Lives in Notion, not someone’s head.',
      },
      {
        title: 'Long-form articles',
        blurb: 'Briefs, drafts, edits, publishing. We write or we edit yours. Either way, every piece earns its placement.',
      },
      {
        title: 'Landing & sales copy',
        blurb: 'Headlines, decks, sales sequences. We test the angles that actually move the funnel.',
      },
      {
        title: 'Newsletter',
        blurb: 'Programming, copy and growth loop. We have grown lists 0 → 50k without paid acquisition.',
      },
      {
        title: 'SEO + distribution',
        blurb: 'Cluster mapping, internal linking, syndication and repurposing. One brief, six surfaces.',
      },
    ],
    phases: [
      {
        n: '01',
        title: 'Voice + audit',
        blurb: 'Read everything you have shipped. Codify the voice. Tag the gaps.',
        out: 'Voice doc + content audit',
      },
      {
        n: '02',
        title: 'Calendar + pilots',
        blurb: 'Six-month calendar. Three pilot pieces to calibrate brief format and voice.',
        out: 'First three publications',
      },
      {
        n: '03',
        title: 'Cadence',
        blurb: 'Four pieces a week, on time, on voice. We edit, you ship.',
        out: 'Compounding library',
      },
      {
        n: '04',
        title: 'Distribution',
        blurb: 'Syndication, newsletter and partnership plays. Content stops being orphaned.',
        out: 'Multi-channel program',
      },
    ],
    stack: [
      'Notion',
      'Ghost / WordPress',
      'Beehiiv / Substack',
      'Surfer + Ahrefs',
      'ConvertKit',
      'Linear',
      'Loom',
      'Figma',
    ],
    packages: [
      {
        name: 'Voice + pilot',
        price: '$11k',
        cadence: '4 weeks',
        fits: 'Teams without a defined editorial voice.',
        includes: ['Voice doc', 'Three pilot pieces', 'SEO baseline', 'Brief template'],
      },
      {
        name: 'Editorial program',
        price: 'from $9k / mo',
        cadence: 'min. 6 months',
        fits: 'Teams ready to ship 4+ pieces a week.',
        includes: ['Editor in chief', 'Briefs + drafts', 'SEO + internal links', 'Quarterly review'],
        featured: true,
      },
      {
        name: 'Editor-as-a-service',
        price: 'from $5k / mo',
        cadence: 'strategic',
        fits: 'You have writers. You need an editor with taste.',
        includes: ['Weekly edits', 'Voice enforcement', 'Brief reviews', 'Quarterly retro'],
      },
    ],
    faqs: [
      {
        q: 'Do you ghostwrite?',
        a: 'Yes — under your byline or your team’s. We disclose to you which writer drafted what, and an editor reviews everything.',
      },
      {
        q: 'How is this different from a content agency?',
        a: 'We are an editorial team, not a content mill. Three writers, two editors. Cadence over volume.',
      },
      {
        q: 'Can you write technical / developer content?',
        a: 'Yes. Half our roster is developer marketing — protocols, infra, dev tools. We code-review our own examples.',
      },
      {
        q: 'Do you guarantee SEO results?',
        a: 'We forecast traffic ranges and hold ourselves to them. No SEO firm honestly guarantees rankings.',
      },
    ],
    related: ['marketing', 'web', 'startup'],
  },
];

export function findService(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
