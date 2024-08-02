const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { WebhookClient, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// URL de la página web que deseas monitorear
const URL = 'https://www.melendioficial.com/conciertos/';
const LOG_FILE = path.join(__dirname, 'scrap.log');
const HTML_RESULT_FILE = path.join(__dirname, 'result.html');

// URL del webhook de Discord
const WEBHOOK_URL = 'https://discord.com/api/webhooks/';
const USER_ID = '<@TU ID>';

const checkTickets = async () => {
    const now = new Date();
    const timestamp = now.toISOString();

    try {
        // Realiza una solicitud GET a la URL
        const { data } = await axios.get(URL);
        // Carga el HTML en cheerio
        const $ = cheerio.load(data);

        // Selecciona el elemento específico que quieres monitorear
        const event = $("tr:contains('CASTRELOS (VIGO)')");
        let result;
        let link = null;

        // Extraer el fragmento de HTML y guardarlo
        const htmlContent = event.html();
        fs.writeFileSync(HTML_RESULT_FILE, htmlContent);

        if (event.find("span:contains('ENTRADAS')").length > 0) {
            link = event.find('a.fecha-button').attr('href');
            result = `¡Entradas disponibles! Enlace: ${link}`;
            webhookSend({ timestamp, result, link, available: true });
        } else {
            result = 'Entradas aún no disponibles.';
            webhookSend({ timestamp, result, available: false });
        }

        // Log cada chequeo en scrap.log
        fs.appendFileSync(LOG_FILE, `${timestamp} - Comprobación realizada: ${result}\n`);

        console.log(result);
    } catch (error) {
        console.error(`Error al comprobar las entradas: ${error}`);
        fs.appendFileSync(LOG_FILE, `${timestamp} - Error al comprobar las entradas: ${error}\n`);
    }
};

function webhookSend(data) {
    const webhook = new WebhookClient({ url: WEBHOOK_URL });
    const { timestamp, result, link, available } = data;

    const embed = new EmbedBuilder()
        .setTitle("Estado de Entradas para Castrelos (Vigo)")
        .setDescription(result)
        .setColor(available ? "#11ab9c" : "#ff0000")
        .setTimestamp(new Date(timestamp));

    const row = available ? new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Comprar Entradas')
                .setStyle(ButtonStyle.Link)
                .setURL(link)
        ) : null;

    const content = available ? `${USER_ID} ¡Entradas disponibles!` : ' ';

    webhook.send({ content, embeds: [embed], components: row ? [row] : [] });
}

// Programa el scraper para que se ejecute cada 5 minutos
cron.schedule('*/5 * * * *', () => {
    console.log('Comprobando entradas...');
    checkTickets();
});
