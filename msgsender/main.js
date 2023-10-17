const { app, BrowserWindow, Menu } = require('electron');
const express = require('express');
const { exec } = require('child_process');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'Local Message Sender',
    icon: path.join(__dirname, 'assets', 'chat.png'),
  });

  win.loadFile('index.html');

  Menu.setApplicationMenu(null);

  // Configura el servidor Express
  const app = express();
  const port = 3000;

  app.use(express.json());

  app.post('/enviar-mensaje', (req, res) => {
    const { serverIP, mensaje } = req.body;

    const cmd = `msg * /server:${serverIP} "${mensaje}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al ejecutar el comando.');
      } else {
        console.log(stdout);
        res.send('Comando ejecutado correctamente.');
      }
    });
  });

  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
}

app.whenReady().then(createWindow);
