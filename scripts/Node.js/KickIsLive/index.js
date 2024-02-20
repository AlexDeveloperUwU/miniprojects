const axios = require('axios');

async function checkLivestream(channelName) {
    try {
        const response = await axios.get(`https://kick.com/api/v1/channels/${channelName}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.google.com/'
            }
        });
        const data = response.data;

        // Verificar si "livestream" es null
        const isLivestream = data.livestream !== null;

        return isLivestream;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}

// Ejemplo de uso
const channelName = 'esb-dota';
checkLivestream(channelName)
    .then(isLivestream => console.log(isLivestream))
    .catch(error => console.error(error));
