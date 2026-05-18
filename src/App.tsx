import { lazy, Suspense, useEffect } from 'react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Work } from '@/components/sections/Work';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { TWEAK_DEFAULTS } from '@/config/tweaks';
import { useTweaks } from '@/hooks/useTweaks';
import { useReveal } from '@/hooks/useReveal';
import { applyPalette } from '@/lib/palette';
import type { Background } from '@/types/tweaks';

// Tweaks panel ships only in dev builds — lazy import is tree-shaken in prod.
const ZenovaTweaks = import.meta.env.DEV
  ? lazy(() => import('@/dev/ZenovaTweaks').then((m) => ({ default: m.ZenovaTweaks })))
  : null;

const BG_MAP: Record<Background, string> = {
  Both: 'blobs+grid',
  Blobs: 'blobs',
  Grid: 'grid',
};

export function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    applyPalette(t.palette);
  }, [t.palette]);

  useEffect(() => {
    const root = document.documentElement;
    const next = t.theme ?? 'dark';
    if (root.getAttribute('data-theme') === next) return;
    const apply = () => {
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('zenova.theme', next);
      } catch {
        /* ignore — private mode etc. */
      }
    };
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, [t.theme]);

  useReveal([t.showMarquee, t.showTestimonials]);

  return (
    <>
      <Nav
        theme={t.theme}
        onToggleTheme={() => setTweak('theme', t.theme === 'dark' ? 'light' : 'dark')}
      />
      <Hero rotateMs={t.rotateMs} background={BG_MAP[t.background] ?? 'blobs+grid'} />
      {t.showMarquee && <Marquee />}
      <Services />
      <Process />
      <Work />
      {t.showTestimonials && <Testimonials />}
      <CTA />
      <Footer />
      {ZenovaTweaks && (
        <Suspense fallback={null}>
          <ZenovaTweaks tweaks={t} setTweak={setTweak} />
        </Suspense>
      )}
    </>
  );
}
