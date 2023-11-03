const axios = require("axios");
const fs = require("fs");

const clanNames = ["1DAW_O_TEIS", "2teis", "loosers.js"];
const clanData = {};

async function fetchClanMemberData(clanName) {
  try {
    const response = await axios.get(
      `https://www.codewars.com/api/v1/clans/${clanName}/members`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching data for clan ${clanName}: ${error.message}`);
    return null;
  }
}

async function fetchStats() {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/AlexDeveloperUwU/miniprojects/jsonstorage/graph.json"
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching stats data: ${error.message}`);
    return null;
  }
}

function saveStats(stats) {
  try {
    fs.writeFileSync("./jsonoutput/graph.json", JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error(`Error saving stats data: ${error.message}`);
  }
}

async function actualizarDatos() {
  try {
    // Fetch and save stats data
    const jsonStatsData = await fetchStats();
    if (jsonStatsData != null) {
      saveStats(jsonStatsData);
    } else {
      return;
    }

    // Fetch clan member data for each clan
    for (const clanName of clanNames) {
      const memberData = await fetchClanMemberData(clanName);
      if (memberData != null) {
        const userData = memberData.data;
        const { honor, score } = sumarHonorYScore(userData);
        clanData[clanName] = { honor, score };
      }
    }

    // Wait for 10 seconds
    await sleep(10000);

    // Read the existing JSON file
    const jsonData = require("./jsonoutput/graph.json");

    // Filter data for the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Remove older entries
    const filteredData = jsonData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= oneWeekAgo;
    });

    // Add new data to the JSON
    filteredData.push({
      date: new Date().toISOString(),
      DAW_totalHonor: clanData["1DAW_O_TEIS"].honor,
      DAW_totalScore: clanData["1DAW_O_TEIS"].score,
      DAM_totalHonor: clanData["2teis"].honor,
      DAM_totalScore: clanData["2teis"].score,
      loosers_totalHonor: clanData["loosers.js"].honor,
      loosers_totalScore: clanData["loosers.js"].score,
    });

    // Save the updated JSON
    saveStats(filteredData);
  } catch (error) {
    console.error(`Error in actualizarDatos: ${error.message}`);
  }
}

function sumarHonorYScore(usuarios) {
  let totalHonor = 0;
  let totalScore = 0;

  for (const usuario of usuarios) {
    totalHonor += usuario.honor;
    totalScore += usuario.score;
  }

  return { honor: totalHonor, score: totalScore };
}

const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

actualizarDatos();