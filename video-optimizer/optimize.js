const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputDir = 'Input Path';
const outputDir = 'Output Path';

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Leer la lista de archivos en el directorio de entrada
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio de entrada:', err);
    return;
  }

  // Filtrar los archivos .mp4
  const mp4Files = files.filter(file => path.extname(file) === '.mp4');

  // Iterar sobre los archivos .mp4
  mp4Files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputFileName = `Optimizado_${file}`;
    const outputPath = path.join(outputDir, outputFileName);

    // Comando para FFmpeg
    const ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 23 -c:a aac -b:a 128k "${outputPath}"`;

    // Ejecutar el comando de FFmpeg
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al optimizar ${file}:`, error);
        return;
      }
      console.log(`Archivo optimizado: ${outputPath}`);
    });
  });
});
