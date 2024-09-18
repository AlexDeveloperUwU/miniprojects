import fs from "fs";
import path from "path";
import axios from "axios";

const rootFolder = "./";

async function executeScriptWithSlug(folderPath, slug) {
  const kataUrl = `https://www.codewars.com/api/v1/code-challenges/${slug}`;

  try {
    const response = await axios.get(kataUrl);
    if (response.status === 200) {
      const data = response.data;
      const title = data.name;
      const description = data.description;
      const createdBy = data.createdBy.username;
      const publishedAt = new Date(data.publishedAt).toLocaleDateString();
      const kataUrl = data.url;

      const readmeContent = `# ${title}
${description}

## Información del Kata realizado:
Creado por: ${createdBy}

Publicado el: ${publishedAt}

URL: [Haz click aquí para ir al Kata](${kataUrl})`;

      fs.writeFileSync(path.join(folderPath, "README.md"), readmeContent);

      console.log(`README.md creado para ${title}`);
    } else {
      console.error("No se pudo obtener la descripción.");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error.message);
  }
}

function processSubfolders(folderPath, isRoot = false) {
  fs.readdirSync(folderPath).forEach((item) => {
    const fullPath = path.join(folderPath, item);

    if (item.toLowerCase() === "web" || item.toLowerCase() === "node_modules") {
      console.log(`Saltando la carpeta: ${item}`);
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      if (!isRoot) {
        const urlPath = path.join(fullPath, "url.txt");

        if (fs.existsSync(urlPath)) {
          const slug = fs.readFileSync(urlPath, "utf8").trim();
          executeScriptWithSlug(fullPath, slug);
        } else {
          console.log(`No se encontró el archivo url.txt en ${fullPath}`);
        }
      }

      processSubfolders(fullPath);
    }
  });
}

processSubfolders(rootFolder, true);
