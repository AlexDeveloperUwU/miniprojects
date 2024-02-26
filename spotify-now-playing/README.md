# Spotify Now Playing

Este script permite ver que canción estás escuchando en Spotify. 

## Requisitos

Necesitarás un `Client ID` y un `Client Secret`, los cuales puedes obtener en el [Spotify Developer Portal](https://developer.spotify.com/dashboard/applications). Al crear tu aplicación, asegúrate de agregar `http://localhost:8888/callback` como **Redirect URI**.

## Uso

1. Instala las dependencias ejecutando `npm install` en la terminal.
2. Agrega tu `Client ID` y `Client Secret` en las variables correspondientes (`CLIENT_ID` y `CLIENT_SECRET`). Deberás crear un `.env` que contenga esas variables.
3. Ejecuta `node index.js`.
4. Abre tu navegador y visita `http://localhost:8888/login`.
5. Sigue las instrucciones para otorgar los permisos necesarios.
6. Se te abrirá una página que te mostrará la canción que estás escuchando.

### Consideraciones

Este script es un ejemplo funcional y puede mejorarse en términos de seguridad y diseño. Asegúrate de mantener tus credenciales seguras y de cumplir con los términos de uso de la API de Spotify.

Ten en cuenta que los desarrolladores de Spotify pueden cambiar su API, por lo que este script puede necesitar ajustes futuros.

Además, este script no está diseñado para su uso por individual, si no que está pensado para usar en otros proyectos.