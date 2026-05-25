# 07 - Clientes Web y Movil

## Portal publico

Objetivo: consulta inmediata sin login.

Vistas:

- Home por organizacion.
- Mapa en tiempo real.
- Lista de lineas.
- Detalle de linea.
- Detalle de parada.
- Incidencias publicas.
- Compra de ticket.
- Visualizacion de QR.

Requisitos UX:

- Mobile-first.
- Carga rapida.
- Estado sin vehiculos activos.
- Estado de mala conexion.
- Actualizacion en vivo sin refrescar pagina.
- Accesibilidad basica: contraste, texto legible, controles navegables.

## Panel administracion

Objetivo: operar y configurar el servicio.

Modulos:

- Dashboard operativo.
- Mapa en vivo.
- Lineas.
- Rutas.
- Paradas.
- Vehiculos.
- Conductores.
- Servicios activos.
- Incidencias.
- Tickets y pagos.
- Analitica.
- Configuracion organizacion.

Dashboard inicial:

- Vehiculos activos.
- Vehiculos offline.
- Servicios en curso.
- Incidencias abiertas.
- Ultimas validaciones.
- Ultimos pagos.

## App conductor

Objetivo: operar ruta con minima friccion.

Pantallas:

- Login.
- Seleccion de vehiculo.
- Seleccion de linea/ruta.
- Servicio activo.
- Pausa/finalizacion.
- Escaner QR.
- Estado de conexion.

Funciones en segundo plano:

- GPS periodico.
- Reintentos si no hay conexion.
- Cola local de posiciones pendientes.
- Indicador de bateria baja.

Datos enviados:

```json
{
  "service_run_id": 1001,
  "vehicle_id": 12,
  "lat": 43.25,
  "lng": -2.93,
  "accuracy_meters": 8,
  "speed_kmh": 40,
  "heading": 180,
  "battery_level": 72,
  "recorded_at": "2026-05-25T08:10:05Z"
}
```

## Tecnologia cliente

Opciones:

- Web publica y panel con Symfony/Twig + Stimulus para MVP rapido.
- SPA con React/Vue si el panel necesita mucha interactividad.
- App movil con Flutter o React Native para cubrir Android inicial y futuro iOS.

Recomendacion pragmatica:

- Portal publico: frontend web ligero.
- Panel: empezar con Symfony/Twig si el equipo Symfony es fuerte.
- App conductor: Flutter si se busca app multi-plataforma mantenible.

## Contratos compartidos

Conviene generar o mantener:

- OpenAPI para endpoints REST.
- Tipos TypeScript para web si aplica.
- Coleccion HTTP para pruebas manuales.
- Fixtures de datos demo.

## Mapas

Opciones:

- Leaflet + OpenStreetMap para MVP economico.
- Mapbox o Google Maps si se necesitan servicios comerciales, geocoding o mejor soporte.

Para TransitFlow, Leaflet es suficiente para:

- Mostrar paradas.
- Mostrar rutas.
- Mostrar vehiculos.
- Centrar por organizacion.

