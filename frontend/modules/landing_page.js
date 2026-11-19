import config from "../conf/index.js";

async function init() {
  let cities = await fetchCities();

  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

async function fetchCities() {
  try {
    const response = await fetch(
      `${config.backendEndpoint}/cities`
    );

    const cities = await response.json();

    return cities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
}

function addCityToDOM(id, city, description, image) {
  const container = document.getElementById("data");

  const cityCard = document.createElement("div");

  cityCard.className = "col-6 col-lg-3 mb-4";

  cityCard.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <div class="tile-text">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
        <img src="${image}" class="img-fluid" alt="${city}">
      </div>
    </a>
  `;

  container.appendChild(cityCard);
}

export { init, fetchCities, addCityToDOM };
