import { useEffect } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { CTA } from '@/components/sections/CTA';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon, type IconName, type IconComponent } from '@/components/icons/Icon';

interface Value {
  icon: IconName;
  title: string;
  blurb: string;
  hue: string;
}

const VALUES: Value[] = [
  {
    icon: 'Spark',
    title: 'Make the thing, then talk about it',
    blurb:
      "We'd rather ship a rough prototype than write a perfect deck about one. Decisions get cheaper the moment something exists.",
    hue: '#3a5bff',
  },
  {
    icon: 'Layers',
    title: 'One team, one accountability line',
    blurb:
      'No matrix, no producers between you and the people doing the work. The senior on the kickoff call is the senior on month twelve.',
    hue: '#6d4cff',
  },
  {
    icon: 'Compass',
    title: 'Calibrate to outcomes, not artifacts',
    blurb:
      "Every quarter we re-ask whether the deliverable is still the right one. We've killed our own decks more than once.",
    hue: '#a855f7',
  },
  {
    icon: 'Check',
    title: 'Boring infrastructure, ambitious surface',
    blurb:
      'We pick the dependable tool for the engine and spend the saved time where users actually feel the difference.',
    hue: '#4f8cff',
  },
];

interface Member {
  name: string;
  role: string;
  bio: string;
  initials: string;
  tone: string;
}

const TEAM: Member[] = [
  {
    name: 'Mira Aldana',
    role: 'Co-founder · Design & strategy',
    bio: 'Previously design lead at Spectral and Linear. Runs the brand and product-design practice.',
    initials: 'MA',
    tone: '#3a5bff',
  },
  {
    name: 'Tobias Reinhardt',
    role: 'Co-founder · Engineering',
    bio: 'Shipped infra at Stripe and platform at Vercel. Owns the build stack and engineering hires.',
    initials: 'TR',
    tone: '#6d4cff',
  },
  {
    name: 'Suri Patel',
    role: 'Head of growth',
    bio: 'Ran paid + lifecycle at three Series-B startups before joining. Lives in the attribution dashboard.',
    initials: 'SP',
    tone: '#a855f7',
  },
  {
    name: 'Jordan Wei',
    role: 'Editorial lead',
    bio: 'Long-form for The Verge and Stripe Press. Heads the content engine and brand voice work.',
    initials: 'JW',
    tone: '#7a55ff',
  },
  {
    name: 'Noor Bashir',
    role: 'Principal engineer',
    bio: 'Built design systems at Notion and Vercel. Leads the build squad and on-call rotation.',
    initials: 'NB',
    tone: '#4f8cff',
  },
  {
    name: 'Eitan Brody',
    role: 'Brand director',
    bio: 'Founder of two studios before Zenova. Logos, type and motion direction.',
    initials: 'EB',
    tone: '#5b6cff',
  },
  {
    name: 'Yuki Sato',
    role: 'Head of operations',
    bio: 'Ex-COO at a Series B fintech. Owns the fractional-ops practice and our internal cadence.',
    initials: 'YS',
    tone: '#6d4cff',
  },
  {
    name: 'Cassidy Lam',
    role: 'Producer',
    bio: 'Holds every engagement together. The voice on Friday demos, the calendar on Monday plans.',
    initials: 'CL',
    tone: '#9a4dff',
  },
];

interface Manifesto {
  n: string;
  title: string;
  body: string;
}

const MANIFESTO: Manifesto[] = [
  {
    n: '01',
    title: 'Make the seams the product',
    body: 'The work between vendors is where projects die. We treat the seams — brand into product, product into growth — as the actual deliverable.',
  },
  {
    n: '02',
    title: 'Stay small. Get senior',
    body: 'Eighteen people. Average tenure: nine years in the craft. We do not staff against headcount; we staff against the work.',
  },
  {
    n: '03',
    title: 'Keep the client in the file',
    body: 'Our Figma is your Figma. Our repo is your repo. There is no version that lives only on our laptops.',
  },
  {
    n: '04',
    title: 'End with a number',
    body: 'Every engagement ends with one metric we agreed to move. We publish it — wins and misses — so the next engagement starts honest.',
  },
];

interface Press {
  outlet: string;
  quote: string;
}

const PRESS: Press[] = [
  { outlet: 'Fast Company', quote: '"The studio operators quietly hire before everyone else does."' },
  { outlet: 'A List Apart', quote: '"A boring tech stack, an ambitious design surface, a real practice."' },
  { outlet: 'Sidebar', quote: '"Quiet, opinionated work — featured every other week, on purpose."' },
  { outlet: 'It\'s Nice That', quote: '"A fluency across brand, build and growth most studios still treat as separate."' },
];

interface Role {
  title: string;
  team: string;
  location: string;
}

const ROLES: Role[] = [
  { title: 'Senior product designer', team: 'Design', location: 'Brooklyn / Remote' },
  { title: 'Staff engineer (Next.js)', team: 'Engineering', location: 'Berlin / Remote' },
  { title: 'Growth strategist', team: 'Growth', location: 'Remote (US / EU)' },
  { title: 'Editor', team: 'Content', location: 'Remote (US / EU)' },
];

interface Location {
  city: string;
  tz: string;
  detail: string;
}

const LOCATIONS: Location[] = [
  { city: 'Brooklyn, NY', tz: 'UTC −4', detail: 'HQ · 12 people · founding studio' },
  { city: 'Berlin', tz: 'UTC +2', detail: '6 people · EU client base, engineering core' },
  { city: 'Remote', tz: '—', detail: 'Time zones permitting, hire anywhere' },
];

interface Milestone {
  year: string;
  what: string;
}

const TIMELINE: Milestone[] = [
  { year: '2019', what: 'Mira and Tobias spin Zenova out of a Friday night brand sprint for a friend.' },
  { year: '2021', what: 'First retained engagement crosses one year. The Grow phase becomes a real practice.' },
  { year: '2023', what: 'Editorial and ops teams join. We stop calling ourselves "the studio that also codes."' },
  { year: '2025', what: '38 active clients, 120+ shipped projects, still one Slack channel per engagement.' },
];

export function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow="About Zenova"
        title={
          <>
            A small studio
            <br />
            <span style={{ color: 'var(--fg-dim)' }}>doing the whole arc.</span>
          </>
        }
        sub="We started in 2019 with one belief: handoff is where most digital work goes to die. Everything we build is structured to keep one team accountable from sketch to scaled outcome."
        meta={[
          ['2019', 'Founded'],
          ['18', 'People'],
          ['Brooklyn ↔ Berlin', 'Time zones'],
          ['7 yr', 'Avg client tenure'],
        ]}
        secondary={{ label: 'See selected work', to: '/work' }}
      />

      <section className="sec" style={{ paddingTop: 80 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64 }}>
          <div>
            <div
              className="mono"
              style={{
                color: 'var(--fg-faint)',
                marginBottom: 18,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ width: 24, height: 1, background: 'var(--accent-2)' }} />
              The story
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(32px,4vw,52px)', margin: 0, fontWeight: 500 }}>
              We built the studio
              <br />
              <span style={{ color: 'var(--fg-dim)' }}>we wanted to hire.</span>
            </h2>
          </div>
          <div style={{ color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 18px' }}>
              Most of our founding clients were operators who kept telling the same story: a brand agency had
              done a great deck, a dev shop had built half a product, and the marketing vendor was running ads
              for a positioning everyone had moved on from. The work was good in pieces and broken at the
              seams.
            </p>
            <p style={{ margin: 0 }}>
              Zenova exists because we think the seams are the actual product. So we keep one team on the
              whole arc — design, build, grow — and price it like an engagement, not a SKU.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="Manifesto"
            title={<>Four lines we keep on the studio wall.</>}
            sub="A working document. We re-read it every quarter and edit it when we are honest about drift."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {MANIFESTO.map((m, i) => (
              <div
                key={m.n}
                className="card"
                style={{
                  position: 'relative',
                  padding: 32,
                  borderRadius: 22,
                  border: '1px solid var(--line)',
                  background:
                    'linear-gradient(160deg, rgba(58,91,255,0.10), rgba(168,85,247,0.04) 60%, rgba(255,255,255,0.01))',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 220,
                }}
              >
                <div
                  className="display"
                  style={{
                    position: 'absolute',
                    right: 14,
                    bottom: -28,
                    fontSize: 140,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.04)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {m.n}
                </div>
                <div
                  className="mono"
                  style={{ color: 'var(--accent-3)', fontSize: 12, letterSpacing: '0.12em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="display" style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>
                  {m.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--fg-dim)',
                    fontSize: 15,
                    lineHeight: 1.6,
                    position: 'relative',
                  }}
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="What we believe"
            title={<>Four things we don&apos;t negotiate on.</>}
            sub="These show up in every engagement, regardless of size. If we drift, the client is supposed to notice and call it out."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {VALUES.map((v) => {
              const IconC = Icon[v.icon] as IconComponent;
              return (
                <div
                  key={v.title}
                  className="card"
                  style={{
                    padding: 28,
                    borderRadius: 20,
                    border: '1px solid var(--line)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      border: `1px solid ${v.hue}40`,
                      background: `${v.hue}1a`,
                      color: v.hue,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconC size={20} />
                  </div>
                  <h3 className="display" style={{ fontSize: 20, fontWeight: 500, margin: 0 }}>
                    {v.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 15, lineHeight: 1.6 }}>
                    {v.blurb}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="The people"
            title={<>Senior on day one. Senior on month twelve.</>}
            sub="The team you meet on the intro call is the team that ships the work. No bait-and-switch staffing."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="card"
                style={{
                  padding: 28,
                  borderRadius: 20,
                  border: '1px solid var(--line)',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${m.tone}33, transparent 65%)`,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${m.tone}, var(--accent-3))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#fff',
                    boxShadow: `0 8px 20px ${m.tone}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
                    position: 'relative',
                  }}
                >
                  {m.initials}
                </div>
                <div style={{ position: 'relative' }}>
                  <div className="display" style={{ fontSize: 20, fontWeight: 500 }}>
                    {m.name}
                  </div>
                  <div className="mono" style={{ color: 'var(--fg-faint)', marginTop: 4, fontSize: 12 }}>
                    {m.role}
                  </div>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--fg-dim)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    position: 'relative',
                  }}
                >
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <SectionHeader
            align="center"
            eyebrow="Milestones"
            title={<>Seven years, no rebrand.</>}
          />
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: 20,
              overflow: 'hidden',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
            }}
          >
            {TIMELINE.map((m, i) => (
              <div
                key={m.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 24,
                  padding: '24px 28px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                  alignItems: 'baseline',
                }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: 28,
                    fontWeight: 500,
                    background: 'var(--grad)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {m.year}
                </div>
                <div style={{ color: 'var(--fg-dim)', fontSize: 15, lineHeight: 1.6 }}>{m.what}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="Press"
            title={<>Mentioned, occasionally.</>}
            sub="We do not pitch press. Most of these found us through clients or through the work itself."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 14,
            }}
          >
            {PRESS.map((p) => (
              <div
                key={p.outlet}
                className="card"
                style={{
                  padding: 24,
                  borderRadius: 18,
                  border: '1px solid var(--line)',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  className="mono"
                  style={{ color: 'var(--accent-3)', letterSpacing: '0.12em' }}
                >
                  {p.outlet}
                </div>
                <div
                  className="display"
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: 'var(--fg)' }}
                >
                  {p.quote}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}
        >
          <div
            className="card"
            style={{
              padding: 36,
              borderRadius: 24,
              border: '1px solid var(--line-strong)',
              background:
                'linear-gradient(135deg, rgba(58,91,255,0.18), rgba(168,85,247,0.10) 60%, rgba(255,255,255,0.02))',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 60%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative' }}>
              <div className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 12 }}>
                Careers
              </div>
              <h2
                className="display"
                style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 500 }}
              >
                Senior practice,
                <br />
                <span style={{ color: 'var(--fg-dim)' }}>tiny team.</span>
              </h2>
              <p
                style={{
                  margin: '18px 0 24px',
                  color: 'var(--fg-dim)',
                  fontSize: 15,
                  lineHeight: 1.6,
                  maxWidth: 380,
                }}
              >
                We hire slowly and rarely. When we do, we look for people who have led the
                practice somewhere else and want to keep doing the work — not just managing it.
              </p>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}
              >
                {ROLES.map((r) => (
                  <a
                    key={r.title}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto auto',
                      gap: 18,
                      alignItems: 'center',
                      padding: '14px 18px',
                      borderRadius: 14,
                      border: '1px solid var(--line)',
                      background: 'rgba(0,0,0,0.18)',
                      textDecoration: 'none',
                      color: 'var(--fg)',
                      fontSize: 14,
                    }}
                  >
                    <span>{r.title}</span>
                    <span
                      className="mono"
                      style={{
                        color: 'var(--fg-faint)',
                        fontSize: 11,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {r.location}
                    </span>
                    <Icon.Arrow size={14} />
                  </a>
                ))}
              </div>
              <a
                href="mailto:careers@zenova.studio"
                className="mono"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--accent-3)',
                }}
              >
                Or write to us: careers@zenova.studio <Icon.Arrow size={12} />
              </a>
            </div>
          </div>

          <div>
            <div className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 12 }}>
              Where we work
            </div>
            <h2
              className="display"
              style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 500 }}
            >
              Two cities,
              <br />
              <span style={{ color: 'var(--fg-dim)' }}>one calendar.</span>
            </h2>
            <p
              style={{
                margin: '18px 0 24px',
                color: 'var(--fg-dim)',
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 420,
              }}
            >
              We overlap five hours a day across the two hubs and meet in person every quarter.
              Clients usually pick the time zone, never both.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LOCATIONS.map((l) => (
                <div
                  key={l.city}
                  className="card"
                  style={{
                    padding: '18px 22px',
                    borderRadius: 16,
                    border: '1px solid var(--line)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 14,
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div className="display" style={{ fontSize: 18, fontWeight: 500 }}>
                      {l.city}
                    </div>
                    <div
                      style={{ color: 'var(--fg-dim)', fontSize: 13, marginTop: 4 }}
                    >
                      {l.detail}
                    </div>
                  </div>
                  <div
                    className="mono"
                    style={{
                      padding: '6px 12px',
                      borderRadius: 999,
                      border: '1px solid var(--line)',
                      background: 'rgba(255,255,255,0.025)',
                      color: 'var(--fg)',
                      fontSize: 11,
                    }}
                  >
                    {l.tz}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
