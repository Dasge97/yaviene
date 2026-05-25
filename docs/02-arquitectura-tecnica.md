# 02 - Arquitectura Tecnica

## Vista general

```text
App conductor ----\
                   -> API Symfony -> PostgreSQL
Portal publico ---/        |
Panel admin ------         -> Redis
                            |
                            -> Mercure/WebSocket/SSE -> clientes en tiempo real
                            |
                            -> Pasarela de pagos
```

## Backend Symfony

Estructura recomendada:

```text
src/
  Controller/
    Api/V1/
    Admin/
    Public/
  Entity/
  Repository/
  Service/
    Auth/
    Tracking/
    Ticketing/
    Payment/
    Realtime/
  DTO/
  Enum/
  Security/
  Event/
  Message/
  Validator/
migrations/
tests/
```

Capas:

- Controller: entrada HTTP, validacion superficial y respuesta.
- DTO: contratos de request/response.
- Service: reglas de negocio.
- Entity: persistencia Doctrine.
- Repository: consultas especificas.
- Message/Handler: procesos asincronos con Symfony Messenger.
- Event: eventos de dominio internos.

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| API REST | Gestion de entidades, operaciones conductor, pagos y tickets |
| Redis | Ultima posicion por vehiculo, sesiones activas y publicacion de eventos |
| PostgreSQL | Datos maestros, historico, pagos, tickets y auditoria |
| Mercure | Difusion en tiempo real a portal y panel |
| Messenger | Procesar GPS, webhooks, notificaciones y analitica |
| Scheduler/Cron | Caducar tickets, detectar vehiculos offline, tareas de limpieza |

## Decisiones recomendadas

### Tiempo real

Usar Mercure si se prioriza integracion Symfony, JWT, topicos y simplicidad operativa. Usar WebSocket custom solo si se necesita protocolo bidireccional complejo.

### Historico GPS

Guardar todas las posiciones puede crecer muy rapido. Para MVP:

- Redis guarda siempre la ultima posicion por servicio/vehiculo.
- PostgreSQL guarda una muestra cada N segundos o cuando hay cambio significativo de distancia/estado.
- Las posiciones crudas pueden archivarse despues si se necesita analitica fina.

### Multi-tenant

Todas las entidades operativas deben pertenecer a `Organization`. Las consultas de API deben filtrar siempre por organizacion del usuario autenticado o por slug publico.

### API publica

No requiere login para consultar lineas, paradas, posiciones publicas e incidencias. Debe aplicar rate limiting.

## Configuracion base

Variables de entorno iniciales:

```dotenv
APP_ENV=dev
APP_SECRET=change-me
DATABASE_URL=postgresql://app:app@postgres:5432/transitflow
REDIS_URL=redis://redis:6379
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
MERCURE_URL=http://mercure/.well-known/mercure
MERCURE_PUBLIC_URL=http://localhost/.well-known/mercure
MERCURE_JWT_SECRET=change-me
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Entornos

| Entorno | Uso |
| --- | --- |
| local | Desarrollo con Docker Compose |
| staging | Validacion con datos de prueba realistas |
| production | Operacion de clientes reales |

## Observabilidad

Desde el inicio conviene registrar:

- Request id por peticion.
- Usuario y organizacion cuando exista autenticacion.
- Errores de GPS invalido.
- Latencia de endpoints criticos.
- Webhooks recibidos y resultado.
- Validaciones de QR exitosas y fallidas.

