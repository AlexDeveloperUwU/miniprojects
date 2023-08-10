const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

function reduceImageSize(imagePath, quality) {
  const processedImages = loadProcessedImagesLog();

  if (processedImages.has(imagePath)) {
    console.log(`La imagen ya ha sido optimizada previamente: ${imagePath}`);
    return;
  }

  sharp(imagePath).jpeg({ quality }).toBuffer((err, buffer) => {
    if (err) {
      console.error(`Error al reducir el tamaño de la imagen: ${imagePath}`);
      console.error(err);
      return;
    }
    fs.writeFileSync(imagePath, buffer);
    console.log(`Imagen optimizada: ${imagePath}`);
    updateProcessedImagesLog(imagePath);
  });
}

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(content).digest('hex');
  return hash;
}

function loadProcessedImagesLog() {
  try {
    const logData = fs.readFileSync('./processed_images.log', 'utf8');
    return new Set(logData.trim().split('\n'));
  } catch (err) {
    console.log('No se encontró el archivo de registro de imágenes procesadas. Se creará uno nuevo.');
    return new Set();
  }
}

function updateProcessedImagesLog(imagePath) {
  fs.appendFileSync('./processed_images.log', `${imagePath}\n`);
}

function processImages(folderPath, quality) {
  const processedImages = loadProcessedImagesLog();

  function processFile(filePath) {
    const fileExtension = path.extname(filePath).toLowerCase();
    if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png') {
      reduceImageSize(filePath, quality);
    }
  }

  function processFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        processFile(filePath);
      } else if (stat.isDirectory()) {
        processFolder(filePath);
      }
    }
  }

  processFolder(folderPath);
}

// Configuración
const inputFolder = './Memes';
const quality = 80; // Ajusta la calidad según tus preferencias (valores típicos: 1-100)

// Procesar imágenes
processImages(inputFolder, quality);
