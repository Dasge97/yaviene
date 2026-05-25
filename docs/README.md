# TransitFlow - Documentacion de Implementacion

TransitFlow es una plataforma para seguimiento, informacion publica y pago digital de transporte urbano, escolar, privado o institucional. El backend sera compartido por el portal web, el panel de administracion y la app movil.

Este directorio convierte la idea inicial de `spec.md` en documentacion accionable para empezar a implementar.

## Documentos

- [01 Producto y MVP](01-producto-mvp.md): alcance funcional, actores, casos de uso y fases.
- [02 Arquitectura tecnica](02-arquitectura-tecnica.md): stack Symfony, componentes, despliegue y decisiones base.
- [03 Dominio y modelo de datos](03-dominio-modelo-datos.md): entidades, relaciones, estados y migraciones iniciales.
- [04 API REST](04-api-rest.md): convenciones, endpoints, contratos y codigos de error.
- [05 Tiempo real y GPS](05-tiempo-real-gps.md): ingesta de ubicaciones, Redis, eventos y WebSocket/SSE.
- [06 Seguridad, pagos y QR](06-seguridad-pagos-qr.md): autenticacion, roles, tickets, pagos y validacion.
- [07 Clientes web y movil](07-clientes-web-movil.md): portal publico, panel admin y app conductor.
- [08 Roadmap tecnico](08-roadmap-tecnico.md): plan de implementacion por hitos.

## Stack propuesto

- Backend: Symfony 7, PHP 8.3+, Doctrine ORM, API Platform opcional solo si se decide estandarizar CRUD.
- Base de datos: PostgreSQL con PostGIS si se requieren consultas geoespaciales avanzadas.
- Cache y tiempo real: Redis.
- Tiempo real hacia clientes: Mercure recomendado en ecosistema Symfony. WebSocket custom como alternativa.
- Pagos: Stripe como primera integracion, con Payment Request para Apple Pay y Google Pay cuando aplique.
- Web: Symfony/Twig para panel inicial o SPA separada si el producto crece.
- Movil: app Android inicial, preferiblemente Flutter o React Native si se quiere reutilizar futuro iOS.

## Principios de implementacion

- Un backend comun expone API versionada para web y movil.
- El portal publico debe funcionar sin login.
- La app conductor debe ser robusta con mala conexion y enviar GPS en segundo plano.
- La posicion en tiempo real se guarda en Redis para lectura rapida y en PostgreSQL como historico filtrado.
- Los pagos y tickets deben ser auditables, idempotentes y verificables.
- Las entidades deben soportar multi-tenant desde el inicio: ayuntamientos, empresas u organizaciones.

