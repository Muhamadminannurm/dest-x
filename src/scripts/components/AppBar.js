document.addEventListener("DOMContentLoaded", () => {
  const appBar = document.createElement("nav");
  appBar.innerHTML = `
    <div class="logo">
      <div class="logo-text">DESTINATION X</div>
    </div>
    <button class="hamburger">
      <img src="../images/heros/burger-bar.png" alt="menu-hamburger">
    </button>
    <ul class="nav-links">
      <li class="nav-item nav-item-home"><a href="/">Home</a></li>
      <li class="nav-item nav-item-cari"><a href="#cari">Cari</a></li>
      <li class="nav-item nav-item-about"><a href="#">About</a></li>
      <li class="nav-item"><a href="https://www.google.com/maps/search/wisata+budaya+sekitar/">Budaya Sekitar</a></li>
      <li class="nav-item"><a href="https://www.google.com/maps/search/wisata+alam+sekitar/">Alam Sekitar</a></li>
    </ul>
  `;
  document.getElementById("app").appendChild(appBar);
  const jumbotron = document.createElement("section");
  jumbotron.innerHTML = `
  <img src = "../images/heros/destina.webp" alt ="hero">
  <div class="hero-text">
  <span class="destination">Destination - X</span>
  <br>
  <span class="ultimate">The Ultimate</span> Exploration Experience
  </div>
  `;
  jumbotron.classList.add("hero");
  document.getElementById("app").appendChild(jumbotron);
});
