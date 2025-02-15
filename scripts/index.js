"use strict";

fetch("/data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    const listViewEl = document.querySelector(".listview");
    listViewEl.innerHTML = `
    <h1 class="list__headline" id="headline">Apartments for rent</h1>
    `;

    const list = document.createElement("section");
    list.classList.add("list");

    list.innerHTML = `
    ${data.destinations
      .map(function (destination) {
        return `

      <section class="listItem" aria-labelledby="headline" aria-label="${destination.title}">
        <figure class="listItem__image-container" aria-label="apartmentImage">
      <a href="details.html?id=${destination.id}" class="listItem__link">
        <img src="${destination.image}" alt="${destination.title}" class="listItem__image">
    </a>
  </figure>

      <div class="listItem__prompts" aria-label="apartmentNavigation">
      <span class="material-symbols-outlined listItem__icon" aria-label="chooseFavorite" role="button">favorite</span>
      <a href="details.html?id=${destination.id}" class="listItem__link" aria-label="chooseToSeeMore" role="button">More</a>
      </div>
      </section>

      `;
      })
      .join(" ")}
    `;

    listViewEl.append(list);
  });
