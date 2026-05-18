import { useEffect } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Process } from '@/components/sections/Process';
import { CTA } from '@/components/sections/CTA';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/icons/Icon';

interface Principle {
  n: string;
  title: string;
  blurb: string;
}

const PRINCIPLES: Principle[] = [
  {
    n: '01',
    title: 'One file, one team',
    blurb:
      'Same Figma, same Slack, same engineers from kickoff to launch. No handoff cliffs, no version drift.',
  },
  {
    n: '02',
    title: 'Ship in slices',
    blurb:
      'Daily previews, weekly review. Decisions are reversible until they ship; nothing waits for a single big reveal.',
  },
  {
    n: '03',
    title: 'Boring infrastructure',
    blurb:
      'We pick the tool that survives a year of growth, not the one trending this quarter. Your engineers should be able to read it on day one.',
  },
  {
    n: '04',
    title: 'Measure what matters',
    blurb:
      'Every phase ends with one number that moved — LCP, signups, revenue. Vanity metrics get pruned from the dashboard.',
  },
];

interface Cadence {
  when: string;
  what: string;
}

const CADENCE: Cadence[] = [
  { when: 'Monday', what: 'Async kickoff — week scope and risks posted in Slack' },
  { when: 'Tue – Thu', what: 'Build days. Live Figma + preview URLs updated continuously' },
  { when: 'Friday', what: '30-minute review on Zoom. Demo, decisions, next week' },
  { when: 'Always-on', what: 'Same channel for everything. Reply window: under 4 working hours' },
];

export function ProcessPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Process' }]}
        eyebrow="How we work"
        title={
          <>
            A predictable rhythm,
            <br />
            <span style={{ color: 'var(--fg-dim)' }}>not a stack of black boxes.</span>
          </>
        }
        sub="Same partner, same tools, four phases. Each one ends in something tangible you can review — code, copy, dashboards or a number that moved."
        meta={[
          ['4', 'Phases'],
          ['6 – 10 wks', 'Typical build'],
          ['1 wk', 'Discovery'],
          ['<4 hrs', 'Slack reply window'],
        ]}
        secondary={{ label: 'What we deliver', to: '/services' }}
      />

      <Process />

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="Operating principles"
            title={<>Why the rhythm holds.</>}
            sub="Four rules every engagement runs on. They keep the work moving when energy dips and stakeholders rotate."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {PRINCIPLES.map((p) => (
              <div
                key={p.n}
                className="card"
                style={{
                  padding: 28,
                  borderRadius: 18,
                  border: '1px solid var(--line)',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  className="mono"
                  style={{ color: 'var(--accent-3)', fontSize: 12, letterSpacing: '0.1em' }}
                >
                  {p.n}
                </div>
                <h3 className="display" style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 15, lineHeight: 1.6 }}>
                  {p.blurb}
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
            eyebrow="A week in the engagement"
            title={<>The actual cadence.</>}
            sub="Not a Gantt chart. A pattern your calendar can predict from week one."
          />

          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: 20,
              overflow: 'hidden',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
            }}
          >
            {CADENCE.map((c, i) => (
              <div
                key={c.when}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr 36px',
                  alignItems: 'center',
                  gap: 24,
                  padding: '22px 28px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                }}
              >
                <div className="mono" style={{ color: 'var(--accent-3)', fontSize: 13 }}>
                  {c.when}
                </div>
                <div style={{ color: 'var(--fg)', fontSize: 15, lineHeight: 1.5 }}>{c.what}</div>
                <div style={{ color: 'var(--fg-faint)', justifySelf: 'end' }}>
                  <Icon.Arrow size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
