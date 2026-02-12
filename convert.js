const fs = require("fs");
const path = require("path");

const inputFolder = "./csv";
const outputFolder = "./json";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
  if (file.endsWith(".csv")) {
    const csv = fs.readFileSync(path.join(inputFolder, file), "utf-8");
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== "");

    // Special parsing for LearnsetData.csv because moves are encoded as [level,move],
    // which contain commas and break naive CSV splitting.
    if (file === 'LearnsetData.csv') {
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const firstComma = line.indexOf(',');
        if (firstComma === -1) continue;
        const secondComma = line.indexOf(',', firstComma + 1);

        let idStr, name, rest;
        if (secondComma === -1) {
          idStr = line.slice(0, firstComma);
          name = line.slice(firstComma + 1);
          rest = '';
        } else {
          idStr = line.slice(0, firstComma);
          name = line.slice(firstComma + 1, secondComma);
          rest = line.slice(secondComma + 1);
        }

        const obj = {
          ID: Number(idStr.trim()),
          Name: name.trim()
        };

        const learnset = [];
        const regex = /\[(\d+),([^\]]+)\]/g;
        let m;
        while ((m = regex.exec(rest)) !== null) {
          learnset.push({ Level: Number(m[1]), Move: m[2].trim() });
        }

        obj.Learnset = learnset;
        result.push(obj);
      }

      const jsonFile = file.replace(".csv", ".json");
      fs.writeFileSync(path.join(outputFolder, jsonFile), JSON.stringify(result, null, 4));
      console.log(`${file} → ${jsonFile} ✔`);
      return;
    }

    // Special parsing for EvolutionData.csv to handle multiple evolutions
    if (file === 'EvolutionData.csv') {
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const firstComma = line.indexOf(',');
        if (firstComma === -1) continue;
        const secondComma = line.indexOf(',', firstComma + 1);

        let idStr, name, rest;
        if (secondComma === -1) {
          idStr = line.slice(0, firstComma);
          name = line.slice(firstComma + 1);
          rest = '';
        } else {
          idStr = line.slice(0, firstComma);
          name = line.slice(firstComma + 1, secondComma);
          rest = line.slice(secondComma + 1);
        }

        const obj = {
          ID: Number(idStr.trim()),
          Name: name.trim()
        };

        // Capture all evolutions in format [Method|Param|Target]
        const evolutions = [];
        const evoRegex = /\[([^\|]+)\|([^\|]*)\|([^\]]+)\]/g;
        let m;
        while ((m = evoRegex.exec(rest)) !== null) {
          evolutions.push({
            Method: m[1],
            Param: m[2],
            Target: m[3]
          });
        }

        obj.Evolutions = evolutions;
        result.push(obj);
      }

      const jsonFile = file.replace(".csv", ".json");
      fs.writeFileSync(path.join(outputFolder, jsonFile), JSON.stringify(result, null, 4));
      console.log(`${file} → ${jsonFile} ✔`);
      return;
    }

    // Fallback generic CSV parsing (naive split by comma)
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const obj = {};

      headers.forEach((header, index) => {
        let value = values[index];
        if (value === undefined) value = "";
        if (!isNaN(value) && value !== "") {
          value = Number(value);
        }
        obj[header.trim()] = value;
      });

      result.push(obj);
    }

    const jsonFile = file.replace(".csv", ".json");
    fs.writeFileSync(path.join(outputFolder, jsonFile), JSON.stringify(result, null, 4));
    console.log(`${file} → ${jsonFile} ✔`);
  }
});
