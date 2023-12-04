# Integración de Node Media Server con Video.js

Este proyecto combina la potencia de Node Media Server y Video.js para facilitar la transmisión de video sin problemas. Node Media Server se utiliza para manejar la transmisión mediante el Protocolo de Mensajes en Tiempo Real (RTMP), mientras que Video.js mejora la interfaz de usuario y proporciona un reproductor de video personalizable.

## Estructura del Proyecto

- **`server.js`**: Punto de entrada para la configuración del servidor Node Media.
- **`index.html`**: Archivo HTML que integra Video.js para la reproducción de video.

## Tecnologías Utilizadas

- [Node Media Server](https://www.npmjs.com/package/node-media-server): Una implementación de Node.js del servidor RTMP y HTTP(S).
- [Video.js](https://videojs.com/): Un reproductor de video HTML5 de código abierto que admite varios formatos de video.

## Configuración

El servidor Node Media está configurado con ajustes RTMP en el puerto 1936 y ajustes HTTP en el puerto 8081. El reproductor Video.js está configurado para transmitir contenido desde el servidor Node Media.

```javascript
const config = {
  rtmp: {
    port: 1936,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8081,
    allow_origin: "*",
  },
};
```

## Reconocimientos

- [Node Media Server](https://www.npmjs.com/package/node-media-server)
- [Video.js](https://videojs.com/)
