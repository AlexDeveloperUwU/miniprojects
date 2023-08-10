// Importo las dependencias
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const axios = require('axios');
const cheerio = require('cheerio');

const file = 'url.txt';
const spotdlCommand = 'spotdl download';

// Esta función creará la carpeta para cada uno de los artistas que queramos descargar
async function createArtistFolder(artistName) {
  const folderName = artistName.replace(/[\/:*?"<>|]/g, '_');
  try {
    const folderPath = `./${folderName}`;
    const folderExists = await fs.promises.access(folderPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    
    if (!folderExists) {
      await fs.promises.mkdir(folderPath);
    }

    return folderPath;
  } catch (err) {
    console.error(`Error creating folder: ${folderName}`);
    throw err;
  }
}

// Esta función obtiene el nombre del artista haciendo una request a Spotify
async function getArtistNameFromURL(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const artistName = $('meta[property="og:title"]').attr('content').split(' - ')[0];
    return artistName;
  } catch (err) {
    console.error(`Error fetching artist name from URL: ${url}`);
    throw err;
  }
}

// Esta función lo que hace es descargar la música en la carpeta correspondiente
async function downloadMusic(url, artistName) {
  const folderPath = await createArtistFolder(artistName);
  const command = `${spotdlCommand} ${url}`;
  try {
    const { stdout, stderr } = await exec(command, { cwd: folderPath });
    console.log(stdout);
    console.error(stderr);
  } catch (err) {
    console.error(`Error executing command: ${command}`);
    throw err;
  }
}

// Esta función procesa las URL's de la lista url.txt
async function processURLs() {
  try {
    const data = await fs.promises.readFile(file, 'utf-8');
    const urls = data.trim().split('\n');
    for (const url of urls) {
      console.log(`Processing URL: ${url}`);
      const artistName = await getArtistNameFromURL(url);
      console.log(`Artist Name: ${artistName}`);
      await downloadMusic(url, artistName);
      console.log(`Download completed for: ${artistName}`);
    }
    console.log('All downloads completed.');
  } catch (err) {
    console.error('Error processing URLs:', err);
  }
}

// Llamamos a la función y que comience el script!
processURLs();
