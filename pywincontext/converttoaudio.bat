@echo off
setlocal enabledelayedexpansion

rem Obtener el nombre completo del archivo de entrada con comillas dobles para manejar espacios
set "inputFile=%~1"

if not defined inputFile (
  echo No se proporcionó un archivo válido.
  pause
  exit /b
)

rem Verificar si el archivo de entrada existe
if not exist "!inputFile!" (
  echo El archivo "!inputFile!" no existe.
  pause
  exit /b
)

rem Obtener el nombre base del archivo de entrada (sin extensión)
for %%A in ("!inputFile!") do set "fileName=%%~nxA"

rem Construir el nombre del archivo de salida con extensión .mp3
set "outputFile=!fileName:.mp4=.mp3!"

rem Llamar a ffmpeg para convertir el archivo de entrada a MP3
ffmpeg -i "!inputFile!" -vn -c:a libmp3lame -q:a 2 "!outputFile!"

echo Proceso completado. El archivo "!outputFile!" ha sido creado.
pause
