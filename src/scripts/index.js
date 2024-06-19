import "regenerator-runtime";
import "../styles/main.css";
import "./components/AppBar.js";
import "./components/HeroElement.js";
import { displayDestinations } from "./components/DestinaData.js";
import data from "../public/data/DATA.json";

document.addEventListener("DOMContentLoaded", async function () {
  const hamburgerMenu = document.querySelector(".hamburger");
  const navlinks = document.querySelector(".nav-links");

  try {
    if (data && data.destinations) {
      displayDestinations(data.destinations);
    } else {
      console.error("Error: Invalid JSON data format");
    }
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }

  if (hamburgerMenu && navlinks) {
    hamburgerMenu.addEventListener("click", function () {
      navlinks.classList.toggle("show");
    });
  } else {
    console.error("Error: Hamburger menu or nav links not found");
  }

  // Fungsi untuk mengambil data destinasi dari file JSON
  async function fetchDestinationsData() {
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
  async function displaySearchResults(selectedProvinsi) {
    const destinations = await fetchDestinationsData();
    const hasilPencarian = document.getElementById("hasil-pencarian");
    hasilPencarian.innerHTML = ""; // Bersihkan hasil sebelumnya

    const filteredDestinations = destinations.filter((destination) => {
      return (
        selectedProvinsi === "semua" || // Jika dipilih "Semua Provinsi", tampilkan semua destinasi
        destination.city.toLowerCase() === selectedProvinsi.toLowerCase() // Jika dipilih provinsi tertentu, tampilkan destinasi yang sesuai dengan provinsi tersebut
      );
    });

    if (filteredDestinations.length === 0) {
      hasilPencarian.innerHTML =
        "<p>Tidak ada destinasi wisata yang ditemukan untuk provinsi ini.</p>";
    } else {
      filteredDestinations.forEach((destination) => {
        hasilPencarian.innerHTML += `<div>
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <img src="${destination.pictureId}" alt="${destination.name}">
            <p>Kota: ${destination.city}</p>
            <p>Rating: ${destination.rating}</p>
        </div>`;
      });
    }
  }

  document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah aksi bawaan formulir untuk dilakukan
    const selectedProvinsi = document.getElementById("provinsi").value;
    displaySearchResults(selectedProvinsi);
  });

  // Panggil fungsi untuk menampilkan destinasi wisata saat dokumen HTML selesai dimuat
  document.addEventListener("DOMContentLoaded", () => {
    displaySearchResults("semua"); // Menampilkan semua destinasi saat halaman dimuat
  });

  document.getElementById("reset-btn").addEventListener("click", function () {
    document.getElementById("provinsi").value = "semua";
    document.getElementById("hasil-pencarian").innerHTML = "";
  });

  // Add event listeners for navigation items
  document
    .querySelector(".nav-item-home")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  document
    .querySelector(".nav-item-cari")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const cariSection = document.getElementById("cari");
      cariSection.scrollIntoView({ behavior: "smooth" });
    });

  document
    .querySelector(".nav-item-about")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("footer").scrollIntoView({ behavior: "smooth" });
    });
});
