// TransitFlow — Pasajero · Avisos, Favoritos, Ajustes/Perfil, Notificaciones

function ScreenAlerts() {
  return (
    <Phone>
      <div style={{ padding: '50px 18px 0' }}>
        <div className="eyebrow">Villa Norte · {ALERTS.length} activos</div>
        <Display size={26} style={{ marginTop: 4 }}>Avisos</Display>

        <div style={{ display: 'flex', gap: 6, marginTop: 14, marginBottom: 12 }}>
          {['Todos', 'Mis líneas', 'Severidad'].map((t, i) => (
            <span key={t} style={{ padding: '5px 10px', borderRadius: 99, fontSize: 11.5, fontWeight: 500, background: i === 0 ? '#14110E' : 'transparent', color: i === 0 ? '#ECE6D7' : '#14110E', border: i === 0 ? 'none' : '1px solid var(--rule-2)' }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ALERTS.map((a) => {
            const sevTone = a.severity === 'high' ? 'err' : a.severity === 'med' ? 'warn' : 'neutral';
            const accent = a.severity === 'high' ? '#C73E2A' : a.severity === 'med' ? '#D4A015' : '#5C544A';
            return (
              <div key={a.title} style={{
                background: 'var(--surface)', borderLeft: `3px solid ${accent}`, borderTop: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
                borderRadius: '4px 14px 14px 4px', padding: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Chip tone={sevTone} size="sm">{a.type === 'traffic' ? 'Tráfico' : a.type === 'maintenance' ? 'Mantenimiento' : 'Aviso'}</Chip>
                  {a.line !== 'Todas' && <LineBadge code={a.line} color={a.line === 'L2' ? '#1F6FEB' : a.line === 'L4' ? '#D4A015' : '#FF5A1F'} size="sm" />}
                  <span style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>desde {a.since}</span>
                </div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 17, fontStyle: a.severity === 'high' ? 'italic' : 'normal', lineHeight: 1.15, color: '#14110E' }}>{a.title}</div>
                <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '6px 0 0', lineHeight: 1.45 }}>{a.desc}</p>
                {a.stops.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--ink-soft)' }}>
                    <Icon name="pin" size={12} /> {a.stops.join(' · ')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Phone>
  );
}

function ScreenFavorites() {
  return (
    <Phone>
      <div style={{ padding: '50px 18px 0' }}>
        <Display size={26}>Favoritos</Display>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 6 }}>Guardados en este dispositivo. Sincronizan si inicias sesión.</p>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Organización habitual</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FF5A1F', color: '#F7F2E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 20 }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Ayuntamiento de Villa Norte</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Transporte municipal</div>
            </div>
            <Icon name="star-fill" size={18} stroke="#FF5A1F" fill="#FF5A1F" />
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Líneas · 3</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
            {[
              ['L1', '#FF5A1F', 'Centro – Estación', 'próx. 2 min'],
              ['L3', '#2E7D45', 'Circular', 'próx. 1 min'],
              ['L2', '#1F6FEB', 'Universidad – Hospital', 'aviso · +4 min'],
            ].map(([c, col, n, m], i, a) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < a.length-1 ? '1px solid var(--rule)' : 'none' }}>
                <LineBadge code={c} color={col} size="sm" />
                <div style={{ flex: 1, fontSize: 12.5, fontWeight: 500 }}>{n}</div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: m.includes('aviso') ? '#7A5818' : 'var(--ink-soft)' }}>{m}</span>
                <Icon name="star-fill" size={14} stroke="#FF5A1F" fill="#FF5A1F" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Paradas · 2</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
            {[
              ['Plaza Mayor', '0142', '90 m'],
              ['Universidad', '0451', '720 m'],
            ].map(([n, c, d], i, a) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < a.length-1 ? '1px solid var(--rule)' : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--paper-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="pin-fill" size={12} stroke="#1F6FEB" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{n}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-soft)' }}>{c} · {d}</div>
                </div>
                <Icon name="star-fill" size={14} stroke="#FF5A1F" fill="#FF5A1F" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Phone>
  );
}

function ScreenSettings() {
  const groups = [
    { title: 'Servicio', items: [
      ['Organización', 'Villa Norte', 'chev-r'],
      ['Idioma', 'Español', 'chev-r'],
      ['Permisos de ubicación', 'Al usar la app', 'chev-r'],
    ]},
    { title: 'Tickets', items: [
      ['Recuperación de tickets', 'Por enlace', 'chev-r'],
      ['Métodos de pago', '1 tarjeta · Apple Pay', 'chev-r'],
    ]},
    { title: 'Notificaciones', items: [
      ['Avisos de líneas favoritas', 'Activadas', 'chev-r'],
      ['Llegada de bus próximo', 'Activada', 'chev-r'],
      ['Cambios del servicio', 'Desactivada', 'chev-r'],
    ]},
    { title: 'Sobre', items: [
      ['Ayuda y soporte', '', 'chev-r'],
      ['Términos y privacidad', '', 'chev-r'],
      ['Versión', '1.2.0 · build 4421', null],
    ]},
  ];
  return (
    <Phone>
      <div style={{ padding: '50px 18px 0' }}>
        <Display size={26}>Ajustes</Display>

        <div style={{ marginTop: 18, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 22, color: 'var(--orange)' }}>—</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Estás usando la app sin cuenta</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 2 }}>Inicia sesión para recuperar tus tickets en otro dispositivo.</div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}><Button variant="ghost" size="md">Iniciar sesión <Icon name="arrow-r" size={14} /></Button></div>

        <div style={{ marginTop: 20 }}>
          {groups.map((g) => (
            <div key={g.title} style={{ marginBottom: 18 }}>
              <div className="eyebrow" style={{ padding: '0 4px 6px' }}>{g.title}</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
                {g.items.map(([k, v, ic], i) => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', padding: '11px 14px', borderBottom: i < g.items.length-1 ? '1px solid var(--rule)' : 'none', gap: 10 }}>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{v}</span>
                    {ic && <Icon name={ic} size={14} stroke="#8C8273" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenAlerts, ScreenFavorites, ScreenSettings });
