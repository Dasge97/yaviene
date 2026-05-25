# 01 - Producto y MVP

## Vision

TransitFlow permite que una organizacion publique sus lineas de transporte, siga vehiculos en tiempo real y venda o valide billetes digitales sin instalar hardware dedicado.

El producto se divide en cuatro superficies:

- Backend API compartido.
- App conductor.
- Portal publico para usuarios.
- Panel de administracion.

## Actores

| Actor | Descripcion | Necesita cuenta |
| --- | --- | --- |
| Usuario publico | Consulta rutas, paradas, llegadas y compra billetes | No obligatorio |
| Conductor | Inicia servicios, emite GPS y valida QR | Si |
| Administrador operador | Gestiona lineas, vehiculos, conductores e incidencias | Si |
| Superadmin SaaS | Gestiona organizaciones, planes y configuracion global | Si |
| Sistema de pagos | Confirma cobros mediante webhook | No aplica |

## MVP recomendado

El MVP debe demostrar valor con seguimiento real y una operacion administrable. Pagos pueden quedar en una segunda fase si se quiere reducir riesgo inicial.

### MVP 1: Seguimiento y operacion

- Login conductor.
- Seleccion de vehiculo, linea y servicio.
- Inicio, pausa y finalizacion de ruta.
- Envio de ubicacion GPS.
- Portal publico con mapa, lineas, paradas y vehiculos activos.
- Panel admin basico para CRUD de organizaciones, lineas, rutas, paradas, vehiculos y conductores.
- Estado operativo de vehiculos: activo, detenido, sin conexion, finalizado.
- Incidencias manuales.

### MVP 2: Tickets y QR

- Catalogo de tarifas y tipos de billete.
- Creacion de intento de pago.
- Confirmacion de pago por webhook.
- Emision de QR firmado.
- Validacion online desde app conductor.
- Estados del ticket: emitido, usado, caducado, cancelado, sospechoso.

### MVP 3: Analitica

- Historico de viajes.
- Puntualidad y retrasos.
- Vehiculos activos por franja.
- Uso de lineas y paradas.
- Exportacion CSV.

## Casos de uso principales

### Usuario publico consulta transporte

1. Abre el portal publico.
2. Selecciona organizacion, linea o parada.
3. Ve vehiculos activos en mapa.
4. Consulta proximas llegadas estimadas.
5. Recibe avisos de incidencias relevantes.

### Conductor opera una ruta

1. Inicia sesion.
2. Selecciona vehiculo asignado.
3. Selecciona linea/ruta.
4. Inicia servicio.
5. La app envia ubicacion periodicamente.
6. Puede pausar o finalizar.
7. Puede validar tickets QR.

### Administrador configura el sistema

1. Crea lineas.
2. Define rutas y paradas.
3. Registra vehiculos.
4. Da de alta conductores.
5. Consulta operacion en vivo.
6. Crea incidencias y mensajes visibles al publico.

## Requisitos no funcionales

- Latencia objetivo de ubicacion visible: menor de 5 segundos desde recepcion backend.
- Tolerancia a perdida de conectividad en app conductor.
- API versionada desde el inicio.
- Auditoria de acciones sensibles: pagos, validaciones, cambios de configuracion.
- Soporte multi-tenant sin mezclar datos entre organizaciones.
- Diseno mobile-first para portal publico.

## Fuera de alcance inicial

- Prediccion IA avanzada de llegada.
- Optimizacion automatica de rutas.
- Hardware dedicado.
- Validacion offline completa de tickets.
- Integraciones complejas con tarjetas fisicas o consorcios externos.

