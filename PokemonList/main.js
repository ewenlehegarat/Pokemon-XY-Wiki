async function getPokemon() {
  try {
    const response = await fetch("../json/PokemonPersonalData.json");
    const responseLearn = await fetch("../json/LearnsetData.json");
    const responseEvo = await fetch("../json/EvolutionData.json");
    const responseTM = await fetch("../json/TMHMData.json");
    const data = await response.json();
    const dataLearn = await responseLearn.json();
    const dataEvo = await responseEvo.json();
    const dataTM = await responseTM.json();

    const resultat = data;
    const resultatLearn = dataLearn;
    const resultatEvo = dataEvo;
    const resultatTM = dataTM;

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

      const pokemonPokedexId = document.createElement('h2');
      pokemonPokedexId.textContent = '#' + String(pokemon.ID).padStart(3, '0');

      pokemonTop.append(pokemonNom, pokemonPokedexId);

      const pokemonImg = document.createElement('img');
      pokemonImg.alt = pokemon.Name;
      pokemonImg.classList.add('pokemon_sprite');
      
      // Gérer les formes alternatives (Deoxys-Attack, etc.)
      // Exception pour les pokémon avec tiret dans le nom (Ho-Oh, Nidoran-M, Porygon-Z, etc.)
      if (pokemon.Name.includes('-') && !['Ho-Oh', 'Ho-oh', 'Nidoran-M', 'Nidoran-F', 'Porygon-Z', 'Porygon-z'].includes(pokemon.Name)) {
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

      const types = [pokemon.Type1, pokemon.Type2].filter((t, index, arr) => t && t !== '-' && arr.indexOf(t) === index);
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
      const learnEntry = resultatLearn.find(entry => entry.ID === pokemon.ID || entry.Name === pokemon.Name);
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

        // Ajouter la liste des TM / HM pour ce pokémon
        const tmEntry = resultatTM.find(entry => entry.ID === pokemon.ID || entry.Name === pokemon.Name);
        if (tmEntry) {
          const tmDiv = document.createElement('div');
          tmDiv.classList.add('tmhm');

          const tmTitle = document.createElement('h3');
          tmTitle.textContent = 'TM / HM :';
          tmDiv.appendChild(tmTitle);

          const ulTm = document.createElement('ul');
          Object.keys(tmEntry).forEach(key => {
            if (/^(TM|HM)/i.test(key)) {
              const val = String(tmEntry[key]).toLowerCase();
              if (val.includes('true')) {
                const li = document.createElement('li');
                const display = key.replace(/\[|\]|"/g, '').trim();
                li.textContent = display;
                ulTm.appendChild(li);
              }
            }
          });

          if (ulTm.childElementCount > 0) {
            tmDiv.appendChild(ulTm);
            pokemonDiv.appendChild(tmDiv);
          }
        }
      }

      // Ajouter les évolutions
      const evoEntry = resultatEvo.find(entry => entry.ID === pokemon.ID || entry.Name === pokemon.Name);
      if (evoEntry && Array.isArray(evoEntry.Evolutions) && evoEntry.Evolutions.length > 0) {
        const evoDiv = document.createElement('div');
        evoDiv.classList.add('evolution');

        const evoTitle = document.createElement('h3');
        evoTitle.textContent = 'Evolutions :';
        evoDiv.appendChild(evoTitle);

        const evoContainer = document.createElement('div');
        evoContainer.classList.add('evo_container')
        evoContainer.style.display = 'flex';
        evoContainer.style.gap = '10px';
        evoContainer.style.flexWrap = 'wrap';
        evoContainer.style.alignItems = 'center';
        
        evoEntry.Evolutions.forEach((evo) => {
          // Trouver le pokémon cible
          const targetPokemon = resultat.find(p => p.Name === evo.Target);
          
          if (targetPokemon) {
            // Créer une enveloppe pour chaque évolution
            const itemDiv = document.createElement('div');
            itemDiv.style.textAlign = 'center';
            
            // Ajouter le texte ou l'icône de méthode
            const itemFileName = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            let methodElement;
            if (evo.Method === 'LevelingUp') {
              methodElement = document.createElement('p');
              methodElement.style.marginBottom = '10px';
              methodElement.style.fontSize = '12px';
              methodElement.textContent = `Level ${evo.Param}`;
            } else if (evo.Method === 'Item') {
              // afficher l'image de l'objet si elle existe, sinon fallback texte
              const itemImg = document.createElement('img');
              itemImg.alt = evo.Param;
              itemImg.style.width = '32px';
              itemImg.style.height = '32px';
              itemImg.style.objectFit = 'contain';
              itemImg.style.marginBottom = '8px';
              itemImg.src = `./img/items/${itemFileName(evo.Param)}.png`;
              itemImg.addEventListener('error', () => {
                const span = document.createElement('span');
                span.textContent = evo.Param;
                span.style.fontSize = '12px';
                if (itemImg.parentNode) itemImg.parentNode.replaceChild(span, itemImg);
              });
              methodElement = itemImg;
            } else if (evo.Method === 'Trade') {
              methodElement = document.createElement('p');
              methodElement.style.marginBottom = '10px';
              methodElement.style.fontSize = '12px';
              methodElement.textContent = 'Trade';
            } else {
              methodElement = document.createElement('p');
              methodElement.style.marginBottom = '10px';
              methodElement.style.fontSize = '12px';
              methodElement.textContent = `${evo.Method}${evo.Param ? ' (' + evo.Param + ')' : ''}`;
            }
            
            // Créer l'image du pokémon évolué
            const evoImg = document.createElement('img');
            evoImg.alt = evo.Target;
            evoImg.style.maxWidth = '100px';
            evoImg.style.maxHeight = '100px';
            
            if (targetPokemon.Name.includes('-') && !['Ho-Oh', 'Ho-oh', 'Nidoran-M', 'Nidoran-F', 'Porygon-Z'].includes(targetPokemon.Name)) {
              const forme = targetPokemon.Name.split('-')[1].toLowerCase();
              evoImg.src = `img/pokemon_animated_sprite/${targetPokemon.ID}-${forme}.gif`;
            } else {
              evoImg.src = `img/pokemon_animated_sprite/${targetPokemon.ID}.gif`;
            }
            
            itemDiv.append(methodElement, evoImg);
            evoContainer.appendChild(itemDiv);
          }
        });
        
        evoDiv.appendChild(evoContainer);
        pokemonDiv.appendChild(evoDiv);
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