async function getPokemon() {
  try {
    const reponse = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/721");
    const resultat = await reponse.json();

    const pokemonContainer = document.querySelector('.pokemon_container');

    resultat.forEach(pokemon => {
      const pokemonDiv = document.createElement('div');
      const pokemonNom = document.createElement('h2');
      const pokemonPokedexId = document.createElement('h3')
      const pokemonImg = document.createElement('img');
      const pokemonTop = document.createElement('div')
      pokemonTop.classList.add('pokemon_top')
      pokemonTop.append(pokemonNom, pokemonPokedexId)
      
      pokemonNom.textContent = pokemon.name;
      if (pokemon.id < 650) {
        pokemonImg.src = `img/pokemon_animated_sprite/${pokemon.id}.gif`;
      } else {
        pokemonImg.src = pokemon.image;
      }
      pokemonImg.alt = pokemon.name;
      pokemonImg.style.width = '80px'

      pokemonPokedexId.textContent = '#' + String(pokemon.id).padStart(3, '0');

      const typesContainer = document.createElement('div');
      typesContainer.classList.add('types_container');

      pokemon.apiTypes.forEach(type => {
        const typeImg = document.createElement('img');
        typeImg.src = `img/type/${type.name}.png`;
        typeImg.alt = type.name;
        typeImg.classList.add('type_icon');
        typeImg.width = 75
        typeImg.classList.add('type_image')
        typesContainer.appendChild(typeImg);
      });

      const divHp = document.createElement('div')
      divHp.classList.add('div_hp')
      const barreHp = document.createElement('div')
      barreHp.classList.add('barre_hp')
      barreHp.style.width = pokemon.stats.HP + "px";
      const pokemonStatsHp = document.createElement('h4');
      pokemonStatsHp.textContent = `Hp : ${pokemon.stats.HP}`
      divHp.appendChild(pokemonStatsHp);
      divHp.appendChild(barreHp)

      const divAtk = document.createElement('div')
      divAtk.classList.add('div_atk')
      const barreAtk = document.createElement('div')
      barreAtk.classList.add('barre_atk')
      barreAtk.style.width = pokemon.stats.attack + "px";
      const pokemonStatsAtk = document.createElement('h4');
      pokemonStatsAtk.textContent = `Atk : ${pokemon.stats.attack}`
      divAtk.appendChild(pokemonStatsAtk);
      divAtk.appendChild(barreAtk)

      const divDef = document.createElement('div')
      divDef.classList.add('div_def')
      const barreDef = document.createElement('div')
      barreDef.classList.add('barre_def')
      barreDef.style.width = pokemon.stats.defense + "px";
      const pokemonStatsDef = document.createElement('h4');
      pokemonStatsDef.textContent = `Def : ${pokemon.stats.defense}`
      divDef.appendChild(pokemonStatsDef);
      divDef.appendChild(barreDef)

      const divSpa = document.createElement('div')
      divSpa.classList.add('div_spa')
      const barreSpa = document.createElement('div')
      barreSpa.classList.add('barre_spa')
      barreSpa.style.width = pokemon.stats.special_attack + "px";
      const pokemonStatsSpa = document.createElement('h4');
      pokemonStatsSpa.textContent = `Spa : ${pokemon.stats.special_attack}`
      divSpa.appendChild(pokemonStatsSpa);
      divSpa.appendChild(barreSpa)

      const divSpd = document.createElement('div');
      divSpd.classList.add('div_spd')
      const barreSpd = document.createElement('div');
      barreSpd.classList.add('barre_spd');
      barreSpd.style.width = pokemon.stats.special_defense + "px";
      const pokemonStatsSpd = document.createElement('h4');
      pokemonStatsSpd.textContent = `Spd : ${pokemon.stats.special_defense}`
      divSpd.appendChild(pokemonStatsSpd);
      divSpd.appendChild(barreSpd);
      
      const divSpe = document.createElement('div');
      divSpe.classList.add('div_spe');
      const barreSpe = document.createElement('div');
      barreSpe.classList.add('barre_spe')
      barreSpe.style.width = pokemon.stats.speed + "px";
      const pokemonStatsSpe = document.createElement('h4');
      pokemonStatsSpe.textContent = `Spe : ${pokemon.stats.speed}`;
      divSpe.appendChild(pokemonStatsSpe);
      divSpe.appendChild(barreSpe);

      const divStats = document.createElement('div');
      divStats.classList.add('div_stats');
      divStats.append(divHp, divAtk, divDef, divSpa, divSpd, divSpe);
      
      // Ajout au div principal
      pokemonDiv.append(pokemonTop, pokemonImg, typesContainer, divStats);

      pokemonContainer.appendChild(pokemonDiv);
    });

    console.log(resultat);
    

  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

getPokemon();
