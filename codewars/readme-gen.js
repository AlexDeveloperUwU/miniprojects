const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Ruta de la carpeta raíz
const rootFolder = './codewars';

// Función para leer y ejecutar el script con el slug
function executeScriptWithSlug(folderPath, slug) {
  const kataUrl = `https://www.codewars.com/api/v1/code-challenges/${slug}`;

  axios.get(kataUrl)
    .then(response => {
      if (response.status === 200) {
        const data = response.data;
        const title = data.name;
        const description = data.description;
        const createdBy = data.createdBy.username;
        const publishedAt = new Date(data.publishedAt).toLocaleDateString();
        const kataUrl = data.url;

        // Generar el contenido del README.md
        const readmeContent = `# Título del Kata realizado:
${title}

## Descripción del Kata realizado:
${description}

## Información del Kata realizado:
Creado por: ${createdBy}
Publicado el: ${publishedAt}
URL: [Haz click aquí para ir al Kata](${kataUrl})`;

        // Escribir el README.md en la misma carpeta
        fs.writeFileSync(path.join(folderPath, 'README.md'), readmeContent);

        console.log(`README.md creado para ${title}`);
      } else {
        console.error('No se pudo obtener la descripción.');
      }
    })
    .catch(error => {
      console.error('Error al hacer la solicitud:', error.message);
    });
}

// Función para procesar las subcarpetas
function processSubfolders(folderPath) {
  fs.readdirSync(folderPath).forEach(item => {
    const fullPath = path.join(folderPath, item);

    // Verificar si es una carpeta
    if (fs.statSync(fullPath).isDirectory()) {
      // Verificar si existe README.md
      const readmePath = path.join(fullPath, 'README.md');
      if (!fs.existsSync(readmePath)) {
        // Leer URL.txt y ejecutar el script con el slug
        const urlPath = path.join(fullPath, 'URL.txt');
        if (fs.existsSync(urlPath)) {
          const slug = fs.readFileSync(urlPath, 'utf8').trim();
          executeScriptWithSlug(fullPath, slug);
        }
      }
    }
  });
}

// Iniciar el procesamiento desde la carpeta raíz
processSubfolders(rootFolder);
