// TransitFlow — Pasajero · Compra de billete, resumen, estados de pago

function ScreenBuy() {
  return (
    <Phone>
      <NavHeader title="Comprar billete" />
      <div style={{ padding: '0 18px' }}>
        <Display size={24}>Elige tu <i>billete</i>.</Display>
        <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 6 }}>Sin cuenta. Se guarda en este dispositivo.</p>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TICKETS_PRODUCTS.map((t) => (
            <div key={t.id} style={{
              background: t.highlight ? '#14110E' : 'var(--surface)',
              color: t.highlight ? '#ECE6D7' : '#14110E',
              border: t.highlight ? 'none' : '1px solid var(--rule)',
              borderRadius: 14, padding: '14px 14px',
              position: 'relative', overflow: 'hidden',
            }}>
              {t.highlight && <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: '#FF5A1F', textTransform: 'uppercase' }}>Recomendado</div>}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontStyle: t.id === 'diario' ? 'italic' : 'normal' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: t.highlight ? 'rgba(236,230,215,.65)' : 'var(--ink-soft)', marginTop: 3 }}>{t.desc}</div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 19, fontWeight: 500, color: t.highlight ? '#FF5A1F' : '#14110E' }}>{t.price}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 10.5, color: t.highlight ? 'rgba(236,230,215,.55)' : 'var(--ink-soft)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={11} /> {t.validity}</span>
                <span style={{ width: 2, height: 2, borderRadius: 99, background: 'currentColor', opacity: .5 }} />
                <span>{t.scope}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, fontSize: 11, color: 'var(--ink-soft)', textAlign: 'center', lineHeight: 1.5 }}>
          ¿Eres jubilado, estudiante o familia numerosa?<br/>
          <span style={{ color: 'var(--orange)', borderBottom: '1px solid var(--orange)' }}>Otros productos y bonos →</span>
        </div>
      </div>
    </Phone>
  );
}

function ScreenSummary() {
  return (
    <Phone>
      <NavHeader title="Resumen" />
      <div style={{ padding: '0 18px' }}>
        <Display size={24}>Antes de <i>pagar</i></Display>

        <div style={{ marginTop: 18, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, padding: 16 }}>
          <div className="eyebrow">Tu billete</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>Billete diario</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 500 }}>4,00 €</div>
          </div>
          <hr className="hairline" style={{ margin: '12px 0' }} />
          <Row label="Servicio" value="Villa Norte" />
          <Row label="Alcance" value="Todas las líneas" />
          <Row label="Válido desde" value="al comprar" />
          <Row label="Válido hasta" value="mañana 03:00" />
        </div>

        <div className="eyebrow" style={{ marginTop: 18, marginBottom: 8 }}>Método de pago</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
          <PayOption icon="ticket" label="Tarjeta · •• 4821" sub="Visa · expira 09/27" active />
          <PayOption icon="apple-pay" label="Apple Pay" />
          <PayOption icon="ticket" label="Google Pay" />
          <PayOption icon="ticket" label="Bizum" tag="Próximamente" disabled />
        </div>

        <div style={{ marginTop: 14, marginBottom: 24 }}>
          <Button variant="accent" size="lg">Pagar 4,00 €</Button>
          <div style={{ fontSize: 10.5, color: 'var(--ink-soft)', textAlign: 'center', marginTop: 8, lineHeight: 1.4 }}>
            Al pagar aceptas las condiciones del servicio.<br/>El billete se guarda en este dispositivo.
          </div>
        </div>
      </div>
    </Phone>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12.5 }}>
      <span style={{ color: 'var(--ink-soft)' }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function PayOption({ icon, label, sub, active, tag, disabled }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: '1px solid var(--rule)', opacity: disabled ? 0.45 : 1 }}>
      <div style={{ width: 32, height: 22, borderRadius: 5, background: active ? '#14110E' : 'var(--paper-2)', color: active ? '#ECE6D7' : '#14110E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600 }}>
        {label.includes('Apple') ? '' : label.includes('Google') ? 'G' : label.includes('Bizum') ? 'B' : '••'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 1 }}>{sub}</div>}
      </div>
      {tag && <Chip size="sm">{tag}</Chip>}
      {active && (
        <div style={{ width: 18, height: 18, borderRadius: 99, background: '#FF5A1F', color: '#F7F2E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={12} />
        </div>
      )}
    </div>
  );
}

// ── Pay states (preparing / confirmed / failed) ──────────────
function ScreenPayState({ state = 'confirmed' }) {
  const states = {
    preparing: { icon: 'clock', tone: 'neutral', title: 'Preparando tu pago', desc: 'Estamos contactando con tu banco. No cierres la app.', color: '#5C544A' },
    confirmed: { icon: 'check', tone: 'ok', title: '¡Pago confirmado!', desc: 'Tu billete ya está listo para usarse. Encuéntralo en Mis tickets.', color: '#2E7D45' },
    failed: { icon: 'x', tone: 'err', title: 'Pago fallido', desc: 'No hemos podido completar el cobro. No se ha realizado ningún cargo.', color: '#C73E2A' },
  };
  const s = states[state];
  return (
    <Phone bg="var(--paper)">
      <div style={{ padding: '60px 22px 0', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 99, background: 'var(--surface)', border: `2px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginTop: 60, marginBottom: 18 }}>
          <Icon name={s.icon} size={36} strokeWidth={1.8} />
        </div>
        <div className="eyebrow" style={{ color: s.color }}>{state === 'preparing' ? 'En proceso' : state === 'confirmed' ? 'Listo' : 'Error'}</div>
        <Display size={28} style={{ marginTop: 10 }}>{s.title.split('¡').pop().split('!')[0]}</Display>
        <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 14, lineHeight: 1.5, maxWidth: 240 }}>{s.desc}</p>

        {state === 'confirmed' && (
          <div style={{ marginTop: 24, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: 12, width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#14110E', color: '#FF5A1F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="qr" size={20} /></div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Billete diario</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-soft)' }}>XF7-402 · 4,00 €</div>
            </div>
            <Icon name="chev-r" size={16} stroke="#8C8273" />
          </div>
        )}

        <div style={{ width: '100%', marginTop: 'auto', marginBottom: 40 }}>
          {state === 'confirmed' && <Button variant="primary" size="lg">Ver mi ticket</Button>}
          {state === 'failed' && <><Button variant="accent" size="lg">Reintentar pago</Button><div style={{ height: 8 }} /><Button variant="ghost" size="md">Probar otro método</Button></>}
          {state === 'preparing' && <Button variant="ghost" size="md">Cancelar</Button>}
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenBuy, ScreenSummary, ScreenPayState });
