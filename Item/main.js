const data = await fetch('../json/ImportantItemLocations.json').then(res => res.json());

const main = document.querySelector('main');
const searchInput = document.getElementById('searchInput');
const filter = document.getElementById('filter');

const sections = [
    { key: 'technical_machines',          value: 'tm',                   title: 'TM Locations',                formatter: tm   => `${tm.id} ${tm.name}: ${tm.location}` },
    { key: 'Evolutionary Item Locations', value: 'evo_item',             title: 'Evolutionary Item Locations', formatter: item => `${item.name}: ${item.location}` },
    { key: 'New Key Item Locations',      value: 'key_item',             title: 'New Key Item Locations',      formatter: item => `${item.name}: ${item.location}` },
    { key: 'New Fossil Locations',        value: 'fossil_item',          title: 'New Fossil Locations',        formatter: item => `${item.name}: ${item.location}` },
    { key: 'New Other Item Locations',    value: 'other_item_location',  title: 'New Other Item Locations',    formatter: item => `${item.name}: ${item.location}` },
];

// Crée toutes les divs une seule fois
const divs = sections.map(section => {
    const div = createSection(section.title, data[section.key] || [], section.formatter);
    div.dataset.section = section.value;
    main.appendChild(div);
    return div;
});

function render() {
    const search = searchInput.value.toLowerCase();
    const selectedFilter = filter.value;

    divs.forEach((div, i) => {
        const section = sections[i];

        // Affiche/cache la div selon le filtre
        const matchesFilter = selectedFilter === 'all' || selectedFilter === section.value;
        div.style.display = matchesFilter ? '' : 'none';

        // Filtre les <li> selon la recherche
        const lis = div.querySelectorAll('li');
        lis.forEach(li => {
            const text = li.textContent.toLowerCase();
            li.style.display = text.includes(search) ? '' : 'none';
        });
    });
}

searchInput.addEventListener('input', render);
filter.addEventListener('change', render);

// Helper
function createSection(title, items, formatter) {
    const div = document.createElement('div');
    div.classList.add('divs');

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        const text = formatter(item);
        const colonIndex = text.indexOf(':');
        const strong = document.createElement('strong');
        strong.textContent = text.slice(0, colonIndex);
        const rest = document.createTextNode(text.slice(colonIndex));
        li.appendChild(strong);
        li.appendChild(rest);
        ul.appendChild(li);
    });

    div.appendChild(h2);
    div.appendChild(ul);
    return div;
}