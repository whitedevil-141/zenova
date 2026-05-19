import { useState } from 'react';
import { AdminShell } from '@/admin/components/AdminShell';
import { ColorField, TextArea, TextField, Toast } from '@/admin/components/Form';
import { teamStore, useTeam, type TeamMember } from '@/admin/store';

function uid() {
  return 't' + Math.random().toString(36).slice(2, 9);
}

export function TeamAdmin() {
  const [team] = useTeam();
  const [toast, setToast] = useState<string | null>(null);

  const update = (i: number, patch: Partial<TeamMember>) => {
    const next = [...team];
    next[i] = { ...next[i], ...patch };
    teamStore.set(next);
  };

  const remove = (i: number) => {
    if (!window.confirm(`Remove ${team[i].name}?`)) return;
    teamStore.set(team.filter((_, idx) => idx !== i));
  };

  const add = () => {
    teamStore.set([
      ...team,
      { id: uid(), name: 'New member', role: 'Role', bio: '', initials: 'NM', tone: '#3a5bff' },
    ]);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= team.length) return;
    const next = [...team];
    [next[i], next[j]] = [next[j], next[i]];
    teamStore.set(next);
  };

  return (
    <AdminShell
      crumbs={[{ label: 'Team' }]}
      title="Team"
      sub="Renders on the About page. Changes here appear live."
      actions={
        <>
          <button
            className="adm-btn"
            onClick={() => {
              if (window.confirm('Reset team to defaults?')) teamStore.reset();
            }}
          >
            Reset
          </button>
          <button className="adm-btn adm-btn--primary" onClick={add}>
            + Add member
          </button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {team.map((m, i) => (
          <div key={m.id} className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${m.tone}, var(--accent-3))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  flexShrink: 0,
                  boxShadow: `0 6px 14px ${m.tone}55`,
                }}
              >
                {m.initials || m.name.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{m.name || 'Unnamed'}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-faint)' }}>{m.role}</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="adm-btn adm-btn--sm adm-btn--ghost" onClick={() => move(i, -1)} title="Move up">↑</button>
                <button className="adm-btn adm-btn--sm adm-btn--ghost" onClick={() => move(i, 1)} title="Move down">↓</button>
                <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => remove(i)}>✕</button>
              </div>
            </div>
            <TextField label="Name" value={m.name} onChange={(v) => update(i, { name: v })} />
            <TextField label="Role" value={m.role} onChange={(v) => update(i, { role: v })} />
            <TextArea label="Bio" value={m.bio} onChange={(v) => update(i, { bio: v })} rows={3} />
            <div className="adm-row adm-row--2">
              <TextField label="Initials" value={m.initials} onChange={(v) => update(i, { initials: v.slice(0, 3).toUpperCase() })} />
              <ColorField label="Tone" value={m.tone} onChange={(v) => update(i, { tone: v })} />
            </div>
          </div>
        ))}
      </div>
      <Toast message={toast} onClear={() => setToast(null)} />
    </AdminShell>
  );
}
