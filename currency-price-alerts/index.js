const axios = require('axios');

const API_URL = 'https://v6.exchangerate-api.com/v6/TOKEN/latest/USD';
const WEBHOOK_URL = 'DISCORD WEBHOOK URL';
const INTERVALO_VERIFICACION = 3600000; // Cada hora (en milisegundos)
const TASA_DESCUENTO = 0.025; // 2.5%

async function enviarMensajeDiscord(mensaje) {
  await axios.post(WEBHOOK_URL, {
    content: mensaje,
  });
}

enviarMensajeDiscord('El script de verificación de tasas de conversión se ha iniciado.');

async function verificarTasasDeConversion() {
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      const data = response.data;
      const tasaUSDToEUR = data.conversion_rates.EUR;
      const tasaActualizada = tasaUSDToEUR - TASA_DESCUENTO;

      const mensaje = `La tasa de conversión USD a EUR es ${tasaActualizada.toFixed(2)}`;
      await enviarMensajeDiscord(mensaje);
      console.log('Mensaje enviado a Discord:', mensaje);
    } else {
      console.error('No se pudo obtener la tasa de conversión.');
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error.message);
  }
}

// Verifica tasas de conversión periódicamente
verificarTasasDeConversion();
setInterval(verificarTasasDeConversion, INTERVALO_VERIFICACION);
