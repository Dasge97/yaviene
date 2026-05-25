// TransitFlow — Conductor · login, selección, servicio, escáner QR

function ScreenDriverLogin() {
  return (
    <Phone bg="#0E0C0A" dark>
      <div style={{ padding: '60px 22px 0', height: '100%', display: 'flex', flexDirection: 'column', color: '#ECE6D7' }}>
        <div className="eyebrow" style={{ color: '#FF5A1F' }}>TransitFlow · Conductor</div>
        <div style={{ marginTop: 70 }}>
          <Display size={32} style={{ color: '#ECE6D7' }}>Identifícate</Display>
          <Display size={32} italic style={{ color: '#FF5A1F', marginTop: 2 }}>para empezar.</Display>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(236,230,215,.6)', marginTop: 14, lineHeight: 1.5 }}>Necesitas tus credenciales de operador. Si no las tienes, contacta con tu cooperativa o empresa.</p>

        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Field dark label="Operador" value="Villa Norte · Conductores" lock />
          <Field dark label="Usuario" value="c.martinez" />
          <Field dark label="Contraseña" value="••••••••••" />
        </div>

        <div style={{ marginTop: 'auto', marginBottom: 50 }}>
          <Button variant="accent" size="lg">Acceder</Button>
          <div style={{ height: 8 }} />
          <div style={{ textAlign: 'center', fontSize: 11.5, color: 'rgba(236,230,215,.55)' }}>¿Has olvidado tu contraseña?</div>
        </div>
      </div>
    </Phone>
  );
}

function Field({ label, value, lock, dark }) {
  return (
    <div style={{
      background: dark ? 'rgba(255,250,240,.06)' : 'var(--surface)',
      border: `1px solid ${dark ? 'rgba(236,230,215,.10)' : 'var(--rule)'}`,
      borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: dark ? 'rgba(236,230,215,.5)' : 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: dark ? '#ECE6D7' : '#14110E', marginTop: 2 }}>{value}</div>
      </div>
      {lock && <Icon name="info" size={14} stroke={dark ? 'rgba(236,230,215,.4)' : '#8C8273'} />}
    </div>
  );
}

// Selección vehículo + línea
function ScreenDriverStart() {
  return (
    <Phone bg="#0E0C0A" dark>
      <NavHeader title="Iniciar servicio" dark trailing={<span style={{ fontSize: 11, color: 'rgba(236,230,215,.6)' }}>C. Martínez</span>} />
      <div style={{ padding: '0 22px', color: '#ECE6D7' }}>
        <div className="eyebrow" style={{ color: '#FF5A1F' }}>Paso 2 de 3</div>
        <Display size={24} style={{ marginTop: 6, color: '#ECE6D7' }}>Elige <i>vehículo</i> y línea</Display>

        <div className="eyebrow" style={{ color: 'rgba(236,230,215,.55)', marginTop: 22, marginBottom: 8 }}>Vehículo</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            ['Bus 12', 'Iveco · 2021', true],
            ['Bus 18', 'Iveco · 2020'],
            ['Bus 22', 'MAN · 2019'],
            ['Minibus 04', 'Mercedes · 2022'],
          ].map(([id, sub, on]) => (
            <div key={id} style={{
              background: on ? '#FF5A1F' : 'rgba(255,250,240,.06)',
              color: on ? '#F7F2E5' : '#ECE6D7',
              border: on ? 'none' : '1px solid rgba(236,230,215,.10)',
              borderRadius: 12, padding: '10px 12px',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{id}</div>
              <div style={{ fontSize: 10.5, color: on ? 'rgba(247,242,229,.7)' : 'rgba(236,230,215,.5)', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ color: 'rgba(236,230,215,.55)', marginTop: 22, marginBottom: 8 }}>Línea</div>
        <div style={{ background: 'rgba(255,250,240,.05)', border: '1px solid rgba(236,230,215,.1)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            ['L1', '#FF5A1F', 'Centro – Estación', 'Ida', true],
            ['L1', '#FF5A1F', 'Centro – Estación', 'Vuelta'],
            ['L4', '#D4A015', 'Polígono – Mercado', 'Circular'],
          ].map(([c, col, n, v, on], i, a) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: i < a.length-1 ? '1px solid rgba(236,230,215,.08)' : 'none', background: on ? 'rgba(255,90,31,.12)' : 'transparent' }}>
              <LineBadge code={c} color={col} size="sm" />
              <div style={{ flex: 1, fontSize: 12.5, fontWeight: 500 }}>{n}</div>
              <span style={{ fontSize: 11, color: 'rgba(236,230,215,.6)' }}>{v}</span>
              {on && <div style={{ width: 16, height: 16, borderRadius: 99, background: '#FF5A1F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={10} stroke="#F7F2E5" strokeWidth={2.5} /></div>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <Button variant="accent" size="lg" icon="play">Iniciar servicio</Button>
        </div>
      </div>
    </Phone>
  );
}

// Servicio en curso
function ScreenDriverService() {
  return (
    <Phone bg="#0E0C0A" dark>
      <div style={{ padding: '50px 18px 0', color: '#ECE6D7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Chip tone="ok" solid size="sm">EN SERVICIO</Chip>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(236,230,215,.55)' }}>desde 08:14 · 1h 22m</span>
        </div>

        <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <LineBadge code="L1" color="#FF5A1F" size="lg" />
          <div style={{ flex: 1 }}>
            <Display size={22} style={{ color: '#ECE6D7' }}>Centro <i>– Estación</i></Display>
            <div style={{ fontSize: 12, color: 'rgba(236,230,215,.6)', marginTop: 4 }}>Bus 12 · Iveco · sentido Estación</div>
          </div>
        </div>

        {/* status strip */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <StatusTile dark icon="gps" label="GPS" value="3.4 m" tone="ok" />
          <StatusTile dark icon="wifi-off" label="Conexión" value="4G · 28 ms" tone="ok" iconName="route" />
          <StatusTile dark icon="battery" label="Batería" value="68%" tone="ok" />
          <StatusTile dark icon="clock" label="Último envío" value="hace 3s" tone="ok" />
        </div>

        {/* current stop */}
        <div style={{ marginTop: 14, background: 'rgba(255,250,240,.05)', border: '1px solid rgba(236,230,215,.1)', borderRadius: 14, padding: 14 }}>
          <div className="eyebrow" style={{ color: 'rgba(236,230,215,.55)' }}>Próxima parada</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 99, background: '#FF5A1F', boxShadow: '0 0 0 3px rgba(255,90,31,.2)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Plaza Mayor</div>
              <div style={{ fontSize: 11, color: 'rgba(236,230,215,.55)' }}>0142 · 280 m</div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500, color: '#FF5A1F' }}>2 min</div>
          </div>
        </div>

        {/* Big QR scanner CTA */}
        <div style={{ marginTop: 14 }}>
          <div style={{
            background: '#FF5A1F', color: '#F7F2E5', borderRadius: 16, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(247,242,229,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="scan" size={26} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Validar QR</div>
              <div style={{ fontSize: 11.5, color: 'rgba(247,242,229,.75)', marginTop: 2 }}>Escanea el billete del pasajero</div>
            </div>
            <Icon name="arrow-r" size={20} />
          </div>
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="md" icon="pause" style={{ background: 'rgba(255,250,240,.08)', color: '#ECE6D7', border: '1px solid rgba(236,230,215,.12)' }}>Pausar</Button>
          <Button variant="ghost" size="md" icon="stop" style={{ background: 'rgba(177,74,51,.12)', color: '#F2C6BC', border: '1px solid rgba(177,74,51,.4)' }}>Finalizar</Button>
        </div>
      </div>
    </Phone>
  );
}

function StatusTile({ dark, icon, label, value, tone, iconName }) {
  const tones = { ok: '#2E7D45', warn: '#D4A015', err: '#C73E2A' };
  return (
    <div style={{ background: 'rgba(255,250,240,.05)', border: '1px solid rgba(236,230,215,.1)', borderRadius: 12, padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Icon name={iconName || icon} size={14} stroke="rgba(236,230,215,.55)" />
        <span style={{ width: 6, height: 6, borderRadius: 99, background: tones[tone] }} />
      </div>
      <div style={{ fontSize: 9.5, color: 'rgba(236,230,215,.5)', marginTop: 8, fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 1, color: '#ECE6D7', fontFamily: 'var(--mono)' }}>{value}</div>
    </div>
  );
}

// Escáner QR — cámara abierta
function ScreenDriverScan() {
  return (
    <Phone bg="#000" dark>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0E0C0A 0%, #262119 50%, #0E0C0A 100%)' }} />
      <NavHeader title="Validar QR" dark trailing={<Icon name="x" size={18} stroke="#ECE6D7" />} />

      <div style={{ padding: '8px 22px 0', color: '#ECE6D7' }}>
        <div className="eyebrow" style={{ color: '#FF5A1F' }}>L1 · Bus 12</div>
        <div style={{ fontSize: 13.5, color: 'rgba(236,230,215,.75)', marginTop: 4 }}>Pide al pasajero que muestre su billete</div>
      </div>

      {/* viewfinder */}
      <div style={{ position: 'absolute', top: 220, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ width: 240, height: 240, position: 'relative' }}>
          {/* corners */}
          {[[0,0,0],[1,0,90],[1,1,180],[0,1,270]].map(([x,y,r], i) => (
            <div key={i} style={{ position: 'absolute', top: y * 220, left: x * 220, width: 24, height: 24, borderTop: '3px solid #FF5A1F', borderLeft: '3px solid #FF5A1F', transform: `rotate(${r}deg)`, transformOrigin: 'center', borderTopLeftRadius: 4 }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(255,255,255,.15)' }} />
          {/* sweeping line */}
          <div style={{ position: 'absolute', left: 8, right: 8, top: '50%', height: 2, background: 'linear-gradient(90deg, transparent, #FF5A1F, transparent)', boxShadow: '0 0 12px #FF5A1F' }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 22, right: 22, textAlign: 'center', color: '#ECE6D7' }}>
        <div style={{ fontSize: 12.5, color: 'rgba(236,230,215,.6)' }}>Centra el código en el cuadro</div>
        <div style={{ marginTop: 16 }}><Button variant="ghost" size="md" style={{ background: 'rgba(255,250,240,.08)', color: '#ECE6D7', border: '1px solid rgba(236,230,215,.12)' }}>Introducir código manualmente</Button></div>
      </div>
    </Phone>
  );
}

// Resultado validación
function ScreenDriverValidation({ kind = 'valid' }) {
  const map = {
    valid: { icon: 'check', tone: '#2E7D45', label: 'TICKET VÁLIDO', sub: 'Billete diario · todas las líneas', detail: 'XF7-402 · expira mañana 03:00' },
    used: { icon: 'info', tone: '#D4A015', label: 'YA USADO', sub: 'Billete sencillo · L1', detail: 'Validado hoy a las 08:42' },
    expired: { icon: 'x', tone: '#C73E2A', label: 'CADUCADO', sub: 'Billete sencillo · L2', detail: 'Expiró ayer a las 19:02' },
    invalid: { icon: 'x', tone: '#C73E2A', label: 'TICKET INVÁLIDO', sub: 'Código no reconocido', detail: 'Firma incorrecta o billete falsificado' },
    nocon: { icon: 'wifi-off', tone: '#5C544A', label: 'SIN CONEXIÓN', sub: 'No podemos validar online', detail: 'El ticket parece válido pero requiere conexión' },
    suspect: { icon: 'alert', tone: '#D4A015', label: 'VALIDACIÓN SOSPECHOSA', sub: 'Ticket usado hace 28s en Bus 18', detail: 'Pide al pasajero otro método' },
  };
  const m = map[kind];
  return (
    <Phone bg={kind === 'valid' ? '#2E7D45' : kind === 'used' || kind === 'suspect' ? '#D4A015' : kind === 'nocon' ? '#262119' : '#C73E2A'} dark>
      <div style={{ padding: '60px 22px 0', height: '100%', color: '#F7F2E5', display: 'flex', flexDirection: 'column' }}>
        <div className="eyebrow" style={{ color: 'rgba(247,242,229,.7)' }}>Bus 12 · L1</div>
        <div style={{ marginTop: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 120, height: 120, borderRadius: 99, background: 'rgba(255,255,255,.14)', border: '2px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={m.icon} size={64} strokeWidth={2} stroke="#F7F2E5" />
          </div>
        </div>
        <div style={{ marginTop: 26, fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.18em', textAlign: 'center', color: 'rgba(247,242,229,.75)' }}>{m.label}</div>
        <Display size={28} style={{ marginTop: 8, textAlign: 'center', color: '#F7F2E5' }}>{m.sub}</Display>
        <div style={{ marginTop: 14, fontSize: 12, color: 'rgba(247,242,229,.7)', textAlign: 'center', lineHeight: 1.5 }}>{m.detail}</div>

        <div style={{ marginTop: 'auto', marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button variant="paper" size="lg">Escanear siguiente</Button>
          {kind !== 'valid' && <Button variant="ghost" size="md" style={{ color: '#F7F2E5', border: '1px solid rgba(247,242,229,.3)' }}>Reportar incidencia</Button>}
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenDriverLogin, ScreenDriverStart, ScreenDriverService, ScreenDriverScan, ScreenDriverValidation });
