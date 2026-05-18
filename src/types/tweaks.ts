export type Theme = 'dark' | 'light';
export type Background = 'Both' | 'Blobs' | 'Grid';
export type Palette = [string, string, string];

export interface Tweaks {
  palette: Palette;
  theme: Theme;
  rotateMs: number;
  background: Background;
  showMarquee: boolean;
  showTestimonials: boolean;
}

export interface TweaksSetter {
  <K extends keyof Tweaks>(key: K, value: Tweaks[K]): void;
  (edits: Partial<Tweaks>): void;
}
