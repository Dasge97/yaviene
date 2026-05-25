// TransitFlow — Pasajero · Ticket QR, Mis tickets

// ── Ticket digital ──────────────────────────────────────────
function ScreenTicket() {
  return (
    <Phone dark bg="#0E0C0A">
      <NavHeader title="" dark trailing={<div style={{ display: 'flex', gap: 8 }}><Icon name="brightness" size={18} stroke="#ECE6D7" /><Icon name="share" size={18} stroke="#ECE6D7" /></div>} />

      <div style={{ padding: '0 22px', color: '#ECE6D7', display: 'flex', flexDirection: 'column', height: 'calc(100% - 60px)' }}>
        <div className="eyebrow" style={{ color: '#FF5A1F' }}>Villa Norte · billete</div>
        <Display size={26} style={{ marginTop: 6, color: '#ECE6D7' }}>Billete <i>diario</i></Display>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <Chip tone="ok" solid size="sm">Válido</Chip>
          <span style={{ fontSize: 11.5, color: 'rgba(236,230,215,.65)' }}>todas las líneas · expira mañana 03:00</span>
        </div>

        {/* QR card */}
        <div style={{
          marginTop: 18, background: '#F7F2E5', borderRadius: 18, padding: 18,
          position: 'relative', color: '#14110E',
        }}>
          {/* QR */}
          <div style={{ aspectRatio: '1', width: '100%', position: 'relative' }}>
            <QRArt />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: 8, background: '#14110E', color: '#FF5A1F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 22 }}>T</div>
          </div>

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="eyebrow">Código público</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 19, fontWeight: 500, letterSpacing: '0.06em', marginTop: 2 }}>XF7-402</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="eyebrow">Precio</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 16, marginTop: 2 }}>4,00 €</div>
            </div>
          </div>
        </div>

        {/* meta strip */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 11.5 }}>
          <Meta dark label="desde" value="hoy 08:14" />
          <Meta dark label="hasta" value="mañana 03:00" />
          <Meta dark label="alcance" value="Todas las líneas" />
          <Meta dark label="organización" value="Villa Norte" />
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'rgba(236,230,215,.55)', fontSize: 11 }}>
          <Icon name="info" size={12} /> Validación requiere conexión al subir
        </div>
      </div>
    </Phone>
  );
}

function Meta({ label, value, dark }) {
  return (
    <div style={{ background: dark ? 'rgba(236,230,215,.04)' : 'var(--surface)', border: `1px solid ${dark ? 'rgba(236,230,215,.08)' : 'var(--rule)'}`, borderRadius: 10, padding: '8px 10px' }}>
      <div className="eyebrow" style={{ color: dark ? 'rgba(236,230,215,.55)' : 'var(--ink-soft)' }}>{label}</div>
      <div style={{ fontSize: 12.5, fontWeight: 500, marginTop: 2, color: dark ? '#ECE6D7' : '#14110E' }}>{value}</div>
    </div>
  );
}

// Stable pseudo-random QR pattern
function QRArt({ size = 220, modules = 29, fg = '#14110E' }) {
  const cells = [];
  // seeded hash so render is deterministic across reruns
  let seed = 7;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      // skip finder areas
      const inFinder = (x < 7 && y < 7) || (x >= modules-7 && y < 7) || (x < 7 && y >= modules-7);
      if (inFinder) continue;
      if (rand() > 0.55) cells.push([x, y]);
    }
  }
  const cell = size / modules;
  const finder = (x, y) => (
    <g key={`f${x}${y}`} transform={`translate(${x*cell},${y*cell})`}>
      <rect width={7*cell} height={7*cell} fill={fg} rx={cell} />
      <rect x={cell} y={cell} width={5*cell} height={5*cell} fill="#F7F2E5" rx={cell*.6} />
      <rect x={2*cell} y={2*cell} width={3*cell} height={3*cell} fill={fg} rx={cell*.4} />
    </g>
  );
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill="#F7F2E5" />
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x*cell} y={y*cell} width={cell*.92} height={cell*.92} fill={fg} rx={cell*.18} />)}
      {finder(0, 0)}
      {finder(modules-7, 0)}
      {finder(0, modules-7)}
    </svg>
  );
}

// Ticket usado/caducado state
function ScreenTicketUsed({ state = 'used' }) {
  const cfg = state === 'used'
    ? { label: 'Usado', tone: 'neutral', overlay: '✓', sub: 'validado hoy a las 08:46' }
    : { label: 'Caducado', tone: 'err', overlay: '×', sub: 'expiró ayer a las 19:02' };
  return (
    <Phone dark bg="#0E0C0A">
      <NavHeader title="" dark />
      <div style={{ padding: '0 22px', color: '#ECE6D7' }}>
        <div className="eyebrow" style={{ color: state === 'used' ? '#8C8273' : '#C73E2A' }}>{state === 'used' ? 'Ya validado' : 'No utilizable'}</div>
        <Display size={26} style={{ marginTop: 6, color: '#ECE6D7' }}>Billete <i>sencillo</i></Display>
        <div style={{ marginTop: 8 }}><Chip tone={cfg.tone} solid size="sm">{cfg.label}</Chip></div>

        <div style={{ marginTop: 18, background: '#F7F2E5', borderRadius: 18, padding: 18, position: 'relative', color: '#14110E' }}>
          <div style={{ aspectRatio: 1, position: 'relative', filter: 'grayscale(1)', opacity: .6 }}>
            <QRArt />
          </div>
          {/* stamp overlay */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              transform: 'rotate(-12deg)',
              padding: '12px 26px',
              border: `3px solid ${state === 'used' ? '#5C544A' : '#C73E2A'}`,
              color: state === 'used' ? '#5C544A' : '#C73E2A',
              fontFamily: 'var(--display)', fontSize: 30, letterSpacing: '0.04em',
              background: 'rgba(247,242,229,.85)',
            }}>{state === 'used' ? 'USADO' : 'CADUCADO'}</div>
          </div>
        </div>
        <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11.5, color: 'rgba(236,230,215,.55)' }}>{cfg.sub}</div>
      </div>
    </Phone>
  );
}

// ── Mis tickets ──────────────────────────────────────────────
function ScreenMyTickets() {
  return (
    <Phone>
      <div style={{ padding: '50px 18px 0' }}>
        <div className="eyebrow">guardados en este dispositivo</div>
        <Display size={26} style={{ marginTop: 4 }}>Mis tickets</Display>

        <div style={{ display: 'flex', gap: 6, marginTop: 14, marginBottom: 14, overflow: 'hidden' }}>
          {[['Activos', '1', true], ['Usados', '4'], ['Caducados', '2']].map(([t, n, on], i) => (
            <span key={i} style={{
              padding: '6px 11px', borderRadius: 99, fontSize: 11.5, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: on ? '#14110E' : 'transparent', color: on ? '#ECE6D7' : '#14110E',
              border: on ? 'none' : '1px solid var(--rule-2)',
            }}>{t} <span style={{ fontFamily: 'var(--mono)', opacity: .6 }}>{n}</span></span>
          ))}
        </div>

        {/* active highlight */}
        <div style={{ background: '#14110E', color: '#ECE6D7', borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: 99, background: 'rgba(255,90,31,.18)' }} />
          <div className="eyebrow" style={{ color: '#FF5A1F' }}>Activo · todas las líneas</div>
          <Display size={22} style={{ marginTop: 6, color: '#ECE6D7' }}>Billete <i>diario</i></Display>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <div style={{ fontSize: 11, color: 'rgba(236,230,215,.6)' }}>caduca mañana 03:00 · 4,00 €</div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F7F2E5', color: '#14110E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="qr" size={20} /></div>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Historial</div>
          {MY_TICKETS.slice(1).map((t) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--rule)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: t.status === 'expired' ? .5 : 1 }}>
                <Icon name="ticket" size={16} stroke={t.status === 'expired' ? '#8C8273' : '#14110E'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{t.kind}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 1 }}>{t.from} · {t.price}</div>
              </div>
              <Chip tone={t.status === 'used' ? 'neutral' : 'err'} size="sm">{t.status === 'used' ? 'usado' : 'caducado'}</Chip>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: 12, background: 'var(--surface)', border: '1px dashed var(--rule-2)', borderRadius: 12, fontSize: 11.5, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="info" size={14} />
            <span>Sin cuenta: tus tickets se guardan aquí. Activa enlace de recuperación en <u>Ajustes</u>.</span>
          </div>
        </div>
      </div>
      <TabBar active="buy" />
    </Phone>
  );
}

Object.assign(window, { ScreenTicket, ScreenTicketUsed, ScreenMyTickets, QRArt });
