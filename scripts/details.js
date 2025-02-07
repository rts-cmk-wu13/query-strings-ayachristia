"use strict";

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

console.log(params, id);

fetch(`/data/destinations.json`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.destinations);

    const destination = data.destinations.find((dest) => dest.id == id);
    console.log(destination);

    const destinationEl = document.createElement("section");
    destinationEl.classList.add("destination");
    destinationEl.innerHTML = `
    <section class="destination__left">
    
    <img src="${destination.image}" alt="${
      destination.title
    }" class="destination__image">
    <p class="destination__icon">
    <span class="material-symbols-outlined ">favorite</span> 
    Favorit
    </p>
    </section>

    <section class="destination__right">
    <h1 class="destination__headline" aria-labelledby="overskrift">${
      destination.destination
    }</h1>
    <h2 class="destination__subtitle" id="overskrift">${destination.title}</h2>
    
    <p class="destination__review">
    <span class="destination__review-procent">100</span>% af nylige gæster har givet indtjekningen en <span class="destination__review-stjerner">5</span>stjernet vurdering.
    </p>
    <section class="destination__details">
      <p class="destination__details-text">${destination.text}</p>
      <h2 class="destination__details-headline">Facilities</h2>
      <ul class="destination__details-facilities">
    ${destination.facilities.map(function (facility) {
      return `<li class="destination__facilitiesitem">${facility}</li>`;
    })}</ul>
    </section>


    </section>
    `;

    document.querySelector(".wrapper").append(destinationEl);
  });
