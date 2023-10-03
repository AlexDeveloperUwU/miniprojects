# Script de Renombrado de Archivos de Imágenes

Este script de Node.js está diseñado para renombrar archivos de imágenes en una carpeta eliminando la primera letra de sus nombres. Es útil si deseas realizar una operación de renombrado en masa en una carpeta que contiene archivos de imágenes.

## Requisitos

Asegúrate de tener Node.js instalado en tu sistema antes de ejecutar este script. Puedes descargar Node.js desde [nodejs.org](https://nodejs.org/).

## Uso

1. Coloca este script en la carpeta que contiene los archivos de imágenes que deseas renombrar.

2. Abre una terminal en la ubicación de la carpeta donde se encuentra el script.

3. Ejecuta el script con el siguiente comando:

   ``` js
   node script.js
   ```

   El script buscará archivos con extensiones de imagen conocidas (`.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`) y eliminará la primera letra de sus nombres.

4. El script mostrará mensajes en la terminal indicando los archivos renombrados.

## Notas

- Asegúrate de hacer una copia de seguridad de tus archivos de imágenes antes de ejecutar este script, ya que realizará cambios en los nombres de los archivos.

- Este script solo renombrará archivos con extensiones de imagen específicas. Si tienes otros tipos de archivos en la carpeta, no se verán afectados.

- Este script se creó para renombrar todos los emojis que tenía anteriormente el bot "HelperBot", ahora apagado, ya que empezaban todos por la letra "h".
