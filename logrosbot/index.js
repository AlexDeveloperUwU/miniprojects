const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on('messageCreate', async (message) => {
  if (message.channel.id === "000000000000000000") {
    console.log(message.content);
    message.react('🏆');
  }
});

client.login("TOKEN")
