
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const adventures = await response.json();
    return adventures;
  } catch (error) {
    console.error("Error fetching adventures:", error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  const container = document.getElementById("data");

  adventures.forEach((adventure) => {
    const adventureCard = document.createElement("div");
    adventureCard.className = "col-6 col-lg-3 mb-4";

    adventureCard.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
        <div class="activity-card">
          <img src="${adventure.image}" alt="${adventure.name}">
          <div class="activity-card-body">
            <div class="activity-card-heading">${adventure.name}</div>
            <div class="activity-card-subheading">${adventure.costPerHead} ${adventure.currency} / person</div>
          </div>
          <div class="category-banner">${adventure.category}</div>
        </div>
      </a>
    `;

    container.appendChild(adventureCard);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  return list.filter((adventure) =>
    adventure.duration >= Number(low) && adventure.duration <= Number(high)
  );
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  return list.filter((adventure) => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  let filteredList = list;

  if (filters.category && filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  if (filters.duration) {
    const [low, high] = filters.duration.split("-");
    filteredList = filterByDuration(filteredList, low, high);
  }

  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  const filters = window.localStorage.getItem("filters");
  return filters ? JSON.parse(filters) : null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  const durationSelect = document.getElementById("duration-select");
  const categoryList = document.getElementById("category-list");

  durationSelect.value = filters.duration || "";
  categoryList.textContent = "";

  (filters.category || []).forEach((category) => {
    const pill = document.createElement("div");
    pill.className = "category-filter";
    pill.textContent = category;
    categoryList.appendChild(pill);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
