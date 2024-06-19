document.addEventListener("DOMContentLoaded", function () {
  const heroElement = document.createElement("section");
  heroElement.className = "hero";
  heroElement.innerHTML = `
    <div class="hero-content">
      <h1>Explore The Destinations</h1>
    </div>
  `;
  document.getElementById("app").appendChild(heroElement);
});
