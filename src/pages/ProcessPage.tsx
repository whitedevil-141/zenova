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

interface Week {
  range: string;
  phase: string;
  focus: string;
  hue: string;
}

interface Compare {
  axis: string;
  them: string;
  us: string;
}

interface FAQ {
  q: string;
  a: string;
}

const WEEKS: Week[] = [
  { range: 'Week 1', phase: 'Discover', focus: 'Interviews, audit, project canvas signed off', hue: '#3a5bff' },
  { range: 'Week 2 – 3', phase: 'Design', focus: 'Brand directional, IA, first product surfaces in Figma', hue: '#4f8cff' },
  { range: 'Week 4', phase: 'Design', focus: 'Interactive prototype, design QA, engineering kickoff', hue: '#4f8cff' },
  { range: 'Week 5 – 6', phase: 'Build', focus: 'Production codebase, CMS wired, first staging URL', hue: '#6d4cff' },
  { range: 'Week 7', phase: 'Build', focus: 'Integrations, content load, performance budget enforced', hue: '#6d4cff' },
  { range: 'Week 8', phase: 'Build', focus: 'Launch dress rehearsal, parity diff, rollback in place', hue: '#7a55ff' },
  { range: 'Week 9+', phase: 'Grow', focus: 'Paid, SEO, lifecycle. Monthly readout with the same team.', hue: '#a855f7' },
];

const COMPARE: Compare[] = [
  {
    axis: 'Team shape',
    them: 'Studio → handoff → dev shop → handoff → marketing vendor.',
    us: 'One team across brand, web and growth. Same Slack from kickoff to month twelve.',
  },
  {
    axis: 'Update cadence',
    them: 'Tuesday status call. Monthly invoice surprise.',
    us: 'Daily preview URLs. Weekly demo. Reply window under 4 working hours.',
  },
  {
    axis: 'Tooling',
    them: 'Their staging on their domain. Your team locked out until launch.',
    us: 'Your GitHub org, your Figma, your hosting. We are a guest in your repo.',
  },
  {
    axis: 'Definition of done',
    them: 'Shipped = invoice paid.',
    us: 'Shipped = a number moved. We publish the number.',
  },
  {
    axis: 'After launch',
    them: 'New SOW for every change.',
    us: 'Same team, same rate card. Decisions stay reversible.',
  },
];

const PROCESS_FAQS: FAQ[] = [
  {
    q: 'How quickly do you start?',
    a: 'Kickoff is typically two weeks from a signed engagement letter. We work in cohorts of three so onboarding overlaps and no client waits on a queue.',
  },
  {
    q: 'How do you stay accountable to a metric?',
    a: 'Every phase ends with one named number we agreed to move. If we miss it, we say so on the readout and explain why before anyone asks.',
  },
  {
    q: 'What if scope changes mid-engagement?',
    a: 'Changes are normal. We log them in Linear, re-forecast the milestone, and you approve before we ship. No silent scope creep, no surprise invoices.',
  },
  {
    q: 'Do you work with our in-house team?',
    a: 'Yes — that is the default. We pair on PRs, co-author Figma files, and run weekly demos with anyone who wants to join.',
  },
  {
    q: 'When should we expect to hire in-house?',
    a: 'We tell you. The point of the engagement is to leave you with a team that can run the thing. We hand the keys over, on purpose.',
  },
];

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
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="Timeline"
            title={<>Week one to launch, drawn to scale.</>}
            sub="The honest version of a typical eight-week engagement. Things slide, but they slide in public — not in a footer of a slide deck."
          />
          <div
            style={{
              position: 'relative',
              padding: '32px 28px',
              borderRadius: 24,
              border: '1px solid var(--line)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 3,
                background: 'var(--grad)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {WEEKS.map((w, i) => (
                <div
                  key={w.range}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 120px 1fr',
                    gap: 24,
                    padding: '18px 12px 18px 20px',
                    borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="mono"
                    style={{ color: w.hue, fontSize: 12, letterSpacing: '0.1em' }}
                  >
                    {w.range}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 12px',
                      borderRadius: 999,
                      border: `1px solid ${w.hue}55`,
                      background: `${w.hue}15`,
                      color: w.hue,
                      fontSize: 12,
                      justifySelf: 'start',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: w.hue,
                        boxShadow: `0 0 8px ${w.hue}`,
                      }}
                    />
                    {w.phase}
                  </div>
                  <div style={{ color: 'var(--fg)', fontSize: 15, lineHeight: 1.5 }}>{w.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow="Vs. a traditional agency"
            title={<>Five places the seams usually break.</>}
            sub="Most digital work fails at the handoff, not the deliverable. This is what we do differently."
          />
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: 22,
              overflow: 'hidden',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr 1fr',
                gap: 24,
                padding: '18px 28px',
                background: 'rgba(255,255,255,0.02)',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div className="mono" style={{ color: 'var(--fg-faint)' }}>
                Axis
              </div>
              <div className="mono" style={{ color: 'var(--fg-faint)' }}>
                Traditional setup
              </div>
              <div className="mono" style={{ color: 'var(--accent-3)' }}>
                Zenova
              </div>
            </div>
            {COMPARE.map((c, i) => (
              <div
                key={c.axis}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr 1fr',
                  gap: 24,
                  padding: '22px 28px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                  alignItems: 'baseline',
                }}
              >
                <div className="display" style={{ fontSize: 16, fontWeight: 500 }}>
                  {c.axis}
                </div>
                <div style={{ color: 'var(--fg-faint)', fontSize: 14, lineHeight: 1.6 }}>{c.them}</div>
                <div style={{ color: 'var(--fg)', fontSize: 14, lineHeight: 1.6 }}>{c.us}</div>
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

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <SectionHeader
            align="center"
            eyebrow="Questions"
            title={<>What teams ask before kickoff.</>}
          />
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: 22,
              overflow: 'hidden',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
            }}
          >
            {PROCESS_FAQS.map((f, i) => (
              <details
                key={f.q}
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                  padding: '22px 28px',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    color: 'var(--fg)',
                    fontSize: 16,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {f.q}
                  <span style={{ color: 'var(--accent-3)' }}>
                    <Icon.Plus size={14} />
                  </span>
                </summary>
                <p
                  style={{
                    margin: '14px 0 0',
                    color: 'var(--fg-dim)',
                    fontSize: 15,
                    lineHeight: 1.65,
                  }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
