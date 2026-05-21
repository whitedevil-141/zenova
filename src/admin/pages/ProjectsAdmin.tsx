import { Link } from 'react-router-dom';
import { AdminShell } from '@/admin/components/AdminShell';
import { projectsStore, useProjects } from '@/admin/store';
import type { ProjectDetail } from '@/data/projects';

export function emptyProject(): ProjectDetail {
  return {
    slug: 'new-project-' + Math.random().toString(36).slice(2, 6),
    client: 'New client',
    category: 'Category',
    industry: '',
    title: 'Untitled case study',
    summary: '',
    tags: [],
    tone: '#6d4cff',
    year: String(new Date().getFullYear()),
    duration: '',
    team: '',
    services: [],
    hero: '',
    metric: ['', ''],
    metrics: [],
    sections: [],
    deliverables: [],
    stack: [],
    testimonial: {
      quote: '',
      author: '',
      role: '',
    },
    visualIdx: 0,
    images: [],
  };
}

export function ProjectsAdmin() {
  const [projects] = useProjects();

  const duplicate = (p: ProjectDetail) => {
    projectsStore.set([
      ...projects,
      { ...p, slug: p.slug + '-copy', client: p.client + ' (copy)' },
    ]);
  };

  const remove = (p: ProjectDetail) => {
    if (!window.confirm(`Delete "${p.client}"? This cannot be undone.`)) return;
    projectsStore.set(projects.filter((x) => x.slug !== p.slug));
  };

  return (
    <AdminShell
      crumbs={[{ label: 'Projects' }]}
      title="Case studies"
      sub="Long-form project pages. Each entry lives at /work/<slug> and is featured on /work."
      actions={
        <>
          <button
            className="adm-btn"
            onClick={() => {
              if (window.confirm('Reset case studies to factory defaults?')) {
                projectsStore.reset();
              }
            }}
          >
            Reset
          </button>
          <Link to="/admin/projects/new" className="adm-btn adm-btn--primary">
            + New case study
          </Link>
        </>
      }
    >
      <div className="adm-list">
        <div
          className="adm-list__row adm-list__row--head"
          style={{ gridTemplateColumns: '40px 1.6fr 1fr 0.5fr 0.7fr 220px' }}
        >
          <div></div>
          <div>Client / title</div>
          <div>Category</div>
          <div>Year</div>
          <div>Metric</div>
          <div style={{ textAlign: 'right' }}>Actions</div>
        </div>
        {projects.map((p) => (
          <div
            key={p.slug}
            className="adm-list__row"
            style={{ gridTemplateColumns: '40px 1.6fr 1fr 0.5fr 0.7fr 220px' }}
          >
            <div className="adm-list__cell adm-list__cell--lead">
              <span
                className="adm-badge__dot"
                style={{ background: p.tone, boxShadow: `0 0 8px ${p.tone}` }}
              />
            </div>
            <div className="adm-list__cell adm-list__cell--primary">
              <div style={{ fontSize: 14, fontWeight: 500 }}>{p.client}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-faint)' }}>{p.title}</div>
            </div>
            <div className="adm-list__cell" data-label="Category" style={{ color: 'var(--fg-dim)', fontSize: 13 }}>
              {p.category}
            </div>
            <div className="adm-list__cell" data-label="Year" style={{ color: 'var(--fg-dim)', fontSize: 13 }}>
              {p.year}
            </div>
            <div className="adm-list__cell" data-label="Metric">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 15,
                  background: `linear-gradient(90deg, ${p.tone}, var(--accent-3))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {p.metric[0]}
              </span>
            </div>
            <div className="adm-list__cell adm-list__actions">
              <Link
                to={`/work/${p.slug}`}
                target="_blank"
                rel="noreferrer"
                className="adm-btn adm-btn--sm"
              >
                Preview
              </Link>
              <Link to={`/admin/projects/${p.slug}`} className="adm-btn adm-btn--sm">
                Edit
              </Link>
              <button className="adm-btn adm-btn--sm" onClick={() => duplicate(p)}>
                Duplicate
              </button>
              <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => remove(p)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
