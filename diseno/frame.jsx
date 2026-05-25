// TransitFlow — phone frame, status bar, tab bar, sheet primitives.
// Width 320 / Height 680. Cream paper base; supports dark mode for map/ticket.

const PHONE_W = 320;
const PHONE_H = 680;

function Phone({ children, dark = false, bg, time = '9:41', label, sublabel }) {
  const fg = dark ? '#ECE6D7' : '#14110E';
  const surface = bg || (dark ? '#0E0C0A' : '#ECE6D7');
  return (
    <div style={{
      width: PHONE_W, height: PHONE_H, position: 'relative',
      background: surface, color: fg,
      borderRadius: 38, overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(0,0,0,.08), 0 30px 60px -20px rgba(40,30,20,.25)',
      fontFamily: 'var(--sans)',
    }}>
      <StatusBar dark={dark} time={time} />
      <div style={{ position: 'absolute', inset: '44px 0 0 0', overflow: 'hidden' }}>
        {children}
      </div>
      <HomeIndicator dark={dark} />
      {label && <ScreenLabel label={label} sublabel={sublabel} />}
    </div>
  );
}

function StatusBar({ dark, time }) {
  const c = dark ? '#ECE6D7' : '#14110E';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 44,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 22px 0', zIndex: 30, pointerEvents: 'none',
    }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: c, letterSpacing: '-0.01em' }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="15" height="10" viewBox="0 0 15 10"><rect x="0" y="6" width="2.5" height="4" rx=".5" fill={c}/><rect x="3.8" y="4" width="2.5" height="6" rx=".5" fill={c}/><rect x="7.6" y="2" width="2.5" height="8" rx=".5" fill={c}/><rect x="11.4" y="0" width="2.5" height="10" rx=".5" fill={c}/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10"><path d="M7 8.5a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zm0-4.5c1.3 0 2.5.5 3.5 1.3l1-1A6 6 0 002.6 4.3l1 1c1-.8 2.1-1.3 3.4-1.3zm0-3.5c2.4 0 4.6 1 6.3 2.5l1-1A8 8 0 00.7 2l1 1A8 8 0 017 .5z" fill={c}/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10"><rect x=".5" y=".5" width="19" height="9" rx="2" stroke={c} fill="none" opacity=".4"/><rect x="2" y="2" width="13" height="6" rx="1" fill={c}/><rect x="20" y="3.5" width="1.2" height="3" rx=".4" fill={c} opacity=".4"/></svg>
      </div>
    </div>
  );
}

function HomeIndicator({ dark }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 22, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 6, zIndex: 30, pointerEvents: 'none' }}>
      <div style={{ width: 108, height: 4, borderRadius: 99, background: dark ? 'rgba(236,230,215,.7)' : 'rgba(20,17,14,.35)' }} />
    </div>
  );
}

function ScreenLabel({ label, sublabel }) {
  return null; // chrome moved to artboard label
}

// Tab bar — 5 slots for pasajero
function TabBar({ active = 'home', dark = false }) {
  const items = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'map', label: 'Mapa', icon: 'map' },
    { id: 'buy', label: 'Billete', icon: 'ticket' },
    { id: 'lines', label: 'Líneas', icon: 'lines' },
    { id: 'me', label: 'Más', icon: 'more' },
  ];
  const fg = dark ? '#ECE6D7' : '#14110E';
  const mute = dark ? 'rgba(236,230,215,.45)' : '#8C8273';
  const bg = dark ? 'rgba(14,12,10,.85)' : 'rgba(247,242,229,.92)';
  const border = dark ? 'rgba(255,250,240,.1)' : 'rgba(20,17,14,.10)';
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 72, paddingBottom: 22,
      background: bg, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderTop: `0.5px solid ${border}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 8,
      zIndex: 20,
    }}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <div key={it.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: on ? (dark ? '#FF5A1F' : '#FF5A1F') : mute, minWidth: 44 }}>
            <TabIcon name={it.icon} />
            <span style={{ fontSize: 10, fontWeight: on ? 600 : 500, letterSpacing: '-0.005em' }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function TabIcon({ name }) {
  const s = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home': return <svg {...s} viewBox="0 0 22 22"><path d="M3 10l8-6 8 6v9a1 1 0 01-1 1h-3v-6h-8v6H4a1 1 0 01-1-1v-9z"/></svg>;
    case 'map': return <svg {...s} viewBox="0 0 22 22"><path d="M3 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6zM8 4v14M14 6v14"/></svg>;
    case 'ticket': return <svg {...s} viewBox="0 0 22 22"><path d="M3 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4V8z"/><path d="M10 6v12"/></svg>;
    case 'lines': return <svg {...s} viewBox="0 0 22 22"><circle cx="6" cy="6" r="2"/><circle cx="16" cy="16" r="2"/><path d="M6 8v6a2 2 0 002 2h6"/></svg>;
    case 'more': return <svg {...s} viewBox="0 0 22 22"><circle cx="6" cy="11" r="1.4"/><circle cx="11" cy="11" r="1.4"/><circle cx="16" cy="11" r="1.4"/></svg>;
    default: return null;
  }
}

Object.assign(window, { Phone, StatusBar, HomeIndicator, TabBar, PHONE_W, PHONE_H });
