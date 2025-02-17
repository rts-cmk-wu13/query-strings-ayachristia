"use strict";

let favorites = [];

fetch("/data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    const listViewEl = document.querySelector(".listview");
    listViewEl.innerHTML = `
    <h1 class="list__headline" id="headline">Apartments for rent</h1>
    `;

    const listEl = document.createElement("section");
    listEl.classList.add("list");
    listEl.innerHTML = data.destinations
      .map(function (destination) {
        return `
<section class="listItem" aria-labelledby="headline" aria-label="${destination.title}">
  <figure class="listItem__image-container" aria-label="apartmentImage">
    <a href="details.html?id=${destination.id}" class="listItem__link">
      <img src="${destination.image}" alt="${destination.title}" class="listItem__image">
    </a>
  </figure>
  
  <div class="listItem__prompts" aria-label="apartmentNavigation">
    <button class="listItem__favoritebtn" data-favorite="${destination.id}">Heart
      <!-- <span class="material-symbols-outlined listItem__icon" aria-label="chooseFavorite" role="button" id="id" >favorite</span> -->
    </button>
    
    <a href="details.html?id=${destination.id}" class="listItem__link" aria-label="chooseToSeeMore" role="button">More</a>
  </div>
</section>
`;
      })
      .join(" ");

    listEl.querySelectorAll(".listItem__favoritebtn").forEach((button) => {
      button.addEventListener("click", function (event) {
        let currentId = event.target.dataset.favorite;

        if ((favorites.includes = currentId)) {
          newFavorites = favorites.filter((id) => id != currentId);
        }
      });
    });

    listViewEl.append(listEl);
  });
