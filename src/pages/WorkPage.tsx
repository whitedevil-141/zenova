import { useEffect, useState } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { CTA } from '@/components/sections/CTA';
import { ProjectVisual } from '@/components/sections/ProjectVisual';
import { Icon } from '@/components/icons/Icon';

interface CaseStudy {
  id: string;
  client: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  tone: string;
  year: string;
  metric: [string, string];
}

const ALL: CaseStudy[] = [
  {
    id: 'p1',
    client: 'Northwind Labs',
    category: 'B2B SaaS',
    title: 'Repositioning a developer platform around speed.',
    summary:
      'New brand, new site, and a content engine that turned a tired DX story into the fastest path to a free-trial signup.',
    tags: ['Brand', 'Web', 'Marketing'],
    tone: '#3a5bff',
    year: '2025',
    metric: ['+212%', 'Trial signups, Q over Q'],
  },
  {
    id: 'p2',
    client: 'Aperture Health',
    category: 'HealthTech',
    title: 'A patient portal that actually gets used.',
    summary:
      'Rebuilt the booking, intake and records flow as one product. Replaced three vendors and shaved 38 minutes per appointment.',
    tags: ['Product', 'UX'],
    tone: '#6d4cff',
    year: '2025',
    metric: ['38 min', 'Saved per appointment'],
  },
  {
    id: 'p3',
    client: 'Stellar Capital',
    category: 'Fintech',
    title: 'From series A pitch to first-customer onboarding.',
    summary:
      'Eleven weeks: a working MVP, a closed seed round, and a sales motion the founders could run without us.',
    tags: ['Startup', 'GTM'],
    tone: '#a855f7',
    year: '2024',
    metric: ['$4.2M', 'Raised post-MVP'],
  },
  {
    id: 'p4',
    client: 'Cobalt Studio',
    category: 'Creative',
    title: 'A content engine producing 4 long-form pieces / wk.',
    summary:
      'Editorial calendar, briefs, in-house tools and SEO ops. Their writers ship; we sit alongside as the editor in chief.',
    tags: ['Content', 'SEO'],
    tone: '#4f8cff',
    year: '2025',
    metric: ['4× / wk', 'Long-form cadence'],
  },
  {
    id: 'p5',
    client: 'Mosaic',
    category: 'Consumer',
    title: 'Growth engine from zero to first ten thousand users.',
    summary:
      'Paid acquisition, lifecycle, and a landing page architecture tuned for the four messaging arcs that actually convert.',
    tags: ['Marketing', 'Web'],
    tone: '#7a55ff',
    year: '2024',
    metric: ['10k+', 'Activated users in 90 days'],
  },
  {
    id: 'p6',
    client: 'Verge',
    category: 'Ops',
    title: 'Replatformed billing without a single dropped invoice.',
    summary:
      'Migration of a tangled Stripe + custom-billing setup into one source of truth. Finance reclaimed two days every month.',
    tags: ['Ops', 'Web'],
    tone: '#5b6cff',
    year: '2024',
    metric: ['2 days', 'Reclaimed per month'],
  },
];

const FILTERS = ['All', 'Brand', 'Web', 'Marketing', 'Product', 'Content', 'Ops'];

export function WorkPage() {
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const filtered = filter === 'All' ? ALL : ALL.filter((p) => p.tags.includes(filter));

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Work' }]}
        eyebrow="Selected work"
        title={
          <>
            Outcomes,
            <br />
            <span style={{ color: 'var(--fg-dim)' }}>not screenshots.</span>
          </>
        }
        sub="Long-term engagements spanning at least a full quarter. Every case study leads with a number, not a hero shot."
        meta={[
          ['120+', 'Projects shipped'],
          ['38', 'Active clients'],
          ['7 yr', 'Avg client tenure'],
          ['4.9 / 5', 'Client rating'],
        ]}
        secondary={{ label: 'About the team', to: '/about' }}
      />

      <section className="sec" style={{ paddingTop: 80 }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              marginBottom: 36,
              flexWrap: 'wrap',
            }}
          >
            <div className="mono" style={{ color: 'var(--fg-faint)' }}>
              {filtered.length} case studies
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {FILTERS.map((f) => {
                const on = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 999,
                      border: on ? '0px solid var(--line)' : '1px solid var(--line)',
                      background: on ? 'var(--grad)' : 'rgba(255,255,255,0.02)',
                      color: on ? '#fff' : 'var(--fg-dim)',
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all .25s',
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="work-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 20 }}
          >
            {filtered.map((p, i) => (
              <a
                key={p.id}
                href="#"
                onClick={(e) => e.preventDefault()}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="card work-card"
                style={{
                  padding: 28,
                  borderRadius: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 22,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    aspectRatio: '5 / 3',
                    borderRadius: 16,
                    position: 'relative',
                    overflow: 'hidden',
                    background: `
                      linear-gradient(135deg, ${p.tone}40, ${p.tone}10),
                      repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 12px),
                      #0a0b13
                    `,
                    border: '1px solid var(--line)',
                  }}
                >
                  <ProjectVisual idx={i % 4} tone={p.tone} animate={hovered === p.id} />
                  <div
                    className="mono"
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(6px)',
                      color: 'rgba(236, 236, 242, 0.62)',
                    }}
                  >
                    {p.category} · {p.year}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(236, 236, 242, 0.62)',
                      border: '1px solid var(--line)',
                      transform: hovered === p.id ? 'rotate(0)' : 'rotate(-45deg)',
                      transition: 'transform .4s cubic-bezier(.2,.7,.2,1)',
                      
                    }}
                  >
                    <Icon.ArrowUpRight size={16} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: p.tone,
                        boxShadow: `0 0 10px ${p.tone}`,
                      }}
                    />
                    <span className="mono" style={{ color: 'var(--fg-dim)' }}>
                      {p.client}
                    </span>
                  </div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.25 }}>
                    {p.title}
                  </div>
                  <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.55 }}>
                    {p.summary}
                  </p>
                  <div
                    style={{
                      marginTop: 8,
                      paddingTop: 14,
                      borderTop: '1px solid var(--line)',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 12,
                    }}
                  >
                    <div
                      className="display"
                      style={{
                        fontSize: 24,
                        fontWeight: 500,
                        lineHeight: 1,
                        background: `linear-gradient(90deg, ${p.tone}, var(--accent-3))`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {p.metric[0]}
                    </div>
                    <div className="mono" style={{ color: 'var(--fg-faint)', fontSize: 12 }}>
                      {p.metric[1]}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 999,
                          fontSize: 12,
                          border: '1px solid var(--line)',
                          color: 'var(--fg-dim)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                padding: 64,
                textAlign: 'center',
                color: 'var(--fg-dim)',
                border: '1px dashed var(--line)',
                borderRadius: 20,
              }}
            >
              No case studies in this category yet — drop us a note and we'll send the rest.
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
