const fs = require('fs');
const path = require('path');

const rootFolder = './';
const excludedDirectories = ['Carpeta1', 'Carpeta2']; // Directorios excluidos del eliminador de versiones "Live" de las canciones. Muchos artistas suelen subir las versiones "Live" de sus canciones, con esta línea lo que hacemos es pedirle al programa que conserve las versiones live de esos artistas

// Esta función lo que hace es eliminar las versiones "live" de las canciones que no están en la lista de excludedDirectories
async function deleteFilesWithLive(folderPath) {
  try {
    const files = await fs.promises.readdir(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileStats = await fs.promises.stat(filePath);

      if (fileStats.isFile() && (file.includes('Live at') || file.includes('Live Version') || file.includes('En Directo') || file.includes('En Vivo'))) {
        console.log(`Deleting file: ${filePath}`);
        await fs.promises.unlink(filePath);
      } else if (fileStats.isDirectory() && !excludedDirectories.includes(file)) {
        await deleteFilesWithLive(filePath);
      }
    }
  } catch (err) {
    console.error(`Error deleting files in folder: ${folderPath}`);
    throw err;
  }
}

async function processFolders() {
  try {
    const folders = await fs.promises.readdir(rootFolder);
    for (const folder of folders) {
      const folderPath = path.join(rootFolder, folder);
      const folderStats = await fs.promises.stat(folderPath);

      if (folderStats.isDirectory() && !excludedDirectories.includes(folder)) {
        console.log(`Entering folder: ${folderPath}`);
        await deleteFilesWithLive(folderPath);
        console.log(`Deletion completed for folder: ${folderPath}`);
      }
    }
    console.log('All folders processed.');
  } catch (err) {
    console.error('Error processing folders:', err);
  }
}

// Llamamos a la función para que comience el programa
processFolders();
