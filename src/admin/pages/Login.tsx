import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ADMIN_PASSCODE_HINT, isAuthed, login } from '@/admin/store';

export function AdminLogin() {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(code)) {
      nav('/admin', { replace: true });
    } else {
      setError('Wrong passcode.');
    }
  };

  return (
    <div className="adm-login">
      <form onSubmit={submit} className="adm-login__card">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--grad)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 18,
            boxShadow: '0 6px 22px rgba(58,91,255,0.45)',
          }}
        >
          Z
        </div>
        <h1 className="adm-login__title">Sign in to admin</h1>
        <p className="adm-login__sub">
          Mocked auth — no backend yet. Use the passcode <code style={{ color: 'var(--accent-3)' }}>{ADMIN_PASSCODE_HINT}</code>.
        </p>
        <div className="adm-field">
          <label className="adm-label">Passcode</label>
          <input
            type="password"
            className="adm-input"
            value={code}
            placeholder="zenova-admin"
            autoFocus
            onChange={(e) => {
              setCode(e.target.value);
              setError(null);
            }}
          />
          {error && (
            <p style={{ color: '#ff6b6b', fontSize: 13, margin: 0 }}>{error}</p>
          )}
        </div>
        <button type="submit" className="adm-btn adm-btn--primary" style={{ justifyContent: 'center' }}>
          Continue
        </button>
        <a
          href="/"
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--fg-faint)',
            textDecoration: 'none',
            marginTop: 4,
          }}
        >
          ← Back to website
        </a>
      </form>
    </div>
  );
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
