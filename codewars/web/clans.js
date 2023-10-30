const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 5421;

let DAW_totalHonor = 0;
let DAW_totalScore = 0;
let DAM_totalHonor = 0;
let DAM_totalScore = 0;
let losers_totalHonor = 0;
let losers_totalScore = 0;
let usuariosDAWData = [];
let usuariosDAMData = [];
let usuariosLosersData = [];

async function fetchData(clanId) {
  try {
    const response = await axios.get(
      `https://www.codewars.com/api/v1/clans/${clanId}/members`
    );
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
    fetchData("losers.js"),
  ]);

  usuariosDAWData = userDataDAW;
  usuariosDAMData = userDataDAM;
  usuariosLosersData = userDataLosers;

  calculateClanStats(userDataDAW, "DAW");
  calculateClanStats(userDataDAM, "DAM");
  calculateClanStats(userDataLosers, "Losers");
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
    txtHonor: getHonorText(),
    txtScore: getScoreText(),
  });
});

app.get("/dam", (req, res) => {
  res.render("cursoTemplate", {
    clan: "DAM",
    totalHonor: DAM_totalHonor,
    totalScore: DAM_totalScore,
    userData: usuariosDAMData,
  });
});

app.get("/daw", (req, res) => {
  res.render("cursoTemplate", {
    clan: "DAW",
    totalHonor: DAW_totalHonor,
    totalScore: DAW_totalScore,
    userData: usuariosDAWData,
  });
});

app.get("/losers", (req, res) => {
  res.render("cursoTemplate", {
    clan: "losers",
    totalHonor: losers_totalHonor,
    totalScore: losers_totalScore,
    userData: usuariosLosersData,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getHonorText() {
  const honorComparisons = [
    { clan: "DAW", total: DAW_totalHonor },
    { clan: "DAM", total: DAM_totalHonor },
    { clan: "losers", total: losers_totalHonor },
  ];
  honorComparisons.sort((a, b) => b.total - a.total);

  const [winner] = honorComparisons;
  const runnerUps = honorComparisons.filter(
    (clan) => clan.total === honorComparisons[1].total
  );

  if (runnerUps.length === 0) {
    return `En honor, gana ${winner.clan} con ${winner.total} de honor`;
  } else {
    return `Hay un empate en el honor entre ${runnerUps
      .map((clan) => clan.clan)
      .join(" y ")} con ${runnerUps[0].total} de honor`;
  }
}

function getScoreText() {
  const scoreComparisons = [
    { clan: "DAW", total: DAW_totalScore },
    { clan: "DAM", total: DAM_totalScore },
    { clan: "losers", total: losers_totalScore },
  ];
  scoreComparisons.sort((a, b) => b.total - a.total);

  const [winner] = scoreComparisons;
  const runnerUps = scoreComparisons.filter(
    (clan) => clan.total === scoreComparisons[1].total
  );

  if (runnerUps.length === 0) {
    return `En puntuación, gana ${winner.clan} con ${winner.total} puntos`;
  } else {
    return `Hay un empate en la puntuación entre ${runnerUps
      .map((clan) => clan.clan)
      .join(" y ")} con ${runnerUps[0].total} puntos`;
  }
}
