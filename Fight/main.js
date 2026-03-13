const JSON_PATH = "../json/TrainerData.json";
const POKEMON_DATA_PATH = "../json/PokemonPersonalData.json";

// ── Global Pokemon Dex ───────────────────────────────────────────────────────
let POKEMON_DEX = {};

// ── Trainer Sprites ──────────────────────────────────────────────────────────
const TRAINER_SPRITES = {
  "Rival":                    "Sprite_Rival.gif",
  "PKMN Trainer Ethan":       "Sprite_Luth_HGSS.png",
  "PKMN Trainer Lyra":        "Sprite_Célesta_HGSS.png",
  "PKMN Trainer Buck":        "Sprite_Trainer_Buck.png",
  "PKMN Trainer Riley":       "Sprite_Trainer_Riley.png",
  "PKMN Trainer Cheryl":      "Sprite_Trainer_Cheryl.png",
  "PKMN Trainer Marley":      "Sprite_Trainer_Marley.png",
  "PKMN Trainer Mira":        "Sprite_Trainer_Mira.png",

  "Leader Falkner":           "Sprite_Albert_HGSS.gif",
  "Leader Bugsy":             "Sprite_Hector_HGSS.gif",
  "Leader Whitney":           "Sprite_Blanche_HGSS.gif",
  "Leader Morty":             "Sprite_Mortimer_HGSS.gif",
  "Leader Chuck":             "Sprite_Chuck_HGSS.gif",
  "Leader Jasmine":           "Sprite_Jasmine_HGSS.gif",
  "Leader Pryce":             "Sprite_Frédo_HGSS.gif",
  "Leader Clair":             "Sprite_Sandra_HGSS.gif",

  "Elite Four Will":          "Sprite_Clément_HGSS.gif",
  "Elite Four Koga":          "Sprite_Koga_HGSS.gif",
  "Elite Four Bruno":         "Sprite_Aldo_HGSS.gif",
  "Elite Four Karen":         "Sprite_Marion_HGSS.gif",
  "Champion Lance":           "Sprite_Peter_HGSS.gif",
  "Lance":                    "Sprite_Peter_HGSS.gif",

  "Rocket Boss Giovanni":     "Sprite_Giovanni_HGSS.png",
  "Team Rocket Grunt":        "Sprite_Sbire_Rocket_M_HGSS.png",
  "Team Rocket F Grunt":      "Sprite_Sbire_Rocket_F_HGSS.png",
  "Executive Archer":         "Sprite_Amos_HGSS.png",
  "Executive Ariana":         "Sprite_Ariane_HGSS.png",
  "Executive Petrel":         "Sprite_Lambda_HGSS.png",
  "Executive Proton":         "Sprite_Lance_HGSS.png",

  "Sage Nico":                "Sprite_Sage_HGSS.png",
  "Sage Chow":                "Sprite_Sage_HGSS.png",
  "Sage Edmond":              "Sprite_Sage_HGSS.png",
  "Sage Jin":                 "Sprite_Sage_HGSS.png",
  "Sage Neal":                "Sprite_Sage_HGSS.png",
  "Sage Troy":                "Sprite_Sage_HGSS.png",
  "Elder Li":                 "Sprite_Ancien_HGSS.png",

  "Kimono Girl Izumi":        "Sprite_Kimono_HGSS.png",
  "Kimono Girl Kuni":         "Sprite_Kimono_HGSS.png",
  "Kimono Girl Miki":         "Sprite_Kimono_HGSS.png",
  "Kimono Girl Misa":         "Sprite_Kimono_HGSS.png",
  "Kimono Girl Naoko":        "Sprite_Kimono_HGSS.png",
  "Kimono Girl Sayo":         "Sprite_Kimono_HGSS.png",
  "Kimono Girl Zuki":         "Sprite_Kimono_HGSS.png",

  "Youngster Joey":           "Sprite_Yougster_Joey.png",
  "Youngster Ian":            "Sprite_Yougster_Joey.png",
  "Aroma Lady Julia":         "Sprite_Aroma_Lady_Julia.png",
  "Idol Carly":               "Sprite_Star_DP.png",
  "Mystery Man Eusine":       "Sprite_Eusine_HGSS.png",
  "Juggler Irwin":            "Sprite_Jongleur_HGSS.png",

  "Bird Keeper Abe":          "Sprite_Ornithologue_HGSS.png",
  "Bird Keeper Denis":        "Sprite_Ornithologue_HGSS.png",
  "Bird Keeper Jose":         "Sprite_Ornithologue_HGSS.png",
  "Bird Keeper Rod":          "Sprite_Ornithologue_HGSS.png",
  "Bird Keeper Theo":         "Sprite_Ornithologue_HGSS.png",
  "Bird Keeper Vance":        "Sprite_Ornithologue_HGSS.png",
  "Bird Keeper Bryan":        "Sprite_Ornithologue_HGSS.png",
  "Bird Keeper Toby":         "Sprite_Ornithologue_HGSS.png",

  "Bug Catcher Wade":         "Sprite_Scout_HGSS.png",
  "Bug Catcher Al":           "Sprite_Scout_HGSS.png",
  "Bug Catcher Arnie":        "Sprite_Scout_HGSS.png",
  "Bug Catcher Benny":        "Sprite_Scout_HGSS.png",
  "Bug Catcher Josh":         "Sprite_Scout_HGSS.png",

  "Hiker Anthony":            "Sprite_Montagnard_DP.png",
  "Hiker Bailey":             "Sprite_Montagnard_DP.png",
  "Hiker Benjamin":           "Sprite_Montagnard_DP.png",
  "Hiker Daniel":             "Sprite_Montagnard_DP.png",
  "Hiker Devin":              "Sprite_Montagnard_DP.png",
  "Hiker Erik":               "Sprite_Montagnard_DP.png",
  "Hiker Michael":            "Sprite_Montagnard_DP.png",
  "Hiker Parry":              "Sprite_Montagnard_DP.png",
  "Hiker Russel":             "Sprite_Montagnard_DP.png",
  "Hiker Timothy":            "Sprite_Montagnard_DP.png",
  "Ruin Maniac Gordon":       "Sprite_Ruin_Maniac_Gordon.png",

  "Camper Elliot":            "Sprite_Campeur_DP.png",
  "Camper Grant":             "Sprite_Campeur_DP.png",
  "Camper Ivan":              "Sprite_Campeur_DP.png",
  "Camper Roland":            "Sprite_Campeur_DP.png",
  "Camper Spencer":           "Sprite_Campeur_DP.png",
  "Camper Ted":               "Sprite_Campeur_DP.png",
  "Camper Todd":              "Sprite_Campeur_DP.png",

  "Picnicker Brooke":         "Sprite_Pique-Nique_DP.png",
  "Picnicker Erin":           "Sprite_Pique-Nique_DP.png",
  "Picnicker Gina":           "Sprite_Pique-Nique_DP.png",
  "Picnicker Liz":            "Sprite_Pique-Nique_DP.png",
  "Picnicker Tiffany":        "Sprite_Pique-Nique_DP.png",
  "Cowgirl Tay-Tay":          "Sprite_Cowgirl_Tay.png",

  "Lass Carrie":              "Sprite_Fillette_HGSS.png",
  "Lass Cathy":               "Sprite_Fillette_HGSS.png",
  "Lass Connie":              "Sprite_Fillette_HGSS.png",
  "Lass Dana":                "Sprite_Fillette_HGSS.png",
  "Lass Krise":               "Sprite_Fillette_HGSS.png",

  "School Kid Alan":          "Sprite_Élève_HGSS.png",
  "School Kid Chad":          "Sprite_Élève_HGSS.png",
  "School Kid Jack":          "Sprite_Élève_HGSS.png",
  "Ace Trainer Allen":        "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Blake":        "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Brian":        "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Cody":         "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Cybil":        "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Fran":         "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Gaven":        "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Jake":         "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Jamie":        "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Joyce":        "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Kelly":        "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Kobe":         "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Lois":         "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Lola":         "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Megan":        "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Mike":         "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Paulo":        "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Peter":        "Sprite_Ace_Trainer_M.png",
  "Ace Trainer Piper":        "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Reena":        "Sprite_Ace_Trainer_F.png",
  "Ace Trainer Ryan":         "Sprite_Ace_Trainer_M.png",

  "Fisherman Andre":          "Sprite_Pécheur_DP.png",
  "Fisherman Edgar":          "Sprite_Pécheur_DP.png",
  "Fisherman Henry":          "Sprite_Pécheur_DP.png",
  "Fisherman Justin":         "Sprite_Pécheur_DP.png",
  "Fisherman Marvin":         "Sprite_Pécheur_DP.png",
  "Fisherman Ralph":          "Sprite_Pécheur_DP.png",
  "Fisherman Raymond":        "Sprite_Pécheur_DP.png",
  "Fisherman Scott":          "Sprite_Pécheur_DP.png",
  "Fisherman Tully":          "Sprite_Pécheur_DP.png",
  "Fisherman Wilton":         "Sprite_Pécheur_DP.png",

  "Sailor Harry":             "Sprite_Marin_DP.png",
  "Sailor Huey":              "Sprite_Marin_DP.png",
  "Sailor Kent":              "Sprite_Marin_DP.png",
  "Sailor Roberto":           "Sprite_Marin_DP.png",
  "Sailor Terrell":           "Sprite_Marin_DP.png",

  "Swimmer-M Berke":          "Sprite_Nageur_HGSS-JP.png",
  "Swimmer-M Charlie":        "Sprite_Nageur_HGSS-JP.png",
  "Swimmer-M George":         "Sprite_Nageur_HGSS-JP.png",
  "Swimmer-M Matthew":        "Sprite_Nageur_HGSS-JP.png",
  "Swimmer-M Randall":        "Sprite_Nageur_HGSS-JP.png",
  "Swimmer-M Ronald":         "Sprite_Nageur_HGSS-JP.png",
  "Swimmer-M Simon":          "Sprite_Nageur_HGSS-JP.png",
  "Swimmer-F Denise":         "Sprite_Nageuse_HGSS.png",
  "Swimmer-F Elaine":         "Sprite_Nageuse_HGSS.png",
  "Swimmer-F Kara":           "Sprite_Nageuse_HGSS.png",
  "Swimmer-F Kaylee":         "Sprite_Nageuse_HGSS.png",
  "Swimmer-F Paula":          "Sprite_Nageuse_HGSS.png",
  "Swimmer-F Susie":          "Sprite_Nageuse_HGSS.png",
  "Swimmer-F Wendy":          "Sprite_Nageuse_HGSS.png",

  "Black Belt Kenji":         "Sprite_Karatéka_HGSS.png",
  "Black Belt Lao":           "Sprite_Karatéka_HGSS.png",
  "Black Belt Lung":          "Sprite_Karatéka_HGSS.png",
  "Black Belt Nob":           "Sprite_Karatéka_HGSS.png",
  "Black Belt Yoshi":         "Sprite_Karatéka_HGSS.png",

  "Boarder Deandre":          "Sprite_Surfer_HGSS.png",
  "Boarder Gerardo":          "Sprite_Surfer_HGSS.png",
  "Boarder Patton":           "Sprite_Surfer_HGSS.png",

  "Skier Diana":              "Sprite_Skieuse_HGSS.png",
  "Skier Jill":               "Sprite_Skieuse_HGSS.png",

  "Beauty Callie":            "Sprite_Beauty_Victoria.png",
  "Beauty Charlotte":         "Sprite_Beauty_Victoria.png",
  "Beauty Samantha":          "Sprite_Beauty_Victoria.png",
  "Beauty Valerie":           "Sprite_Beauty_Victoria.png",
  "Beauty Victoria":          "Sprite_Beauty_Victoria.png",

  "Gentleman Alfred":         "Sprite_Socialite_M.png",
  "Gentleman Preston":        "Sprite_Socialite_M.png",
  "Gentleman Samuel":         "Sprite_Socialite_M.png",
  "Socialite Brandon":        "Sprite_Socialite_F.png",

  "Lady Kim":                 "Sprite_Lady_Kim.png",
  "Parasol Lady Joan":        "Sprite_Parasol_Lady_Joan_HGSS.png",
  "Parasol Lady Kassandra":   "Sprite_Parasol_Lady_Joan_HGSS.png",

  "Poke Maniac Beckett":      "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Brent":        "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Donald":       "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Harrison":     "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Issac":        "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Larry":        "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Ron":          "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Shane":        "Sprite_Pokémaniac_HGSS.png",
  "Poke Maniac Zach":         "Sprite_Pokémaniac_HGSS.png",
  "Trainer Burnetto":         "Sprite_Pokefan_M.png",
  "Pokefan Derek":            "Sprite_Pokefan_M.png",
  "Pokefan William":          "Sprite_Pokefan_M.png",
  "Pokefan Beverly":          "Sprite_Pokefan_F.png",
  "Pokefan Ruth":             "Sprite_Pokefan_F.png",
  "Rancher Bobbie":           "Sprite_Rancher_HGSS.png",

  "Psychic Eli":              "Sprite_Kinésiste_M_DP.png",
  "Psychic Greg":             "Sprite_Kinésiste_M_DP.png",
  "Psychic Mark":             "Sprite_Kinésiste_M_DP.png",
  "Psychic Phil":             "Sprite_Kinésiste_M_DP.png",
  "Psychic Vernon":           "Sprite_Kinésiste_M_DP.png",
  "Medium Edith":             "Sprite_Médium_HGSS.png",
  "Medium Georgina":          "Sprite_Médium_HGSS.png",
  "Medium Grace":             "Sprite_Médium_HGSS.png",
  "Medium Martha":            "Sprite_Médium_HGSS.png",

  "Super Nerd Eric":          "Sprite_Intello_HGSS.png",
  "Super Nerd Markus":        "Sprite_Intello_HGSS.png",
  "Super Nerd Teru":          "Sprite_Intello_HGSS.png",

  "Scientist Garett":         "Sprite_Scientifique_HGSS.png",
  "Scientist Gregg":          "Sprite_Scientifique_HGSS.png",
  "Scientist Mitch":          "Sprite_Scientifique_HGSS.png",
  "Scientist Ross":           "Sprite_Scientifique_HGSS.png",
  "Scientist Trenton":        "Sprite_Scientifique_HGSS.png",

  "Policeman Dirk":           "Sprite_Agent.png",
  "Policeman Keith":          "Sprite_Agent.png",

  "Burglar Duncan":           "Sprite_Pillard_HGSS.png",
  "Burglar Orson":            "Sprite_Pillard_HGSS.png",

  "Firebreather Bill":        "Sprite_Crache-Feu_HGSS.png",
  "Firebreather Ned":         "Sprite_Crache-Feu_HGSS.png",
  "Firebreather Ray":         "Sprite_Crache-Feu_HGSS.png",
  "Firebreather Richard":     "Sprite_Crache-Feu_HGSS.png",
  "Firebreather Walt":        "Sprite_Crache-Feu_HGSS.png",

  "Twins Amy&Mimi":           "Sprite_Jumelles_HGSS.png",
  "Twins Tori&Til":           "Sprite_Jumelles_HGSS.png",
  "Twins Clea&Gil":           "Sprite_Jumelles_HGSS.png",
  "Young Couple Duff&Eda":    "Sprite_Jeune_Couple_HGSS.png",
  "Double Team Thom&Kae":     "Sprite_Couple_Cool_HGSS.png",

  "Sudowoodo":                "../PokemonList/img/pokemon_animated_sprite/185.gif",
  "Ho-Oh":                    "../PokemonList/img/pokemon_animated_sprite/250.gif",
  "Electrode (x3)":           "../PokemonList/img/pokemon_animated_sprite/101.gif",
};

function getTrainerSprite(name) {
  for (const key in TRAINER_SPRITES) {
    if (name.includes(key)) return `img/trainer/${TRAINER_SPRITES[key]}`;
  }
  return "img/trainer/Sprite_Default.png";
}

// ── Pokemon Sprite via ID Pokédex ────────────────────────────────────────────
function getPokemonSprite(species) {
  const key = Object.keys(POKEMON_DEX).find(
    k => k.toLowerCase() === species.toLowerCase()
  );
  const pokemon = key ? POKEMON_DEX[key] : null;

  if (!pokemon) return "../PokemonList/img/pokemon_animated_sprite/0.gif";

  const id = pokemon.ID;
  const name = pokemon.Name.toLowerCase();

  const noFormeSuffix = ["ho-oh", "porygon-z", "nidoran-m", "nidoran-f"];

  if (noFormeSuffix.includes(name)) {
    return `../PokemonList/img/pokemon_animated_sprite/${id}.gif`;
  }

  if (name.includes("-")) {
    const forme = name.split("-").slice(1).join("-");
    return `../PokemonList/img/pokemon_animated_sprite/${id}-${forme}.gif`;
  }

  return `../PokemonList/img/pokemon_animated_sprite/${id}.gif`;
}

// ── Load Pokédex ─────────────────────────────────────────────────────────────
async function loadPokemonDex() {
  const res = await fetch(POKEMON_DATA_PATH);
  const data = await res.json();
  data.forEach(p => {
    POKEMON_DEX[p.Name] = p;
    POKEMON_DEX[p.Name.toLowerCase()] = p;
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getDivClass(trainerName) {
  const mandatoryKeywords = ["*", "rival", "elder li", "leader", "executive", "boss", "kimono", "ho-oh", "elite four", "champion"];

  const name = (trainerName || "").toLowerCase();

  if (name.includes("/")) return "green_div divs";
  if (mandatoryKeywords.some(k => name.includes(k))) return "red_div divs";
  return "blue_div divs";
}

// ── Table Builder ────────────────────────────────────────────────────────────
function buildTrainerTable(trainer, locationName) {
  const { name, notes, pokemon } = trainer;
  const trainerSprite = getTrainerSprite(name);

  const pokes = [...pokemon];
  while (pokes.length < 6) pokes.push(null);

  function cell(val) { return `<th>${val || ""}</th>`; }

  const spriteCells = pokes.map(p => {
    if (!p) return `<th rowspan="2"></th>`;
    const sprite = getPokemonSprite(p.species);
    return `<th rowspan="2">
      <a href="../PokemonList/index.html?search=${encodeURIComponent(p.species)}" title="Pokemon info">
        <img src="${sprite}" alt="${p.species}" style="cursor:pointer;">
      </a>
    </th>`;
  }).join("");

  const nameCells   = pokes.map(p => cell(p ? p.species : "")).join("");
  const notesCell   = `<th rowspan="8">${(notes || "").replace(/\n/g, "<br>")}</th>`;
  const levelCells  = pokes.map(p => cell(p ? p.level : "")).join("");
  const natureCells = pokes.map(p => cell(p ? (p.nature || "").replace(/\n/g, "<br>") : "")).join("");
  const abilityCells = pokes.map(p => {
    if (!p) return `<th></th>`;
    const urlName = (p.ability || '').toLowerCase().replace(/\s+/g, '-');
    return `<th><a href="https://pokemondb.net/ability/${urlName}" target="_blank" rel="noopener noreferrer" title="Search ability">${p.ability || ''}</a></th>`;
  }).join("");
    const itemCells = pokes.map(p => {
    if (!p || !p.item) return `<th></th>`;
    const noLink = ['no item', 'none', '-', ''].includes(p.item.toLowerCase());
    if (noLink) return `<th>${p.item}</th>`;
    const urlName = p.item.toLowerCase().replace(/\s+/g, '-');
    return `<th><a href="https://pokemondb.net/item/${urlName}" target="_blank" rel="noopener noreferrer" title="Search item">${p.item}</a></th>`;
  }).join("");

  function moveRow(idx) {
    const cells = pokes.map(p => {
      const move = p && p.moves ? p.moves[idx] || "" : "";
      if (!move) return `<th></th>`;
      const urlName = move.toLowerCase().replace(/\s+/g, '-');
      return `<th><a href="https://pokemondb.net/move/${urlName}" target="_blank" rel="noopener noreferrer" title="Search move">${move}</a></th>`;
    }).join("");
    return `<tr>${cells}<th>Move ${idx + 1}</th></tr>`;
  }

  return `
  <table border="1" cellspacing="0" cellpadding="6">
    <thead>
      <tr><th colspan="8">${locationName}</th></tr>
      <tr>
        <th rowspan="2"><img src="${trainerSprite}" alt="${name}"></th>
        ${spriteCells}
        <th rowspan="2">Pokemon Sprite</th>
      </tr>
      <tr></tr>
    </thead>
    <tbody>
      <tr><th>${name}</th>${nameCells}<th>Pokemon Name</th></tr>
      <tr>${notesCell}${levelCells}<th>Level</th></tr>
      <tr>${natureCells}<th>Nature<br>(+Stat -Stat)</th></tr>
      <tr>${abilityCells}<th>Ability</th></tr>
      <tr>${itemCells}<th>Held Item</th></tr>
      ${moveRow(0)}
      ${moveRow(1)}
      ${moveRow(2)}
      ${moveRow(3)}
    </tbody>
  </table>`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function renderAllSplits() {
  const main = document.querySelector("main");

  try {
    await loadPokemonDex();
    const res = await fetch(JSON_PATH);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const allData = await res.json();

    Object.values(allData).forEach(splitData => {
      // ── Titre du split
      const splitTitle = document.createElement("h2");
      splitTitle.textContent = splitData.split.toUpperCase();
      splitTitle.classList.add("split_title");
      splitTitle.dataset.split = splitData.split.toLowerCase();
      main.appendChild(splitTitle);

      // ── Trainers
      splitData.locations.forEach(location => {
        location.trainers.forEach(trainer => {
          const div = document.createElement("div");
          div.className = getDivClass(trainer.name);
          div.dataset.split = splitData.split.toLowerCase();
          div.innerHTML = buildTrainerTable(trainer, location.name);
          main.appendChild(div);
        });
      });
    });

    // ── Filtre — branché après que tout le contenu est généré
    const filterSelect = document.getElementById('filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', () => {
        const val = filterSelect.value;
        document.querySelectorAll('main .divs').forEach(div => {
          div.style.display = (val === 'all' || div.dataset.split === val) ? '' : 'none';
        });
        document.querySelectorAll('main .split_title').forEach(title => {
          title.style.display = (val === 'all' || title.dataset.split === val) ? '' : 'none';
        });
      });
    }

  } catch(err) {
    console.error("Erreur de chargement :", err);
  }
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderAllSplits();
});