import { useEffect } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Services } from '@/components/sections/Services';
import { CTA } from '@/components/sections/CTA';
import { Icon } from '@/components/icons/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface Pillar {
  tag: string;
  title: string;
  blurb: string;
  hue: string;
}

const PILLARS: Pillar[] = [
  {
    tag: 'Build',
    title: 'Engineering you can read',
    blurb:
      'Production codebases on Next.js, TypeScript and a CMS your team can actually edit. We hand over the keys at launch.',
    hue: '#3a5bff',
  },
  {
    tag: 'Grow',
    title: 'Demand, not just deliverables',
    blurb:
      'Performance SEO, paid media and lifecycle programs wired to a single pipeline dashboard the whole team trusts.',
    hue: '#6d4cff',
  },
  {
    tag: 'Operate',
    title: 'Fractional ops in the same room',
    blurb:
      'Tooling, playbooks and weekly cadence so a small team runs like one twice its size — without adding headcount.',
    hue: '#a855f7',
  },
];

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        eyebrow="Services"
        title={
          <>
            Five disciplines.
            <br />
            <span style={{ color: 'var(--fg-dim)' }}>One accountable team.</span>
          </>
        }
        sub="Stop stitching five vendors together. We own the full arc — brand, web, growth, content and ops — and ship it with the same engineers from kickoff to month twelve."
        meta={[
          ['5', 'Core disciplines'],
          ['120+', 'Projects shipped'],
          ['<1.2s', 'Median LCP'],
          ['4.9 / 5', 'Client rating'],
        ]}
        secondary={{ label: 'How we work', to: '/process' }}
      />

      <section className="sec" style={{ paddingTop: 80 }}>
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="The three pillars"
            title={<>Different skills, same playbook.</>}
            sub="Every engagement leans on at least two of these. The combinations are what compounds."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {PILLARS.map((p) => (
              <div
                key={p.tag}
                className="card"
                style={{
                  padding: 32,
                  borderRadius: 20,
                  border: '1px solid var(--line)',
                  background: `linear-gradient(160deg, ${p.hue}18, rgba(255,255,255,0.02))`,
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
                    top: -40,
                    right: -40,
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.hue}33, transparent 60%)`,
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  className="mono"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '6px 12px',
                    borderRadius: 999,
                    border: `1px solid ${p.hue}55`,
                    background: `${p.hue}15`,
                    color: p.hue,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    position: 'relative',
                  }}
                >
                  {p.tag}
                </span>
                <h3
                  className="display"
                  style={{ fontSize: 24, fontWeight: 500, margin: 0, position: 'relative' }}
                >
                  {p.title}
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
                  {p.blurb}
                </p>
                <div
                  className="mono"
                  style={{
                    marginTop: 'auto',
                    paddingTop: 18,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'var(--fg-dim)',
                    fontSize: 12,
                    position: 'relative',
                  }}
                >
                  Scroll for the full menu <Icon.Chevron size={12} dir="down" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <CTA />
    </>
  );
}
