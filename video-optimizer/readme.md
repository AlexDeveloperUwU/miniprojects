# Optimizador de Videos

Este script de Node.js está diseñado para optimizar archivos de video en el directorio de entrada especificado utilizando la herramienta FFmpeg. Lee todos los archivos `.mp4` del directorio de entrada, aplica configuraciones de optimización utilizando FFmpeg y guarda los archivos optimizados en el directorio de salida.

## Prerrequisitos

- Node.js instalado en tu máquina.
- FFmpeg instalado en tu máquina.

## Cómo Utilizar

1. Clona este repositorio o descarga el archivo del script.

2. Modifica el script configurando las rutas de los directorios de entrada y salida:

```javascript
const inputDir = 'Ruta/Directorio/Entrada';    // Ruta del directorio de entrada que contiene archivos .mp4
const outputDir = 'Ruta/Directorio/Salida';    // Ruta del directorio de salida para los archivos optimizados
```

3. Ejecuta el script utilizando Node.js:

```sh
node optimize.js
```

El script realizará lo siguiente:
- Creará el directorio de salida si no existe.
- Leerá la lista de archivos en el directorio de entrada.
- Filtrará los archivos `.mp4`.
- Iterará sobre cada archivo `.mp4` y lo optimizará utilizando FFmpeg.
- Guardará el archivo optimizado en el directorio de salida.

## Notas

- Este script utiliza la herramienta de línea de comandos de FFmpeg para optimizar videos. Asegúrate de que FFmpeg esté instalado correctamente y sea accesible en la ruta del sistema.

## Descargo de Responsabilidad

El autor de este script no se hace responsable por ningún mal uso o problemas legales que puedan surgir por su uso.
