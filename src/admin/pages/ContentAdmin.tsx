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
import { contentStore, patchContent, useContent, type SiteContent } from '@/admin/store';

type Tab = 'hero' | 'cta' | 'faq' | 'testimonials' | 'marquee';

function uid(prefix: string) {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export function ContentAdmin() {
  const [content] = useContent();
  const [tab, setTab] = useState<Tab>('hero');
  const [toast, setToast] = useState<string | null>(null);

  const showError = (err: unknown) =>
    setToast(err instanceof Error ? err.message : 'Save failed.');

  // Each helper sends only the changed top-level key over the wire.
  const update = (delta: Partial<SiteContent>) => {
    patchContent(delta).catch(showError);
  };
  const updateHero = (delta: Partial<SiteContent['hero']>) => {
    update({ hero: { ...content.hero, ...delta } });
  };
  const updateCta = (delta: Partial<SiteContent['cta']>) => {
    update({ cta: { ...content.cta, ...delta } });
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
            if (window.confirm('Reset site content to defaults?')) {
              contentStore.reset().catch(showError);
            }
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
            onChange={(v) => updateHero({ badge: v })}
          />
          <TextField
            label="Headline"
            value={content.hero.headline}
            onChange={(v) => updateHero({ headline: v })}
          />
          <StringList
            label="Rotating words"
            hint="Cycle through these next to the headline."
            values={content.hero.rotatingWords}
            onChange={(v) => updateHero({ rotatingWords: v })}
          />
          <TextArea
            label="Sub-copy"
            value={content.hero.sub}
            onChange={(v) => updateHero({ sub: v })}
            rows={3}
          />
          <div className="adm-row adm-row--2">
            <TextField
              label="Primary CTA label"
              value={content.hero.primaryCta}
              onChange={(v) => updateHero({ primaryCta: v })}
            />
            <TextField
              label="Secondary CTA label"
              value={content.hero.secondaryCta}
              onChange={(v) => updateHero({ secondaryCta: v })}
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
                    onChange={(e) => {
                      const stats = content.hero.stats.map((x, idx) =>
                        idx === i ? { ...x, num: e.target.value } : x,
                      );
                      updateHero({ stats });
                    }}
                  />
                  <input
                    className="adm-input"
                    value={s.label}
                    placeholder="Projects shipped"
                    onChange={(e) => {
                      const stats = content.hero.stats.map((x, idx) =>
                        idx === i ? { ...x, label: e.target.value } : x,
                      );
                      updateHero({ stats });
                    }}
                  />
                  <button
                    className="adm-btn adm-btn--sm adm-btn--danger"
                    onClick={() =>
                      updateHero({
                        stats: content.hero.stats.filter((_, idx) => idx !== i),
                      })
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="adm-btn adm-btn--sm"
                onClick={() =>
                  updateHero({
                    stats: [...content.hero.stats, { id: uid('s'), num: '', label: '' }],
                  })
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
            onChange={(v) => updateCta({ eyebrow: v })}
          />
          <div className="adm-row adm-row--2">
            <TextField
              label="Title"
              value={content.cta.title}
              onChange={(v) => updateCta({ title: v })}
            />
            <TextField
              label="Accent (gradient) title"
              value={content.cta.accentTitle}
              onChange={(v) => updateCta({ accentTitle: v })}
            />
          </div>
          <TextArea
            label="Sub-copy"
            value={content.cta.sub}
            onChange={(v) => updateCta({ sub: v })}
            rows={3}
          />
          <div className="adm-row adm-row--2">
            <TextField
              label="Primary button"
              value={content.cta.primary}
              onChange={(v) => updateCta({ primary: v })}
            />
            <TextField
              label="Secondary button"
              value={content.cta.secondary}
              onChange={(v) => updateCta({ secondary: v })}
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
                    update({ faqs: content.faqs.filter((_, idx) => idx !== i) })
                  }
                >
                  Remove
                </button>
              </div>
              <TextField
                label="Question"
                value={f.q}
                onChange={(v) => {
                  const faqs = content.faqs.map((x, idx) =>
                    idx === i ? { ...x, q: v } : x,
                  );
                  update({ faqs });
                }}
              />
              <TextArea
                label="Answer"
                value={f.a}
                rows={3}
                onChange={(v) => {
                  const faqs = content.faqs.map((x, idx) =>
                    idx === i ? { ...x, a: v } : x,
                  );
                  update({ faqs });
                }}
              />
            </div>
          ))}
          <button
            className="adm-btn"
            style={{ alignSelf: 'flex-start' }}
            onClick={() =>
              update({ faqs: [...content.faqs, { id: uid('f'), q: '', a: '' }] })
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
                    update({
                      testimonials: content.testimonials.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  ✕
                </button>
              </div>
              <TextArea
                label="Quote"
                value={t.quote}
                rows={4}
                onChange={(v) => {
                  const testimonials = content.testimonials.map((x, idx) =>
                    idx === i ? { ...x, quote: v } : x,
                  );
                  update({ testimonials });
                }}
              />
              <div className="adm-row adm-row--2">
                <TextField
                  label="Name"
                  value={t.name}
                  onChange={(v) => {
                    const testimonials = content.testimonials.map((x, idx) =>
                      idx === i ? { ...x, name: v } : x,
                    );
                    update({ testimonials });
                  }}
                />
                <TextField
                  label="Role"
                  value={t.role}
                  onChange={(v) => {
                    const testimonials = content.testimonials.map((x, idx) =>
                      idx === i ? { ...x, role: v } : x,
                    );
                    update({ testimonials });
                  }}
                />
              </div>
              <ColorField
                label="Tone"
                value={t.tone}
                onChange={(v) => {
                  const testimonials = content.testimonials.map((x, idx) =>
                    idx === i ? { ...x, tone: v } : x,
                  );
                  update({ testimonials });
                }}
              />
            </div>
          ))}
          <button
            className="adm-btn"
            style={{ alignSelf: 'flex-start' }}
            onClick={() =>
              update({
                testimonials: [
                  ...content.testimonials,
                  { id: uid('q'), quote: '', name: '', role: '', tone: '#6d4cff' },
                ],
              })
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
              update({
                marquee: values.map((label, idx) => ({
                  id: content.marquee[idx]?.id ?? uid('m'),
                  label,
                })),
              })
            }
            placeholder="e.g. NORTHWIND"
          />
        </div>
      )}

      <Toast message={toast} onClear={() => setToast(null)} />
    </AdminShell>
  );
}
