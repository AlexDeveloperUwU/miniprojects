const fs = require('fs');
const path = require('path');

const folderPath = __dirname;

function isImageExtension(extension) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  return imageExtensions.includes(extension.toLowerCase());
}

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }

  files.forEach((file) => {
    const fileExtension = path.extname(file);

    if (isImageExtension(fileExtension)) {
      const inputFilePath = path.join(folderPath, file);
      const outputFilePath = path.join(folderPath, file.slice(1));

      fs.rename(inputFilePath, outputFilePath, (renameErr) => {
        if (renameErr) {
          console.error(`Error al renombrar ${file}:`, renameErr);
        } else {
          console.log(`Se eliminó la primera letra de ${file}`);
        }
      });
    }
  });
});
