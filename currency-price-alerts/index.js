const axios = require('axios');

// URL de la API de tasas de conversión
const API_URL = 'https://v6.exchangerate-api.com/v6/TOKEN/latest/USD';

// URL del webhook de Discord
const WEBHOOK_URL = 'DISCORD WEBHOOK URL';

// Tiempo de intervalo para verificar las tasas de conversión (en milisegundos)
const INTERVALO_VERIFICACION = 175000; // 1 minuto

// Función para enviar un mensaje al webhook de Discord
async function enviarMensajeDiscord(mensaje) {
  await axios.post(WEBHOOK_URL, {
    content: mensaje,
  });
}

// Mensaje de inicio en la consola
console.log('El script de verificación de tasas de conversión se ha iniciado.');

// Mensaje de inicio en Discord
enviarMensajeDiscord('El script de verificación de tasas de conversión se ha iniciado.');

async function verificarTasasDeConversion() {
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      const data = response.data;
      const tasaUSDToEUR = data.conversion_rates.EUR;
      // Establece aquí la tasa de conversión que consideras como "la mejor"
      const mejorTasa = 0.94;

      if (tasaUSDToEUR >= mejorTasa) {
        // Mensaje a enviar al webhook
        const mensaje = `¡La tasa de conversión USD a EUR es favorable (${tasaUSDToEUR})!`;

        // Envía el mensaje al webhook de Discord
        await enviarMensajeDiscord(mensaje);

        console.log('Mensaje enviado a Discord:', mensaje);
      }
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
