import { Icon } from '@/components/icons/Icon';

export function CTA() {
  return (
    <section id="contact" className="sec" style={{ paddingBottom: 80 }}>
      <div className="container">
        <div
          className="cta-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 32,
            padding: '80px 48px',
            background:
              'linear-gradient(135deg, rgba(58,91,255,0.18), rgba(168,85,247,0.12) 60%, rgba(255,255,255,0.02))',
            border: '1px solid var(--line-strong)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -100,
              left: -60,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(58,91,255,0.45), transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -120,
              right: -80,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div className="mono" style={{ color: 'var(--fg-dim)', marginBottom: 20 }}>
              ★ Now booking Q3 engagements
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', margin: 0, fontWeight: 500 }}>
              Let&apos;s build something
              <br />
              <span className="gradient-text">worth shipping.</span>
            </h2>
            <p
              style={{
                marginTop: 24,
                fontSize: 18,
                color: 'var(--fg-dim)',
                maxWidth: 540,
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.55,
              }}
            >
              30-minute intro call. No deck, no sales pitch — just your goals and where we&apos;d start.
            </p>
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn-primary">
                Book an intro call <Icon.Arrow size={16} />
              </button>
              <button className="btn-ghost">hello@zenova.bd</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
