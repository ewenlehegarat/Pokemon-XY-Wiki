const searchInput = document.getElementById('searchInput') || document.querySelector('input[type="text"]');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase().replace('#', '');
    const routes = document.querySelectorAll('.divs');
    
    routes.forEach(route => {
      const routeName = route.querySelector('h2')?.textContent.toLowerCase() || '';
      route.style.display = !q || routeName.includes(q) ? '' : 'none';
    });
  });
}

async function getLocations() {
  const [data, pokemonData] = await Promise.all([
    fetch("../json/Encounters.json").then(res => res.json()),
    fetch("../json/PokemonPersonalData.json").then(res => res.json())
  ]);
  
  const pokemonById = {};
  pokemonData.forEach(p => {
    pokemonById[p.ID] = p.Name;
  });
  
  const main = document.querySelector('main');
  
  data.forEach(location => {
    const div = document.createElement('div');
    div.className = `${location.id} divs`;
    
    let html = `<h2>${location.name} :</h2>`;
    if (location.levels && location.levels !== 'N/A') {
      html += `<h4>Wild Levels : ${location.levels}</h4>`;
    }
    
    html += `
      <div class="container">
      <img src="${location.image}" alt="location image" class="route_image top_image">
      <div class="encounter">
    `;
    
    Object.entries(location.methods).forEach(([key, method]) => {
      if (!method.pokemon || method.pokemon.length === 0) return;
      
      html += `<div class="${key} encounters"><h3>${method.label} :</h3>`;
      
      method.pokemon.forEach(p => {
        const name = pokemonById[p.id] || '';
        const spriteBase = `../PokemonList/img/pokemon_animated_sprite/`;
        const sprite = `${spriteBase}${p.sprite || p.id + '.gif'}`;
        
        html += `
          <p>
            <a href="../PokemonList/index.html?search=${encodeURIComponent(name)}" title="${name} Info">
              <img src="${sprite}"
              alt="${name}"
              class="pokemon_image"
              style="cursor:pointer;">
            </a>
            ${p.pct || ''}
          </p>
        `;
      });
      
      html += `</div>`;
    });
    
    html += `</div></div>`;
    div.innerHTML = html;
    main.appendChild(div);
  });
}

getLocations();