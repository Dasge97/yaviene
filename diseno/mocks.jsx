// TransitFlow — datos ficticios. Ayuntamiento de Villa Norte.

const ORG = {
  id: 'villa-norte',
  name: 'Ayuntamiento de Villa Norte',
  short: 'Villa Norte',
  kind: 'Transporte municipal',
  color: '#FF5A1F',
};

const LINES = [
  { code: 'L1', name: 'Centro – Estación', dirA: 'Estación Central', dirB: 'Plaza Mayor', vehicles: 4, status: 'ok', next: '2 min', freq: 'cada 8 min', color: '#FF5A1F' },
  { code: 'L2', name: 'Universidad – Hospital', dirA: 'Hospital Norte', dirB: 'Campus Sur', vehicles: 3, status: 'warn', next: '6 min', freq: 'retraso 4 min', color: '#1F6FEB', alert: 'Retraso por tráfico' },
  { code: 'L3', name: 'Circular', dirA: 'Sentido horario', dirB: 'Sentido antihorario', vehicles: 5, status: 'ok', next: '1 min', freq: 'cada 6 min', color: '#2E7D45' },
  { code: 'L4', name: 'Polígono – Mercado', dirA: 'Mercado Central', dirB: 'Polígono Este', vehicles: 2, status: 'ok', next: '11 min', freq: 'cada 15 min', color: '#D4A015' },
  { code: 'L5', name: 'Express Estación', dirA: 'Estación AVE', dirB: 'Centro', vehicles: 0, status: 'off', next: '—', freq: 'fuera de horario', color: '#6B6360' },
  { code: 'N1', name: 'Nocturno Centro', dirA: 'Plaza Mayor', dirB: 'Polígono Sur', vehicles: 0, status: 'off', next: '—', freq: 'inicia 22:30', color: '#1A2542' },
];

const STOPS = [
  { code: '0142', name: 'Plaza Mayor', dist: '90 m', lines: ['L1', 'L3', 'N1'], next: '2 min', acc: true },
  { code: '0287', name: 'Estación Central', dist: '240 m', lines: ['L1', 'L5'], next: '5 min', acc: true },
  { code: '0103', name: 'Mercado', dist: '410 m', lines: ['L4', 'L3'], next: '—', acc: false, alert: 'Fuera de servicio temporal' },
  { code: '0451', name: 'Universidad', dist: '720 m', lines: ['L2', 'L3'], next: '6 min', acc: true },
  { code: '0512', name: 'Hospital Norte', dist: '1,1 km', lines: ['L2'], next: '12 min', acc: true },
  { code: '0098', name: 'Parque Sur', dist: '1,4 km', lines: ['L3', 'L4'], next: '4 min', acc: true },
];

const VEHICLES = [
  { id: 'Bus 12', line: 'L1', to: 'Estación Central', nextStop: 'Plaza Mayor', eta: '2 min', status: 'ok', updated: 'hace 8s' },
  { id: 'Bus 18', line: 'L2', to: 'Hospital Norte', nextStop: 'Universidad', eta: '6 min', status: 'warn', updated: 'hace 14s', delay: '+4 min' },
  { id: 'Bus 07', line: 'L3', to: 'Sentido horario', nextStop: 'Parque Sur', eta: '1 min', status: 'ok', updated: 'hace 3s' },
  { id: 'Minibus 04', line: 'L4', to: 'Mercado Central', nextStop: 'Polígono Este', eta: '11 min', status: 'ok', updated: 'hace 6s' },
  { id: 'Bus 22', line: 'L1', to: 'Plaza Mayor', nextStop: 'Estación Central', eta: '—', status: 'off', updated: 'hace 4 min' },
];

const TICKETS_PRODUCTS = [
  { id: 'sencillo', name: 'Billete sencillo', desc: 'Un viaje, una línea', price: '1,50 €', validity: 'válido 60 min', scope: 'una línea' },
  { id: 'diario', name: 'Billete diario', desc: 'Viajes ilimitados hasta fin del día', price: '4,00 €', validity: 'hasta 03:00', scope: 'todas las líneas', highlight: true },
  { id: 'todas', name: 'Todas las líneas', desc: 'Un viaje en cualquier línea, con transbordo', price: '2,20 €', validity: 'válido 90 min', scope: 'todas las líneas' },
  { id: 'evento', name: 'Lanzadera Feria', desc: 'Servicio especial 14–17 may', price: '3,00 €', validity: 'válido el día', scope: 'servicio Feria' },
];

const MY_TICKETS = [
  { id: 'tf-7402', kind: 'Billete diario', status: 'valid', org: 'Villa Norte', scope: 'Todas las líneas', from: 'hoy 08:14', to: 'mañana 03:00', price: '4,00 €', code: 'XF7-402' },
  { id: 'tf-7301', kind: 'Sencillo · L2', status: 'used', org: 'Villa Norte', scope: 'L2', from: 'ayer 18:02', to: 'ayer 19:02', price: '1,50 €', code: 'XF7-301' },
  { id: 'tf-7188', kind: 'Sencillo · L1', status: 'expired', org: 'Villa Norte', scope: 'L1', from: '4 may 09:10', to: '4 may 10:10', price: '1,50 €', code: 'XF7-188' },
];

const ALERTS = [
  { type: 'traffic', severity: 'med', line: 'L2', title: 'Retraso por tráfico en L2', desc: 'Atasco en Av. Universidad. Tiempos de paso afectados +3 a +6 min.', stops: ['Universidad', 'Hospital Norte'], since: '08:42', status: 'En curso' },
  { type: 'maintenance', severity: 'high', line: 'L4', title: 'Parada Mercado fuera de servicio', desc: 'Obras programadas. Use parada provisional Plaza Mayor.', stops: ['Mercado'], since: '07:00', status: 'En curso' },
  { type: 'general', severity: 'low', line: 'Todas', title: 'Feria 14–17 mayo: lanzaderas activas', desc: 'Refuerzo de servicio Centro ↔ Recinto Ferial cada 10 min.', stops: [], since: 'Ayer', status: 'Programado' },
];

const ORGS = [
  { id: 'villa-norte', name: 'Ayuntamiento de Villa Norte', kind: 'Transporte municipal', dist: 'cerca de ti', color: '#FF5A1F' },
  { id: 'uvn', name: 'Universidad Villa Norte', kind: 'Lanzadera universitaria', dist: '2 km', color: '#1F6FEB' },
  { id: 'col-san-jose', name: 'Colegio San José', kind: 'Transporte escolar', dist: '3 km', color: '#2E7D45' },
  { id: 'feria-may', name: 'Feria Mayo 2026', kind: 'Evento', dist: 'esta semana', color: '#D4A015' },
  { id: 'gran-hotel', name: 'Gran Hotel Norte', kind: 'Lanzadera privada', dist: '4 km', color: '#1A2542' },
];

Object.assign(window, { ORG, LINES, STOPS, VEHICLES, TICKETS_PRODUCTS, MY_TICKETS, ALERTS, ORGS });
