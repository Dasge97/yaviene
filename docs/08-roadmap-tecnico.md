# 08 - Roadmap Tecnico

## Hito 0: Bootstrap

- Crear proyecto Symfony.
- Configurar Docker Compose con PHP, PostgreSQL, Redis y Mercure.
- Configurar Doctrine, migraciones, fixtures y tests.
- Configurar JWT.
- Crear pipeline basico de lint/test.

Criterio de salida:

- API responde healthcheck.
- Base de datos migra desde cero.
- Tests base ejecutan.

## Hito 1: Dominio base

- Entidades: Organization, User, DriverProfile, Vehicle, Line, Route, Stop, RouteStop.
- Migraciones e indices.
- Fixtures demo.
- CRUD admin minimo.
- Filtrado por organizacion.

Criterio de salida:

- Un admin puede configurar una linea con ruta, paradas, vehiculo y conductor.

## Hito 2: App conductor y servicios

- Login conductor.
- Crear ServiceRun.
- Pausar, reanudar y finalizar.
- Enviar ubicacion GPS.
- Validaciones de permisos y estado.
- Persistencia de historico basico.

Criterio de salida:

- Un conductor puede iniciar una ruta y enviar posiciones desde cliente o simulador.

## Hito 3: Tiempo real publico

- Redis para ultima posicion.
- Publicador Mercure.
- Endpoint `/live`.
- Portal publico con mapa.
- Estado offline automatico.

Criterio de salida:

- Una posicion enviada por conductor aparece en el mapa publico en segundos.

## Hito 4: Operacion admin

- Mapa operativo.
- Estados de vehiculo.
- Incidencias internas/publicas.
- Dashboard basico.
- Logs operativos.

Criterio de salida:

- Un dispatcher puede ver la flota e informar incidencias al publico.

## Hito 5: Pagos y tickets

- FareProduct.
- Payment con Stripe.
- Webhook verificado.
- Ticket y QR firmado.
- Validacion QR online.
- Auditoria de validaciones.

Criterio de salida:

- Un usuario compra un billete y un conductor lo valida una sola vez.

## Hito 6: Endurecimiento

- Rate limiting.
- Tests de seguridad basicos.
- Manejo de desconexion movil.
- Retencion de datos GPS.
- Monitorizacion.
- Backups.

Criterio de salida:

- El sistema puede pilotarse con una organizacion real pequena.

## Hito 7: Analitica

- KPIs de viajes.
- Retrasos.
- Lineas mas usadas.
- Horas pico.
- Exportacion CSV.

Criterio de salida:

- Administracion puede tomar decisiones operativas con datos historicos.

## Primer backlog tecnico

1. Definir entidades Doctrine y enums.
2. Crear migraciones iniciales.
3. Crear fixtures demo.
4. Implementar auth JWT.
5. Implementar endpoints conductor.
6. Implementar `TrackingService`.
7. Integrar Redis.
8. Publicar eventos Mercure.
9. Crear portal publico basico con mapa.
10. Crear CRUD admin minimo.

## Riesgos

| Riesgo | Mitigacion |
| --- | --- |
| GPS inestable en segundo plano | Elegir tecnologia movil con buen soporte background location y probar en dispositivos reales |
| Crecimiento de historico GPS | Muestreo, particionado y politicas de retencion |
| Fraude de tickets | QR firmado, uso unico, expiracion y validacion transaccional |
| Complejidad multi-tenant | Organization obligatoria desde primera migracion |
| Coste de mapas | Empezar con Leaflet/OpenStreetMap |
| Tiempo real complejo | Mercure antes que WebSocket custom |

