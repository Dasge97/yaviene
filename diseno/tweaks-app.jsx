// TransitFlow — Tweaks de tipografía + acento.
// Mantiene la paleta urbana como base; permite probar otras tipografías.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "type": "urbano",
  "accent": "#FF5A1F"
}/*EDITMODE-END*/;

const TYPE_PRESETS = {
  urbano:  { display: "'Bricolage Grotesque'", sans: "'Hanken Grotesk'", mono: "'JetBrains Mono'", label: 'Urbano · Bricolage + Hanken' },
  civico:  { display: "'Hanken Grotesk'",       sans: "'Hanken Grotesk'", mono: "'JetBrains Mono'", label: 'Cívico · Hanken (mono-family)' },
  moderno: { display: "'Space Grotesk'",        sans: "'DM Sans'",        mono: "'Space Mono'",     label: 'Moderno · Space Grotesk + DM Sans' },
  signage: { display: "'Familjen Grotesk'",     sans: "'Familjen Grotesk'", mono: "'JetBrains Mono'", label: 'Signage · Familjen Grotesk' },
};

const ACCENT_PRESETS = [
  '#FF5A1F', // urbano orange (default)
  '#1F6FEB', // civic blue
  '#E11A6B', // signal magenta
  '#2E7D45', // transit green
  '#14110E', // ink mono
];

function applyType(key) {
  const p = TYPE_PRESETS[key] || TYPE_PRESETS.urbano;
  const r = document.documentElement.style;
  r.setProperty('--display', `${p.display}, 'Hanken Grotesk', system-ui, sans-serif`);
  r.setProperty('--serif', `${p.display}, 'Hanken Grotesk', system-ui, sans-serif`);
  r.setProperty('--sans', `${p.sans}, -apple-system, system-ui, sans-serif`);
  r.setProperty('--mono', `${p.mono}, ui-monospace, Menlo, monospace`);
}

function applyAccent(hex) {
  document.documentElement.style.setProperty('--orange', hex);
  // Re-tint any node carrying inline color === legacy orange. Targeted —
  // only updates the *current* default accent so user edits stay sticky.
  if (!window.__tfAccentSheet) {
    const s = document.createElement('style');
    s.id = 'tf-accent-override';
    document.head.appendChild(s);
    window.__tfAccentSheet = s;
  }
  // No global hex remap (would be too invasive); keep CSS var so anything
  // reading var(--orange) reflects the change.
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyType(t.type); }, [t.type]);
  React.useEffect(() => { applyAccent(t.accent); }, [t.accent]);

  return (
    <TweaksPanel title="Tweaks · TransitFlow">
      <TweakSection label="Tipografía" />
      <TweakSelect
        label="Familia"
        value={t.type}
        options={Object.entries(TYPE_PRESETS).map(([k, v]) => ({ value: k, label: v.label }))}
        onChange={(v) => setTweak('type', v)}
      />
      <div style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1, padding: '4px 0' }}>
        Aa <i>Aa</i> 1234
      </div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 13, opacity: .7, margin: '-4px 0 0' }}>
        Plaza Mayor · 2 min · L1
      </div>

      <TweakSection label="Acento de marca" />
      <TweakColor
        label="Color principal"
        value={t.accent}
        options={ACCENT_PRESETS}
        onChange={(v) => setTweak('accent', v)}
      />
      <div style={{ fontSize: 11, color: 'rgba(41,38,27,.55)', lineHeight: 1.4, marginTop: 2 }}>
        Afecta a botones, énfasis y el badge de línea L1 cuando lee <code>var(--orange)</code>.
      </div>
    </TweaksPanel>
  );
}

Object.assign(window, { TweaksApp, applyType, applyAccent });
