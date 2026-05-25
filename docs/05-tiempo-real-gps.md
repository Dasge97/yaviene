# 05 - Tiempo Real y GPS

## Objetivo

Mostrar al publico y al panel administrativo el estado operativo con baja latencia, sin obligar a consultar la base de datos continuamente.

## Frecuencias de envio

| Modo | Frecuencia | Uso |
| --- | --- | --- |
| normal | 5 segundos | Vehiculo en ruta |
| ahorro | 15 segundos | Bateria baja o mala cobertura |
| detenido | 30 segundos | Sin movimiento |

La app conductor puede ajustar el modo, pero el backend debe aceptar posiciones siempre que sean validas y pertenezcan a un servicio activo o pausado.

## Flujo de ubicacion

```text
App conductor
  -> POST /driver/service-runs/{id}/locations
  -> TrackingService valida estado, conductor, vehiculo y coordenadas
  -> Redis actualiza ultima posicion
  -> Messenger persiste historico si aplica
  -> RealtimePublisher publica evento
  -> Portal publico/panel reciben actualizacion
```

## Redis

Claves sugeridas:

```text
org:{orgId}:live:vehicles
service_run:{id}:last_location
vehicle:{id}:last_location
service_run:{id}:state
```

`org:{orgId}:live:vehicles` puede ser un hash con `vehicle_id` como clave y JSON compacto como valor.

TTL recomendado:

- Ultima posicion: 2 minutos.
- Vehiculos live por organizacion: 2 minutos por entrada o limpieza periodica.

## Estados operativos

| Estado | Regla |
| --- | --- |
| active | Servicio activo y ultima posicion reciente |
| stopped | Velocidad baja durante X segundos |
| paused | Servicio pausado por conductor |
| offline | Sin posicion reciente durante mas de 60-90 segundos |
| finished | Servicio finalizado |

## Eventos en tiempo real

Topicos Mercure sugeridos:

```text
/organizations/{orgId}/live
/organizations/{orgId}/lines/{lineId}/live
/organizations/{orgId}/incidents
/organizations/{orgId}/admin/operations
```

Evento `vehicle.updated`:

```json
{
  "type": "vehicle.updated",
  "occurred_at": "2026-05-25T08:10:06Z",
  "data": {
    "vehicle_id": 12,
    "service_run_id": 1001,
    "line_id": 2,
    "route_id": 5,
    "lat": 43.25,
    "lng": -2.93,
    "speed_kmh": 40,
    "heading": 180,
    "status": "active",
    "battery_level": 72,
    "last_seen_at": "2026-05-25T08:10:05Z"
  }
}
```

Evento `incident.created`:

```json
{
  "type": "incident.created",
  "occurred_at": "2026-05-25T08:12:00Z",
  "data": {
    "incident_id": 50,
    "line_id": 2,
    "severity": "medium",
    "title": "Retraso en Linea 2"
  }
}
```

## Persistencia del historico

Reglas para guardar en `GpsPosition`:

- Siempre guardar primera y ultima posicion de un servicio.
- Guardar cada 15-30 segundos en movimiento.
- Guardar si distancia desde ultima posicion persistida supera 50 metros.
- Guardar si cambia estado relevante: activo, detenido, offline, pausado.

## Validaciones de GPS

Rechazar o marcar como sospechoso:

- Coordenadas fuera de rango.
- Timestamp demasiado futuro.
- Timestamp demasiado antiguo.
- Servicio inexistente o finalizado.
- Conductor no asociado.
- Saltos imposibles de velocidad si se detecta manipulacion.

## ETA inicial

Para MVP, ETA puede ser simple:

- Usar distancia restante por ruta si existe polyline.
- Usar velocidad actual suavizada.
- Aplicar fallback a duracion estimada de ruta.

La prediccion avanzada queda para fases posteriores.

