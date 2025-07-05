const itemsContainer = document.getElementById("items");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const nav = document.getElementById("resource-nav");

nav.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const resource = event.target.dataset.resource;
        itemsContainer.textContent = "";
        loadResource(resource);
    }
});

async function loadResource(resource) {
    loading.classList.remove("hidden");
    error.classList.add("hidden");

    const url = `https://www.swapi.tech/api/${resource}?expanded=true&limit=100`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error("Network error");
        }

        const data = await response.json();
        loading.classList.add("hidden");
        itemsContainer.textContent = "";

        let entries = [];
        if (Array.isArray(data.results)) {
            entries = data.results;
        } else if (Array.isArray(data.result)) {
            entries = data.result;
        }

        if (entries.length === 0) {
            createMessage("No items found.");
            return;
        }

        entries.forEach((item) => {
            const props = item.properties || {};
            const card = createCardForResource(resource, props);
            itemsContainer.appendChild(card);
        });
  } catch (err) {
    console.error("Error loading resource:", err);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

function createCardForResource(resource, props) {
    switch (resource) {
    case "people":
      return createPersonCard(props);
    case "films":
      return createFilmCard(props);
    case "starships":
      return createStarshipCard(props);
    case "vehicles":
      return createVehicleCard(props);
    case "species":
      return createSpeciesCard(props);
    case "planets":
      return createPlanetCard(props);
  }
}

function createMessage(text) {
    const p = document.createElement("p");
    p.textContent = text;
    itemsContainer.appendChild(p);
}

function createPersonCard(props) {
    const card = createCard();
    appendTitle(card, props.name);
    appendDetail(card, "Birth Year", props.birth_year);
    appendDetail(card, "Gender", props.gender);
    appendDetail(card, "Eye Color", props.eye_color);
    appendDetail(card, "Hair Color", props.hair_color);
    appendDetail(card, "Height", props.height);
    appendDetail(card, "Home World", props.homeworld);
    appendDetail(card, "URL", props.url);
    
    return card;
}

function createFilmCard(props) {
    const card = createCard();
    appendTitle(card, props.title);
    appendDetail(card, "Release Date", props.release_date);
    appendDetail(card, "Director", props.director);
    appendDetail(card, "Producer", props.producer);
    appendDetail(card, "Description", props.opening_crawl);
    appendDetail(card, "URL", props.url);

    return card;
}

function createStarshipCard(props) {
    const card = createCard();
    appendTitle(card, props.name);
    appendDetail(card, "Model", props.model);
    appendDetail(card, "Class", props.starship_class);
    appendDetail(card, "Crew", props.crew);
    appendDetail(card, "Capicity", props.cargo_capacity);
    appendDetail(card, "Manufacturer", props.manufacturer);
    appendDetail(card, "URL", props.url);

    return card;
}

function createVehicleCard(props) {
    const card = createCard();
    appendTitle(card, props.name);
    appendDetail(card, "Model", props.model);
    appendDetail(card, "Vehicle Class", props.vehicle_class);
    appendDetail(card, "Crew", props.crew);
    appendDetail(card, "Capicity", props.cargo_capacity);
    appendDetail(card, "Manufacturer", props.manufacturer);
    appendDetail(card, "URL", props.url);

    return card;
}

function createSpeciesCard(props) {
    const card = createCard();
    appendTitle(card, props.name);
    appendDetail(card, "Classification", props.classification);
    appendDetail(card, "Average Lifespan", props.average_lifespan);
    appendDetail(card, "Average Height", props.average_height);
    appendDetail(card, "Language", props.language);
    appendDetail(card, "Designation", props.designation);
    appendDetail(card, "Eye Color", props.eye_colors);
    appendDetail(card, "Hair Color", props.hair_colors);
    appendDetail(card, "URL", props.url);

    return card;
}

function createPlanetCard(props) {
    const card = createCard();
    appendTitle(card, props.name);
    appendDetail(card, "Climate", props.climate);
    appendDetail(card, "Population", props.population);
    appendDetail(card, "Terrain", props.terrain);
    appendDetail(card, "Gravity", props.gravity);
    appendDetail(card, "Orbital Period", props.orbital_period);
    appendDetail(card, "URL", props.url);

    return card;
}

function createCard() {
    const div = document.createElement("div");
    div.className = "card";
    return div;
}

function appendTitle(card, text) {
    const h2 = document.createElement("h2");
    h2.textContent = text;
    card.appendChild(h2);
}

function appendDetail(card, label, value) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value));
    card.appendChild(p);
}
