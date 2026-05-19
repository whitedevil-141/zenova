import type { ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { logout } from '@/admin/store';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

const NAV: NavItem[] = [
  {
    to: '/admin',
    end: true,
    label: 'Overview',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    to: '/admin/services',
    label: 'Services',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 6-6 6 6 6" />
        <path d="m16 6 6 6-6 6" />
        <path d="m14 4-4 16" />
      </svg>
    ),
  },
  {
    to: '/admin/projects',
    label: 'Projects',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    to: '/admin/team',
    label: 'Team',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="3" />
        <path d="M2 20c1.5-3 4-5 7-5s5.5 2 7 5" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M22 18c-.7-1.5-2.1-2.5-3.8-2.5" />
      </svg>
    ),
  },
  {
    to: '/admin/content',
    label: 'Site content',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z" />
        <path d="M4 9h16" />
        <path d="M9 9v11" />
      </svg>
    ),
  },
  {
    to: '/admin/settings',
    label: 'Settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export interface AdminCrumb {
  label: string;
  to?: string;
}

export function AdminShell({
  crumbs,
  title,
  sub,
  actions,
  children,
}: {
  crumbs?: AdminCrumb[];
  title: ReactNode;
  sub?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const location = useLocation();

  return (
    <div className="admin-root">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar__brand">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: 'var(--grad)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 14,
                boxShadow: '0 4px 14px rgba(58,91,255,0.4)',
              }}
            >
              Z
            </div>
            <div>
              <div className="admin-sidebar__brand-name">Zenova</div>
              <div className="admin-sidebar__brand-tag">Admin</div>
            </div>
          </div>

          <div className="admin-sidebar__section">Manage</div>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? ' is-active' : ''}`
              }
            >
              <span className="admin-nav-link__icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="admin-sidebar__footer">
            <Link to="/" className="admin-nav-link" target="_blank" rel="noreferrer">
              <span className="admin-nav-link__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
              View site
            </Link>
            <button
              onClick={() => {
                logout();
                window.location.href = '/admin/login';
              }}
              className="admin-nav-link"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span className="admin-nav-link__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </span>
              Sign out
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <div className="admin-topbar">
            <div className="admin-topbar__crumbs">
              <Link to="/admin">Admin</Link>
              {crumbs?.map((c, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ opacity: 0.5 }}>/</span>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span style={{ color: 'var(--fg-dim)' }}>{c.label}</span>}
                </span>
              ))}
            </div>
            <div className="admin-topbar__actions">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-faint)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }}
                />
                {location.pathname}
              </span>
            </div>
          </div>

          <div className="admin-page">
            <header className="admin-page__header">
              <div>
                <h1 className="admin-page__title">{title}</h1>
                {sub && <p className="admin-page__sub">{sub}</p>}
              </div>
              {actions && <div style={{ display: 'flex', gap: 10 }}>{actions}</div>}
            </header>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
