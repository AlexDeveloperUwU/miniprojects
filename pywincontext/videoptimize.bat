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
for %%A in ("!inputFile!") do (
  set "fileName=%%~nA"
  set "fileExtension=%%~xA"
)

rem Construir el nombre del archivo de salida optimizado
set "outputFile=!fileName!_optimized!fileExtension!"

rem Llamar a ffmpeg para optimizar el archivo de entrada
ffmpeg -i "!inputFile!" -c:v libx264 -crf 23 -c:a aac -b:a 128k "!outputFile!"

echo Proceso completado. El archivo "!outputFile!" ha sido creado.
pause
