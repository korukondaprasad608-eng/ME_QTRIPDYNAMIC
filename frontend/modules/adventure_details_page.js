import config from "../conf/index.js";

function getAdventureIdFromURL(search) {
  const params = new URLSearchParams(search);
  return params.get("adventure");
}

async function fetchAdventureDetails(adventureId) {
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching adventure details:", error);
    return null;
  }
}

function addAdventureDetailsToDOM(adventure) {
  if (!adventure) return;

  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;

  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";

  adventure.images.forEach((image) => {
    const imageContainer = document.createElement("div");
    imageContainer.className = "col-12 col-md-6";

    const img = document.createElement("img");
    img.src = image;
    img.className = "activity-card-image img-fluid";
    img.alt = adventure.name;

    imageContainer.appendChild(img);
    photoGallery.appendChild(imageContainer);
  });
}

function addBootstrapPhotoGallery(images) {
  const photoGallery = document.getElementById("photo-gallery");

  photoGallery.innerHTML = `
    <div id="adventureCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${images.map((image, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${image}" class="d-block w-100" alt="Adventure image">
          </div>
        `).join("")}
      </div>
      <button class="carousel-control-prev" type="button"
        data-bs-target="#adventureCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button"
        data-bs-target="#adventureCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  `;
}

function conditionalRenderingOfReservationPanel(adventure) {
}

function calculateReservationCostAndUpdateDOM(adventure, persons) {
}

function captureFormSubmit(adventure) {
}

function showBannerIfAlreadyReserved(adventure) {
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
