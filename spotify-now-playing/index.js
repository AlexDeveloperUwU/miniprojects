require("dotenv").config();

const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:8888/callback",
});

let accessToken = null;
let refreshToken = null;

app.get("/login", (req, res) => {
  const scopes = ["user-read-currently-playing"];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
});

app.get("/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    accessToken = data.body.access_token;
    refreshToken = data.body.refresh_token;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
    res.redirect("/current-song");
  } catch (err) {
    res.send("Error al autenticar con Spotify.");
  }
});

app.get("/current-song", async (req, res) => {
  if (!accessToken) {
    return res.send("Debe autenticarse primero.");
  }

  try {
    spotifyApi.setAccessToken(accessToken);
    const { body } = await spotifyApi.getMyCurrentPlayingTrack();
    const songName = body.item.name;
    const artist = body.item.artists[0].name;
    res.send(`Estás escuchando: ${songName} - ${artist}`);
  } catch (err) {
    if (err.statusCode === 401 && refreshToken) {
      try {
        const data = await spotifyApi.refreshAccessToken();
        accessToken = data.body.access_token;
        spotifyApi.setAccessToken(accessToken);
        res.redirect("/current-song");
      } catch (err) {
        res.send("Error al refrescar el token de acceso.");
      }
    } else {
      res.send("No se pudo obtener la canción actual.");
    }
  }
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
