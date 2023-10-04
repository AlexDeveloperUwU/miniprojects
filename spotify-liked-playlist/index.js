const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8888;
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'http://localhost:8888/callback';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: 'user-library-read playlist-modify-public playlist-modify-private',
      redirect_uri: REDIRECT_URI,
    })
  );
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const access_token = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    const userId = userResponse.data.id;

    const playlistResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      JSON.stringify({
        name: 'Mis Canciones Favoritas',
        public: false,
      }),
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const playlistId = playlistResponse.data.id;

    const likedSongs = await getAllLikedSongs(access_token);

    const trackGroups = [];
    for (let i = 0; i < likedSongs.length; i += 100) {
      trackGroups.push(likedSongs.slice(i, i + 100));
    }

    for (const group of trackGroups) {
      const trackUris = group.map(item => item.track.uri);

      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        JSON.stringify({
          uris: trackUris,
        }),
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    res.send('Canciones favoritas agregadas a la playlist.');
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(error.response.status).send('Error al procesar la solicitud.');
  }
});

async function getAllLikedSongs(accessToken) {
  let allLikedSongs = [];
  let offset = 0;
  const limit = 50; // Cantidad máxima por página

  try {
    while (true) {
      const likedSongsResponse = await axios.get(
        'https://api.spotify.com/v1/me/tracks',
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          params: {
            limit: limit,
            offset: offset,
          },
        }
      );

      const items = likedSongsResponse.data.items;

      if (items.length === 0) {
        break;
      }

      allLikedSongs = allLikedSongs.concat(items);
      offset += limit;
    }

    return allLikedSongs;
  } catch (error) {
    console.error('Error al obtener canciones marcadas como "like"', error);
    return [];
  }
}

app.listen(PORT, () => {
  console.log(`Aplicación en ejecución en http://localhost:${PORT}`);
});
