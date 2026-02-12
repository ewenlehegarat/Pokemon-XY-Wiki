async function getPokemon() {
  try {
    const response = await fetch("../json/PokemonPersonalData.json");
    const reponseTwo = await fetch("../json/LearnsetData.json");
    const data = await response.json();
    const dataTwo = await reponseTwo.json()

    const resultat = data;
    const resultatTwo = dataTwo

    const pokemonContainer = document.querySelector('.pokemon_container');

    if (!pokemonContainer) {
      throw new Error("Le conteneur '.pokemon_container' n'existe pas dans le DOM");
    }

    // collecteurs pour ajuster les tailles après chargement
    const spriteImages = [];
    const loadPromises = [];

    resultat.forEach(pokemon => {

      const pokemonDiv = document.createElement('div');
      pokemonDiv.classList.add('pokemon_div');

      const pokemonTop = document.createElement('div');
      pokemonTop.classList.add('pokemon_top');

      const pokemonNom = document.createElement('h2');
      pokemonNom.textContent = pokemon.Name;

      const pokemonPokedexId = document.createElement('h3');
      pokemonPokedexId.textContent = '#' + String(pokemon.ID).padStart(3, '0');

      pokemonTop.append(pokemonNom, pokemonPokedexId);

      const pokemonImg = document.createElement('img');
      pokemonImg.alt = pokemon.Name;
      pokemonImg.classList.add('pokemon_sprite');
      
      // Gérer les formes alternatives (Deoxys-Attack, etc.)
      if (pokemon.Name.includes('-')) {
        const forme = pokemon.Name.split('-')[1].toLowerCase();
        pokemonImg.src = `img/pokemon_animated_sprite/${pokemon.ID}-${forme}.gif`;
      } else {
        pokemonImg.src = `img/pokemon_animated_sprite/${pokemon.ID}.gif`;
      }

      // TALENTS
      const divTalent = document.createElement('div');
      divTalent.classList.add('talent');

      const talentText = document.createElement('h3');
      talentText.classList.add('talent_text');
      talentText.textContent = 'Ability :';

      const divNomTalent = document.createElement('div');
      divNomTalent.classList.add('nom_talent');

      divTalent.append(talentText, divNomTalent);

      const abilities = [
        { name: pokemon.Ability1, label: '1' },
        { name: pokemon.Ability2, label: '2' }
      ].filter(a => a.name && a.name !== '-');

      abilities.forEach((ability) => {
        const talentNom = document.createElement('h5');
        talentNom.textContent = `${ability.name} (${ability.label})`;
        talentNom.classList.add('talent_nom');
        divNomTalent.appendChild(talentNom);
      });

      // TYPES
      const typesContainer = document.createElement('div');
      typesContainer.classList.add('types_container');

      const types = [pokemon.Type1, pokemon.Type2].filter(t => t && t !== '-');
      types.forEach(type => {
        const typeImg = document.createElement('img');
        typeImg.src = `./img/type/${type.toLowerCase()}.png`;
        typeImg.alt = type;
        typeImg.classList.add('type_image');
        typesContainer.appendChild(typeImg);
      });

      // STATS
      function createStat(label, value, className) {
        const div = document.createElement('div');
        div.classList.add(className);

        const title = document.createElement('h4');
        title.textContent = `${label} : ${value}`;

        const bar = document.createElement('div');
        bar.classList.add(`barre_${className}`);
        bar.style.width = value + "px";

        div.append(title, bar);
        return div;
      }

      const divStats = document.createElement('div');
      divStats.classList.add('div_stats');

      divStats.append(
        createStat("Hp", pokemon.BaseHP, "hp"),
        createStat("Atk", pokemon.BaseAttack, "atk"),
        createStat("Def", pokemon.BaseDefense, "def"),
        createStat("Spa", pokemon.BaseSpecialAttack, "spa"),
        createStat("Spd", pokemon.BaseSpecialDefense, "spd"),
        createStat("Spe", pokemon.BaseSpeed, "spe")
      );

      pokemonDiv.append(
        pokemonTop,
        pokemonImg,
        divTalent,
        typesContainer,
        divStats
      );
      
      // Ajouter le learnset correspondant au Pokémon courant
      const learnEntry = resultatTwo.find(entry => entry.ID === pokemon.ID || entry.Name === pokemon.Name);
      if (learnEntry && Array.isArray(learnEntry.Learnset) && learnEntry.Learnset.length) {
        const learnDiv = document.createElement('div');
        learnDiv.classList.add('learnset');

        const learnTitle = document.createElement('h3');
        learnTitle.textContent = 'Learnset :';
        learnDiv.appendChild(learnTitle);

        const ul = document.createElement('ul');
        learnEntry.Learnset.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.Level} — ${item.Move}`;
          ul.appendChild(li);
        });

        learnDiv.appendChild(ul);
        pokemonDiv.appendChild(learnDiv);
      }

      pokemonContainer.appendChild(pokemonDiv);

      // enregistrer l'image pour mesure après chargement
      spriteImages.push(pokemonImg);
      const imgLoad = new Promise((resolve) => {
        if (pokemonImg.complete) return resolve();
        pokemonImg.addEventListener('load', () => resolve());
        pokemonImg.addEventListener('error', () => resolve());
      });
      loadPromises.push(imgLoad);
    });

    // attendre que toutes les images soient chargées, puis ajuster leur largeur
    await Promise.all(loadPromises);
    if (spriteImages.length) {
      const widths = spriteImages.map(img => img.naturalWidth || 0);
      const maxWidth = Math.max(...widths, 0);
      if (maxWidth > 0) {
        const DESIRED_MAX = 250; // largeur max d'affichage souhaitée
        const DESIRED_MIN = 80;  // largeur min d'affichage souhaitée
        spriteImages.forEach(img => {
          const w = img.naturalWidth || maxWidth;
          const displayWidth = Math.round(Math.max(DESIRED_MIN, Math.round((w / maxWidth) * DESIRED_MAX)));
          img.style.width = displayWidth + 'px';
          img.style.height = 'auto';
        });
      }
    }

    console.log(resultat);
    

  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

getPokemon();