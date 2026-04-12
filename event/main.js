const data = await fetch('../json/SpecialEvent.json').then(res => res.json());
const pokemonPersonalData = await fetch('../json/PokemonPersonalData.json').then(res => res.json());

const POKEMON_DEX = {};
pokemonPersonalData.forEach(p => {
  POKEMON_DEX[p.Name] = { ID: p.ID, Name: p.Name };
});

const main = document.querySelector('main');

const PLATE_POKEMON = {
  "Flame Plate":  "Charizard",
  "Splash Plate": "Gyarados",
  "Icicle Plate": "Articuno",
  "Toxic Plate":  "Gengar",
  "Mind Plate":   "Alakazam",
  "Zap Plate":    "Zapdos",
  "Meadow Plate": "Bellossom",
  "Fist Plate":   "Hitmonchan",
  "Sky Plate":    "Pidgeot",
  "Earth Plate":  "Dugtrio",
  "Insect Plate": "Heracross",
  "Stone Plate":  "Golem",
  "Spooky Plate": "Gengar",
  "Draco Plate":  "Dragonair",
  "Dread Plate":  "Umbreon",
  "Iron Plate":   "Steelix"
};

// ── Sprite par nom ────────────────────────────────────────────────────────────
function getPokemonSprite(species) {
  const key = Object.keys(POKEMON_DEX).find(k => k.toLowerCase() === species.toLowerCase());
  const pokemon = key ? POKEMON_DEX[key] : null;
  if (!pokemon) return "../PokemonList/img/pokemon_animated_sprite/0.gif";

  const id = pokemon.ID;
  const name = pokemon.Name.toLowerCase();
  const noFormeSuffix = ["ho-oh", "porygon-z", "nidoran-m", "nidoran-f"];

  if (noFormeSuffix.includes(name)) return `../PokemonList/img/pokemon_animated_sprite/${id}.gif`;
  if (name.includes("-")) {
    const forme = name.split("-").slice(1).join("-");
    return `../PokemonList/img/pokemon_animated_sprite/${id}-${forme}.gif`;
  }
  return `../PokemonList/img/pokemon_animated_sprite/${id}.gif`;
}

// ── Sprite par ID avec fallback shiny ────────────────────────────────────────
function getSpriteUrl(id, sprite = null) {
  const base = `../PokemonList/img/pokemon_animated_sprite/`;
  return `${base}${sprite || id + '.gif'}`;
}

// ── Redirection PokemonList ───────────────────────────────────────────────────
function goToPokemonList(pokemonName) {
  window.location.href = `../PokemonList/index.html?search=${encodeURIComponent(pokemonName)}`;
}

// ── Carte Pokémon ─────────────────────────────────────────────────────────────
function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon_card');

  // Nom
  const name = document.createElement('h3');
  name.textContent = `${
    Array.isArray(pokemon.id)
      ? pokemon.id.map(id => '#' + String(id).padStart(3, '0')).join(' / ')
      : isNaN(pokemon.id) ? '' : '#' + String(pokemon.id).padStart(3, '0')
  } ${pokemon.name}`;
  card.appendChild(name);

  // Sprite(s)
  const spritesDiv = document.createElement('div');
  spritesDiv.classList.add('sprites');
  const ids = Array.isArray(pokemon.id) ? pokemon.id : [pokemon.id];
  ids.forEach(id => {
    if (isNaN(id)) return;
    const img = document.createElement('img');
    img.src = getSpriteUrl(id, pokemon.sprite || null);
    img.alt = pokemon.name;
    img.classList.add('pokemon_sprite');
    img.style.cursor = 'pointer';
    img.title = `Go to ${pokemon.name}`;
    img.addEventListener('error', () => img.style.display = 'none');
    img.addEventListener('click', () => goToPokemonList(pokemon.name));
    spritesDiv.appendChild(img);
  });
  card.appendChild(spritesDiv);

  // Niveau
  if (pokemon.level !== null && pokemon.level !== undefined) {
    const level = document.createElement('p');
    level.innerHTML = `<strong>Level :</strong> ${Array.isArray(pokemon.level) ? pokemon.level.join(' / ') : pokemon.level}`;
    card.appendChild(level);
  }

  // Requirements
  if (pokemon.requirements?.length) {
    const req = document.createElement('p');
    req.innerHTML = `<strong>Requirements :</strong> ${pokemon.requirements.join(' | ')}`;
    card.appendChild(req);
  }

  // Image optionnelle
  if (pokemon.image) {
    const img = document.createElement('img');
    img.src = pokemon.image;
    img.alt = pokemon.name;
    img.classList.add('event_image');
    img.addEventListener('error', () => img.style.display = 'none');
    card.appendChild(img);
  }

  // Guide
  if (pokemon.guide) {
    const guide = document.createElement('p');
    guide.classList.add('guide');
    guide.innerHTML = `<strong>Guide :</strong> ${pokemon.guide}`;
    card.appendChild(guide);
  }

  // Options (Pseudo-Legend)
  if (pokemon.options) {
    const optTitle = document.createElement('p');
    optTitle.innerHTML = '<strong>Channels :</strong>';
    card.appendChild(optTitle);

    const ul = document.createElement('ul');
    pokemon.options.forEach(opt => {
      const li = document.createElement('li');
      li.textContent = `${opt.channel} → ${opt.pokemon}`;
      ul.appendChild(li);

      if (opt.pokemon_id) {
        const img = document.createElement('img');
        img.src = getSpriteUrl(opt.pokemon_id, opt.sprite || null);
        img.alt = opt.pokemon;
        img.classList.add('pokemon_sprite');
        img.style.cursor = 'pointer';
        img.title = `Go to ${opt.pokemon}`;
        img.addEventListener('error', () => img.style.display = 'none');
        img.addEventListener('click', () => goToPokemonList(opt.pokemon));
        ul.appendChild(img);
      }
    });
    card.appendChild(ul);
  }

  return card;
}

// ── Section standard ──────────────────────────────────────────────────────────
function createSection(title, items) {
  const div = document.createElement('div');
  div.classList.add('divs');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  div.appendChild(h2);
  items.forEach(item => div.appendChild(createPokemonCard(item)));
  return div;
}

// ── Section Plate Locations ───────────────────────────────────────────────────
function createPlateSection(title, items) {
  const div = document.createElement('div');
  div.classList.add('divs');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  div.appendChild(h2);

  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = item.name + ': ';
    li.appendChild(strong);
    li.appendChild(document.createTextNode(item.location));
    ul.appendChild(li);
  });
  div.appendChild(ul);
  return div;
}

// ── Rendu ─────────────────────────────────────────────────────────────────────
[
  { key: 'Non-Legendary Encounters', title: 'Non-Legendary Encounters' },
  { key: 'Gifted Pokemon',           title: 'Gifted Pokémon' },
  { key: 'Legendary Pokemon',        title: 'Legendary Pokémon' },
].forEach(({ key, title }) => {
  if (data[key]) main.appendChild(createSection(title, data[key]));
});

if (data['Plate Locations']) {
  main.appendChild(createPlateSection('Plate Locations', data['Plate Locations']));
}