const JSON_PATH = "../json/TrainerData.json";
const POKEMON_DATA_PATH = "../json/PokemonPersonalData.json";

// ── Global Pokemon Dex ───────────────────────────────────────────────────────

let POKEMON_DEX = {};

// ── Trainer Sprites ──────────────────────────────────────────────────────────

const TRAINER_SPRITES = {
  "Rival": "Sprite_Rival.gif",
  "Youngster Joey": "Sprite_Youngster_Joey.png",
  "Aroma Lady Julia": "Sprite_Aroma_Lady_Julia.png",
  "Leader Falkner": "Sprite_Falkner.png"
};

function getTrainerSprite(name) {
  for (const key in TRAINER_SPRITES) {
    if (name.includes(key)) {
      return `img/trainer/${TRAINER_SPRITES[key]}`;
    }
  }
  return "img/trainer/Sprite_Default.png";
}

// ── Pokemon Sprite (même logique que ton Pokédex) ────────────────────────────

function getPokemonSprite(species) {

  const pokemon = POKEMON_DEX[species];

  if (!pokemon) {
    return "../PokemonList/img/pokemon_animated_sprite/0.gif";
  }

  const exceptions = [
    'Ho-Oh',
    'Ho-oh',
    'Nidoran-M',
    'Nidoran-F',
    'Porygon-Z',
    'Porygon-z'
  ];

  if (pokemon.Name.includes('-') && !exceptions.includes(pokemon.Name)) {

    const forme = pokemon.Name.split('-')[1].toLowerCase();

    return `../PokemonList/img/pokemon_animated_sprite/${pokemon.ID}-${forme}.gif`;
  }

  return `../PokemonList/img/pokemon_animated_sprite/${pokemon.ID}.gif`;
}

// ── Load Pokédex ─────────────────────────────────────────────────────────────

async function loadPokemonDex() {

  const res = await fetch(POKEMON_DATA_PATH);
  const data = await res.json();

  data.forEach(p => {
    POKEMON_DEX[p.Name] = p;
  });

}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDivClass(trainerName, notes) {

  const mandatoryKeywords = [
    "rival","leader","elite","champion","professor","elder",
    "kimono","red","lance","karen","will","koga","bruno"
  ];

  const name = (trainerName || "").toLowerCase();
  const note = (notes || "").toLowerCase();

  if (mandatoryKeywords.some(k => name.includes(k) || note.includes(k))) {
    return "red_div divs";
  }

  return "blue_div divs";
}

// ── Table Builder ────────────────────────────────────────────────────────────

function buildTrainerTable(trainer, locationName) {

  const { name, notes, pokemon } = trainer;

  const trainerSprite = getTrainerSprite(name);

  const pokes = [...pokemon];
  while (pokes.length < 6) pokes.push(null);

  function cell(val) {
    return `<th>${val || ""}</th>`;
  }

  // ── Pokemon sprites
  const spriteCells = pokes.map(p => {

    if (!p) return `<th rowspan="2"></th>`;

    const sprite = getPokemonSprite(p.species);

    return `
      <th rowspan="2">
        <img src="${sprite}" alt="${p.species}">
      </th>
    `;

  }).join("");

  const nameCells = pokes.map(p => cell(p ? p.species : "")).join("");

  const notesCell = `<th rowspan="8">${(notes || "").replace(/\n/g,"<br>")}</th>`;

  const levelCells = pokes.map(p => cell(p ? p.level : "")).join("");

  const natureCells = pokes.map(p =>
    cell(p ? (p.nature || "").replace(/\n/g,"<br>") : "")
  ).join("");

  const abilityCells = pokes.map(p => cell(p ? p.ability : "")).join("");

  const itemCells = pokes.map(p => cell(p ? p.item : "")).join("");

  function moveRow(idx) {

    const cells = pokes.map(p =>
      cell(p && p.moves ? p.moves[idx] || "" : "")
    ).join("");

    return `<tr>${cells}<th>Move ${idx + 1}</th></tr>`;
  }

  return `
  <table border="1" cellspacing="0" cellpadding="6">

    <thead>

      <tr>
        <th colspan="8">${locationName}</th>
      </tr>

      <tr>
        <th rowspan="2">
          <img src="${trainerSprite}" alt="${name}">
        </th>

        ${spriteCells}

        <th rowspan="2">Pokemon Sprite</th>
      </tr>

      <tr></tr>

    </thead>

    <tbody>

      <tr>
        <th>${name}</th>
        ${nameCells}
        <th>Pokemon Name</th>
      </tr>

      <tr>
        ${notesCell}
        ${levelCells}
        <th>Level</th>
      </tr>

      <tr>
        ${natureCells}
        <th>Nature<br>(+Stat -Stat)</th>
      </tr>

      <tr>
        ${abilityCells}
        <th>Ability</th>
      </tr>

      <tr>
        ${itemCells}
        <th>Held Item</th>
      </tr>

      ${moveRow(0)}
      ${moveRow(1)}
      ${moveRow(2)}
      ${moveRow(3)}

    </tbody>

  </table>
  `;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function renderSplit(splitKey) {

  const main = document.querySelector("main");

  try {

    // charger le Pokédex
    await loadPokemonDex();

    const res = await fetch(JSON_PATH);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const allData = await res.json();
    const splitData = allData[splitKey];

    if (!splitData) {
      console.error(`Split introuvable : ${splitKey}`);
      return;
    }

    const h2 = document.querySelector("h2");

    if (h2) {
      h2.textContent =
        `Sacred Gold/Storm Silver Trainer Battles - ${splitData.split.toUpperCase()}`;
    }

    splitData.locations.forEach(location => {

      location.trainers.forEach(trainer => {

        const div = document.createElement("div");

        div.className = getDivClass(trainer.name, trainer.notes);

        div.innerHTML = buildTrainerTable(trainer, location.name);

        main.appendChild(div);

      });

    });

  }

  catch(err) {
    console.error("Erreur de chargement :", err);
  }

}

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  const splitKey = params.get("split") || "falkner_split";

  renderSplit(splitKey);

});