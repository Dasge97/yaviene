// TransitFlow — schematic map illustration (reusable across screens).
// Cream/dark base, thick line routes, typographic stop nodes.

function MapBase({ dark = false, w = 320, h = 360, style = {}, children, showUser = true, focusLine, vehicles = true }) {
  const bg = dark ? '#0E0C0A' : '#DBD3BA';
  const land = dark ? '#1B1813' : '#E3DCC8';
  const water = dark ? '#16110D' : '#D5C9AB';
  const park = dark ? '#1F2419' : '#D8DAB8';
  const stroke = dark ? 'rgba(236,230,215,.18)' : 'rgba(20,17,14,.22)';
  const stopFill = dark ? '#ECE6D7' : '#14110E';
  const stopStroke = dark ? '#0E0C0A' : '#ECE6D7';

  const lines = {
    L1: { color: '#FF5A1F', d: 'M 20 80 Q 80 60 130 100 T 240 140 Q 280 160 300 200' },
    L2: { color: '#1F6FEB', d: 'M 30 300 Q 90 240 150 230 T 270 180 Q 300 160 310 110' },
    L3: { color: '#2E7D45', d: 'M 60 180 Q 100 140 160 150 Q 220 160 240 200 Q 250 240 200 270 Q 140 290 90 260 Q 50 230 60 180 Z' },
    L4: { color: '#D4A015', d: 'M 0 250 Q 60 270 120 260 T 240 280 L 320 270' },
  };

  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: bg, ...style,
    }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        {/* land blocks */}
        <rect x="0" y="0" width={w} height={h} fill={bg} />
        <path d={`M 0 0 L ${w*.55} 0 L ${w*.45} ${h*.4} L 0 ${h*.55} Z`} fill={land} />
        <path d={`M ${w} 0 L ${w*.6} 0 L ${w*.7} ${h*.5} L ${w} ${h*.4} Z`} fill={land} />
        <path d={`M 0 ${h} L ${w} ${h} L ${w*.95} ${h*.7} L ${w*.4} ${h*.85} L 0 ${h*.75} Z`} fill={land} />
        {/* river */}
        <path d={`M -20 ${h*.45} Q ${w*.3} ${h*.55} ${w*.55} ${h*.5} T ${w+20} ${h*.6}`} stroke={water} strokeWidth="22" fill="none" strokeLinecap="round" opacity={dark ? 0.7 : 1} />
        {/* park */}
        <ellipse cx={w*.78} cy={h*.78} rx="60" ry="36" fill={park} />
        {/* roads (grid) */}
        <g stroke={stroke} strokeWidth="0.5" opacity={0.7}>
          {[80, 160, 240, 320].map((y) => <line key={'h'+y} x1="0" y1={y * h / 360} x2={w} y2={y * h / 360} />)}
          {[60, 120, 180, 240, 300].map((x) => <line key={'v'+x} x1={x * w / 320} y1="0" x2={x * w / 320} y2={h} />)}
        </g>

        {/* line halos */}
        {Object.entries(lines).map(([k, l]) => (
          <path key={k} d={l.d} stroke={l.color} strokeWidth={focusLine === k ? 6.5 : 4} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={focusLine && focusLine !== k ? 0.18 : (dark ? 0.95 : 0.9)} />
        ))}

        {/* stops (white dots with ink ring) */}
        {[
          [60, 100, 'Plaza Mayor'],
          [130, 110, ''],
          [200, 130, 'Mercado'],
          [260, 180, 'Hospital'],
          [90, 220, 'Universidad'],
          [170, 200, 'Estación'],
          [220, 260, 'Parque'],
        ].map(([x, y, n], i) => (
          <g key={i} transform={`translate(${x * w / 320} ${y * h / 360})`}>
            <circle r="4.5" fill={stopStroke} stroke={stopFill} strokeWidth="1.6" />
          </g>
        ))}

        {/* vehicles */}
        {vehicles && [
          { x: 140, y: 105, line: 'L1', dir: 30 },
          { x: 220, y: 215, line: 'L3', dir: 90 },
          { x: 100, y: 250, line: 'L2', dir: -10 },
        ].map((v, i) => (
          <g key={i} transform={`translate(${v.x * w / 320} ${v.y * h / 360}) rotate(${v.dir})`}>
            <circle r="11" fill={lines[v.line]?.color || '#14110E'} />
            <circle r="11" fill="none" stroke={stopStroke} strokeWidth="2" />
            <text y="3.5" textAnchor="middle" fill={stopStroke} fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace" transform={`rotate(${-v.dir})`}>{v.line}</text>
          </g>
        ))}
      </svg>

      {/* user location pulse */}
      {showUser && (
        <div style={{ position: 'absolute', left: w*.42, top: h*.62, transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 99, background: 'rgba(56,114,236,.18)', position: 'absolute', inset: -4 }} />
          <div style={{ width: 14, height: 14, borderRadius: 99, background: '#3872EC', border: '2.5px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,.3)' }} />
        </div>
      )}

      {children}
    </div>
  );
}

Object.assign(window, { MapBase });
