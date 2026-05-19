import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminShell } from '@/admin/components/AdminShell';
import {
  ColorField,
  Field,
  StringList,
  TextArea,
  TextField,
  Toast,
} from '@/admin/components/Form';
import { projectsStore, useProjects } from '@/admin/store';
import type { ProjectDetail, ProjectMetric, ProjectSection } from '@/data/projects';
import { emptyProject } from './ProjectsAdmin';

type Tab = 'basics' | 'metrics' | 'sections' | 'meta' | 'testimonial';

export function ProjectEditor() {
  const { slug = '' } = useParams();
  const nav = useNavigate();
  const [projects] = useProjects();
  const isNew = slug === 'new';
  const existing = useMemo(
    () => (isNew ? emptyProject() : projects.find((p) => p.slug === slug)),
    [slug, projects, isNew]
  );

  const [draft, setDraft] = useState<ProjectDetail | null>(existing ?? null);
  const [tab, setTab] = useState<Tab>('basics');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (existing) setDraft(existing);
  }, [existing]);

  if (!draft) {
    return (
      <AdminShell title="Case study not found" crumbs={[{ label: 'Projects', to: '/admin/projects' }, { label: '404' }]}>
        <p style={{ color: 'var(--fg-dim)' }}>That slug does not exist.</p>
      </AdminShell>
    );
  }

  const update = <K extends keyof ProjectDetail>(key: K, value: ProjectDetail[K]) => {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  };

  const save = () => {
    if (!draft) return;
    if (isNew) {
      if (projects.some((p) => p.slug === draft.slug)) {
        setToast(`Slug "${draft.slug}" already exists — pick another.`);
        return;
      }
      projectsStore.set([...projects, draft]);
      setToast('Case study created');
      nav(`/admin/projects/${draft.slug}`, { replace: true });
    } else {
      projectsStore.set(projects.map((p) => (p.slug === slug ? draft : p)));
      setToast('Saved');
      if (draft.slug !== slug) nav(`/admin/projects/${draft.slug}`, { replace: true });
    }
  };

  const TABS: Array<{ id: Tab; label: string }> = [
    { id: 'basics', label: 'Basics' },
    { id: 'metrics', label: `Metrics (${draft.metrics.length})` },
    { id: 'sections', label: `Narrative (${draft.sections.length})` },
    { id: 'meta', label: 'Stack & deliverables' },
    { id: 'testimonial', label: 'Testimonial' },
  ];

  return (
    <AdminShell
      crumbs={[
        { label: 'Projects', to: '/admin/projects' },
        { label: isNew ? 'New' : draft.client },
      ]}
      title={isNew ? 'New case study' : draft.client}
      sub={draft.title}
      actions={
        <>
          {!isNew && (
            <a
              href={`/work/${draft.slug}`}
              target="_blank"
              rel="noreferrer"
              className="adm-btn"
            >
              ↗ Preview
            </a>
          )}
          <button onClick={() => nav('/admin/projects')} className="adm-btn">
            Cancel
          </button>
          <button onClick={save} className="adm-btn adm-btn--primary">
            Save
          </button>
        </>
      }
    >
      <div className="adm-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`adm-tab${tab === t.id ? ' is-active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'basics' && (
        <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="adm-row adm-row--2">
            <TextField label="Slug" value={draft.slug} onChange={(v) => update('slug', v)} hint="Becomes /work/<slug>." />
            <TextField label="Client" value={draft.client} onChange={(v) => update('client', v)} />
          </div>
          <div className="adm-row adm-row--3">
            <TextField label="Category" value={draft.category} onChange={(v) => update('category', v)} />
            <TextField label="Industry" value={draft.industry} onChange={(v) => update('industry', v)} />
            <TextField label="Year" value={draft.year} onChange={(v) => update('year', v)} />
          </div>
          <TextField label="Title" value={draft.title} onChange={(v) => update('title', v)} />
          <TextArea label="Summary" hint="Shown on the /work card." value={draft.summary} onChange={(v) => update('summary', v)} rows={2} />
          <TextArea label="Hero copy" hint="Opening sentences on the detail page." value={draft.hero} onChange={(v) => update('hero', v)} rows={3} />
          <div className="adm-row adm-row--3">
            <TextField label="Duration" value={draft.duration} onChange={(v) => update('duration', v)} placeholder="14 weeks" />
            <TextField label="Team shape" value={draft.team} onChange={(v) => update('team', v)} placeholder="5 people · 1 Slack channel" />
            <ColorField label="Accent tone" value={draft.tone} onChange={(v) => update('tone', v)} />
          </div>
          <Field label="Tags" hint="Comma-separated. Drive the filter chips on /work.">
            <input
              type="text"
              className="adm-input"
              value={draft.tags.join(', ')}
              placeholder="Brand, Web, Marketing"
              onChange={(e) =>
                update(
                  'tags',
                  e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </Field>
          <Field label="Services" hint="Free-text labels (shown in the sidebar).">
            <input
              type="text"
              className="adm-input"
              value={draft.services.join(', ')}
              placeholder="Website Development, Marketing Solutions"
              onChange={(e) =>
                update(
                  'services',
                  e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </Field>
          <Field label="Headline metric (the big one on cards)">
            <div className="adm-row adm-row--2">
              <input
                className="adm-input"
                value={draft.metric[0]}
                placeholder="+212%"
                onChange={(e) => update('metric', [e.target.value, draft.metric[1]])}
              />
              <input
                className="adm-input"
                value={draft.metric[1]}
                placeholder="Trial signups, Q over Q"
                onChange={(e) => update('metric', [draft.metric[0], e.target.value])}
              />
            </div>
          </Field>
          <Field label="Visual variant (0 – 3)">
            <input
              type="number"
              min={0}
              max={3}
              className="adm-input"
              value={draft.visualIdx}
              onChange={(e) => update('visualIdx', Number(e.target.value) || 0)}
            />
          </Field>
        </div>
      )}

      {tab === 'metrics' && (
        <MetricsEditor metrics={draft.metrics} onChange={(v) => update('metrics', v)} />
      )}

      {tab === 'sections' && (
        <SectionEditor sections={draft.sections} onChange={(v) => update('sections', v)} />
      )}

      {tab === 'meta' && (
        <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <StringList
            label="Stack"
            values={draft.stack}
            onChange={(v) => update('stack', v)}
            placeholder="e.g. Next.js"
          />
          <StringList
            label="Deliverables"
            values={draft.deliverables}
            onChange={(v) => update('deliverables', v)}
            placeholder="e.g. New brand system"
          />
        </div>
      )}

      {tab === 'testimonial' && (
        <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextArea
            label="Quote"
            value={draft.testimonial.quote}
            onChange={(v) =>
              update('testimonial', { ...draft.testimonial, quote: v })
            }
            rows={4}
          />
          <div className="adm-row adm-row--2">
            <TextField
              label="Author"
              value={draft.testimonial.author}
              onChange={(v) => update('testimonial', { ...draft.testimonial, author: v })}
            />
            <TextField
              label="Role"
              value={draft.testimonial.role}
              onChange={(v) => update('testimonial', { ...draft.testimonial, role: v })}
            />
          </div>
        </div>
      )}

      <Toast message={toast} onClear={() => setToast(null)} />
    </AdminShell>
  );
}

function MetricsEditor({
  metrics,
  onChange,
}: {
  metrics: ProjectMetric[];
  onChange: (next: ProjectMetric[]) => void;
}) {
  const update = (i: number, patch: Partial<ProjectMetric>) => {
    const next = [...metrics];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {metrics.map((m, i) => (
        <div key={i} className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="adm-label">Metric {i + 1}</div>
            <button
              className="adm-btn adm-btn--sm adm-btn--danger"
              onClick={() => onChange(metrics.filter((_, idx) => idx !== i))}
            >
              Remove
            </button>
          </div>
          <div className="adm-row adm-row--2">
            <TextField label="Number" value={m.num} onChange={(v) => update(i, { num: v })} />
            <TextField label="Label" value={m.label} onChange={(v) => update(i, { label: v })} />
          </div>
        </div>
      ))}
      <button
        className="adm-btn"
        onClick={() => onChange([...metrics, { num: '', label: '' }])}
        style={{ alignSelf: 'flex-start' }}
      >
        + Add metric
      </button>
    </div>
  );
}

function SectionEditor({
  sections,
  onChange,
}: {
  sections: ProjectSection[];
  onChange: (next: ProjectSection[]) => void;
}) {
  const update = (i: number, patch: Partial<ProjectSection>) => {
    const next = [...sections];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {sections.map((s, i) => (
        <div key={i} className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="adm-label">Section {i + 1}</div>
            <button
              className="adm-btn adm-btn--sm adm-btn--danger"
              onClick={() => onChange(sections.filter((_, idx) => idx !== i))}
            >
              Remove
            </button>
          </div>
          <TextField label="Title" value={s.title} onChange={(v) => update(i, { title: v })} placeholder="The challenge" />
          <Field label="Paragraphs" hint="One textarea per paragraph.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.body.map((p, bi) => (
                <div key={bi} style={{ display: 'flex', gap: 8 }}>
                  <textarea
                    className="adm-textarea"
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const next = [...s.body];
                      next[bi] = e.target.value;
                      update(i, { body: next });
                    }}
                  />
                  <button
                    className="adm-btn adm-btn--sm adm-btn--danger"
                    onClick={() => update(i, { body: s.body.filter((_, x) => x !== bi) })}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="adm-btn adm-btn--sm"
                onClick={() => update(i, { body: [...s.body, ''] })}
                style={{ alignSelf: 'flex-start' }}
              >
                + Add paragraph
              </button>
            </div>
          </Field>
        </div>
      ))}
      <button
        className="adm-btn"
        onClick={() => onChange([...sections, { title: '', body: [''] }])}
        style={{ alignSelf: 'flex-start' }}
      >
        + Add section
      </button>
    </div>
  );
}
