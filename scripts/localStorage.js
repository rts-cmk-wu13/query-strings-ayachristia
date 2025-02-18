/**
 *
 * @param {string} key key to be used to local storage
 * @param {string / number / boolean / object / any[]} value value to be safed
 * @returns {string}
 */
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return `Data was saved with the key ${key}`;
}
/**
 *
 * @param {string / number / boolean / object / any[]}  key to be read from localStorage
 * @returns
 */
function readFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
  return `The element with ${key} was deleted.`;
}

saveToLocalStorage();

// let success = saveToLocalStorage("favorites", [1, 5, 8]);
// console.log(success);

// let myFavorites = readFromLocalStorage("favorites");
// console.log(myFavorites);

// let deletedSuccess = deleteFromLocalStorage("favorites");
// console.log(deletedSuccess);

//JSDOC
//adding more information with tags
