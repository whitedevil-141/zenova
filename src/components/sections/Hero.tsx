import { Icon } from '@/components/icons/Icon';
import { RotatingWords } from '@/components/ui/RotatingWords';

interface HeroProps {
  rotateMs: number;
  background: string;
}

const SERVICES = [
  'Website Development',
  'Marketing Solutions',
  'Startup Support',
  'Business Management',
  'Content Writing',
];

const STATS: ReadonlyArray<readonly [string, string]> = [
  ['20+', 'Projects shipped'],
  ['8', 'Active clients'],
  ['4.9', 'Client rating'],
  ['2026', 'Building since'],
];

export function Hero({ rotateMs, background }: HeroProps) {
  const showBlobs = background.includes('blobs');
  const showGrid = background.includes('grid');

  return (
    <section
      id="top"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: -1 }}>
        {showBlobs && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '8%',
                left: '18%',
                width: 560,
                height: 560,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(58,91,255,0.45), transparent 60%)',
                filter: 'blur(80px)',
                animation: 'blob1 22s linear infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '2%',
                right: '8%',
                width: 520,
                height: 520,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 60%)',
                filter: 'blur(80px)',
                animation: 'blob2 26s linear infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '45%',
                width: 340,
                height: 340,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(109,76,255,0.3), transparent 60%)',
                filter: 'blur(60px)',
                animation: 'blob3 18s ease-in-out infinite',
              }}
            />
          </>
        )}
        {showGrid && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.07,
              backgroundImage: `
              linear-gradient(to right, var(--hero-grid) 1px, transparent 1px),
              linear-gradient(to bottom, var(--hero-grid) 1px, transparent 1px)`,
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(circle at center, black 10%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 75%)',
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: 'radial-gradient(var(--hero-grid) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <div style={{ maxWidth: 1100, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 16px',
            borderRadius: 999,
            border: '1px solid var(--line)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(16px)',
            fontSize: 13,
            color: 'var(--fg-dim)',
            marginBottom: 32,
            animation: 'fade-up .9s cubic-bezier(.2,.7,.2,1) both',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent-1)',
              boxShadow: '0 0 12px var(--accent-1)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          Modern digital solutions, end-to-end.
        </div>

        <h1
          className="display hero-headline"
          style={{ margin: 0, animation: 'fade-up 1s cubic-bezier(.2,.7,.2,1) both' }}
        >
          One agency for
        </h1>
        <div
          className="hero-rotating-row"
          style={{ animation: 'fade-up 1s cubic-bezier(.2,.7,.2,1) both .05s' }}
        >
          <RotatingWords words={SERVICES} intervalMs={rotateMs} />
        </div>

        <p
          style={{
            marginTop: 36,
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            color: 'var(--fg-dim)',
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.55,
            animation: 'fade-up 1.1s cubic-bezier(.2,.7,.2,1) both .15s',
          }}
        >
          Zenova combines design, development, marketing, and startup support into one seamless
          partnership for ambitious modern businesses.
        </p>

        <div
          className="hero-cta-row"
          style={{
            marginTop: 44,
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            animation: 'fade-up 1.2s cubic-bezier(.2,.7,.2,1) both .3s',
          }}
        >
          <button className="btn-primary">
            Start a project
            <span style={{ display: 'inline-flex', animation: 'arrow-bounce 1.6s ease-in-out infinite' }}>
              <Icon.Arrow size={16} />
            </span>
          </button>
          <button className="btn-ghost">Explore services</button>
        </div>

        <div
          className="hero-stats"
          style={{
            marginTop: 80,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            maxWidth: 820,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '24px 0',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            animation: 'fade-up 1.3s cubic-bezier(.2,.7,.2,1) both .45s',
          }}
        >
          {STATS.map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 500 }}>
                {num}
              </div>
              <div className="mono" style={{ color: 'var(--fg-faint)', marginTop: 6 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 160,
          background: 'linear-gradient(to top, var(--bg), transparent)',
        }}
      />
    </section>
  );
}
