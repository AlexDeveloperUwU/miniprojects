const axios = require('axios');

const API_KEY = '';
const channelId = 'UCSJ4gkVC6NrvII8umztf0Ow';

const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${API_KEY}`;

const headers = {
  'Accept': 'application/json'
};

axios.get(url, { headers })
  .then(response => {
    const hasLiveVideos = response.data.items.length > 0;
    console.log(hasLiveVideos);
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
  });
