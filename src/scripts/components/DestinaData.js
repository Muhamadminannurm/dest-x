export async function fetchDestinationsData() {
  try {
    const response = await fetch("/data/DATA.json"); // Sesuaikan dengan lokasi file JSON Anda di direktori public
    if (!response.ok) {
      throw new Error("Failed to fetch destination data");
    }
    const data = await response.json();
    return data.destinations;
  } catch (error) {
    console.error("Error fetching destination data:", error);
    return [];
  }
}

function getRandomDestinations(destinations, count) {
  const shuffled = destinations.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function displayDestinations(destinations) {
  const container = document.getElementById("destination-list");
  if (!container) {
    console.error("Destination list container not found!");
    return;
  }
  container.innerHTML = "";

  destinations.forEach((destination) => {
    const destinationElement = document.createElement("div");
    destinationElement.classList.add("destination-item");

    destinationElement.innerHTML = `
      <img src="${destination.pictureId}" alt="${destination.name}" class="destination-image">
      <div class="destination-content">
        <h3 class="destination-name">${destination.name}</h3>
      </div>
    `;

    // Event listener untuk menampilkan info lengkap saat destinasi dipilih
    destinationElement.addEventListener("click", () => {
      displayDestinationInfo(destination);
    });

    container.appendChild(destinationElement);
  });
}

function displayDestinationInfo(destination) {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  popupContent.innerHTML = `
    <img src="${destination.pictureId}" alt="${destination.name}" class="destination-info-image">
    <div class="destination-info-content">
      <h2 class="destination-info-name">${destination.name}</h2>
      <p class="destination-info-location"><strong>Location:</strong> ${destination.city}</p>
      <p class="destination-info-description"><strong>Description:</strong> ${destination.description}</p>
      <!-- tambahkan info lain yang diperlukan sesuai struktur data -->
    </div>
  `;

  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);

  // Tambahkan event listener untuk menutup pop-up saat diklik di luar pop-up
  window.addEventListener("click", outsideClick);

  function outsideClick(event) {
    if (event.target === popupContainer) {
      closePopup();
    }
  }
}

function closePopup() {
  const popup = document.querySelector(".popup-container");
  if (popup) {
    popup.remove();
  }
}

async function resetAndDisplayDestinations() {
  const destinations = await fetchDestinationsData();
  if (destinations.length > 0) {
    const randomDestinations = getRandomDestinations(destinations, 12);
    displayDestinations(randomDestinations);
  } else {
    console.error("Destination data not available or incorrectly structured.");
  }
}

// Menampilkan data destinasi saat dokumen HTML selesai dimuat
document.addEventListener("DOMContentLoaded", async () => {
  await resetAndDisplayDestinations();

  const homeButton = document.querySelector(".nav-item-home a");
  if (homeButton) {
    homeButton.addEventListener("click", async (event) => {
      event.preventDefault();
      await resetAndDisplayDestinations();
    });
  } else {
    console.error("Home button not found!");
  }
});
