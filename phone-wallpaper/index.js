const Jimp = require("jimp");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function procesarImagenes(inputFolder, outputFolder) {
  const files = fs.readdirSync(inputFolder);

  for (const file of files) {
    const filePath = path.join(inputFolder, file);
    if (!fs.lstatSync(filePath).isDirectory() && !file.includes("unsplash")) {
      // Ignorar subcarpetas y archivos con 'unsplash' en el nombre (suponemos que si las descargas de unsplash ya las descargas siendo verticales)
      const image = await Jimp.read(filePath);
      const aspectRatio = image.getWidth() / image.getHeight();
      let width, height;

      if (aspectRatio > 9 / 16) {
        width = Math.floor(image.getHeight() * (9 / 16));
        height = image.getHeight();
      } else {
        width = image.getWidth();
        height = Math.floor(image.getWidth() * (16 / 9));
      }

      await image.cover(width, height); // Recortar a relación de aspecto 9:16
      await image.quality(100);
      const outputName = `${path.parse(file).name}-vertical${path.parse(file).ext}`;
      await image.writeAsync(path.join(outputFolder, outputName));
      console.log(`Imagen ${file} procesada.`);
    }
  }

  console.log("Procesamiento de imágenes completado.");
}

function crearCarpeta(ruta) {
  if (!fs.existsSync(ruta)) {
    fs.mkdirSync(ruta);
    console.log(`Carpeta "${ruta}" creada.`);
  } else {
    console.log(`La carpeta "${ruta}" ya existe.`);
  }
}

async function main() {
  rl.question("Introduce la ruta de la carpeta de entrada: ", (inputPath) => {
    rl.question("Introduce el nombre de la carpeta de salida: ", (outputName) => {
      const outputPath = `${inputPath}/${outputName}`;
      crearCarpeta(outputPath);
      procesarImagenes(inputPath, outputPath).then(() => {
        rl.close();
      });
    });
  });
}

main();
