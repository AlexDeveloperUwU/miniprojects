const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputDir = 'Input Path';
const outputDir = 'Output Path';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio de entrada:', err);
    return;
  }

  const mp4Files = files.filter(file => path.extname(file) === '.mp4');

  mp4Files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputFileName = `Optimizado_${file}`;
    const outputPath = path.join(outputDir, outputFileName);

    const ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 23 -c:a aac -b:a 128k "${outputPath}"`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al optimizar ${file}:`, error);
        return;
      }
      console.log(`Archivo optimizado: ${outputPath}`);
    });
  });
});
