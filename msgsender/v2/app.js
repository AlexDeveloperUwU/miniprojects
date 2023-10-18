const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  const clientIp = socket.handshake.address.replace(/^::ffff:/, ""); // Eliminar '::ffff:' de la dirección IP
  console.log(`Usuario conectado desde la dirección IP: ${clientIp}`);

  socket.on("message", (message) => {
    io.emit("message", `${clientIp} => ${message}`);
    if (message.toLowerCase().includes("hola")) {
      const botResponse = "¡Hola! Soy un bot.";
      setTimeout(() => {
        io.emit("message", `Bot: ${botResponse}`);
      }, 1000);
    }
  });
});

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
