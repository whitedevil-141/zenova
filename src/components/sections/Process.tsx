import { useEffect, useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface Step {
  n: string;
  title: string;
  blurb: string;
  deliverables: string[];
  timeline: string;
}

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Discover',
    blurb:
      'A working session where we map your goals, audience, constraints and existing surface area. We leave with a single-page brief signed off by everyone.',
    deliverables: ['Stakeholder interviews', 'Product audit', 'Goal & metric framing', 'Project canvas'],
    timeline: 'Week 1',
  },
  {
    n: '02',
    title: 'Design',
    blurb:
      'Brand, IA and product UI converge in one shared file. Daily Loom updates, weekly review. You see the same Figma we do.',
    deliverables: ['Visual identity system', 'High-fidelity UI', 'Interactive prototype', 'Design QA'],
    timeline: 'Week 2–4',
  },
  {
    n: '03',
    title: 'Build',
    blurb:
      'We ship from the same prototype, in small slices. Daily previews, code that you keep and that any future team can read.',
    deliverables: ['Production codebase', 'CMS & integrations', 'Performance budget', 'Hand-off docs'],
    timeline: 'Week 4–8',
  },
  {
    n: '04',
    title: 'Grow',
    blurb:
      "After launch we don't disappear. Monthly cycles of paid, organic and content work to compound what you just built.",
    deliverables: ['Paid media', 'SEO & content', 'Lifecycle automations', 'Monthly readout'],
    timeline: 'Month 2+',
  },
];

export function Process() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 6500);
    return () => clearInterval(t);
  }, []);

  const current = STEPS[active];

  return (
    <section
      id="process"
      className="sec"
      style={{ background: 'linear-gradient(180deg, var(--bg), var(--bg-2) 50%, var(--bg))' }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="How we work"
          title={
            <>
              A predictable rhythm,
              <br />
              <span style={{ color: 'var(--fg-dim)' }}>not a stack of black boxes.</span>
            </>
          }
          sub="Same partner, same tools, four phases. Each one ends in something tangible you can review."
        />

        <div
          className="process-grid"
          style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'start' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STEPS.map((s, i) => {
              const on = active === i;
              return (
                <button
                  key={s.n}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`card process-step ${on ? 'is-on' : ''}`}
                  style={{
                    textAlign: 'left',
                    padding: '24px 28px',
                    background: on ? 'rgba(109,76,255,0.06)' : 'rgba(255,255,255,0.015)',
                    border: on ? '1px solid rgba(109,76,255,0.35)' : '1px solid var(--line)',
                    borderRadius: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 22,
                    transition: 'all .35s cubic-bezier(.2,.7,.2,1)',
                    transform: on ? 'translateX(8px)' : 'translateX(0)',
                  }}
                >
                  <div
                    className="mono"
                    style={{ color: on ? 'var(--fg)' : 'var(--fg-faint)', width: 30, flexShrink: 0 }}
                  >
                    {s.n}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="display process-step__title"
                      style={{
                        fontSize: 26,
                        fontWeight: 500,
                        color: on ? 'var(--fg)' : 'var(--fg-dim)',
                        transition: 'color .3s',
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--fg-faint)', marginTop: 4 }}>{s.timeline}</div>
                  </div>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      border: on ? '0px solid var(--line)' : '1px solid var(--line)',
                      background: on ? 'var(--grad)' : 'transparent',
                      color: on ? '#fff' : 'var(--fg-faint)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all .3s',
                    }}
                  >
                    <Icon.Arrow size={14} />
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="card process-detail"
            style={{
              padding: 36,
              borderRadius: 28,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
              border: '1px solid var(--line-strong)',
              position: 'sticky',
              top: 110,
              minHeight: 460,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(109,76,255,0.35), transparent 60%)',
                filter: 'blur(40px)',
                opacity: 0.7,
              }}
            />
            <div
              key={active}
              style={{ position: 'relative', animation: 'fade-up .5s cubic-bezier(.2,.7,.2,1) both' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="mono" style={{ color: 'var(--accent-3)' }}>
                  Phase {current.n}
                </div>
                <div className="mono" style={{ color: 'var(--fg-faint)' }}>
                  {current.timeline}
                </div>
              </div>
              <div
                className="display process-detail__title"
                style={{
                  fontSize: 56,
                  fontWeight: 500,
                  marginTop: 24,
                  background: 'var(--grad)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {current.title}
              </div>
              <p
                className="process-detail__blurb"
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: 'var(--fg-dim)',
                  marginTop: 18,
                  marginBottom: 32,
                }}
              >
                {current.blurb}
              </p>
              <div className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 12 }}>
                Deliverables
              </div>
              <div
                className="process-detail__deliverables"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}
              >
                {current.deliverables.map((d) => (
                  <div
                    key={d}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 14,
                      color: 'var(--fg)',
                    }}
                  >
                    <span
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--grad)' }}
                    />
                    {d}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 36,
                  height: 3,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${((active + 1) / STEPS.length) * 100}%`,
                    background: 'var(--grad)',
                    transition: 'width .5s cubic-bezier(.2,.7,.2,1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
