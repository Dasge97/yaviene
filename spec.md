# Proyecto: TransitFlow
### Plataforma ligera de seguimiento, información y pago para transporte público urbano

Versión: 0.1  
Estado: Concepto / Documento inicial de especificación  
Fecha: Mayo 2026

---

# 1. Resumen ejecutivo

TransitFlow es una plataforma SaaS ligera para transporte público urbano y privado que permite seguimiento GPS en tiempo real, visualización pública de rutas y pagos digitales sin necesidad de instalación de hardware dedicado ni procesos complejos para usuarios.

La propuesta busca sustituir sistemas costosos basados en dispositivos instalados en vehículos por una solución basada en smartphones y aplicaciones web.

El sistema se orienta inicialmente a:

- Ayuntamientos pequeños y medianos
- Transporte municipal
- Transporte escolar
- Lanzaderas privadas
- Universidades
- Hoteles
- Empresas con transporte interno
- Eventos y ferias

El objetivo principal es:

Reducir costes de implantación y mejorar la experiencia del usuario.

---

# 2. Problema detectado

Muchos sistemas actuales presentan uno o varios problemas:

- No existe información en tiempo real
- La localización es inexacta
- Requieren hardware dedicado
- Instalación cara
- Sistemas antiguos
- Mala experiencia móvil
- Necesidad de crear cuentas
- Sistemas de pago complejos
- Dependencia de tarjetas físicas

En numerosos municipios pequeños ni siquiera existe información digital.

El usuario depende de:

- horarios fijos
- llamadas
- esperar en parada
- incertidumbre

---

# 3. Solución

Crear un ecosistema ligero basado en:

Conductor → móvil GPS  
Backend → procesamiento y tiempo real  
Mapa público → usuarios  
Panel administración → gestión  
Sistema pago → QR digital

Sin instalaciones adicionales.

---

# 4. Arquitectura general

```text
Conductor
   ↓
Aplicación conductor
   ↓
GPS + eventos
   ↓
API Backend
   ↓
Redis + Base datos
   ↓
Websocket
   ↓
Frontend público
   ↓
Usuario
5. Componentes del sistema
5.1 App conductor

Aplicación Android inicialmente.

Funciones:

Login conductor
Seleccionar línea
Seleccionar vehículo
Iniciar ruta
Pausar
Finalizar ruta

En segundo plano:

GPS cada X segundos
velocidad
batería
estado conexión

Envía:

{
 "driver_id":45,
 "bus_id":12,
 "route":"L2",
 "lat":43.25,
 "lng":-2.93,
 "speed":40,
 "battery":72,
 "timestamp":"..."
}

Frecuencia:

Normal:
cada 5 segundos

Modo ahorro:
cada 15 segundos

Modo detenido:
cada 30 segundos

5.2 Backend

Responsabilidades:

autenticación
gestión rutas
GPS
eventos tiempo real
pagos
tickets
validación QR
analíticas

Posible stack:

API:

Node.js
FastAPI
Symfony

Tiempo real:

Socket.io
Websocket

Cache:

Redis

Base datos:

PostgreSQL
5.3 Base datos inicial

Tablas:

Usuarios

Conductores

Vehículos

Rutas

Paradas

Lineas

PosicionesGPS

Tickets

Pagos

Incidencias

Ayuntamientos

Empresas

6. Panel administración

Acceso privado.

Funciones:

Gestión de líneas

Crear

Editar

Eliminar

Asignar:

rutas
vehículos
conductores
Mapa operativo

Visualización tiempo real:

🟢 activo

🟡 detenido

🔴 sin conexión

Información:

Bus:

conductor
velocidad
batería
ubicación
retraso
última conexión
Gestión incidencias

Crear:

accidente
retraso
tráfico
mantenimiento
vehículo averiado

Los usuarios reciben avisos.

Analíticas

KPIs:

Número viajes

Tiempo medio

Retrasos

Puntos conflictivos

Rutas utilizadas

Horas pico

7. Portal público usuario

Sin login obligatorio.

Objetivo:

acceso inmediato.

Funciones:

Ver:

mapa tiempo real
líneas
paradas
rutas
próximos buses

Ejemplo:

Línea 1:

Llegada:

2 minutos

Línea 4:

7 minutos

Vista detalle:

Parada A

Parada B

🚍 bus aquí

Parada C

Parada D

8. Sistema de pago

Objetivo:

cero fricción.

No requiere cuenta.

Métodos:

Apple Pay
Google Pay
tarjeta
Bizum (si disponible)

Flujo:

Usuario:

Selecciona billete

↓

Paga

↓

Backend genera QR

↓

Usuario enseña QR

↓

Validación

Ticket generado:

{
 "ticket":"A91D",
 "valid_until":"21:45",
 "line":"all",
 "nonce":"xyz",
 "signature":"..."
}
9. Sistema QR

QR firmado backend.

Protecciones:

expiración
uso único
firma
token aleatorio
validación online

Estados:

Válido

Usado

Caducado

Fraude

10. Sistema validación

Opciones:

Opción 1

Conductor valida desde móvil.

Opción 2

Segundo móvil dedicado.

Opción 3

Tablet instalada.

11. API inicial
Conductores

POST

/api/driver/login

POST

/api/driver/start

POST

/api/driver/location

POST

/api/driver/pause

POST

/api/driver/finish

Público

GET

/api/routes

GET

/api/stops

GET

/api/line/:id

GET

/api/live

Tickets

POST

/api/payment/create

POST

/api/payment/confirm

GET

/api/ticket/:id

POST

/api/ticket/validate

12. Tiempo real

Tecnología:

Websocket

Eventos:

Bus actualizado

Ruta iniciada

Ruta finalizada

Retraso

Incidencia

13. IA futura

No forma parte MVP.

Posibilidades:

Predicción llegada:

ETA inteligente

Detección:

tráfico
retrasos
anomalías

Análisis conductor:

horarios
patrones
eficiencia

Optimización:

frecuencia rutas
horarios

Recomendaciones automáticas.

14. Modelo negocio

Modelo SaaS.

Ayuntamiento paga:

por:

vehículos
rutas
población
uso mensual

Ejemplos:

Pueblo pequeño:

5-10 vehículos

300-500 €/mes

Ciudad media:

50 vehículos

2000-4000 €/mes

Servicios adicionales:

Integraciones ERP

App personalizada

Marca blanca

Analíticas premium

Módulo IA

15. Roadmap MVP

Fase 1

login conductor
GPS tiempo real
mapa público
rutas
panel básico

Duración:

2-4 semanas

Fase 2

pagos
QR
validación

Duración:

2 semanas

Fase 3

incidencias
analíticas

Duración:

2 semanas

Fase 4

IA
predicciones
optimización
16. Riesgos

GPS impreciso

Ahorro batería Android

Pérdida cobertura

Fraude QR

Resistencia ayuntamientos

Integraciones heredadas

17. Visión

Eliminar la necesidad de hardware especializado y permitir que cualquier ciudad o empresa pueda disponer de transporte inteligente mediante únicamente smartphones y software.



Documento inicial listo para pasar a Notion, Git, `spec.md` o directamente alimentar a Codex/OpenCode. Los humanos aman convertir una idea de "un puntito moviéndose en un mapa" en 17 apartados y 400 líneas. Y lo peor es que esta vez tiene bastante sentido.