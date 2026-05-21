import { useRef, useState } from 'react';
import { AdminShell } from '@/admin/components/AdminShell';
import { Field, TextField, Toast } from '@/admin/components/Form';
import {
  exportAll,
  importAll,
  patchBrand,
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

  const showError = (err: unknown) => {
    setToast(err instanceof Error ? err.message : 'Save failed.');
  };

  const updateBrand = (delta: Partial<BrandSettings>) => {
    patchBrand(delta).catch(showError);
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
    patchObj: Partial<BrandSettings['locations'][number]>,
  ) => {
    const locations = brand.locations.map((l, idx) =>
      idx === i ? { ...l, ...patchObj } : l,
    );
    updateBrand({ locations });
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
            onClick={async () => {
              if (
                !window.confirm(
                  'Reset ALL content (services, projects, team, site copy, brand) to factory defaults on the server? This cannot be undone.',
                )
              ) {
                return;
              }
              try {
                await resetAll();
                setToast('Everything reset.');
              } catch (err) {
                setToast(err instanceof Error ? err.message : 'Reset failed.');
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
            onChange={(v) => updateBrand({ studioName: v })}
          />
          <TextField
            label="Tagline"
            value={brand.tagline}
            onChange={(v) => updateBrand({ tagline: v })}
          />
        </div>
        <div className="adm-row adm-row--2">
          <TextField
            label="Contact email"
            value={brand.contactEmail}
            onChange={(v) => updateBrand({ contactEmail: v })}
          />
          <TextField
            label="Careers email"
            value={brand.careersEmail}
            onChange={(v) => updateBrand({ careersEmail: v })}
          />
        </div>
      </div>

      <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="adm-label">Locations</div>
          <button
            className="adm-btn adm-btn--sm"
            onClick={() =>
              updateBrand({
                locations: [
                  ...brand.locations,
                  { id: uid(), city: '', tz: '', detail: '' },
                ],
              })
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
                updateBrand({
                  locations: brand.locations.filter((_, idx) => idx !== i),
                })
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="adm-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="adm-label">Data backup</div>
        <Field
          label="Source of truth"
          hint="Content is stored in the Supabase Postgres backend. Local snapshots are kept only as a cache for offline viewing — export to back up the live data, import to restore from a JSON dump."
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
            }}
          >
            {[
              '/api/v1/admin/services',
              '/api/v1/admin/projects',
              '/api/v1/admin/team',
              '/api/v1/admin/content',
              '/api/v1/admin/brand',
              '/api/v1/admin/uploads/image',
            ].map((k) => (
              <span key={k} className="adm-badge" style={{ justifyContent: 'flex-start' }}>
                {k}
              </span>
            ))}
          </div>
        </Field>
      </div>

      <Toast message={toast} onClear={() => setToast(null)} />
    </AdminShell>
  );
}
