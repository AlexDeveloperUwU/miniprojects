const fs = require("fs");

// Función para generar un número aleatorio mayor que el valor dado
function getRandomNumberGreaterThan(min, max, minValue) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.max(randomNumber, minValue + 1);
}

// Función para generar una fecha aleatoria en los últimos 7 días
function getRandomDate(today, daysAgo) {
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date;
}

// Generar datos aleatorios para los últimos 7 días con incremento diario
const today = new Date("2023-10-05");
const data = [];
let previousData = null;

for (let i = 6; i >= 0; i--) {
  const date = getRandomDate(today, i);
  const previousDataCopy = previousData ? { ...previousData } : null;
  const newData = {
    date: date.toISOString(),
    DAW_totalHonor: getRandomNumberGreaterThan(1000, 5000, previousDataCopy ? previousDataCopy.DAW_totalHonor : 0),
    DAW_totalScore: getRandomNumberGreaterThan(1000, 5000, previousDataCopy ? previousDataCopy.DAW_totalScore : 0),
    DAM_totalHonor: getRandomNumberGreaterThan(1000, 5000, previousDataCopy ? previousDataCopy.DAM_totalHonor : 0),
    DAM_totalScore: getRandomNumberGreaterThan(1000, 5000, previousDataCopy ? previousDataCopy.DAM_totalScore : 0),
  };
  data.push(newData);
  previousData = newData;
}

// Guardar los datos en un archivo JSON
fs.writeFileSync("./jsonoutput/graph.json", JSON.stringify(data, null, 2));

console.log("Datos aleatorios generados y guardados en el archivo.");
