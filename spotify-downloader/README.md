# Spotify Auto Downloader

Este script automatiza la descarga de música utilizando la herramienta "spotdl" para diversos artistas de Spotify. Esto se logra sin intervención humana, permitiendo que el proceso se ejecute de manera continua y sin complicaciones.

**IMPORTANTE:** Asegúrate de tener **Node.js** versión 18 instalado y la última versión de **spotdl**. Cumplir con estos requisitos es crucial antes de ejecutar el programa.

Para utilizar este script, debes tener la herramienta "spotdl" descargada e instalada en Python. Puedes instalarla utilizando el comando "pip install spotdl". Si no tienes el ejecutable FFmpeg, usa "spotdl --download-ffmpeg" para descargarlo.

Los pasos a seguir son los siguientes:

1. Instala las dependencias con el comando "npm i".
2. Coloca las URLs de los artistas en el archivo "url.txt", siguiendo las instrucciones proporcionadas en el mismo archivo.
3. Ejecuta "node index.js" para iniciar la descarga de música.

Si deseas eliminar las versiones en vivo de todos los artistas excepto alguno, puedes agregar su nombre en un array dentro del archivo "liveRemover.js" para evitar que se eliminen las versiones live de su carpeta.

## Código Detallado

### index.js

Este archivo se encarga de descargar la música de los artistas utilizando la herramienta "spotdl" y organiza las canciones en carpetas correspondientes a cada artista.

### liveRemover.js

Este archivo elimina las versiones "en vivo" de las canciones, excepto las de los artistas que están excluidos del proceso.