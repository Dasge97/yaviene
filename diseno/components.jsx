// TransitFlow — reusable components (chips, cards, list rows, buttons, icons).

// ── Icons (stroke 1.6, 20px) ─────────────────────────────────
function Icon({ name, size = 20, stroke = 'currentColor', strokeWidth = 1.6, fill = 'none' }) {
  const p = { width: size, height: size, viewBox: '0 0 20 20', fill, stroke, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'pin': return <svg {...p}><path d="M10 18s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z"/><circle cx="10" cy="8" r="2.2"/></svg>;
    case 'pin-fill': return <svg {...p} fill="currentColor" stroke="none"><path d="M10 18s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10zM10 10.2A2.2 2.2 0 1010 5.8a2.2 2.2 0 000 4.4z" fillRule="evenodd"/></svg>;
    case 'bus': return <svg {...p}><rect x="4" y="3" width="12" height="12" rx="2"/><path d="M4 11h12M7 3v2M13 3v2"/><circle cx="7" cy="17" r="1"/><circle cx="13" cy="17" r="1"/></svg>;
    case 'clock': return <svg {...p}><circle cx="10" cy="10" r="7"/><path d="M10 6v4l2.5 1.5"/></svg>;
    case 'search': return <svg {...p}><circle cx="9" cy="9" r="5"/><path d="M13 13l3.5 3.5"/></svg>;
    case 'arrow-r': return <svg {...p}><path d="M5 10h10M11 6l4 4-4 4"/></svg>;
    case 'arrow-l': return <svg {...p}><path d="M15 10H5M9 6l-4 4 4 4"/></svg>;
    case 'arrow-up-r': return <svg {...p}><path d="M6 14l8-8M7 6h7v7"/></svg>;
    case 'chev-r': return <svg {...p}><path d="M8 5l5 5-5 5"/></svg>;
    case 'chev-d': return <svg {...p}><path d="M5 8l5 5 5-5"/></svg>;
    case 'plus': return <svg {...p}><path d="M10 4v12M4 10h12"/></svg>;
    case 'check': return <svg {...p}><path d="M4 10l4 4 8-8"/></svg>;
    case 'x': return <svg {...p}><path d="M5 5l10 10M15 5L5 15"/></svg>;
    case 'star': return <svg {...p}><path d="M10 3l2.2 4.5 5 .7-3.6 3.5.9 5L10 14.4 5.5 16.7l.9-5L2.8 8.2l5-.7L10 3z"/></svg>;
    case 'star-fill': return <svg {...p} fill="currentColor" stroke="none"><path d="M10 3l2.2 4.5 5 .7-3.6 3.5.9 5L10 14.4 5.5 16.7l.9-5L2.8 8.2l5-.7L10 3z"/></svg>;
    case 'qr': return <svg {...p}><rect x="3" y="3" width="5" height="5"/><rect x="12" y="3" width="5" height="5"/><rect x="3" y="12" width="5" height="5"/><path d="M12 12h2v2h-2zM16 12h1M12 16h1M16 14v3"/></svg>;
    case 'alert': return <svg {...p}><path d="M10 3l8 14H2L10 3z"/><path d="M10 8v4M10 14.5v.01"/></svg>;
    case 'info': return <svg {...p}><circle cx="10" cy="10" r="7"/><path d="M10 9v5M10 6.5v.01"/></svg>;
    case 'wifi-off': return <svg {...p}><path d="M3 8a11 11 0 0114-1M5.5 11.5a7 7 0 018-.5M9 14a3 3 0 012-.5M2 2l16 16"/></svg>;
    case 'location-off': return <svg {...p}><path d="M10 18s-6-5.5-6-10a6 6 0 015-5.9M14 4.6a6 6 0 012 4.4c0 4.5-6 9-6 9M2 2l16 16"/></svg>;
    case 'apple-pay': return <svg width={size*2.2} height={size} viewBox="0 0 44 20" fill="currentColor"><text x="0" y="15" fontFamily="-apple-system,system-ui" fontWeight="600" fontSize="14">Pay</text><path d="M0 7.5c.5-.4 1.2-.5 1.6 0M0 7.5c0-1.5 1-2.5 2-2.5M3 5.5c-.3-.5-.8-.6-1.2-.5" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>;
    case 'globe': return <svg {...p}><circle cx="10" cy="10" r="7"/><path d="M3 10h14M10 3a10 10 0 010 14M10 3a10 10 0 000 14"/></svg>;
    case 'bell': return <svg {...p}><path d="M5 14V9a5 5 0 1110 0v5l1 2H4l1-2zM8 17a2 2 0 004 0"/></svg>;
    case 'sun': return <svg {...p}><circle cx="10" cy="10" r="3"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4 4l1.5 1.5M14.5 14.5L16 16M16 4l-1.5 1.5M5.5 14.5L4 16"/></svg>;
    case 'route': return <svg {...p}><circle cx="5" cy="5" r="2"/><circle cx="15" cy="15" r="2"/><path d="M7 5h5a3 3 0 010 6H8a3 3 0 000 6h5"/></svg>;
    case 'gps': return <svg {...p}><circle cx="10" cy="10" r="3"/><circle cx="10" cy="10" r="7"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2"/></svg>;
    case 'battery': return <svg {...p}><rect x="2" y="6" width="14" height="8" rx="1.5"/><rect x="3.5" y="7.5" width="9" height="5" fill="currentColor" stroke="none"/><path d="M17 9v2"/></svg>;
    case 'pause': return <svg {...p} fill="currentColor" stroke="none"><rect x="5" y="4" width="3" height="12"/><rect x="12" y="4" width="3" height="12"/></svg>;
    case 'stop': return <svg {...p} fill="currentColor" stroke="none"><rect x="5" y="5" width="10" height="10" rx="1"/></svg>;
    case 'play': return <svg {...p} fill="currentColor" stroke="none"><path d="M6 4l10 6-10 6V4z"/></svg>;
    case 'scan': return <svg {...p}><path d="M4 7V5a1 1 0 011-1h2M13 4h2a1 1 0 011 1v2M16 13v2a1 1 0 01-1 1h-2M7 16H5a1 1 0 01-1-1v-2M3 10h14"/></svg>;
    case 'settings': return <svg {...p}><circle cx="10" cy="10" r="2.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4 4l1.5 1.5M14.5 14.5L16 16M16 4l-1.5 1.5M5.5 14.5L4 16"/></svg>;
    case 'eye': return <svg {...p}><path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z"/><circle cx="10" cy="10" r="2.5"/></svg>;
    case 'share': return <svg {...p}><path d="M10 3v10M6 7l4-4 4 4M4 13v3a1 1 0 001 1h10a1 1 0 001-1v-3"/></svg>;
    case 'brightness': return <svg {...p}><circle cx="10" cy="10" r="3.5" fill="currentColor" stroke="none"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4 4l1.5 1.5M14.5 14.5L16 16M16 4l-1.5 1.5M5.5 14.5L4 16"/></svg>;
    default: return null;
  }
}

// ── Chip (status, filter) ─────────────────────────────────────
function Chip({ children, tone = 'neutral', size = 'md', solid = false, style = {} }) {
  const tones = {
    neutral: { bg: 'rgba(20,17,14,.06)', fg: '#26211B', dot: '#8C8273' },
    ok: { bg: '#C9E1C7', fg: '#2F5E38', dot: '#2E7D45' },
    warn: { bg: '#F2DC9A', fg: '#7A5818', dot: '#D4A015' },
    err: { bg: '#F2C6BC', fg: '#7E2D1E', dot: '#C73E2A' },
    accent: { bg: '#FFD3BD', fg: '#7E2D1E', dot: '#FF5A1F' },
    ink: { bg: '#14110E', fg: '#ECE6D7', dot: '#FF5A1F' },
  };
  const t = tones[tone] || tones.neutral;
  const pad = size === 'sm' ? '2px 7px' : '4px 9px';
  const fs = size === 'sm' ? 10 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: solid ? t.dot : t.bg, color: solid ? '#fff' : t.fg,
      padding: pad, borderRadius: 999, fontSize: fs, fontWeight: 500,
      letterSpacing: '-0.005em', whiteSpace: 'nowrap',
      ...style,
    }}>{children}</span>
  );
}

// Status dot with text
function StatusDot({ tone = 'ok', children }) {
  const tones = { ok: '#2E7D45', warn: '#D4A015', err: '#C73E2A', neutral: '#8C8273', accent: '#FF5A1F' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#26211B', fontWeight: 500 }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: tones[tone] }} />
      {children}
    </span>
  );
}

// ── Line badge — código de línea (L1, L2…) ──────────────────
function LineBadge({ code, color, size = 'md' }) {
  const fs = size === 'sm' ? 11 : size === 'lg' ? 17 : 13;
  const dim = size === 'sm' ? 22 : size === 'lg' ? 36 : 28;
  return (
    <span style={{
      width: dim, height: dim, minWidth: dim, borderRadius: 8,
      background: color || '#14110E', color: '#ECE6D7',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--mono)', fontWeight: 600, fontSize: fs, letterSpacing: '-0.02em',
    }}>{code}</span>
  );
}

// ── Big button (CTA) ─────────────────────────────────────────
function Button({ children, variant = 'primary', size = 'md', full = true, icon, style = {} }) {
  const variants = {
    primary: { bg: '#14110E', fg: '#ECE6D7' },
    accent: { bg: '#FF5A1F', fg: '#F7F2E5' },
    ghost: { bg: 'transparent', fg: '#14110E', border: '1px solid rgba(20,17,14,.18)' },
    paper: { bg: '#F7F2E5', fg: '#14110E', border: '1px solid rgba(20,17,14,.10)' },
  };
  const v = variants[variant];
  const pad = size === 'lg' ? '14px 18px' : size === 'sm' ? '8px 12px' : '12px 16px';
  const fs = size === 'lg' ? 15 : size === 'sm' ? 12 : 13.5;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, width: full ? '100%' : 'auto',
      background: v.bg, color: v.fg, border: v.border || 'none',
      padding: pad, borderRadius: 12, fontSize: fs, fontWeight: 500,
      letterSpacing: '-0.005em', ...style,
    }}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </div>
  );
}

// ── Card / surface ───────────────────────────────────────────
function Card({ children, padding = 14, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 16,
      padding, border: '1px solid var(--rule)', ...style,
    }}>{children}</div>
  );
}

// ── Header with back chevron + title + trailing ─────────────
function NavHeader({ title, back = true, trailing, dark = false }) {
  const fg = dark ? '#ECE6D7' : '#14110E';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px 12px', color: fg }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 28 }}>
        {back && <Icon name="arrow-l" size={20} />}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</span>
      <div style={{ minWidth: 28, display: 'flex', justifyContent: 'flex-end' }}>{trailing}</div>
    </div>
  );
}

// ── Section title (eyebrow + h2) ─────────────────────────────
function SectionTitle({ eyebrow, title, trailing, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 16px 8px', ...style }}>
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 4 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: '-0.022em', lineHeight: 1.05 }}>{title}</h2>
      </div>
      {trailing}
    </div>
  );
}

// ── Display heading (urbano, Bricolage Grotesque) ────────────
function Display({ children, size = 28, italic = false, style = {} }) {
  const tracking = size > 60 ? '-0.035em' : size > 36 ? '-0.028em' : '-0.022em';
  return (
    <h1 style={{
      fontFamily: 'var(--display)', fontSize: size,
      fontWeight: italic ? 500 : 600,
      margin: 0, letterSpacing: tracking, lineHeight: 0.98,
      fontStyle: italic ? 'italic' : 'normal',
      fontVariationSettings: `"opsz" ${Math.min(96, Math.max(12, size))}`,
      ...style,
    }}>{children}</h1>
  );
}

// ── Search bar ───────────────────────────────────────────────
function SearchBar({ placeholder = 'Buscar', dark = false }) {
  const bg = dark ? 'rgba(255,250,240,.08)' : 'rgba(20,17,14,.06)';
  const fg = dark ? 'rgba(236,230,215,.55)' : 'rgba(20,17,14,.45)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: bg, padding: '10px 12px', borderRadius: 10,
      color: fg, fontSize: 13.5,
    }}>
      <Icon name="search" size={16} />
      <span>{placeholder}</span>
    </div>
  );
}

// ── Vehicle / line big number (editorial) ────────────────────
function BigNumeric({ value, label, color, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 26, fontWeight: 500, color: color || '#14110E', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 10, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>{label}</span>
    </div>
  );
}

Object.assign(window, { Icon, Chip, StatusDot, LineBadge, Button, Card, NavHeader, SectionTitle, Display, SearchBar, BigNumeric });
