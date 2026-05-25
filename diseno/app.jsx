// TransitFlow — Canvas root. Compone todos los artboards.

function App() {
  return (
    <React.Fragment>
      <TweaksApp />
      <DesignCanvas>
      <DCSection id="sistema" title="Sistema · TransitFlow" subtitle="Visión, marca, tipografía y componentes base">
        <DCArtboard id="cover" label="Portada" width={COVER_W} height={720}><Cover /></DCArtboard>
        <DCArtboard id="system" label="Sistema visual" width={COVER_W} height={720}><SystemPanel /></DCArtboard>
      </DCSection>

      <DCSection id="pasajero-home" title="Pasajero · Inicio y organización" subtitle="Estados con/sin org, sin ubicación, selector">
        <DCArtboard id="home" label="01 Inicio · normal" width={PHONE_W} height={PHONE_H}><ScreenHome /></DCArtboard>
        <DCArtboard id="no-org" label="02 Inicio · sin organización" width={PHONE_W} height={PHONE_H}><ScreenHomeNoOrg /></DCArtboard>
        <DCArtboard id="no-loc" label="03 Inicio · sin ubicación" width={PHONE_W} height={PHONE_H}><ScreenHomeNoLocation /></DCArtboard>
        <DCArtboard id="org-picker" label="04 Selector de organización" width={PHONE_W} height={PHONE_H}><ScreenOrgPicker /></DCArtboard>
      </DCSection>

      <DCSection id="pasajero-mapa" title="Pasajero · Mapa en vivo" subtitle="Mapa, detalle de vehículo, detalle de parada">
        <DCArtboard id="map" label="05 Mapa en tiempo real" width={PHONE_W} height={PHONE_H}><ScreenMap /></DCArtboard>
        <DCArtboard id="vehicle" label="06 Detalle de vehículo" width={PHONE_W} height={PHONE_H}><ScreenVehicleDetail /></DCArtboard>
        <DCArtboard id="stop" label="07 Detalle de parada" width={PHONE_W} height={PHONE_H}><ScreenStopDetail /></DCArtboard>
      </DCSection>

      <DCSection id="pasajero-lineas" title="Pasajero · Líneas y paradas" subtitle="Listado, detalle, paradas cercanas">
        <DCArtboard id="lines" label="08 Listado de líneas" width={PHONE_W} height={PHONE_H}><ScreenLines /></DCArtboard>
        <DCArtboard id="line-detail" label="09 Detalle de línea" width={PHONE_W} height={PHONE_H}><ScreenLineDetail /></DCArtboard>
        <DCArtboard id="stops" label="10 Paradas cercanas" width={PHONE_W} height={PHONE_H}><ScreenStopsNear /></DCArtboard>
      </DCSection>

      <DCSection id="pasajero-compra" title="Pasajero · Compra y pago" subtitle="Selección, resumen y estados del pago">
        <DCArtboard id="buy" label="11 Comprar billete" width={PHONE_W} height={PHONE_H}><ScreenBuy /></DCArtboard>
        <DCArtboard id="summary" label="12 Resumen y método" width={PHONE_W} height={PHONE_H}><ScreenSummary /></DCArtboard>
        <DCArtboard id="pay-prep" label="13 Pago · preparando" width={PHONE_W} height={PHONE_H}><ScreenPayState state="preparing" /></DCArtboard>
        <DCArtboard id="pay-ok" label="14 Pago · confirmado" width={PHONE_W} height={PHONE_H}><ScreenPayState state="confirmed" /></DCArtboard>
        <DCArtboard id="pay-fail" label="15 Pago · fallido" width={PHONE_W} height={PHONE_H}><ScreenPayState state="failed" /></DCArtboard>
      </DCSection>

      <DCSection id="pasajero-ticket" title="Pasajero · Ticket digital y mis tickets" subtitle="QR, estados, historial local">
        <DCArtboard id="ticket" label="16 Ticket válido (QR)" width={PHONE_W} height={PHONE_H}><ScreenTicket /></DCArtboard>
        <DCArtboard id="ticket-used" label="17 Ticket usado" width={PHONE_W} height={PHONE_H}><ScreenTicketUsed state="used" /></DCArtboard>
        <DCArtboard id="ticket-exp" label="18 Ticket caducado" width={PHONE_W} height={PHONE_H}><ScreenTicketUsed state="expired" /></DCArtboard>
        <DCArtboard id="my-tickets" label="19 Mis tickets" width={PHONE_W} height={PHONE_H}><ScreenMyTickets /></DCArtboard>
      </DCSection>

      <DCSection id="pasajero-resto" title="Pasajero · Avisos, favoritos y ajustes" subtitle="Incidencias, atajos personales, perfil sin cuenta">
        <DCArtboard id="alerts" label="20 Avisos e incidencias" width={PHONE_W} height={PHONE_H}><ScreenAlerts /></DCArtboard>
        <DCArtboard id="favs" label="21 Favoritos" width={PHONE_W} height={PHONE_H}><ScreenFavorites /></DCArtboard>
        <DCArtboard id="settings" label="22 Ajustes" width={PHONE_W} height={PHONE_H}><ScreenSettings /></DCArtboard>
      </DCSection>

      <DCSection id="estados" title="Estados generales" subtitle="Cobertura de los casos límite del producto">
        <DCArtboard id="first-run" label="23 Primera apertura" width={PHONE_W} height={PHONE_H}><ScreenFirstRun /></DCArtboard>
        <DCArtboard id="loading" label="24 Cargando" width={PHONE_W} height={PHONE_H}><ScreenLoading /></DCArtboard>
        <DCArtboard id="offline" label="25 Sin conexión" width={PHONE_W} height={PHONE_H}><ScreenOffline /></DCArtboard>
        <DCArtboard id="neterror" label="26 Error de red" width={PHONE_W} height={PHONE_H}><ScreenNetError /></DCArtboard>
        <DCArtboard id="noservice" label="27 Fuera de horario" width={PHONE_W} height={PHONE_H}><ScreenNoService /></DCArtboard>
        <DCArtboard id="nolines" label="28 Org sin líneas" width={PHONE_W} height={PHONE_H}><ScreenNoLines /></DCArtboard>
        <DCArtboard id="stale" label="29 Vehículo sin señal" width={PHONE_W} height={PHONE_H}><ScreenStaleVehicle /></DCArtboard>
        <DCArtboard id="loc-denied" label="30 Ubicación denegada" width={PHONE_W} height={PHONE_H}><ScreenLocationDenied /></DCArtboard>
      </DCSection>

      <DCSection id="conductor" title="Conductor · App de servicio" subtitle="Flujo completo + validación de QR">
        <DCArtboard id="d-login" label="31 Login conductor" width={PHONE_W} height={PHONE_H}><ScreenDriverLogin /></DCArtboard>
        <DCArtboard id="d-start" label="32 Vehículo y línea" width={PHONE_W} height={PHONE_H}><ScreenDriverStart /></DCArtboard>
        <DCArtboard id="d-service" label="33 Servicio en curso" width={PHONE_W} height={PHONE_H}><ScreenDriverService /></DCArtboard>
        <DCArtboard id="d-scan" label="34 Escáner QR" width={PHONE_W} height={PHONE_H}><ScreenDriverScan /></DCArtboard>
        <DCArtboard id="v-valid" label="35 QR · válido" width={PHONE_W} height={PHONE_H}><ScreenDriverValidation kind="valid" /></DCArtboard>
        <DCArtboard id="v-used" label="36 QR · ya usado" width={PHONE_W} height={PHONE_H}><ScreenDriverValidation kind="used" /></DCArtboard>
        <DCArtboard id="v-exp" label="37 QR · caducado" width={PHONE_W} height={PHONE_H}><ScreenDriverValidation kind="expired" /></DCArtboard>
        <DCArtboard id="v-inv" label="38 QR · inválido" width={PHONE_W} height={PHONE_H}><ScreenDriverValidation kind="invalid" /></DCArtboard>
        <DCArtboard id="v-nocon" label="39 QR · sin conexión" width={PHONE_W} height={PHONE_H}><ScreenDriverValidation kind="nocon" /></DCArtboard>
        <DCArtboard id="v-susp" label="40 QR · sospechoso" width={PHONE_W} height={PHONE_H}><ScreenDriverValidation kind="suspect" /></DCArtboard>
      </DCSection>

      <DCSection id="admin" title="Panel web · operador" subtitle="Referencia: dashboard, mapa de flota, tickets y pagos">
        <DCArtboard id="a-dash" label="41 Dashboard operativo" width={ADMIN_W} height={ADMIN_H}><AdminDashboard /></DCArtboard>
        <DCArtboard id="a-map" label="42 Mapa de vehículos" width={ADMIN_W} height={ADMIN_H}><AdminLiveMap /></DCArtboard>
        <DCArtboard id="a-tk" label="43 Tickets y pagos" width={ADMIN_W} height={ADMIN_H}><AdminTickets /></DCArtboard>
      </DCSection>
    </DesignCanvas>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
