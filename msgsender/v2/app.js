const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  const clientIp = socket.handshake.address.replace(/^::ffff:/, "");
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log(`Usuario conectado desde la dirección IP: ${clientIp}`);

  socket.on("message", (message) => {
    io.emit("message", `${clientIp} ${timestamp} => ${message}`);
    if (message.toLowerCase().includes("hola")) {
      const botResponse = "¡Hola! ¿Qué tal?";
      setTimeout(() => {
        io.emit("message", `Bot: ${botResponse}`);
      }, 1000);
    }
    if (message.toLowerCase().includes("patri")) {
      const botResponse = "TODO ACABA AQUÍ";
      setTimeout(() => {
        io.emit("message", `Bot: ${botResponse}`);
      }, 1000);
    }
    if (message.toLowerCase().includes("ágil")) {
      const botResponse = "Querrás decir 𝒶𝓎𝒶𝒾𝓁";
      setTimeout(() => {
        io.emit("message", `Bot: ${botResponse}`);
      }, 1000);
    }
    if (message.toLowerCase().includes("noemí")) {
      const botResponse = "¿Dices la 𝒾𝓃𝑔𝑒𝓃𝒾𝑒𝓇𝒶?";
      setTimeout(() => {
        io.emit("message", `Bot: ${botResponse}`);
      }, 1000);
    }
  });
});

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
