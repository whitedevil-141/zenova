import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { CTA } from '@/components/sections/CTA';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectVisual } from '@/components/sections/ProjectVisual';
import { Icon } from '@/components/icons/Icon';
import { type ProjectDetail } from '@/data/projects';
import { useProjects } from '@/admin/store';

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const [PROJECTS] = useProjects();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Work', to: '/work' },
          { label: project.client },
        ]}
        eyebrow={`Case study · ${project.category} · ${project.year}`}
        title={
          <>
            {project.client}
            <br />
            <span style={{ color: 'var(--fg-dim)' }}>{project.industry}</span>
          </>
        }
        sub={project.hero}
        meta={[
          [project.metric[0], project.metric[1]],
          [project.duration, 'Engagement length'],
          [project.team, 'Team shape'],
          [project.year, 'Shipped'],
        ]}
        secondary={{ label: 'Back to all work', to: '/work' }}
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="container">
          <div
            style={{
              aspectRatio: '21 / 9',
              borderRadius: 24,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--line-strong)',
              background: `
                linear-gradient(135deg, ${project.tone}40, ${project.tone}10),
                repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 12px),
                #0a0b13
              `,
            }}
          >
            <ProjectVisual idx={project.visualIdx} tone={project.tone} animate />
            <div
              style={{
                position: 'absolute',
                left: 24,
                bottom: 24,
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="mono"
                  style={{
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--line)',
                    color: 'var(--fg)',
                    fontSize: 11,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              style={{
                position: 'absolute',
                right: 24,
                top: 24,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--line)',
                color: 'var(--fg-dim)',
                fontSize: 13,
              }}
            >
              {project.industry}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 56 }}>
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}
        >
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="card"
              style={{
                padding: 26,
                borderRadius: 20,
                border: '1px solid var(--line)',
                background: `linear-gradient(160deg, ${project.tone}1a, rgba(255,255,255,0.005))`,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                className="display"
                style={{
                  fontSize: 'clamp(28px, 3vw, 38px)',
                  fontWeight: 500,
                  background: `linear-gradient(90deg, ${project.tone}, var(--accent-3))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {m.num}
              </div>
              <div style={{ color: 'var(--fg-dim)', fontSize: 13, lineHeight: 1.45 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 56 }}>
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 56, alignItems: 'start' }}
        >
          <aside
            style={{
              position: 'sticky',
              top: 110,
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
            }}
          >
            <div>
              <div className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 8 }}>
                Services
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                {project.services.map((s) => (
                  <li key={s} style={{ color: 'var(--fg)', fontSize: 14 }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 8 }}>
                Engagement
              </div>
              <div style={{ color: 'var(--fg)', fontSize: 14, lineHeight: 1.6 }}>
                {project.duration}
                <br />
                <span style={{ color: 'var(--fg-dim)' }}>{project.team}</span>
              </div>
            </div>
            <div>
              <div className="mono" style={{ color: 'var(--fg-faint)', marginBottom: 8 }}>
                Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="mono"
                    style={{
                      padding: '5px 10px',
                      borderRadius: 999,
                      border: '1px solid var(--line)',
                      background: 'rgba(255,255,255,0.025)',
                      color: 'var(--fg-dim)',
                      fontSize: 10,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <article style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <h2
              className="display"
              style={{ margin: 0, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, lineHeight: 1.05 }}
            >
              {project.title}
            </h2>
            {project.sections.map((s) => (
              <div key={s.title} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div
                  className="mono"
                  style={{ color: project.tone, fontSize: 12, letterSpacing: '0.12em' }}
                >
                  {s.title}
                </div>
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 17, lineHeight: 1.7 }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div
              className="card"
              style={{
                padding: 28,
                borderRadius: 20,
                border: '1px solid var(--line)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
              }}
            >
              <div
                className="mono"
                style={{ color: project.tone, fontSize: 12, letterSpacing: '0.12em', marginBottom: 14 }}
              >
                Deliverables
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '10px 18px',
                }}
              >
                {project.deliverables.map((d) => (
                  <div
                    key={d}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: 'var(--fg)',
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 6,
                        border: `1px solid ${project.tone}40`,
                        background: `${project.tone}1a`,
                        color: project.tone,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon.Check size={11} />
                    </span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div
            className="card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '56px 48px',
              borderRadius: 28,
              border: '1px solid var(--line-strong)',
              background: `linear-gradient(135deg, ${project.tone}22, rgba(255,255,255,0.01))`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 360,
                height: 360,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${project.tone}55, transparent 60%)`,
                filter: 'blur(60px)',
              }}
            />
            <div style={{ position: 'relative' }}>
              <Icon.Quote size={36} />
              <p
                className="display"
                style={{
                  margin: '20px 0 28px',
                  fontSize: 'clamp(22px, 2.6vw, 32px)',
                  fontWeight: 500,
                  lineHeight: 1.35,
                }}
              >
                “{project.testimonial.quote}”
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${project.tone}, var(--accent-3))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                  }}
                >
                  {project.testimonial.author
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <div style={{ color: 'var(--fg)', fontSize: 15 }}>{project.testimonial.author}</div>
                  <div className="mono" style={{ color: 'var(--fg-faint)' }}>
                    {project.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="container">
          <SectionHeader
            eyebrow="Next case study"
            title={<>{next.client}</>}
            sub={next.summary}
          />
          <NextProjectCard project={next} />
        </div>
      </section>

      <CTA />
    </>
  );
}

function NextProjectCard({ project }: { project: ProjectDetail }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="card"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        padding: 32,
        borderRadius: 24,
        border: '1px solid var(--line)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
        textDecoration: 'none',
        color: 'var(--fg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          aspectRatio: '5 / 3',
          borderRadius: 18,
          position: 'relative',
          overflow: 'hidden',
          background: `
            linear-gradient(135deg, ${project.tone}40, ${project.tone}10),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 12px),
            #0a0b13
          `,
          border: '1px solid var(--line)',
        }}
      >
        <ProjectVisual idx={project.visualIdx} tone={project.tone} animate />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        <div className="mono" style={{ color: 'var(--fg-faint)' }}>
          {project.category} · {project.year}
        </div>
        <div className="display" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2 }}>
          {project.title}
        </div>
        <div
          className="display"
          style={{
            fontSize: 36,
            fontWeight: 500,
            background: `linear-gradient(90deg, ${project.tone}, var(--accent-3))`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {project.metric[0]}
        </div>
        <div style={{ color: 'var(--fg-dim)', fontSize: 14 }}>{project.metric[1]}</div>
        <div
          className="mono"
          style={{
            marginTop: 6,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--accent-3)',
          }}
        >
          Read the case study <Icon.Arrow size={12} />
        </div>
      </div>
    </Link>
  );
}
