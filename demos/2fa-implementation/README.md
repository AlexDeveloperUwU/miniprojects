# Demo de Autenticación de Dos Factores (2FA) con Node.js y Express

Esta es una demo básica de cómo implementar la autenticación de dos factores (2FA) en una aplicación de Node.js utilizando Express, `otplib` para la generación y verificación de códigos TOTP, y `qrcode` para la generación de códigos QR.

## Requisitos

- Node.js (v18 o superior recomendado)
- npm (o yarn)
- Una aplicación de autenticación TOTP como Google Authenticator o Authy

## Instalación

1. Clona el repositorio o descarga los archivos.

2. Instala las dependencias necesarias ejecutando el siguiente comando:

   ```bash
   npm install express otplib qrcode
   ```

3. Ejecuta la app con el comando siguiente:

   ```bash
   node app.js
   ```

## Uso

### Registro (Generar Secreto y Código QR)

Para registrar un nuevo secreto y generar un código QR que puedas escanear con Google Authenticator, haz una petición `POST` a la ruta `/register`.

#### Ejemplo de petición con `curl`:

```bash
curl -X POST http://localhost:3000/register
```

#### Respuesta esperada:

```json
{
  "secret": "NUEVO_SECRETO_BASE32",
  "qrCode": "DATA_URL_DEL_CODIGO_QR"
}
```

- **secret**: Es el secreto que será utilizado para generar códigos TOTP en tu aplicación de autenticación.
- **qrCode**: Es la imagen en formato base64 de un código QR que puedes escanear con una aplicación como Google Authenticator.

### Verificación del código 2FA

Una vez que hayas escaneado el código QR con una app de autenticación, la app comenzará a generar códigos TOTP cada 30 segundos. Para verificar un código, haz una petición `POST` a la ruta `/verify` con el código (`token`) y el secreto que se te proporcionó.

#### Ejemplo de petición con `curl`:

```bash
curl -X POST http://localhost:3000/verify \
-H "Content-Type: application/json" \
-d '{"token": "CODIGO_GENERADO", "secret": "SECRET_BASE32"}'
```

#### Respuesta esperada si el código es correcto:

```json
{
  "message": "Código válido"
}
```

#### Respuesta esperada si el código es incorrecto:

```json
{
  "message": "Código inválido"
}
```

#### Respuesta:

- Si el código es correcto: `{"message": "Código válido"}`
- Si el código es incorrecto: `{"message": "Código inválido"}`

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js.
- **otplib**: Librería para la generación y verificación de códigos TOTP (Time-based One-Time Password).
- **qrcode**: Librería para generar códigos QR.