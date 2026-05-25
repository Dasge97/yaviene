// TransitFlow — Cover & sistema visual

const COVER_W = 1280;

function Cover() {
  return (
    <div style={{ width: COVER_W, height: 720, background: 'var(--paper)', position: 'relative', overflow: 'hidden', padding: '64px 72px', fontFamily: 'var(--sans)' }}>
      {/* big serif headline */}
      <div className="eyebrow" style={{ color: 'var(--orange)' }}>TransitFlow · sistema de diseño</div>

      <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 108, fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.038em', margin: 0 }}>
            Moverse<br/>por la <span style={{ fontStyle: 'italic', color: 'var(--orange)', fontWeight: 600 }}>ciudad,</span>
          </h1>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 108, fontWeight: 500, lineHeight: 0.88, letterSpacing: '-0.038em', margin: '8px 0 0', fontStyle: 'italic' }}>
            sin fricción.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ink-soft)', marginTop: 28, maxWidth: 540 }}>
            App de transporte público multi-organización para pasajeros, conductores y operadores.
            Mapa en tiempo real, billetes QR, validación online y panel de gestión —
            sin cuenta obligatoria para el viajero.
          </p>

          <div style={{ marginTop: 36, display: 'flex', gap: 36, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
            <span>v1.2 · 2026</span>
            <span>·</span>
            <span>Pasajero · Conductor · Admin</span>
            <span>·</span>
            <span>iOS · Android · Web</span>
          </div>
        </div>

        {/* visual: phone preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ background: 'var(--paper-2)', borderRadius: 24, padding: 28 }}>
            <div className="eyebrow">audiencias</div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Ayuntamientos', '#FF5A1F'],
                ['Universidades', '#1F6FEB'],
                ['Colegios', '#2E7D45'],
                ['Hoteles · Eventos · Empresas', '#D4A015'],
              ].map(([l, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: c }} />
                  <span style={{ fontWeight: 500 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#14110E', color: '#ECE6D7', borderRadius: 24, padding: 28 }}>
            <div className="eyebrow" style={{ color: '#FF5A1F' }}>esenciales sin cuenta</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 24, marginTop: 12, lineHeight: 1.15 }}>
              Mapa, líneas, paradas,<br/><i style={{ color: '#FF5A1F' }}>compra</i> y QR.
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 72, right: 72, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', color: 'var(--ink-soft)' }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontStyle: 'italic' }}>— al ritmo justo.</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>VN · 0142 · L1 · L2 · L3 · L4 · L5 · N1</div>
      </div>
    </div>
  );
}

function SystemPanel() {
  return (
    <div style={{ width: COVER_W, height: 720, background: 'var(--paper)', padding: '50px 64px', fontFamily: 'var(--sans)', color: 'var(--ink)', overflow: 'hidden' }}>
      <div className="eyebrow" style={{ color: 'var(--orange)' }}>Sistema</div>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 64, fontWeight: 700, letterSpacing: '-0.028em', margin: '6px 0 28px', lineHeight: 1 }}>
        Tono <i style={{ color: 'var(--orange)' }}>urbano,</i> para todas las edades.
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 36 }}>
        {/* PALETA */}
        <div>
          <div className="eyebrow">Paleta</div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            <Swatch hex="#ECE6D7" name="paper" />
            <Swatch hex="#F7F2E5" name="surface" />
            <Swatch hex="#14110E" name="ink" dark />
            <Swatch hex="#FF5A1F" name="orange" dark />
            <Swatch hex="#1F6FEB" name="blue" dark />
            <Swatch hex="#2E7D45" name="ok" dark />
            <Swatch hex="#D4A015" name="warn" dark />
            <Swatch hex="#C73E2A" name="err" dark />
            <Swatch hex="#6B6360" name="mute" dark />
          </div>
        </div>

        {/* TIPOGRAFÍA */}
        <div>
          <div className="eyebrow">Tipografía</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 48, lineHeight: 1, letterSpacing: '-0.01em' }}>Aa <i>Aa</i></div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 8 }}>Bricolage Grotesque · display</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 500 }}>Plaza Mayor 2 min</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 4 }}>Hanken Grotesk · UI</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500 }}>L1 · XF7-402 · 4,00 €</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 4 }}>JetBrains Mono · datos</div>
            </div>
          </div>
        </div>

        {/* COMPONENTES */}
        <div>
          <div className="eyebrow">Componentes</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <LineBadge code="L1" color="#FF5A1F" />
              <LineBadge code="L2" color="#1F6FEB" />
              <LineBadge code="L3" color="#2E7D45" />
              <LineBadge code="L4" color="#D4A015" />
              <LineBadge code="N1" color="#1A2542" />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Chip tone="ok">En ruta</Chip>
              <Chip tone="warn">+4 min</Chip>
              <Chip tone="err">Sin conexión</Chip>
              <Chip tone="accent">Válido</Chip>
              <Chip tone="neutral">Usado</Chip>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <Button variant="primary" size="sm" full={false}>Comprar 4,00 €</Button>
              <Button variant="accent" size="sm" full={false}>Pagar</Button>
              <Button variant="ghost" size="sm" full={false}>Ver mapa</Button>
            </div>
            <Card padding={10} style={{ width: 220 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LineBadge code="L1" color="#FF5A1F" size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Centro – Estación</div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-soft)' }}>4 vehículos</div>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500 }}>2 min</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* principios */}
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, borderTop: '1px solid var(--rule)', paddingTop: 24 }}>
        {[
          ['Sin cuenta obligatoria', 'El esencial — mapa, líneas, compra, QR — funciona en anónimo y se persiste en dispositivo.'],
          ['Familiar a cualquier edad', 'Tipografía grotesca de alta legibilidad. Texto generoso. Datos en mono. Iconos solo cuando aportan.'],
          ['Multi-organización', 'Misma app, distinto cliente. El acento naranja se mantiene; el resto se neutraliza.'],
          ['Estado siempre visible', 'Cada vehículo, parada y ticket muestra estado + frescura del dato.'],
        ].map(([t, d]) => (
          <div key={t}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 18, lineHeight: 1.15 }}>{t}</div>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Swatch({ hex, name, dark }) {
  return (
    <div style={{ background: hex, color: dark ? '#ECE6D7' : '#14110E', borderRadius: 10, padding: '14px 12px', minHeight: 64, border: dark ? 'none' : '1px solid var(--rule)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: .7 }}>{name}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, marginTop: 6 }}>{hex}</div>
    </div>
  );
}

Object.assign(window, { Cover, SystemPanel, COVER_W });
