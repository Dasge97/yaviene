// TransitFlow — Pasajero · Home, Mapa, Sheets

// ── Home (estado normal con organización) ────────────────────
function ScreenHome() {
  return (
    <Phone>
      <div style={{ padding: '52px 18px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* brand row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div className="eyebrow">TransitFlow</div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="pin-fill" size={12} /> Ayuntamiento de Villa Norte
              <Icon name="chev-d" size={12} />
            </div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 99, background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>
            <Icon name="bell" size={16} />
          </div>
        </div>

        <Display size={32} style={{ marginBottom: 4 }}>Bienvenido<span style={{ fontStyle: 'italic' }}>,</span></Display>
        <Display size={32} italic style={{ color: 'var(--orange)', marginBottom: 18 }}>¿a dónde vas?</Display>

        <div style={{ marginBottom: 14 }}><SearchBar placeholder="Buscar parada, línea o destino" /></div>

        {/* Quick actions grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <QuickTile big icon="map" title="Mapa en vivo" desc="3 vehículos cerca" tone="accent" />
          <QuickTile icon="ticket" title="Comprar billete" desc="desde 1,50 €" />
          <QuickTile icon="pin" title="Paradas cerca" desc="6 a menos de 1 km" />
          <QuickTile icon="lines" title="Líneas" desc="4 activas · 1 con aviso" />
        </div>

        {/* Avisos preview */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="dot" style={{ background: '#D4A015' }} /> Avisos activos · 2
            </div>
            <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Ver todos</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
            <LineBadge code="L2" color="#1F6FEB" size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.25 }}>Retraso por tráfico</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>+4 min · Universidad ↔ Hospital</div>
            </div>
            <Chip tone="warn" size="sm">+4 min</Chip>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Favoritos</div>
          <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
            <FavChip code="L1" label="Centro" color="#FF5A1F" />
            <FavChip code="L3" label="Circular" color="#2E7D45" />
            <FavChip pin label="Plaza Mayor" />
          </div>
        </div>
      </div>
      <TabBar active="home" />
    </Phone>
  );
}

function QuickTile({ icon, title, desc, tone, big }) {
  const accent = tone === 'accent';
  return (
    <div style={{
      gridColumn: big ? 'span 2' : 'span 1',
      background: accent ? '#14110E' : 'var(--surface)',
      color: accent ? '#ECE6D7' : '#14110E',
      border: accent ? 'none' : '1px solid var(--rule)',
      borderRadius: 14, padding: '12px 14px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      minHeight: big ? 80 : 64,
    }}>
      <div>
        <div style={{ color: accent ? '#FF5A1F' : 'var(--ink)', marginBottom: 6 }}><Icon name={icon} size={big ? 22 : 18} /></div>
        <div style={{ fontSize: big ? 15 : 13, fontWeight: 600, letterSpacing: '-0.005em' }}>{title}</div>
        <div style={{ fontSize: 11, color: accent ? 'rgba(236,230,215,.65)' : 'var(--ink-soft)', marginTop: 2 }}>{desc}</div>
      </div>
      {big && <div style={{ opacity: .6 }}><Icon name="arrow-up-r" size={20} /></div>}
    </div>
  );
}

function FavChip({ code, label, color, pin }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--paper-2)', padding: '6px 10px 6px 6px', borderRadius: 99, flexShrink: 0 }}>
      {pin ? <Icon name="pin-fill" size={14} /> : <LineBadge code={code} color={color} size="sm" />}
      <span style={{ fontSize: 12.5, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

// ── Home estado: sin organización seleccionada ───────────────
function ScreenHomeNoOrg() {
  return (
    <Phone>
      <div style={{ padding: '60px 18px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="eyebrow">TransitFlow</div>
        <Display size={28} style={{ marginTop: 8 }}>Elige dónde vas</Display>
        <Display size={28} italic style={{ color: 'var(--orange)', marginTop: 2 }}>a moverte hoy.</Display>
        <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 10, lineHeight: 1.45 }}>
          Selecciona un municipio, universidad, empresa o evento. Puedes consultar mapa, líneas y comprar sin crear cuenta.
        </p>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, padding: 4, marginTop: 16 }}>
          {ORGS.slice(0, 4).map((o, i) => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderBottom: i < 3 ? '1px solid var(--rule)' : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: o.color, color: '#F7F2E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 18 }}>
                {o.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.2 }}>{o.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{o.kind} · {o.dist}</div>
              </div>
              <Icon name="chev-r" size={16} stroke="#8C8273" />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 12 }}>
          <Icon name="search" size={14} /> Buscar otra organización
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 100, fontSize: 11, color: 'var(--ink-mute)', textAlign: 'center', lineHeight: 1.5 }}>
          No necesitas cuenta para empezar.<br/>Puedes iniciar sesión más tarde desde Ajustes.
        </div>
      </div>
    </Phone>
  );
}

// ── Home estado: ubicación desactivada ───────────────────────
function ScreenHomeNoLocation() {
  return (
    <Phone>
      <div style={{ padding: '52px 18px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div className="eyebrow">TransitFlow</div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>Villa Norte</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 99, background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="bell" size={16} /></div>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, #FFD3BD 0%, #E3DCC8 100%)',
          border: '1px solid var(--rule)', borderRadius: 16, padding: 16, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--orange-2)', marginBottom: 8 }}>
            <Icon name="location-off" size={18} />
            <span className="eyebrow" style={{ color: 'var(--orange-2)' }}>Ubicación desactivada</span>
          </div>
          <Display size={20}>No podemos mostrar paradas cercanas.</Display>
          <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.45 }}>
            Activa la ubicación para ver qué autobuses pasan cerca de ti y cuánto tiempo tardan.
          </p>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}><Button variant="primary" size="sm">Permitir ubicación</Button></div>
            <Button variant="ghost" size="sm" full={false}>Ahora no</Button>
          </div>
        </div>

        <div className="eyebrow" style={{ padding: '8px 4px' }}>Mientras tanto</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <QuickTile icon="lines" title="Líneas" desc="Ver las 6 líneas" />
          <QuickTile icon="map" title="Mapa" desc="Sin centrar" />
          <QuickTile icon="ticket" title="Comprar" desc="Desde 1,50 €" />
          <QuickTile icon="alert" title="Avisos" desc="2 activos" />
        </div>
      </div>
      <TabBar active="home" />
    </Phone>
  );
}

// ── Selector de organización ─────────────────────────────────
function ScreenOrgPicker() {
  return (
    <Phone>
      <NavHeader title="Cambiar organización" />
      <div style={{ padding: '0 18px' }}>
        <SearchBar placeholder="Buscar municipio, universidad, evento…" />
        <div className="eyebrow" style={{ marginTop: 18, marginBottom: 8 }}>Cerca de ti</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16, overflow: 'hidden' }}>
          {ORGS.map((o, i) => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < ORGS.length-1 ? '1px solid var(--rule)' : 'none', background: o.id === 'villa-norte' ? 'rgba(255,90,31,.06)' : 'transparent' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: o.color, color: '#F7F2E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 18 }}>
                {o.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{o.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{o.kind} · {o.dist}</div>
              </div>
              {o.id === 'villa-norte' ? <Chip tone="accent" size="sm">Actual</Chip> : <Icon name="chev-r" size={16} stroke="#8C8273" />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 11.5, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
          <Icon name="plus" size={14} /> ¿No encuentras tu servicio? Pega un código
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenHome, ScreenHomeNoOrg, ScreenHomeNoLocation, ScreenOrgPicker });
