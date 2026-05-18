import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { ServicesPage } from '@/pages/ServicesPage';
import { ProcessPage } from '@/pages/ProcessPage';
import { WorkPage } from '@/pages/WorkPage';
import { AboutPage } from '@/pages/AboutPage';
import { TWEAK_DEFAULTS } from '@/config/tweaks';
import { useTweaks } from '@/hooks/useTweaks';
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

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Nav
        theme={t.theme}
        onToggleTheme={() => setTweak('theme', t.theme === 'dark' ? 'light' : 'dark')}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              rotateMs={t.rotateMs}
              background={BG_MAP[t.background] ?? 'blobs+grid'}
              showMarquee={t.showMarquee}
              showTestimonials={t.showTestimonials}
            />
          }
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
      {ZenovaTweaks && (
        <Suspense fallback={null}>
          <ZenovaTweaks tweaks={t} setTweak={setTweak} />
        </Suspense>
      )}
    </BrowserRouter>
  );
}
