const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 80;

let DAW_totalHonor = 0;
let DAW_totalScore = 0;
let DAM_totalHonor = 0;
let DAM_totalScore = 0;
let usuariosDAWData = [];
let usuariosDAMData = [];

async function fetchData(clanId) {
  try {
    const response = await axios.get(`https://www.codewars.com/api/v1/clans/${clanId}/members`);
    if (response.status === 200) {
      const userData = response.data.data;
      return userData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return [];
}

function calculateClanStats(userData, clan) {
  let totalHonor = 0;
  let totalScore = 0;

  for (const user of userData) {
    totalHonor += user.honor;
    totalScore += user.score;
  }

  if (clan === "DAW") {
    DAW_totalHonor = totalHonor;
    DAW_totalScore = totalScore;
  } else if (clan === "DAM") {
    DAM_totalHonor = totalHonor;
    DAM_totalScore = totalScore;
  }
}

async function updateData() {
  const [userDataDAW, userDataDAM] = await Promise.all([
    fetchData("1DAW_O_TEIS"),
    fetchData("2teis"),
  ]);

  usuariosDAWData = userDataDAW;
  usuariosDAMData = userDataDAM;

  calculateClanStats(userDataDAW, "DAW");
  calculateClanStats(userDataDAM, "DAM");
}

updateData();
setInterval(updateData, 60000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
app.set("views", require("path").join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    DAW_totalHonor,
    DAW_totalScore,
    DAM_totalHonor,
    DAM_totalScore,
    txtHonor: getHonorText(),
    txtScore: getScoreText(),
  });
});

app.get("/stats", (req, res) => {
  res.render("stats", {
    DAW_totalHonor,
    DAW_totalScore,
    DAM_totalHonor,
    DAM_totalScore,
    txtHonor: getHonorText(),
    txtScore: getScoreText(),
  });
});

app.get("/dam", (req, res) => {
  res.render("dam", {
    DAW_totalHonor,
    DAW_totalScore,
    DAM_totalHonor,
    DAM_totalScore,
    txtHonor: getHonorText(),
    txtScore: getScoreText(),
    usuariosDAM: usuariosDAMData,
  });
});

app.get("/daw", (req, res) => {
  res.render("daw", {
    DAW_totalHonor,
    DAW_totalScore,
    DAM_totalHonor,
    DAM_totalScore,
    txtHonor: getHonorText(),
    txtScore: getScoreText(),
    usuariosDAW: usuariosDAWData,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getHonorText() {
  return DAW_totalHonor > DAM_totalHonor
    ? `En honor, gana 𝐃𝐀𝐖 con una diferencia de ${DAW_totalHonor - DAM_totalHonor} de honor`
    : DAW_totalHonor < DAM_totalHonor
    ? `En honor, gana 𝐃𝐀𝐌 con una diferencia de ${DAM_totalHonor - DAW_totalHonor} de honor`
    : "Hay un empate en el honor de ambos clanes";
}

function getScoreText() {
  return DAW_totalScore > DAM_totalScore
    ? `En puntuación, gana 𝐃𝐀𝐖 con una diferencia de ${DAW_totalScore - DAM_totalScore} puntos`
    : DAW_totalScore < DAM_totalScore
    ? `En puntuación, gana 𝐃𝐀𝐌 con una diferencia de ${DAM_totalScore - DAW_totalScore} puntos`
    : "Hay un empate en la puntuación de ambos clanes";
}
