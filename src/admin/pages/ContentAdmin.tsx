import { useState } from 'react';
import { AdminShell } from '@/admin/components/AdminShell';
import {
  ColorField,
  Field,
  StringList,
  TextArea,
  TextField,
  Toast,
} from '@/admin/components/Form';
import { contentStore, useContent, type SiteContent } from '@/admin/store';

type Tab = 'hero' | 'cta' | 'faq' | 'testimonials' | 'marquee';

function uid(prefix: string) {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export function ContentAdmin() {
  const [content] = useContent();
  const [tab, setTab] = useState<Tab>('hero');
  const [toast, setToast] = useState<string | null>(null);

  const patch = (updater: (prev: SiteContent) => SiteContent) => {
    contentStore.set(updater);
  };

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'hero', label: 'Hero' },
    { id: 'cta', label: 'CTA' },
    { id: 'faq', label: `FAQs (${content.faqs.length})` },
    { id: 'testimonials', label: `Testimonials (${content.testimonials.length})` },
    { id: 'marquee', label: `Marquee (${content.marquee.length})` },
  ];

  return (
    <AdminShell
      crumbs={[{ label: 'Site content' }]}
      title="Site content"
      sub="Hero, CTA, FAQs, testimonials and the rotating word strip. Changes propagate to every public page."
      actions={
        <button
          className="adm-btn"
          onClick={() => {
            if (window.confirm('Reset site content to defaults?')) contentStore.reset();
          }}
        >
          Reset
        </button>
      }
    >
      <div className="adm-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`adm-tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'hero' && (
        <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField
            label="Status pill text"
            value={content.hero.badge}
            onChange={(v) => patch((p) => ({ ...p, hero: { ...p.hero, badge: v } }))}
          />
          <TextField
            label="Headline"
            value={content.hero.headline}
            onChange={(v) => patch((p) => ({ ...p, hero: { ...p.hero, headline: v } }))}
          />
          <StringList
            label="Rotating words"
            hint="Cycle through these next to the headline."
            values={content.hero.rotatingWords}
            onChange={(v) => patch((p) => ({ ...p, hero: { ...p.hero, rotatingWords: v } }))}
          />
          <TextArea
            label="Sub-copy"
            value={content.hero.sub}
            onChange={(v) => patch((p) => ({ ...p, hero: { ...p.hero, sub: v } }))}
            rows={3}
          />
          <div className="adm-row adm-row--2">
            <TextField
              label="Primary CTA label"
              value={content.hero.primaryCta}
              onChange={(v) => patch((p) => ({ ...p, hero: { ...p.hero, primaryCta: v } }))}
            />
            <TextField
              label="Secondary CTA label"
              value={content.hero.secondaryCta}
              onChange={(v) => patch((p) => ({ ...p, hero: { ...p.hero, secondaryCta: v } }))}
            />
          </div>
          <Field label="Stat tiles (number + label)">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {content.hero.stats.map((s, i) => (
                <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 8 }}>
                  <input
                    className="adm-input"
                    value={s.num}
                    placeholder="20+"
                    onChange={(e) =>
                      patch((p) => {
                        const stats = [...p.hero.stats];
                        stats[i] = { ...stats[i], num: e.target.value };
                        return { ...p, hero: { ...p.hero, stats } };
                      })
                    }
                  />
                  <input
                    className="adm-input"
                    value={s.label}
                    placeholder="Projects shipped"
                    onChange={(e) =>
                      patch((p) => {
                        const stats = [...p.hero.stats];
                        stats[i] = { ...stats[i], label: e.target.value };
                        return { ...p, hero: { ...p.hero, stats } };
                      })
                    }
                  />
                  <button
                    className="adm-btn adm-btn--sm adm-btn--danger"
                    onClick={() =>
                      patch((p) => ({
                        ...p,
                        hero: { ...p.hero, stats: p.hero.stats.filter((_, idx) => idx !== i) },
                      }))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="adm-btn adm-btn--sm"
                onClick={() =>
                  patch((p) => ({
                    ...p,
                    hero: { ...p.hero, stats: [...p.hero.stats, { id: uid('s'), num: '', label: '' }] },
                  }))
                }
                style={{ alignSelf: 'flex-start' }}
              >
                + Add stat
              </button>
            </div>
          </Field>
        </div>
      )}

      {tab === 'cta' && (
        <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField
            label="Eyebrow"
            value={content.cta.eyebrow}
            onChange={(v) => patch((p) => ({ ...p, cta: { ...p.cta, eyebrow: v } }))}
          />
          <div className="adm-row adm-row--2">
            <TextField
              label="Title"
              value={content.cta.title}
              onChange={(v) => patch((p) => ({ ...p, cta: { ...p.cta, title: v } }))}
            />
            <TextField
              label="Accent (gradient) title"
              value={content.cta.accentTitle}
              onChange={(v) => patch((p) => ({ ...p, cta: { ...p.cta, accentTitle: v } }))}
            />
          </div>
          <TextArea
            label="Sub-copy"
            value={content.cta.sub}
            onChange={(v) => patch((p) => ({ ...p, cta: { ...p.cta, sub: v } }))}
            rows={3}
          />
          <div className="adm-row adm-row--2">
            <TextField
              label="Primary button"
              value={content.cta.primary}
              onChange={(v) => patch((p) => ({ ...p, cta: { ...p.cta, primary: v } }))}
            />
            <TextField
              label="Secondary button"
              value={content.cta.secondary}
              onChange={(v) => patch((p) => ({ ...p, cta: { ...p.cta, secondary: v } }))}
            />
          </div>
        </div>
      )}

      {tab === 'faq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {content.faqs.map((f, i) => (
            <div
              key={f.id}
              className="adm-card"
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="adm-label">FAQ {i + 1}</div>
                <button
                  className="adm-btn adm-btn--sm adm-btn--danger"
                  onClick={() =>
                    patch((p) => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }))
                  }
                >
                  Remove
                </button>
              </div>
              <TextField
                label="Question"
                value={f.q}
                onChange={(v) =>
                  patch((p) => {
                    const faqs = [...p.faqs];
                    faqs[i] = { ...faqs[i], q: v };
                    return { ...p, faqs };
                  })
                }
              />
              <TextArea
                label="Answer"
                value={f.a}
                rows={3}
                onChange={(v) =>
                  patch((p) => {
                    const faqs = [...p.faqs];
                    faqs[i] = { ...faqs[i], a: v };
                    return { ...p, faqs };
                  })
                }
              />
            </div>
          ))}
          <button
            className="adm-btn"
            style={{ alignSelf: 'flex-start' }}
            onClick={() =>
              patch((p) => ({ ...p, faqs: [...p.faqs, { id: uid('f'), q: '', a: '' }] }))
            }
          >
            + Add FAQ
          </button>
        </div>
      )}

      {tab === 'testimonials' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
          {content.testimonials.map((t, i) => (
            <div
              key={t.id}
              className="adm-card"
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="adm-label">Testimonial {i + 1}</div>
                <button
                  className="adm-btn adm-btn--sm adm-btn--danger"
                  onClick={() =>
                    patch((p) => ({
                      ...p,
                      testimonials: p.testimonials.filter((_, idx) => idx !== i),
                    }))
                  }
                >
                  ✕
                </button>
              </div>
              <TextArea
                label="Quote"
                value={t.quote}
                rows={4}
                onChange={(v) =>
                  patch((p) => {
                    const arr = [...p.testimonials];
                    arr[i] = { ...arr[i], quote: v };
                    return { ...p, testimonials: arr };
                  })
                }
              />
              <div className="adm-row adm-row--2">
                <TextField
                  label="Name"
                  value={t.name}
                  onChange={(v) =>
                    patch((p) => {
                      const arr = [...p.testimonials];
                      arr[i] = { ...arr[i], name: v };
                      return { ...p, testimonials: arr };
                    })
                  }
                />
                <TextField
                  label="Role"
                  value={t.role}
                  onChange={(v) =>
                    patch((p) => {
                      const arr = [...p.testimonials];
                      arr[i] = { ...arr[i], role: v };
                      return { ...p, testimonials: arr };
                    })
                  }
                />
              </div>
              <ColorField
                label="Tone"
                value={t.tone}
                onChange={(v) =>
                  patch((p) => {
                    const arr = [...p.testimonials];
                    arr[i] = { ...arr[i], tone: v };
                    return { ...p, testimonials: arr };
                  })
                }
              />
            </div>
          ))}
          <button
            className="adm-btn"
            style={{ alignSelf: 'flex-start' }}
            onClick={() =>
              patch((p) => ({
                ...p,
                testimonials: [
                  ...p.testimonials,
                  { id: uid('q'), quote: '', name: '', role: '', tone: '#6d4cff' },
                ],
              }))
            }
          >
            + Add testimonial
          </button>
        </div>
      )}

      {tab === 'marquee' && (
        <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="adm-label">Marquee labels</div>
          <p className="adm-help" style={{ marginTop: -4 }}>
            Shown on the strip below the hero. Treat as ALL CAPS / lowercase styled tokens — text is rendered as-is.
          </p>
          <StringList
            label=""
            values={content.marquee.map((m) => m.label)}
            onChange={(values) =>
              patch((p) => ({
                ...p,
                marquee: values.map((label, idx) => ({
                  id: p.marquee[idx]?.id ?? uid('m'),
                  label,
                })),
              }))
            }
            placeholder="e.g. NORTHWIND"
          />
        </div>
      )}

      <Toast message={toast} onClear={() => setToast(null)} />
    </AdminShell>
  );
}
