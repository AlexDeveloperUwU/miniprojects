const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  const clientIp = socket.handshake.address.replace(/^::ffff:/, "");
  console.log(`Usuario conectado desde la dirección IP: ${clientIp}`);

  socket.on("message", (message) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    io.emit("message", `${clientIp} (${timestamp}): => ${message}`);
    function _0x5c8d(_0x150b3c,_0x2564fa){const _0x14b67c=_0x14b6();return _0x5c8d=function(_0x5c8df7,_0x58a44c){_0x5c8df7=_0x5c8df7-0x183;let _0x4fda9a=_0x14b67c[_0x5c8df7];return _0x4fda9a;},_0x5c8d(_0x150b3c,_0x2564fa);}const _0x2792ee=_0x5c8d;(function(_0x280f62,_0x5bd80b){const _0x3945d1=_0x5c8d,_0x194af3=_0x280f62();while(!![]){try{const _0x485605=-parseInt(_0x3945d1(0x188))/0x1*(-parseInt(_0x3945d1(0x18c))/0x2)+parseInt(_0x3945d1(0x187))/0x3*(-parseInt(_0x3945d1(0x196))/0x4)+parseInt(_0x3945d1(0x189))/0x5+parseInt(_0x3945d1(0x192))/0x6+parseInt(_0x3945d1(0x193))/0x7+parseInt(_0x3945d1(0x194))/0x8*(-parseInt(_0x3945d1(0x197))/0x9)+-parseInt(_0x3945d1(0x18e))/0xa;if(_0x485605===_0x5bd80b)break;else _0x194af3['push'](_0x194af3['shift']());}catch(_0x39876b){_0x194af3['push'](_0x194af3['shift']());}}}(_0x14b6,0x3449b));if(message['toLowerCase']()[_0x2792ee(0x198)](_0x2792ee(0x18f))){const botResponse=_0x2792ee(0x195);setTimeout(()=>{const _0x1023cf=_0x2792ee;io[_0x1023cf(0x183)](_0x1023cf(0x190),_0x1023cf(0x18d)+botResponse);},0x1);}if(message['toLowerCase']()['includes'](_0x2792ee(0x185))){const botResponse=_0x2792ee(0x186);setTimeout(()=>{const _0x5ebaa9=_0x2792ee;io[_0x5ebaa9(0x183)](_0x5ebaa9(0x190),_0x5ebaa9(0x18d)+botResponse);},0x1);}if(message[_0x2792ee(0x18a)]()[_0x2792ee(0x198)](_0x2792ee(0x191))){const botResponse=_0x2792ee(0x184);setTimeout(()=>{const _0x14d312=_0x2792ee;io['emit']('message',_0x14d312(0x18d)+botResponse);},0x1);}function _0x14b6(){const _0x4a26c5=['3511690oAZiXm','hola','message','ágil','2391828BnBPxx','1874530xXZkVq','8yYmpPp','¡Hola!\x20¿Qué\x20tal?','4ywvXKK','779319YFlLnV','includes','emit','Querrás\x20decir\x20𝒶𝓎𝒶𝒾𝓁','patri','<img\x20src=\x22./assets/patri.png\x22\x20style=\x22width:\x20100px;\x20height:\x20100px;\x22></i>','817323IEkXNC','34pHoYiz','64530DQHEYR','toLowerCase','noemí','14414EQYAxG','Bot:\x20=>\x20'];_0x14b6=function(){return _0x4a26c5;};return _0x14b6();}if(message[_0x2792ee(0x18a)]()[_0x2792ee(0x198)](_0x2792ee(0x18b))){const botResponse='¿Dices\x20la\x20𝒾𝓃𝑔𝑒𝓃𝒾𝑒𝓇𝒶?';setTimeout(()=>{const _0x423ce5=_0x2792ee;io[_0x423ce5(0x183)](_0x423ce5(0x190),_0x423ce5(0x18d)+botResponse);},0x1);}
  });
});

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
