# 04 - API REST

## Convenciones

- Versionado: `/api/v1`.
- Formato: JSON.
- Fechas: ISO 8601 en UTC.
- Autenticacion: Bearer JWT para panel y app conductor.
- API publica: endpoints bajo `/api/v1/public`.
- Idempotencia: requerida en pagos, inicio de servicio y confirmaciones sensibles.

## Formato de error

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request invalida",
    "fields": {
      "lat": "Debe estar entre -90 y 90"
    }
  }
}
```

Codigos comunes:

- `VALIDATION_ERROR`
- `AUTH_REQUIRED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `RATE_LIMITED`
- `PAYMENT_PROVIDER_ERROR`
- `TICKET_INVALID`

## Autenticacion

### `POST /api/v1/auth/login`

Request:

```json
{
  "email": "driver@example.com",
  "password": "secret"
}
```

Response:

```json
{
  "access_token": "jwt",
  "refresh_token": "jwt",
  "user": {
    "id": 1,
    "roles": ["ROLE_DRIVER"],
    "organization_id": 10
  }
}
```

### `POST /api/v1/auth/refresh`

Renueva token de acceso.

## App conductor

### `GET /api/v1/driver/me`

Devuelve perfil, vehiculos y lineas asignables.

### `POST /api/v1/driver/service-runs`

Inicia un servicio.

Request:

```json
{
  "vehicle_id": 12,
  "route_id": 5,
  "idempotency_key": "start-2026-05-25-12"
}
```

Response:

```json
{
  "id": 1001,
  "status": "active",
  "started_at": "2026-05-25T08:10:00Z"
}
```

### `POST /api/v1/driver/service-runs/{id}/locations`

Envia ubicacion.

Request:

```json
{
  "lat": 43.25,
  "lng": -2.93,
  "accuracy_meters": 8,
  "speed_kmh": 40,
  "heading": 180,
  "battery_level": 72,
  "connection_status": "online",
  "recorded_at": "2026-05-25T08:10:05Z"
}
```

Response:

```json
{
  "accepted": true,
  "server_time": "2026-05-25T08:10:06Z"
}
```

### `POST /api/v1/driver/service-runs/{id}/pause`

Pausa servicio activo.

### `POST /api/v1/driver/service-runs/{id}/resume`

Reanuda servicio pausado.

### `POST /api/v1/driver/service-runs/{id}/finish`

Finaliza servicio.

### `POST /api/v1/driver/tickets/validate`

Valida QR.

Request:

```json
{
  "qr_payload": "base64-or-json-signed-token",
  "vehicle_id": 12,
  "lat": 43.25,
  "lng": -2.93
}
```

Response:

```json
{
  "result": "valid",
  "ticket": {
    "public_code": "A91D",
    "valid_until": "2026-05-25T19:45:00Z"
  }
}
```

## Publico

### `GET /api/v1/public/organizations/{slug}`

Datos publicos de organizacion.

### `GET /api/v1/public/{orgSlug}/lines`

Lista lineas publicas.

### `GET /api/v1/public/{orgSlug}/lines/{lineId}`

Detalle de linea, rutas y paradas.

### `GET /api/v1/public/{orgSlug}/stops`

Lista paradas.

### `GET /api/v1/public/{orgSlug}/live`

Estado actual de vehiculos activos.

Response:

```json
{
  "vehicles": [
    {
      "vehicle_id": 12,
      "line_id": 2,
      "route_id": 5,
      "lat": 43.25,
      "lng": -2.93,
      "speed_kmh": 40,
      "status": "active",
      "last_seen_at": "2026-05-25T08:10:05Z"
    }
  ]
}
```

### `GET /api/v1/public/{orgSlug}/incidents`

Incidencias publicas activas.

## Administracion

Endpoints CRUD iniciales:

- `GET|POST /api/v1/admin/lines`
- `GET|PATCH|DELETE /api/v1/admin/lines/{id}`
- `GET|POST /api/v1/admin/routes`
- `GET|PATCH|DELETE /api/v1/admin/routes/{id}`
- `GET|POST /api/v1/admin/stops`
- `GET|PATCH|DELETE /api/v1/admin/stops/{id}`
- `GET|POST /api/v1/admin/vehicles`
- `GET|PATCH|DELETE /api/v1/admin/vehicles/{id}`
- `GET|POST /api/v1/admin/drivers`
- `GET|PATCH|DELETE /api/v1/admin/drivers/{id}`
- `GET|POST /api/v1/admin/incidents`
- `PATCH /api/v1/admin/incidents/{id}/resolve`

## Pagos y tickets

### `GET /api/v1/public/{orgSlug}/fare-products`

Lista billetes disponibles.

### `POST /api/v1/public/{orgSlug}/payments`

Crea intento de pago.

Request:

```json
{
  "fare_product_id": 3,
  "return_url": "https://example.com/ticket/result"
}
```

Response:

```json
{
  "payment_id": 90,
  "provider": "stripe",
  "client_secret": "pi_xxx_secret_xxx"
}
```

### `POST /api/v1/payments/webhooks/stripe`

Webhook privado de Stripe. Debe verificar firma del proveedor.

### `GET /api/v1/public/{orgSlug}/tickets/{publicCode}`

Consulta ticket emitido si el usuario conserva el codigo o enlace.

