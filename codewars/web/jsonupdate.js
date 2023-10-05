const axios = require("axios");
const fs = require("fs");

let DAW_totalHonor, DAW_totalScore;
let DAM_totalHonor, DAM_totalScore;

function actualizarDatos() {
  // Leer el archivo JSON existente
  let jsonData = require("./jsonoutput/graph.json");

  // Obtener la fecha actual
  const currentDate = new Date();

  // Filtro para mantener solo datos de la última semana
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Filtrar los datos existentes para eliminar los datos más antiguos
  jsonData = jsonData.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= oneWeekAgo;
  });

  // Realizar la solicitud a la API de CodeWars
  axios
    .get("https://www.codewars.com/api/v1/clans/1DAW_O_TEIS/members")
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        const userData = data.data;

        function sumarHonorYScore(usuarios) {
          let totalHonor = 0;
          let totalScore = 0;

          for (const usuario of usuarios) {
            totalHonor += usuario.honor;
            totalScore += usuario.score;
          }

          DAW_totalHonor = totalHonor;
          DAW_totalScore = totalScore;
        }

        sumarHonorYScore(userData);
      }
    });

  axios
    .get("https://www.codewars.com/api/v1/clans/2teis/members")
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        const userData = data.data;

        function sumarHonorYScore(usuarios) {
          let totalHonor = 0;
          let totalScore = 0;

          for (const usuario of usuarios) {
            totalHonor += usuario.honor;
            totalScore += usuario.score;
          }

          DAM_totalHonor = totalHonor;
          DAM_totalScore = totalScore;
        }

        sumarHonorYScore(userData);
      }
    });

  const sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));
  sleep(1000).then(() => {
    jsonData.push({
      date: currentDate.toISOString(),
      DAW_totalHonor,
      DAW_totalScore,
      DAM_totalHonor,
      DAM_totalScore,
    });
    fs.writeFileSync(
      "./jsonoutput/graph.json",
      JSON.stringify(jsonData, null, 2)
    );
  });
}

actualizarDatos();