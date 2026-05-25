# 06 - Seguridad, Pagos y QR

## Seguridad base

- Password hashing con el componente Security de Symfony.
- JWT para API movil y panel.
- Refresh tokens revocables.
- Rate limiting en login, API publica y validacion de tickets.
- Filtrado obligatorio por organizacion.
- Auditoria de acciones sensibles.

## Permisos

| Rol | Puede |
| --- | --- |
| `ROLE_SUPER_ADMIN` | Gestion SaaS completo |
| `ROLE_ORG_ADMIN` | Gestion de su organizacion |
| `ROLE_DISPATCHER` | Operacion diaria, incidencias y mapa |
| `ROLE_DRIVER` | Operar servicios y validar tickets |

## Pagos

Proveedor inicial recomendado: Stripe.

Motivos:

- Buen soporte de tarjeta.
- Apple Pay y Google Pay mediante Payment Request donde aplique.
- Webhooks maduros.
- Entorno sandbox claro.

Flujo:

1. Usuario selecciona producto.
2. Backend crea `Payment` pendiente.
3. Backend crea intento en Stripe.
4. Front confirma pago con Stripe.
5. Stripe llama webhook.
6. Backend verifica firma.
7. Backend marca `Payment` como pagado.
8. Backend emite `Ticket`.
9. Usuario recibe QR.

## Idempotencia

Debe aplicarse en:

- Creacion de pago.
- Procesamiento de webhooks.
- Emision de ticket.
- Validacion de ticket.

Un webhook duplicado no debe generar tickets duplicados.

## Ticket QR

El QR no debe contener datos sensibles ni informacion suficiente para falsificar un billete.

Payload sugerido:

```json
{
  "v": 1,
  "org": "bilbao-demo",
  "ticket": "A91D",
  "nonce": "random-128-bit",
  "exp": 1780000000,
  "sig": "base64url-signature"
}
```

El backend debe guardar solo el hash del token/nonce cuando sea posible.

## Firma

Opciones:

- HMAC SHA-256 con secreto por organizacion.
- Firma asimetrica si en el futuro se permite validacion offline.

Para MVP online, HMAC es suficiente si el secreto esta bien protegido y rota por organizacion.

## Validacion QR online

1. App conductor escanea QR.
2. Envia payload al backend.
3. Backend valida estructura, firma y expiracion.
4. Busca ticket por codigo y hash.
5. Comprueba estado.
6. Marca como usado en transaccion.
7. Registra `TicketValidation`.
8. Responde resultado.

Resultados:

- `valid`
- `used`
- `expired`
- `invalid_signature`
- `not_found`
- `suspicious`

## Reglas antifraude iniciales

- Ticket de uso unico.
- Expiracion clara.
- Validacion transaccional con bloqueo optimista o pesimista.
- Registro de conductor, vehiculo, hora y ubicacion.
- Rate limit por dispositivo/conductor.
- Alertar si un mismo QR se intenta validar muchas veces.

## Datos personales

El portal publico no requiere cuenta, por lo que la compra sin registro debe minimizar datos. Si se pide email para recuperacion de ticket, debe tratarse como dato personal.

Recomendaciones:

- No guardar PAN ni datos de tarjeta.
- Guardar solo referencias de proveedor.
- Definir politica de retencion de historico GPS y tickets.
- Registrar consentimientos si se anaden cuentas de usuario final.

