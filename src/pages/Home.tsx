import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Work } from '@/components/sections/Work';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { useReveal } from '@/hooks/useReveal';

interface HomeProps {
  rotateMs: number;
  background: string;
  showMarquee: boolean;
  showTestimonials: boolean;
}

export function Home({ rotateMs, background, showMarquee, showTestimonials }: HomeProps) {
  useReveal([showMarquee, showTestimonials]);
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace(/^#/, '');
    if (!id) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.key, location.hash]);

  return (
    <>
      <Hero rotateMs={rotateMs} background={background} />
      {showMarquee && <Marquee />}
      <Services />
      <Process />
      <Work />
      {showTestimonials && <Testimonials />}
      <FAQ />
      <CTA />
    </>
  );
}
