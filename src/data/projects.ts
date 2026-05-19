export interface ProjectMetric {
  num: string;
  label: string;
}

export interface ProjectSection {
  title: string;
  body: string[];
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ProjectDetail {
  slug: string;
  client: string;
  category: string;
  industry: string;
  title: string;
  summary: string;
  tags: string[];
  tone: string;
  year: string;
  duration: string;
  team: string;
  services: string[];
  hero: string;
  metric: [string, string];
  metrics: ProjectMetric[];
  sections: ProjectSection[];
  deliverables: string[];
  stack: string[];
  testimonial: ProjectTestimonial;
  visualIdx: number;
}

export const PROJECTS: ProjectDetail[] = [
  {
    slug: 'northwind-labs',
    client: 'Northwind Labs',
    category: 'B2B SaaS',
    industry: 'Developer platform',
    title: 'Repositioning a developer platform around speed.',
    summary:
      'New brand, new site, and a content engine that turned a tired DX story into the fastest path to a free-trial signup.',
    tags: ['Brand', 'Web', 'Marketing'],
    tone: '#3a5bff',
    year: '2025',
    duration: '14 weeks',
    team: '5 people · 1 Slack channel',
    services: ['Website Development', 'Marketing Solutions', 'Content Writing'],
    hero: 'Northwind had a category-defining product and a marketing surface stuck two years behind it. The work was to make the surface match the speed.',
    metric: ['+212%', 'Trial signups, Q over Q'],
    metrics: [
      { num: '+212%', label: 'Trial signups, quarter over quarter' },
      { num: '0.9s', label: 'New site median LCP (was 4.2s)' },
      { num: '37', label: 'New SEO landings, 6 months' },
      { num: '+68%', label: 'Newsletter list growth' },
    ],
    sections: [
      {
        title: 'The challenge',
        body: [
          'Northwind had shipped three major DX wins in a year — none of which their site told you about. Time-to-trial was buried four pages deep. The blog ranked for the wrong keywords and the brand felt like a 2019 framework, not a 2025 platform.',
          'Their internal team had tried twice to rewrite the site between feature work. Both times it stalled at the design system. They needed an outside team that could ship the whole arc — brand, IA, build, content — in one engagement.',
        ],
      },
      {
        title: 'The approach',
        body: [
          'We started with the wedge: "the fastest deploy in the category." Every page, every headline, every metric on screen had to support that promise. We rebuilt the marketing site in Next.js with React Server Components, instrumented every CTA, and shipped a new design system the product team could adopt in week two.',
          'In parallel, the editorial team produced four pieces a week mapped to the cluster of queries Northwind should have owned 18 months ago. By month three the longest-tail piece was outranking the incumbent.',
        ],
      },
      {
        title: 'What shipped',
        body: [
          'A six-page marketing site, two interactive product walkthroughs, a docs IA refresh, and an editorial pipeline producing four pieces a week. Plus the metrics: a working A/B framework, server-side events into BigQuery, and a single pipeline dashboard the founders open every morning.',
        ],
      },
    ],
    deliverables: [
      'New brand system + logo',
      'Next.js marketing site',
      'Headless CMS (Sanity)',
      'SEO + content engine',
      'Pipeline dashboard',
      'Design system adopted by product',
    ],
    stack: ['Next.js 15', 'TypeScript', 'Sanity', 'Vercel', 'PostHog', 'BigQuery', 'Resend'],
    testimonial: {
      quote:
        'They shipped the version of the company we kept describing to investors and never quite got on screen. By week four it looked like we had hired a head of marketing and a brand director.',
      author: 'Devon Park',
      role: 'CEO, Northwind Labs',
    },
    visualIdx: 0,
  },
  {
    slug: 'aperture-health',
    client: 'Aperture Health',
    category: 'HealthTech',
    industry: 'Patient portal',
    title: 'A patient portal that actually gets used.',
    summary:
      'Rebuilt the booking, intake and records flow as one product. Replaced three vendors and shaved 38 minutes per appointment.',
    tags: ['Product', 'UX'],
    tone: '#6d4cff',
    year: '2025',
    duration: '22 weeks',
    team: '6 people',
    services: ['Website Development', 'Business Management'],
    hero: 'Three vendors. One patient. Forty minutes of friction every appointment. We took the whole flow inside the same product surface and rewrote the math.',
    metric: ['38 min', 'Saved per appointment'],
    metrics: [
      { num: '38 min', label: 'Average time saved per appointment' },
      { num: '−3', label: 'Vendors replaced' },
      { num: '92%', label: 'Of patients now self-onboard' },
      { num: '+24', label: 'NPS, six months post-launch' },
    ],
    sections: [
      {
        title: 'The challenge',
        body: [
          'Aperture had three best-in-class point tools — booking, intake, records — and a patient experience that felt like none of them. Patients re-entered their own details four times. Staff copy-pasted across portals. Every appointment lost forty minutes to friction nobody could quite point at.',
        ],
      },
      {
        title: 'The approach',
        body: [
          'We mapped the actual flow with shadow-shifts at two practices, then re-scoped the problem as one product: a single shell that owned identity, scheduling and records. The point tools became APIs. The patient never knew they were there.',
          'We built it as a typed monorepo with React Server Components on the front end and a Postgres + Drizzle backend tuned for the audit-log requirements of HIPAA. Performance was non-negotiable — the site is faster than the third-party widgets it replaced.',
        ],
      },
      {
        title: 'Outcomes',
        body: [
          'Six months in, average appointment time is down 38 minutes. Patient NPS is up 24 points. The practice retired three vendor contracts in the first quarter — paying for the engagement four times over.',
        ],
      },
    ],
    deliverables: [
      'Patient identity layer',
      'Unified booking flow',
      'Intake forms engine',
      'Records UI + audit log',
      'Staff dashboard',
      'HIPAA documentation',
    ],
    stack: ['Next.js', 'Drizzle', 'Postgres', 'Auth.js', 'Tailwind', 'Vercel', 'Datadog'],
    testimonial: {
      quote:
        'We thought we were buying a "redesign." We bought back forty minutes per visit. The clinical staff are the ones who keep thanking us.',
      author: 'Dr. Lila Okafor',
      role: 'COO, Aperture Health',
    },
    visualIdx: 1,
  },
  {
    slug: 'stellar-capital',
    client: 'Stellar Capital',
    category: 'Fintech',
    industry: 'Seed-stage fintech',
    title: 'From series A pitch to first-customer onboarding.',
    summary:
      'Eleven weeks: a working MVP, a closed seed round, and a sales motion the founders could run without us.',
    tags: ['Startup', 'GTM'],
    tone: '#a855f7',
    year: '2024',
    duration: '11 weeks',
    team: '4 people',
    services: ['Startup Support', 'Website Development', 'Marketing Solutions'],
    hero: 'Two founders, an idea, twelve weeks of runway and a target round size. We compressed a year of zero-to-one into a quarter and shipped before the term sheet closed.',
    metric: ['$4.2M', 'Raised post-MVP'],
    metrics: [
      { num: '$4.2M', label: 'Seed raised post-MVP' },
      { num: '11 days', label: 'From kickoff to first live product' },
      { num: '14', label: 'Paid pilots in first 60 days' },
      { num: '6', label: 'Investors signed before MVP launch' },
    ],
    sections: [
      {
        title: 'The challenge',
        body: [
          'Stellar had a deck, a thesis and a bank balance that gave them roughly twelve weeks. The product story they were pitching needed something investors could touch. They could not afford to hire — they needed a team that already existed.',
        ],
      },
      {
        title: 'The approach',
        body: [
          'Week one was a sprint-zero: pricing model, two customer interviews a day, brand directional. By week three we had a marketing site, a working MVP with onboarding and Stripe, and a deck investors stopped politely passing on.',
          'We sat in on every investor meeting that asked for a demo. Same team for design, build and narrative. The founders never had to translate between vendors.',
        ],
      },
      {
        title: 'Outcomes',
        body: [
          'They closed a $4.2M seed eight weeks after kickoff. The product had 14 paid pilots before launch. We rolled off at week eleven. They hired their first engineer two weeks after.',
        ],
      },
    ],
    deliverables: [
      'Brand + identity',
      'Pitch deck + investor memo',
      'MVP product (auth + Stripe + core loop)',
      'Marketing site',
      'GTM run book',
      'First 90-day plan',
    ],
    stack: ['Next.js', 'Supabase', 'Stripe', 'Resend', 'PostHog', 'Vercel'],
    testimonial: {
      quote:
        'They gave us the team we could not have hired in eleven weeks. The product was running before the term sheet was finalized — that is not how this is supposed to work, and it is the only reason we closed.',
      author: 'Priya Shah',
      role: 'Co-founder, Stellar Capital',
    },
    visualIdx: 2,
  },
  {
    slug: 'cobalt-studio',
    client: 'Cobalt Studio',
    category: 'Creative',
    industry: 'Independent media',
    title: 'A content engine producing 4 long-form pieces / wk.',
    summary:
      'Editorial calendar, briefs, in-house tools and SEO ops. Their writers ship; we sit alongside as the editor in chief.',
    tags: ['Content', 'SEO'],
    tone: '#4f8cff',
    year: '2025',
    duration: 'Ongoing (12 mo)',
    team: '3 people',
    services: ['Content Writing', 'Marketing Solutions'],
    hero: 'A small editorial team punching above its weight. We provided the seat-at-the-table editor and the operations to make four pieces a week a normal week.',
    metric: ['4× / wk', 'Long-form cadence'],
    metrics: [
      { num: '4× / wk', label: 'Long-form cadence, sustained' },
      { num: '+340%', label: 'Organic traffic, 12 months' },
      { num: '0', label: 'Missed publish dates in Q4' },
      { num: '11k → 58k', label: 'Newsletter growth, no paid' },
    ],
    sections: [
      {
        title: 'The challenge',
        body: [
          'Cobalt had three excellent writers and zero operating system around them. Briefs were verbal, SEO was an afterthought, and the publish cadence drifted whenever a feature ate the calendar. Their best piece of the year had been read 400 times.',
        ],
      },
      {
        title: 'The approach',
        body: [
          'We installed the editor and the operations at the same time. A six-month editorial calendar, brief templates that lived in Notion, an SEO cluster map, and a publication day every team learned to plan around. The writers kept their bylines.',
          'Every Friday we shipped a portfolio review: which pieces moved, which did not, what to retire. Compounding only works when you prune.',
        ],
      },
      {
        title: 'Outcomes',
        body: [
          'Twelve months in, traffic is up 340%, the newsletter has grown six-fold without paid acquisition, and the team has not missed a publish date in two quarters. Their best piece of this year has been read 92,000 times.',
        ],
      },
    ],
    deliverables: [
      'Editor in chief (fractional)',
      'Brief + voice templates',
      'SEO cluster strategy',
      'Editorial calendar (rolling)',
      'Newsletter program',
      'Quarterly portfolio review',
    ],
    stack: ['Notion', 'Ghost', 'Beehiiv', 'Ahrefs', 'Surfer', 'Linear'],
    testimonial: {
      quote:
        'They turned three writers into a publication. We finally hit the cadence I had been describing for two years — and the work got better, not just more.',
      author: 'Jules Carrington',
      role: 'Founder, Cobalt Studio',
    },
    visualIdx: 3,
  },
  {
    slug: 'mosaic',
    client: 'Mosaic',
    category: 'Consumer',
    industry: 'D2C consumer app',
    title: 'Growth engine from zero to first ten thousand users.',
    summary:
      'Paid acquisition, lifecycle, and a landing page architecture tuned for the four messaging arcs that actually convert.',
    tags: ['Marketing', 'Web'],
    tone: '#7a55ff',
    year: '2024',
    duration: '90 days',
    team: '4 people',
    services: ['Marketing Solutions', 'Website Development'],
    hero: 'Mosaic had launched with a Product Hunt bump and was watching it taper. We built the always-on motion that turned the spike into a flywheel.',
    metric: ['10k+', 'Activated users in 90 days'],
    metrics: [
      { num: '10k+', label: 'Activated users in 90 days' },
      { num: '−42%', label: 'CAC, paid blended' },
      { num: '4', label: 'Landing page archetypes shipped' },
      { num: '38%', label: 'D30 retention, +14pp vs baseline' },
    ],
    sections: [
      {
        title: 'The challenge',
        body: [
          'Post-launch lull. Mosaic had a product people loved and an acquisition motion that lived inside a single founder’s Notion doc. They needed a real program before the runway hit the wall.',
        ],
      },
      {
        title: 'The approach',
        body: [
          'We mapped four distinct messaging arcs — none of them the homepage. Each got its own landing page, its own paid creative set, and its own lifecycle drip. We ran two of them in parallel for 14 days, killed the loser, and doubled down.',
          'In parallel we rebuilt the marketing site as a typed Next.js app with first-class A/B infrastructure. Every angle could be tested without engineering involvement.',
        ],
      },
      {
        title: 'Outcomes',
        body: [
          'CAC came down 42% over the quarter. D30 retention picked up 14 points after lifecycle launched. They hired a head of growth in month four, and we handed everything over running.',
        ],
      },
    ],
    deliverables: [
      'Four landing page archetypes',
      'Paid program (Meta + TikTok)',
      'Lifecycle in Customer.io',
      'Pipeline dashboard',
      'Hiring scorecards (head of growth)',
    ],
    stack: ['Next.js', 'Customer.io', 'Segment', 'PostHog', 'GA4 + BigQuery', 'Looker'],
    testimonial: {
      quote:
        'The growth team I hired in month four inherited a real program, not a spreadsheet. That is rare, and it saved us a full year of figuring it out from scratch.',
      author: 'Mira Iqbal',
      role: 'CEO, Mosaic',
    },
    visualIdx: 0,
  },
  {
    slug: 'verge',
    client: 'Verge',
    category: 'Ops',
    industry: 'B2B finance ops',
    title: 'Replatformed billing without a single dropped invoice.',
    summary:
      'Migration of a tangled Stripe + custom-billing setup into one source of truth. Finance reclaimed two days every month.',
    tags: ['Ops', 'Web'],
    tone: '#5b6cff',
    year: '2024',
    duration: '18 weeks',
    team: '4 people',
    services: ['Business Management', 'Website Development'],
    hero: 'A billing system held together by two senior engineers and a folder of Loom recordings. We turned it into a service the finance team owns.',
    metric: ['2 days', 'Reclaimed per month'],
    metrics: [
      { num: '2 days', label: 'Finance hours reclaimed per month' },
      { num: '0', label: 'Invoices dropped during migration' },
      { num: '$1.4M', label: 'In disputed revenue resolved' },
      { num: '−61%', label: 'Time to close the month' },
    ],
    sections: [
      {
        title: 'The challenge',
        body: [
          'Verge ran on a six-year-old custom billing engine wedged into a Stripe account with five different test modes. Every month-end took two finance people three full days. New pricing experiments took an engineering quarter. Auditors had given up asking.',
        ],
      },
      {
        title: 'The approach',
        body: [
          'We modelled the system as it actually behaved — not as the docs claimed — and rebuilt it as a typed billing service on top of Stripe primitives. Migration ran shadow-mode for six weeks: every event posted to both systems, every variance investigated.',
          'Cut-over was a single weekend with rollback in place. Finance picked up the new dashboard on Monday. The first month-end after cut-over closed in a day and a half.',
        ],
      },
      {
        title: 'Outcomes',
        body: [
          'Two days of finance time back every month. $1.4M in disputed revenue traced and resolved during the audit prep. New pricing now ships in a sprint, not a quarter.',
        ],
      },
    ],
    deliverables: [
      'Typed billing service',
      'Stripe cleanup + reconciliation',
      'Finance dashboard',
      'Migration run book',
      'Audit-ready trail',
    ],
    stack: ['TypeScript', 'Stripe', 'Postgres', 'Temporal', 'Looker', 'Datadog'],
    testimonial: {
      quote:
        'The engagement paid for itself in the first month-end. The finance team trusts the numbers for the first time since I joined.',
      author: 'Alex Renner',
      role: 'CFO, Verge',
    },
    visualIdx: 1,
  },
];

export function findProject(slug: string): ProjectDetail | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
