import { useRef, useState } from 'react';
import { AdminShell } from '@/admin/components/AdminShell';
import { Field, TextField, Toast } from '@/admin/components/Form';
import {
  brandStore,
  exportAll,
  importAll,
  resetAll,
  useBrand,
  type BrandSettings,
} from '@/admin/store';

function uid() {
  return 'l' + Math.random().toString(36).slice(2, 9);
}

export function Settings() {
  const [brand] = useBrand();
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const patch = (updater: (prev: BrandSettings) => BrandSettings) => {
    brandStore.set(updater);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportAll(), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenova-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('Exported');
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      importAll(data);
      setToast('Imported — reload to see the latest copy on every screen.');
    } catch {
      setToast('Import failed — invalid JSON.');
    }
  };

  const updateLocation = (
    i: number,
    patchObj: Partial<BrandSettings['locations'][number]>
  ) => {
    patch((prev) => {
      const locs = [...prev.locations];
      locs[i] = { ...locs[i], ...patchObj };
      return { ...prev, locations: locs };
    });
  };

  return (
    <AdminShell
      crumbs={[{ label: 'Settings' }]}
      title="Settings"
      sub="Brand identity, locations, import / export."
      actions={
        <>
          <button className="adm-btn" onClick={handleExport}>
            ↓ Export JSON
          </button>
          <button
            className="adm-btn"
            onClick={() => fileRef.current?.click()}
          >
            ↑ Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.target.value = '';
            }}
          />
          <button
            className="adm-btn adm-btn--danger"
            onClick={() => {
              if (window.confirm('Reset ALL content (services, projects, team, site copy, brand) to factory defaults? This cannot be undone.')) {
                resetAll();
                setToast('Everything reset.');
              }
            }}
          >
            Reset everything
          </button>
        </>
      }
    >
      <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="adm-label">Brand</div>
        <div className="adm-row adm-row--2">
          <TextField
            label="Studio name"
            value={brand.studioName}
            onChange={(v) => patch((p) => ({ ...p, studioName: v }))}
          />
          <TextField
            label="Tagline"
            value={brand.tagline}
            onChange={(v) => patch((p) => ({ ...p, tagline: v }))}
          />
        </div>
        <div className="adm-row adm-row--2">
          <TextField
            label="Contact email"
            value={brand.contactEmail}
            onChange={(v) => patch((p) => ({ ...p, contactEmail: v }))}
          />
          <TextField
            label="Careers email"
            value={brand.careersEmail}
            onChange={(v) => patch((p) => ({ ...p, careersEmail: v }))}
          />
        </div>
      </div>

      <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="adm-label">Locations</div>
          <button
            className="adm-btn adm-btn--sm"
            onClick={() =>
              patch((p) => ({
                ...p,
                locations: [
                  ...p.locations,
                  { id: uid(), city: '', tz: '', detail: '' },
                ],
              }))
            }
          >
            + Add location
          </button>
        </div>
        {brand.locations.map((l, i) => (
          <div
            key={l.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 0.6fr 2fr auto',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <input
              className="adm-input"
              placeholder="City"
              value={l.city}
              onChange={(e) => updateLocation(i, { city: e.target.value })}
            />
            <input
              className="adm-input"
              placeholder="TZ"
              value={l.tz}
              onChange={(e) => updateLocation(i, { tz: e.target.value })}
            />
            <input
              className="adm-input"
              placeholder="Detail"
              value={l.detail}
              onChange={(e) => updateLocation(i, { detail: e.target.value })}
            />
            <button
              className="adm-btn adm-btn--sm adm-btn--danger"
              onClick={() =>
                patch((p) => ({
                  ...p,
                  locations: p.locations.filter((_, idx) => idx !== i),
                }))
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="adm-label">Data backup</div>
        <Field label="What lives in localStorage" hint="Edits are stored client-side in your browser only. Export to back up, import to restore.">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
            }}
          >
            {['services', 'projects', 'team', 'content', 'brand', 'auth'].map((k) => (
              <span key={k} className="adm-badge" style={{ justifyContent: 'flex-start' }}>
                zenova.admin.{k}
              </span>
            ))}
          </div>
        </Field>
      </div>

      <Toast message={toast} onClear={() => setToast(null)} />
    </AdminShell>
  );
}
