@echo off
setlocal enabledelayedexpansion

set "inputFile=%1"

if not defined inputFile (
  echo No se proporcionó un archivo válido.
  pause
  exit /b
)

if not exist "!inputFile!" (
  echo El archivo "!inputFile!" no existe.
  pause
  exit /b
)

for %%A in ("!inputFile!") do set "fileName=%%~nA"

set "outputFile=!fileName!_optimized.mp4"

ffmpeg -i "!inputFile!" -c:v libx264 -crf 23 -c:a aac -b:a 128k "!outputFile!"

echo Proceso completado. El archivo "!outputFile!" ha sido creado.
pause
