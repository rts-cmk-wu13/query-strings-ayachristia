"use strict";

let favorites = readFromLocalStorage("favorites") || [];
console.log(favorites);
//if gthere is no favorites, readFromLocalStorage function will return falsy value null, therefor we check if favorites is null, if it is we return empty array
// if (!favorites) {
//   favorites = [];
// }

fetch("./data/destinations.json")
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
<section class="listItem" aria-labelledby="headline" aria-label="${destination.title
          }">
  <figure class="listItem__image-container" aria-label="apartmentImage">
    <a href="details.html?id=${destination.id}" class="listItem__link">
      <img src="${destination.image
          }" alt="${destination.title}" class="listItem__image">
    </a>
  </figure>
  
  <div class="listItem__prompts" aria-label="apartmentNavigation">
    <button class="listItem__favoritebtn"><span class="material-symbols-outlined destination__icon ${favorites.includes(destination.id.toString())
            ? "listItem__favoritebtn--selected"
            : ""
          }" data-favorite="${destination.id}">favorite</span> 
      <!-- <span class="material-symbols-outlined listItem__icon" aria-label="chooseFavorite" role="button" id="id" >favorite</span> -->
    </button>
    
    <a href="details.html?id=${destination.id
          }" class="listItem__link" aria-label="chooseToSeeMore" role="button">More</a>
  </div>
</section>
`;
      })
      .join(" ");

    //event for alle favoriteBtns ind i fetch
    listEl.querySelectorAll(".listItem__favoritebtn").forEach((button) => {
      button.addEventListener("click", function (event) {
        //variabel med data-set id'et
        let currentId = event.target.dataset.favorite;
        // hvis favorite storage har id allerede
        if (favorites.includes(currentId)) {
          //ny variabel hvor alle id'er der ikke er det clicked id filtreres ind
          let newFavorites = favorites.filter((id) => id != currentId);
          //favorites storage reassigned med ny varibael
          favorites = newFavorites;
          //class med fill fjernes
          event.target.classList.remove("listItem__favoritebtn--selected");
          console.log(favorites);
        } else {
          //hvis favorites ikke har id allerede, push ind i favorites storage
          favorites.push(currentId);
          //tilføj class med fill
          event.target.classList.add("listItem__favoritebtn--selected");
          console.log(favorites);
        }
        //efter else tilføjer vi til favorite storage
        saveToLocalStorage("favorites", favorites);
      });
    });

    listViewEl.append(listEl);
  });
