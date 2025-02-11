"use strict";

fetch("/data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    const listViewEl = document.querySelector(".listview");
    listViewEl.innerHTML = `
    <h1 class="list__headline">Apartments for rent</h1>
    `;

    const list = document.createElement("section");
    list.classList.add("list");

    list.innerHTML = `
    ${data.destinations
      .map(function (destination) {
        return `

      <section class="listItem">
        <figure class="listItem__image-container">
      <a href="details.html?id=${destination.id}" class="listItem__link">
        <img src="${destination.image}" alt="${destination.title}" class="listItem__image">
    </a>
  </figure>

      <div class="listItem__prompts">
      <span class="material-symbols-outlined listItem__icon">favorite</span>
      <a href="details.html?id=${destination.id}" class="listItem__link">More</a>
      </div>
      </section>

      `;
      })
      .join(" ")}
    `;

    listViewEl.append(list);
  });
