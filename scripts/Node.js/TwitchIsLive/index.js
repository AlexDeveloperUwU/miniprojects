const axios = require("axios");

const searchChannels = async (query) => {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/search/channels", {
      params: { query },
      headers: {
        Authorization: "",
        "Client-Id": "",
      },
    });

    const channels = response.data.data;
    const exactMatchChannel = channels.find(
      (channel) => channel.display_name.toLowerCase() === query.toLowerCase()
    );

    if (exactMatchChannel) {
      const { display_name, is_live } = exactMatchChannel;
      return { display_name, is_live };
    } else {
      return { error: "No se encontró un canal con ese nombre" };
    }
  } catch (error) {
    console.error("Error al buscar canales:", error.response.data);
    throw error;
  }
};

searchChannels("kellyjacks0n")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
