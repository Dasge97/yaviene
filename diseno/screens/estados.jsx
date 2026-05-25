// TransitFlow — Estados generales (loading, error, vacíos, fuera de horario)

function emptyState({ icon, eyebrow, title, italic, desc, primary, secondary, dark = false, accent = '#FF5A1F', bg }) {
  const ink = dark ? '#ECE6D7' : '#14110E';
  const soft = dark ? 'rgba(236,230,215,.6)' : 'var(--ink-soft)';
  return (
    <Phone dark={dark} bg={bg}>
      <div style={{ padding: '60px 24px 0', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: ink }}>
        <div style={{ width: 88, height: 88, borderRadius: 99, background: dark ? 'rgba(255,250,240,.06)' : 'var(--surface)', border: `1px solid ${dark ? 'rgba(236,230,215,.10)' : 'var(--rule)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, marginTop: 80 }}>
          <Icon name={icon} size={40} strokeWidth={1.4} />
        </div>
        <div className="eyebrow" style={{ marginTop: 22, color: accent }}>{eyebrow}</div>
        <Display size={26} style={{ marginTop: 8, color: ink }}>{title} {italic && <i style={{ color: accent }}>{italic}</i>}</Display>
        <p style={{ fontSize: 13, color: soft, marginTop: 12, lineHeight: 1.5, maxWidth: 260 }}>{desc}</p>
        <div style={{ marginTop: 'auto', marginBottom: 40, width: '100%' }}>
          {primary && <Button variant="primary" size="lg">{primary}</Button>}
          {secondary && <><div style={{ height: 8 }} /><Button variant="ghost" size="md">{secondary}</Button></>}
        </div>
      </div>
    </Phone>
  );
}

const ScreenFirstRun = () => (
  <Phone>
    <div style={{ padding: '60px 22px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="eyebrow" style={{ color: 'var(--orange)' }}>TransitFlow</div>
      <Display size={42} style={{ marginTop: 70, lineHeight: 0.95 }}>Moverte<br/>por la ciudad,</Display>
      <Display size={42} italic style={{ color: 'var(--orange)', marginTop: 4, lineHeight: 0.95 }}>al ritmo justo.</Display>
      <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 18, lineHeight: 1.5, maxWidth: 280 }}>
        Consulta autobuses en tiempo real, compra billetes y muestra tu QR.<br/>Sin crear cuenta.
      </p>
      <div style={{ marginTop: 'auto', marginBottom: 40 }}>
        <Button variant="accent" size="lg">Empezar</Button>
        <div style={{ height: 8 }} />
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-soft)' }}>Ya tengo cuenta · <span style={{ borderBottom: '1px solid currentColor' }}>iniciar sesión</span></div>
      </div>
    </div>
  </Phone>
);

const ScreenLoading = () => (
  <Phone>
    <div style={{ padding: '60px 22px 0', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div className="eyebrow" style={{ marginTop: 120 }}>TransitFlow</div>
      <Display size={28} style={{ marginTop: 18 }}>Cargando<i style={{ color: 'var(--orange)' }}> Villa Norte</i></Display>
      <div style={{ marginTop: 32, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 99, background: i === 0 ? '#FF5A1F' : 'var(--paper-3)' }} />)}
      </div>
      <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 18 }}>conectando con el servicio en tiempo real</p>
      <div style={{ marginTop: 'auto', marginBottom: 80, fontSize: 11, color: 'var(--ink-mute)' }}>v1.2.0</div>
    </div>
  </Phone>
);

const ScreenOffline = () => emptyState({
  icon: 'wifi-off', eyebrow: 'Sin conexión',
  title: 'Estás', italic: 'desconectado',
  desc: 'Las llegadas en tiempo real no se actualizan. Tus tickets siguen disponibles offline (la validación los necesita al subir al bus).',
  primary: 'Reintentar', secondary: 'Ver mis tickets',
});

const ScreenNetError = () => emptyState({
  icon: 'alert', eyebrow: 'Error de red',
  title: 'No podemos cargar', italic: 'el servicio',
  desc: 'Tu conexión está activa pero el servidor no responde. Inténtalo de nuevo en unos segundos.',
  primary: 'Reintentar',
});

const ScreenNoService = () => emptyState({
  icon: 'clock', eyebrow: 'Fuera de horario',
  title: 'El servicio', italic: 'no está activo ahora',
  desc: 'Las líneas de Villa Norte operan de 06:00 a 23:30. El nocturno N1 empieza a las 22:30.',
  primary: 'Ver horarios completos', secondary: 'Avisarme cuando reanude',
  accent: '#1F6FEB',
});

const ScreenNoLines = () => emptyState({
  icon: 'lines', eyebrow: 'Sin servicio',
  title: 'No hay líneas', italic: 'configuradas',
  desc: 'Esta organización todavía no ha publicado líneas. Vuelve a intentarlo o elige otro servicio.',
  primary: 'Cambiar organización',
  accent: '#5C544A',
});

const ScreenStaleVehicle = () => (
  <Phone dark bg="#0E0C0A">
    <NavHeader title="Bus 22" dark />
    <div style={{ padding: '0 22px', color: '#ECE6D7' }}>
      <div style={{ background: 'rgba(177,74,51,.18)', border: '1px solid rgba(177,74,51,.4)', borderRadius: 12, padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 8 }}>
        <Icon name="wifi-off" size={18} stroke="#F2C6BC" />
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#FFD3BD' }}>Sin actualización reciente</div>
          <div style={{ fontSize: 11, color: 'rgba(236,230,215,.6)', marginTop: 2 }}>Último GPS hace 4 min. La posición mostrada puede no ser fiable.</div>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <LineBadge code="L1" color="#FF5A1F" size="lg" />
        <Display size={22} style={{ marginTop: 8, color: '#ECE6D7' }}>Centro <i>– Estación</i></Display>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
          <BigNumeric value="—" label="próxima" color="#8C8273" />
          <BigNumeric value="?" label="distancia" color="#8C8273" />
          <BigNumeric value="4 min" label="última señal" color="#C73E2A" />
        </div>
        <p style={{ marginTop: 18, fontSize: 12, color: 'rgba(236,230,215,.55)', lineHeight: 1.5 }}>El conductor puede estar en un túnel o sin cobertura. Mantendremos el vehículo visible hasta volver a recibir señal o pasados 15 min.</p>
      </div>
    </div>
  </Phone>
);

const ScreenLocationDenied = () => emptyState({
  icon: 'location-off', eyebrow: 'Permiso denegado',
  title: 'No vemos', italic: 'dónde estás',
  desc: 'Activa la ubicación en Ajustes del sistema para ver paradas cercanas y centrar el mapa.',
  primary: 'Abrir ajustes del sistema', secondary: 'Continuar sin ubicación',
});

Object.assign(window, { ScreenFirstRun, ScreenLoading, ScreenOffline, ScreenNetError, ScreenNoService, ScreenNoLines, ScreenStaleVehicle, ScreenLocationDenied });
