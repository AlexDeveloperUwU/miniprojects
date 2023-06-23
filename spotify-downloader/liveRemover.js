const fs = require('fs');
const path = require('path');

const rootFolder = './'; // Carpeta raíz desde la que iniciar la búsqueda
const excludedDirectories = ['Amaral', 'Ana Belén y Víctor Manuel', 'Bangles', 'Bob Marley', 'Bon Jovi', 'Bruce Springsteen', 'Bryan Adams', 'Café Quijano', 'Chayanne', 'Christopher Cross', 'Cock Robin', 'Coldplay', 'Crowded House', 'Deacon Blue', 'Dire Strats', 'Especialistas', 'Estopa', 'Evanescence','Fito y Fitipaldis', 'Ilegales']; // Directorios excluidos del eliminador de versiones "Live" de las canciones
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

processFolders();