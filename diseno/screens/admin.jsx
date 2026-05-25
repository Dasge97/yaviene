// TransitFlow — Panel web admin (referencia opcional, 1280×760)

const ADMIN_W = 1280;
const ADMIN_H = 760;

function AdminFrame({ children, page = 'dashboard' }) {
  return (
    <div style={{ width: ADMIN_W, height: ADMIN_H, background: 'var(--paper)', display: 'flex', fontFamily: 'var(--sans)', color: 'var(--ink)' }}>
      <AdminSidebar active={page} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminTopbar page={page} />
        <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
      </div>
    </div>
  );
}

function AdminSidebar({ active }) {
  const items = [
    { id: 'dashboard', icon: 'home', label: 'Dashboard' },
    { id: 'map', icon: 'map', label: 'Mapa en vivo' },
    { id: 'lines', icon: 'lines', label: 'Líneas' },
    { id: 'stops', icon: 'pin', label: 'Paradas' },
    { id: 'vehicles', icon: 'bus', label: 'Vehículos' },
    { id: 'drivers', icon: 'qr', label: 'Conductores' },
    { id: 'incidents', icon: 'alert', label: 'Incidencias' },
    { id: 'tickets', icon: 'ticket', label: 'Tickets y pagos' },
    { id: 'analytics', icon: 'eye', label: 'Analíticas' },
  ];
  return (
    <aside style={{ width: 230, background: 'var(--surface-2)', borderRight: '1px solid var(--rule)', padding: '20px 14px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 8px 18px', borderBottom: '1px solid var(--rule)' }}>
        <div className="eyebrow" style={{ color: 'var(--orange)' }}>TransitFlow</div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 20, marginTop: 6 }}>Villa <i>Norte</i></div>
        <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>Transporte municipal</div>
      </div>
      <nav style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map((it) => {
          const on = it.id === active;
          return (
            <div key={it.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 8,
              background: on ? '#14110E' : 'transparent',
              color: on ? '#ECE6D7' : 'var(--ink)',
              fontSize: 13, fontWeight: on ? 600 : 500,
            }}>
              <Icon name={it.icon} size={16} />
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.id === 'incidents' && <span style={{ fontSize: 10, fontFamily: 'var(--mono)', padding: '1px 6px', borderRadius: 99, background: on ? '#FF5A1F' : '#FFD3BD', color: on ? '#F7F2E5' : '#7E2D1E' }}>2</span>}
            </div>
          );
        })}
      </nav>
      <div style={{ marginTop: 'auto', padding: '10px', borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 99, background: '#1F6FEB', color: '#F7F2E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 14 }}>R</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 500 }}>R. Pascual</div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-soft)' }}>Operador · Villa Norte</div>
        </div>
        <Icon name="settings" size={14} stroke="#8C8273" />
      </div>
    </aside>
  );
}

function AdminTopbar({ page }) {
  const titles = { dashboard: 'Resumen operativo', map: 'Mapa en vivo', tickets: 'Tickets y pagos' };
  return (
    <header style={{ height: 64, borderBottom: '1px solid var(--rule)', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, background: 'var(--paper)' }}>
      <div>
        <div className="eyebrow">{page === 'dashboard' ? 'Hoy · lun 25 may · 09:42' : page === 'map' ? 'Tiempo real · auto-refresh 5s' : 'Últimos 30 días'}</div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 22, marginTop: 2 }}>{titles[page]}</div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', border: '1px solid var(--rule)', borderRadius: 10, color: 'var(--ink-soft)', fontSize: 12.5, background: 'var(--surface)', minWidth: 280 }}>
        <Icon name="search" size={14} />
        <span>Buscar línea, parada, conductor, ticket…</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, padding: '1px 5px', border: '1px solid var(--rule)', borderRadius: 4 }}>⌘K</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Icon name="bell" size={16} />
          <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 99, background: '#FF5A1F' }} />
        </div>
        <Button variant="primary" size="sm" full={false} icon="plus">Nueva incidencia</Button>
      </div>
    </header>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────
function AdminDashboard() {
  return (
    <AdminFrame page="dashboard">
      <div style={{ padding: 28, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
          <Kpi label="En servicio" value="14" delta="+2" tone="ok" />
          <Kpi label="Detenidos" value="3" delta="" tone="warn" />
          <Kpi label="Sin conexión" value="1" delta="" tone="err" />
          <Kpi label="Incidencias" value="2" delta="abiertas" tone="warn" />
          <Kpi label="Validaciones" value="1.482" delta="+8%" tone="ok" />
          <Kpi label="Ingresos hoy" value="3.214 €" delta="+12%" tone="ok" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          {/* Live map block */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, padding: 18, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div className="eyebrow">Operativo en vivo</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 22, marginTop: 4 }}>Flota <i>Villa Norte</i></div>
              </div>
              <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
                <Legend dot="#2E7D45" label="En ruta · 14" />
                <Legend dot="#D4A015" label="Detenido · 3" />
                <Legend dot="#C73E2A" label="Sin conex. · 1" />
              </div>
            </div>
            <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', position: 'relative', border: '1px solid var(--rule)' }}>
              <MapBase w={720} h={360} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>

          {/* Right column: incidencias + validaciones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, padding: 16, flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div className="eyebrow">Incidencias abiertas · 2</div>
                <span style={{ fontSize: 11, color: 'var(--orange)' }}>Ver todas →</span>
              </div>
              {ALERTS.slice(0, 2).map((a) => {
                const tone = a.severity === 'high' ? '#C73E2A' : '#D4A015';
                return (
                  <div key={a.title} style={{ padding: '10px 0', borderBottom: '1px solid var(--rule)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 4, height: 16, borderRadius: 2, background: tone }} />
                      <LineBadge code={a.line} color={a.line === 'L2' ? '#1F6FEB' : '#D4A015'} size="sm" />
                      <span style={{ fontSize: 12.5, fontWeight: 600, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-soft)' }}>{a.since}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: '6px 0 0 18px' }}>{a.desc}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, padding: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Uso por línea · hoy</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['L1', '#FF5A1F', 432, 100],
                  ['L3', '#2E7D45', 318, 73],
                  ['L2', '#1F6FEB', 256, 59],
                  ['L4', '#D4A015', 138, 32],
                  ['L5', '#6B6360', 18, 4],
                ].map(([c, col, n, w]) => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5 }}>
                    <LineBadge code={c} color={col} size="sm" />
                    <div style={{ flex: 1, height: 6, background: 'var(--paper-2)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${w}%`, height: '100%', background: col, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', width: 36, textAlign: 'right' }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminFrame>
  );
}

function Kpi({ label, value, delta, tone }) {
  const tones = { ok: '#2E7D45', warn: '#D4A015', err: '#C73E2A', neutral: '#5C544A' };
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: '14px 16px' }}>
      <div className="eyebrow">{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 34, lineHeight: 1, fontWeight: 400 }}>{value}</div>
        {delta && <div style={{ fontSize: 11, color: tones[tone], fontFamily: 'var(--mono)', letterSpacing: '-0.02em' }}>{delta}</div>}
      </div>
    </div>
  );
}

function Legend({ dot, label }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--ink-soft)' }}><span style={{ width: 7, height: 7, borderRadius: 99, background: dot }} />{label}</span>;
}

// ── MAPA EN VIVO ─────────────────────────────────────────────
function AdminLiveMap() {
  return (
    <AdminFrame page="map">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* left vehicle list */}
        <div style={{ width: 340, borderRight: '1px solid var(--rule)', background: 'var(--surface-2)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--rule)' }}>
            <div className="eyebrow">Flota · 18 vehículos</div>
            <div style={{ marginTop: 10 }}><SearchBar placeholder="Filtrar línea, conductor, matrícula" /></div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {VEHICLES.concat(VEHICLES.slice(0,2)).map((v, i) => (
              <div key={i} style={{ padding: '11px 18px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 10, background: i === 0 ? '#F7F2E5' : 'transparent' }}>
                <LineBadge code={v.line} color={v.line === 'L1' ? '#FF5A1F' : v.line === 'L2' ? '#1F6FEB' : v.line === 'L3' ? '#2E7D45' : '#D4A015'} size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{v.id}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{v.to} · {v.updated}</div>
                </div>
                <StatusDot tone={v.status === 'ok' ? 'ok' : v.status === 'warn' ? 'warn' : 'err'}>{v.status === 'ok' ? 'OK' : v.status === 'warn' ? v.delay : 'OFF'}</StatusDot>
              </div>
            ))}
          </div>
        </div>
        {/* right map */}
        <div style={{ flex: 1, position: 'relative', background: '#DBD3BA' }}>
          <MapBase w={910} h={696} style={{ width: '100%', height: '100%' }} />
          {/* sticky controls */}
          <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', gap: 8 }}>
            <span style={{ padding: '7px 12px', background: '#F7F2E5', border: '1px solid var(--rule)', borderRadius: 10, fontSize: 12, fontWeight: 500 }}>Todas las líneas ▾</span>
            <span style={{ padding: '7px 12px', background: '#F7F2E5', border: '1px solid var(--rule)', borderRadius: 10, fontSize: 12, fontWeight: 500 }}>En ruta · Detenidos · Sin conexión</span>
            <span style={{ padding: '7px 12px', background: '#14110E', color: '#ECE6D7', borderRadius: 10, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="dot" style={{ background: '#FF5A1F' }} /> Auto-refresh 5s
            </span>
          </div>
        </div>
      </div>
    </AdminFrame>
  );
}

// ── TICKETS Y PAGOS (tabla) ──────────────────────────────────
function AdminTickets() {
  const rows = [
    ['XF7-402', 'Diario', 'Todas', '4,00 €', 'Tarjeta', 'Confirmado', 'hoy 08:14'],
    ['XF7-398', 'Sencillo', 'L1', '1,50 €', 'Apple Pay', 'Confirmado', 'hoy 08:11'],
    ['XF7-392', 'Sencillo', 'L3', '1,50 €', 'Tarjeta', 'Reembolsado', 'hoy 07:58'],
    ['XF7-388', 'Todas las líneas', 'Todas', '2,20 €', 'Google Pay', 'Confirmado', 'hoy 07:42'],
    ['XF7-384', 'Diario', 'Todas', '4,00 €', 'Tarjeta', 'Fallido', 'hoy 07:31'],
    ['XF7-378', 'Sencillo', 'L2', '1,50 €', 'Tarjeta', 'Confirmado', 'hoy 07:18'],
    ['XF7-374', 'Sencillo', 'L1', '1,50 €', 'Apple Pay', 'Confirmado', 'hoy 07:02'],
    ['XF7-369', 'Diario', 'Todas', '4,00 €', 'Tarjeta', 'Confirmado', 'hoy 06:48'],
  ];
  const tone = (s) => s === 'Confirmado' ? 'ok' : s === 'Fallido' ? 'err' : 'warn';
  return (
    <AdminFrame page="tickets">
      <div style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <Kpi label="Vendidos hoy" value="287" delta="+12%" tone="ok" />
          <Kpi label="Ingresos hoy" value="3.214 €" delta="+8%" tone="ok" />
          <Kpi label="Tasa de fallos" value="2,1%" delta="-0,4 pp" tone="ok" />
          <Kpi label="Reembolsos" value="4" delta="38,40 €" tone="warn" />
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid var(--rule)' }}>
            <div className="eyebrow">Últimos pagos</div>
            <div style={{ flex: 1 }} />
            {['Todos', 'Confirmado', 'Fallido', 'Reembolsado'].map((t, i) => (
              <span key={t} style={{ padding: '5px 10px', borderRadius: 99, fontSize: 11.5, fontWeight: 500, background: i === 0 ? '#14110E' : 'transparent', color: i === 0 ? '#ECE6D7' : 'var(--ink)', border: i === 0 ? 'none' : '1px solid var(--rule-2)' }}>{t}</span>
            ))}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Código', 'Tipo', 'Alcance', 'Importe', 'Método', 'Estado', 'Hora', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 18px', textAlign: 'left', fontWeight: 500, color: 'var(--ink-soft)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--rule)' }}>
                  <td style={{ padding: '11px 18px', fontFamily: 'var(--mono)', fontWeight: 500 }}>{r[0]}</td>
                  <td style={{ padding: '11px 18px' }}>{r[1]}</td>
                  <td style={{ padding: '11px 18px', color: 'var(--ink-soft)' }}>{r[2]}</td>
                  <td style={{ padding: '11px 18px', fontFamily: 'var(--mono)', fontWeight: 500 }}>{r[3]}</td>
                  <td style={{ padding: '11px 18px', color: 'var(--ink-soft)' }}>{r[4]}</td>
                  <td style={{ padding: '11px 18px' }}><Chip tone={tone(r[5])} size="sm">{r[5]}</Chip></td>
                  <td style={{ padding: '11px 18px', color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>{r[6]}</td>
                  <td style={{ padding: '11px 18px', textAlign: 'right' }}><Icon name="chev-r" size={14} stroke="#8C8273" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminFrame>
  );
}

Object.assign(window, { AdminDashboard, AdminLiveMap, AdminTickets, ADMIN_W, ADMIN_H });
