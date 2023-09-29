const axios = require("axios");
const express = require("express");
const app = express();
const port = 5421;

let DAW_totalHonor, DAW_totalScore;
let DAM_totalHonor, DAM_totalScore;
let diferenciaHonor;
let diferenciaScore;
let txtHonor;
let txtScore;

function actualizarDatos() {
  axios
    .get("https://www.codewars.com/api/v1/clans/1DAW_O_TEIS/members")
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        const userData = data.data;
        usuariosDAWData = data.data;
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
        usuariosDAMData = data.data;
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
    if (DAW_totalHonor > DAM_totalHonor) {
      diferenciaHonor = DAW_totalHonor - DAM_totalHonor;
      txtHonor = `En honor, gana 𝐃𝐀𝐖 con una diferencia de ${diferenciaHonor} de honor`;
    } else if (DAW_totalHonor < DAM_totalHonor) {
      diferenciaHonor = DAM_totalHonor - DAW_totalHonor;
      txtHonor = `En honor, gana 𝐃𝐀𝐌 con una diferencia de ${diferenciaHonor} de honor`;
    } else {
      txtHonor = "Hay un empate en el honor de ambos clanes";
    }

    if (DAW_totalScore > DAM_totalScore) {
      diferenciaScore = DAW_totalScore - DAM_totalScore;
      txtScore = `En puntuación, gana 𝐃𝐀𝐖 con una diferencia de ${diferenciaScore} puntos`;
    } else if (DAW_totalScore < DAM_totalScore) {
      diferenciaScore = DAM_totalScore - DAW_totalScore;
      txtScore = `En puntuación, gana 𝐃𝐀𝐌 con una diferencia de ${diferenciaScore} puntos`;
    } else {
      txtScore = "Hay un empate en la puntuación de ambos clanes";
    }
  });
}

actualizarDatos();

setInterval(actualizarDatos, 60000);

app.set("port", process.env.PORT || 80);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");

app.use("/static", express.static(__dirname + "/public"));

app.set("views", require("path").join(__dirname, "views"));

app.get("/", (res) => {
  res.render("index", {
    DAW_totalHonor,
    DAW_totalScore,
    DAM_totalHonor,
    DAM_totalScore,
    txtHonor,
    txtScore,
  });
});

app.get("/dam", (res) => {
  res.render("dam", {
    DAW_totalHonor,
    DAW_totalScore,
    DAM_totalHonor,
    DAM_totalScore,
    txtHonor,
    txtScore,
    usuariosDAM: usuariosDAMData,
  });
});

app.get("/daw", (res) => {
  res.render("daw", {
    DAW_totalHonor,
    DAW_totalScore,
    DAM_totalHonor,
    DAM_totalScore,
    txtHonor,
    txtScore,
    usuariosDAW: usuariosDAWData,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
