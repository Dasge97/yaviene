// TransitFlow — Pasajero · Mapa en vivo y sheets de vehículo/parada

function ScreenMap() {
  return (
    <Phone dark bg="#0E0C0A">
      {/* full bleed map */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <MapBase dark w={320} h={680} />
      </div>

      {/* Top floating chrome */}
      <div style={{ position: 'absolute', top: 50, left: 12, right: 12, display: 'flex', gap: 8, zIndex: 10 }}>
        <div style={{ flex: 1, background: 'rgba(14,12,10,.7)', backdropFilter: 'blur(14px)', border: '1px solid rgba(236,230,215,.12)', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="search" size={16} stroke="rgba(236,230,215,.55)" />
          <span style={{ fontSize: 12.5, color: 'rgba(236,230,215,.55)' }}>Buscar parada o línea</span>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(14,12,10,.7)', backdropFilter: 'blur(14px)', border: '1px solid rgba(236,230,215,.12)', color: '#ECE6D7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="lines" size={18} />
        </div>
      </div>

      {/* Line filter chips */}
      <div style={{ position: 'absolute', top: 100, left: 12, right: 12, display: 'flex', gap: 6, overflow: 'hidden', zIndex: 10 }}>
        {['Todas', 'L1', 'L2', 'L3', 'L4'].map((l, i) => (
          <span key={l} style={{
            padding: '5px 10px', borderRadius: 99, fontSize: 11.5, fontWeight: 500,
            background: i === 0 ? '#FF5A1F' : 'rgba(14,12,10,.7)', color: i === 0 ? '#F7F2E5' : '#ECE6D7',
            border: i === 0 ? 'none' : '1px solid rgba(236,230,215,.12)',
            backdropFilter: 'blur(14px)',
          }}>{l}</span>
        ))}
      </div>

      {/* My location / layers buttons */}
      <div style={{ position: 'absolute', bottom: 240, right: 12, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 10 }}>
        <CircleBtn dark icon="gps" />
        <CircleBtn dark icon="route" />
      </div>

      {/* Bottom sheet — preview bus */}
      <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, padding: '0 10px', zIndex: 10 }}>
        <div style={{ background: '#1B1813', border: '1px solid rgba(236,230,215,.10)', borderRadius: 16, padding: 14, color: '#ECE6D7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <LineBadge code="L1" color="#FF5A1F" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Bus 12 → Estación Central</div>
              <div style={{ fontSize: 11, color: 'rgba(236,230,215,.55)' }}>Próxima parada · Plaza Mayor</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, color: '#FF5A1F' }}>2 min</div>
              <div style={{ fontSize: 10, color: 'rgba(236,230,215,.45)' }}>hace 8s</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <StatusDot tone="ok">En ruta</StatusDot>
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'rgba(236,230,215,.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
              Ver detalle <Icon name="chev-r" size={14} />
            </span>
          </div>
        </div>
      </div>

      <TabBar active="map" dark />
    </Phone>
  );
}

function CircleBtn({ dark, icon }) {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 12,
      background: dark ? 'rgba(14,12,10,.75)' : 'rgba(247,242,229,.85)',
      backdropFilter: 'blur(14px)',
      border: dark ? '1px solid rgba(236,230,215,.12)' : '1px solid rgba(20,17,14,.10)',
      color: dark ? '#ECE6D7' : '#14110E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}><Icon name={icon} size={18} /></div>
  );
}

// ── Detalle vehículo (sheet full) ────────────────────────────
function ScreenVehicleDetail() {
  return (
    <Phone dark bg="#0E0C0A">
      <div style={{ position: 'absolute', inset: 0 }}>
        <MapBase dark w={320} h={400} focusLine="L1" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, transparent 30%, rgba(14,12,10,.95) 60%)' }} />
      </div>

      <NavHeader title="Bus 12" dark trailing={<Icon name="star" size={18} stroke="#ECE6D7" />} />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#1B1813', borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: '12px 18px 100px', color: '#ECE6D7', maxHeight: '60%', overflow: 'hidden' }}>
        <div style={{ width: 36, height: 4, background: 'rgba(236,230,215,.2)', borderRadius: 2, margin: '0 auto 14px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <LineBadge code="L1" color="#FF5A1F" size="lg" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, lineHeight: 1.05 }}>Centro – <i>Estación</i></div>
            <div style={{ fontSize: 12, color: 'rgba(236,230,215,.6)', marginTop: 2 }}>Dirección: Estación Central</div>
          </div>
          <StatusDot tone="ok">En ruta</StatusDot>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '12px 0', borderTop: '1px solid rgba(236,230,215,.1)', borderBottom: '1px solid rgba(236,230,215,.1)', marginBottom: 14 }}>
          <BigNumeric value="2 min" label="próxima" color="#FF5A1F" />
          <BigNumeric value="0.4 km" label="distancia" color="#ECE6D7" />
          <BigNumeric value="8 s" label="actualizado" color="#ECE6D7" />
        </div>

        <div className="eyebrow" style={{ color: 'rgba(236,230,215,.55)', marginBottom: 8 }}>Próximas paradas</div>
        {[
          ['Plaza Mayor', '2 min', true],
          ['Mercado', '5 min'],
          ['Hospital Norte', '11 min'],
          ['Universidad', '14 min'],
        ].map(([n, t, on], i, a) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0' }}>
            <div style={{ width: 16, display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 9, height: 9, borderRadius: 99, background: on ? '#FF5A1F' : '#ECE6D7', border: on ? '2px solid #F7F2E5' : 'none' }} />
              {i < a.length - 1 && <div style={{ position: 'absolute', top: 12, width: 1.5, height: 18, background: 'rgba(236,230,215,.25)' }} />}
            </div>
            <span style={{ flex: 1, fontSize: 13, fontWeight: on ? 600 : 400 }}>{n}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: on ? '#FF5A1F' : 'rgba(236,230,215,.55)' }}>{t}</span>
          </div>
        ))}
      </div>
    </Phone>
  );
}

// ── Detalle parada (sheet) ───────────────────────────────────
function ScreenStopDetail() {
  return (
    <Phone>
      {/* small map header */}
      <div style={{ position: 'relative', height: 180 }}>
        <MapBase w={320} h={180} showUser={false} vehicles={false} focusLine="L3" />
        <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div style={{ width: 18, height: 18, borderRadius: 99, background: '#14110E', border: '3px solid #F7F2E5', boxShadow: '0 2px 8px rgba(0,0,0,.3)' }} />
        </div>
      </div>

      <NavHeader title="Parada" trailing={<Icon name="star-fill" size={18} stroke="#FF5A1F" fill="#FF5A1F" />} />

      <div style={{ padding: '0 18px', marginTop: -6 }}>
        <div className="eyebrow">parada 0142</div>
        <Display size={26} style={{ marginTop: 4 }}>Plaza Mayor</Display>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>90 m · accesible</span>
          <Chip tone="ok" size="sm">Operativa</Chip>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, marginBottom: 16 }}>
          <Button variant="primary" size="sm" icon="route">Cómo llegar</Button>
          <Button variant="ghost" size="sm" icon="ticket">Comprar</Button>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>Próximas llegadas</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            ['L1', '#FF5A1F', 'Estación Central', '2 min'],
            ['L1', '#FF5A1F', 'Estación Central', '10 min'],
            ['L3', '#2E7D45', 'Sentido horario', '4 min'],
            ['N1', '#1A2542', 'Plaza Mayor', '22:30'],
          ].map(([code, c, to, eta], i, a) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: i < a.length-1 ? '1px solid var(--rule)' : 'none' }}>
              <LineBadge code={code} color={c} size="sm" />
              <div style={{ flex: 1, fontSize: 12.5 }}>
                <div style={{ fontWeight: 500 }}>{to}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-soft)' }}>directo</div>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, color: '#14110E' }}>{eta}</span>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenMap, ScreenVehicleDetail, ScreenStopDetail });
