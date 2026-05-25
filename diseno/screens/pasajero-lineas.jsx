// TransitFlow — Pasajero · Listado de líneas, detalle de línea, paradas cercanas

function ScreenLines() {
  return (
    <Phone>
      <div style={{ padding: '50px 18px 0' }}>
        <div className="eyebrow">Villa Norte · 6 líneas</div>
        <Display size={26} style={{ marginTop: 4 }}>Líneas</Display>

        <div style={{ marginTop: 14, marginBottom: 12 }}><SearchBar placeholder="L1, Universidad, Mercado…" /></div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflow: 'hidden' }}>
          {[['Todas', true], ['Activas', false], ['Avisos', false], ['Favoritas', false]].map(([t, on], i) => (
            <span key={i} style={{
              padding: '6px 11px', borderRadius: 99, fontSize: 11.5, fontWeight: 500,
              background: on ? '#14110E' : 'transparent', color: on ? '#ECE6D7' : '#14110E',
              border: on ? 'none' : '1px solid var(--rule-2)',
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LINES.slice(0, 5).map((l) => (
            <div key={l.code} style={{
              background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <LineBadge code={l.code} color={l.color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.005em' }}>{l.name}</span>
                  {l.alert && <Icon name="alert" size={12} stroke="#D4A015" />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, fontSize: 11, color: 'var(--ink-soft)' }}>
                  <span>{l.dirA}</span>
                  {l.status === 'ok' && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="dot" style={{ background: '#2E7D45' }} />{l.vehicles} en servicio</span>}
                  {l.status === 'warn' && <span style={{ color: '#7A5818', display: 'flex', alignItems: 'center', gap: 4 }}><span className="dot" style={{ background: '#D4A015' }} />{l.alert}</span>}
                  {l.status === 'off' && <span style={{ color: 'var(--ink-mute)' }}>{l.freq}</span>}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, color: l.status === 'off' ? 'var(--ink-mute)' : '#14110E' }}>{l.next}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{l.status === 'off' ? '' : 'próxima'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="lines" />
    </Phone>
  );
}

function ScreenLineDetail() {
  const stops = [
    ['Plaza Mayor', '0142', '2 min', true],
    ['Mercado', '0103', '4 min', false, 'alert'],
    ['Estación Central', '0287', '7 min'],
    ['Hospital Norte', '0512', '11 min'],
    ['Universidad', '0451', '14 min'],
    ['Parque Sur', '0098', '17 min'],
  ];
  return (
    <Phone>
      <NavHeader title="" trailing={<Icon name="star-fill" size={18} stroke="#FF5A1F" fill="#FF5A1F" />} />
      <div style={{ padding: '0 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LineBadge code="L1" color="#FF5A1F" size="lg" />
          <div style={{ flex: 1 }}>
            <Display size={22}>Centro <i>– Estación</i></Display>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 4 }}>4 vehículos · cada 8 min · primera 06:00 · última 23:30</div>
          </div>
        </div>

        {/* segmented */}
        <div style={{ display: 'flex', background: 'var(--paper-2)', borderRadius: 10, padding: 3, marginTop: 14 }}>
          {['Ida', 'Vuelta'].map((t, i) => (
            <span key={t} style={{
              flex: 1, textAlign: 'center', padding: '6px 8px', borderRadius: 8,
              fontSize: 12.5, fontWeight: 500, background: i === 0 ? '#F7F2E5' : 'transparent',
              boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,.06)' : 'none',
            }}>{t === 'Ida' ? '→ Estación Central' : '← Plaza Mayor'}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Button variant="ghost" size="sm" icon="map">Ver en mapa</Button>
          <Button variant="primary" size="sm" icon="ticket">Comprar L1</Button>
        </div>

        <div style={{ marginTop: 16 }} className="eyebrow">Recorrido · 14 paradas</div>
        <div style={{ marginTop: 8, paddingBottom: 24 }}>
          {stops.map(([n, c, eta, on, kind], i, a) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
              <div style={{ width: 16, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: on ? 12 : 9, height: on ? 12 : 9, borderRadius: 99, background: on ? '#FF5A1F' : '#14110E', border: on ? '2px solid #F7F2E5' : 'none', boxShadow: on ? '0 0 0 2px #FF5A1F' : 'none' }} />
                {i < a.length - 1 && <div style={{ position: 'absolute', top: on ? 14 : 11, width: 2, height: 18, background: '#FF5A1F', opacity: kind === 'alert' && i === 1 ? 0.3 : 1 }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: on ? 600 : 500 }}>{n}</span>
                  {kind === 'alert' && <Chip tone="warn" size="sm">aviso</Chip>}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 1 }}>{c}</div>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: on ? '#FF5A1F' : 'var(--ink-soft)' }}>{eta}</span>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

function ScreenStopsNear() {
  return (
    <Phone>
      <div style={{ padding: '50px 18px 0' }}>
        <div className="eyebrow">Cerca de ti · 6 paradas</div>
        <Display size={26} style={{ marginTop: 4 }}>Paradas</Display>

        <div style={{ marginTop: 14, marginBottom: 12 }}><SearchBar placeholder="Buscar parada" /></div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 12, fontSize: 11.5 }}>
          <span style={{ padding: '5px 10px', borderRadius: 99, background: '#14110E', color: '#ECE6D7', fontWeight: 500 }}>Por cercanía</span>
          <span style={{ padding: '5px 10px', borderRadius: 99, border: '1px solid var(--rule-2)', fontWeight: 500 }}>A–Z</span>
          <span style={{ padding: '5px 10px', borderRadius: 99, border: '1px solid var(--rule-2)', fontWeight: 500 }}>Favoritas</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--rule)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--rule)' }}>
          {STOPS.map((s) => (
            <div key={s.code} style={{ background: 'var(--surface)', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--paper-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="pin-fill" size={14} stroke="#1F6FEB" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s.name}</span>
                    {s.alert && <Icon name="alert" size={11} stroke="#D4A015" />}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--mono)' }}>{s.dist}</span>
                    <span>·</span>
                    <div style={{ display: 'flex', gap: 3 }}>{s.lines.map((l) => <LineBadge key={l} code={l} color={l === 'L1' ? '#FF5A1F' : l === 'L2' ? '#1F6FEB' : l === 'L3' ? '#2E7D45' : l === 'L4' ? '#D4A015' : '#1A2542'} size="sm" />)}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: s.next === '—' ? 'var(--ink-mute)' : '#14110E' }}>{s.next}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{s.next === '—' ? 'sin servicio' : 'próx.'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="lines" />
    </Phone>
  );
}

Object.assign(window, { ScreenLines, ScreenLineDetail, ScreenStopsNear });
