const axios = require('axios');

async function getCountOfUrlsFromJson() {
  const response = await axios.get('https://raw.githubusercontent.com/AlexDeveloperUwU/reddit-meme-scrapper/main/memes.json');
  const json = response.data;
  const urlCount = json.filter(obj => obj.url).length; // Filtrar los objetos con la propiedad .url y contarlos
  console.log(`Cantidad de URLs en el JSON: ${urlCount}`);
}

getCountOfUrlsFromJson();
