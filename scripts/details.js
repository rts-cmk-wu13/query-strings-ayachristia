"use strict";

let favorite = readFromLocalStorage("favorite") || [];
console.log(favorite);

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

console.log(params, id);

fetch(`/data/destinations.json`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.destinations);
    //find data destination with url id and assign to variabel to implement DOM for it
    const destination = data.destinations.find((dest) => dest.id == id);
    console.log(destination);

    const destinationEl = document.createElement("section");
    destinationEl.classList.add("destination");
    destinationEl.innerHTML = `

    <section class="destination__left" aria-label="destinationImage">
    <section class="destination__image-container">
    <img src="${destination.image}" alt="${
      destination.title
    }" class="destination__image">
    </section>
    <button class="destination__button ${
      favorite.includes("${destination.id}")
        ? "destination__favoritebtn--selected"
        : ""
    }" data-favorite="${
      destination.id
    }" aria-label="chooseFavorite" role="button">
    <span class="material-symbols-outlined destination__icon">favorite</span> 
    Favorit
    </button>
    </section>

    <section class="destination__right">
    <h1 class="destination__headline" id="overskrift">${
      destination.destination
    }</h1>
    <h2 class="destination__subtitle" aria-describedby="overskrift" aria-label="">${
      destination.title
    }</h2>
    <p class="destination__review" aria-label="costumerReview">
    <span class="destination__review-procent">100</span>% of new guests has given the place a <span class="destination__review-stjerner">5</span> stars rating.
    </p>
    <section class="destination__details" aria-labelledby="destinationInfo">
      <p class="destination__details-text" id="destinationInfo">${
        destination.text
      }</p>
      <h2 class="destination__details-headline" id="overskrift" aria-label="facilities">Facilities</h2>
      <ul class="destination__details-facilities" aria-describedby="overskrift">
    ${destination.facilities.map(function (facility) {
      return `<li class="destination__facilitiesitem" aria-label="facility">${facility}</li>`;
    })}</ul>
    </section>
    </section>
    `;

    destinationEl
      .querySelector(".destination__button")
      .addEventListener("click", function (event) {
        let currentId = event.target.dataset.favorite;

        if (favorite.includes(currentId)) {
          let newFavorite = favorite.filter((id) => id != currentId);
          favorite = newFavorite;
          event.target.classList.remove("destination__favoritebtn--selected");
        } else {
          favorite.push(currentId);
          event.target.classList.add("destination__favoritebtn--selected");
        }

        saveToLocalStorage("favorite", favorite);
      });

    document.querySelector(".wrapper").append(destinationEl);
  });
