const express = require("express");
const { authenticator } = require("otplib");
const qrcode = require("qrcode");

const app = express();
app.use(express.json());

// Ruta para generar el secreto y código QR
app.post("/register", (req, res) => {
  // Generar el secreto usando otplib
  const secret = authenticator.generateSecret();

  // URL para usar en Google Authenticator (u otra app de autenticación)
  const otpauth_url = authenticator.keyuri("user", "Demo-2FA-App", secret);

  // Generar código QR a partir de la URL
  qrcode.toDataURL(otpauth_url, (err, data_url) => {
    if (err) {
      return res.status(500).json({ message: "Error generando QR" });
    }

    // Responder con el secreto y la imagen QR en base64
    res.json({
      secret,
      qrCode: data_url,
    });
  });
});

// Ruta para verificar el código 2FA
app.post("/verify", (req, res) => {
  const { token, secret } = req.body;

  // Verificar el token utilizando el secreto
  const isValid = authenticator.check(token, secret);

  if (isValid) {
    res.json({ message: "Código válido" });
  } else {
    res.status(400).json({ message: "Código inválido" });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
