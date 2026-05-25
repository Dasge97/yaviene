# 03 - Dominio y Modelo de Datos

## Entidades principales

### Organization

Representa ayuntamiento, empresa, universidad, hotel o cliente SaaS.

Campos:

- `id`
- `name`
- `slug`
- `type`: municipality, company, school, university, hotel, event, other
- `timezone`
- `is_active`
- `created_at`
- `updated_at`

### User

Cuenta autenticada para panel, conductores y superadmin.

Campos:

- `id`
- `organization_id`
- `email`
- `password_hash`
- `roles`
- `first_name`
- `last_name`
- `phone`
- `is_active`
- `last_login_at`
- `created_at`
- `updated_at`

Roles iniciales:

- `ROLE_SUPER_ADMIN`
- `ROLE_ORG_ADMIN`
- `ROLE_DISPATCHER`
- `ROLE_DRIVER`

### DriverProfile

Perfil operativo del conductor. Se separa de `User` para permitir reglas especificas.

Campos:

- `id`
- `user_id`
- `license_number`
- `status`: active, inactive, suspended

### Vehicle

Vehiculo que puede emitir ubicacion.

Campos:

- `id`
- `organization_id`
- `code`
- `plate_number`
- `name`
- `capacity`
- `vehicle_type`: bus, minibus, van, tram, other
- `status`: active, maintenance, inactive
- `created_at`
- `updated_at`

### Line

Linea visible al usuario.

Campos:

- `id`
- `organization_id`
- `code`
- `name`
- `color`
- `is_public`
- `is_active`

### Route

Recorrido de una linea. Una linea puede tener ida/vuelta o variantes.

Campos:

- `id`
- `line_id`
- `name`
- `direction`
- `encoded_polyline`
- `distance_meters`
- `estimated_duration_seconds`
- `is_active`

### Stop

Parada fisica.

Campos:

- `id`
- `organization_id`
- `code`
- `name`
- `lat`
- `lng`
- `is_accessible`
- `is_active`

### RouteStop

Relacion ordenada entre ruta y parada.

Campos:

- `id`
- `route_id`
- `stop_id`
- `position`
- `distance_from_start_meters`
- `scheduled_offset_seconds`

### ServiceRun

Ejecucion concreta de una ruta por conductor y vehiculo.

Campos:

- `id`
- `organization_id`
- `route_id`
- `vehicle_id`
- `driver_id`
- `status`: planned, active, paused, finished, cancelled
- `started_at`
- `paused_at`
- `finished_at`
- `last_location_at`

### GpsPosition

Historico persistido de ubicaciones relevantes.

Campos:

- `id`
- `service_run_id`
- `vehicle_id`
- `driver_id`
- `lat`
- `lng`
- `accuracy_meters`
- `speed_kmh`
- `heading`
- `battery_level`
- `connection_status`
- `recorded_at`
- `received_at`

### Incident

Aviso operativo o publico.

Campos:

- `id`
- `organization_id`
- `line_id`
- `route_id`
- `vehicle_id`
- `type`: accident, delay, traffic, maintenance, breakdown, notice
- `severity`: low, medium, high
- `visibility`: internal, public
- `title`
- `description`
- `status`: open, resolved, cancelled
- `starts_at`
- `ends_at`
- `created_by_id`

### FareProduct

Producto vendible: billete sencillo, diario, por linea, etc.

Campos:

- `id`
- `organization_id`
- `name`
- `description`
- `price_cents`
- `currency`
- `validity_minutes`
- `scope`: all_lines, line, route
- `line_id`
- `is_active`

### Payment

Registro del intento/cobro.

Campos:

- `id`
- `organization_id`
- `fare_product_id`
- `provider`: stripe, bizum, manual
- `provider_payment_id`
- `amount_cents`
- `currency`
- `status`: pending, requires_action, paid, failed, refunded, cancelled
- `metadata`
- `created_at`
- `paid_at`

### Ticket

Billete emitido tras pago confirmado.

Campos:

- `id`
- `organization_id`
- `payment_id`
- `fare_product_id`
- `public_code`
- `qr_token_hash`
- `signature`
- `status`: issued, used, expired, cancelled, suspicious
- `valid_from`
- `valid_until`
- `used_at`
- `used_by_driver_id`
- `used_on_vehicle_id`

### TicketValidation

Auditoria de cada intento de validacion.

Campos:

- `id`
- `ticket_id`
- `driver_id`
- `vehicle_id`
- `result`: valid, used, expired, invalid_signature, not_found, suspicious
- `lat`
- `lng`
- `validated_at`

## Migraciones iniciales

Orden recomendado:

1. `organization`
2. `user`
3. `driver_profile`
4. `vehicle`
5. `line`
6. `route`
7. `stop`
8. `route_stop`
9. `service_run`
10. `gps_position`
11. `incident`
12. `fare_product`
13. `payment`
14. `ticket`
15. `ticket_validation`

## Indices importantes

- `organization.slug` unico.
- `vehicle.organization_id + vehicle.code` unico.
- `line.organization_id + line.code` unico.
- `stop.organization_id + stop.code` unico si se usan codigos publicos.
- `service_run.status + organization_id`.
- `gps_position.service_run_id + recorded_at`.
- `ticket.public_code` unico.
- `ticket.qr_token_hash` unico.
- `payment.provider + provider_payment_id` unico.

