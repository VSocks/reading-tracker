import {addAuthor} from "../modules/data-access.js";
import {displayAuthors, updateAuthorForm} from "../modules/rendering.js";


const addAuthorButton = document.getElementById("add-author");
const displayAuthorsButton = document.getElementById("show-button-author");


document.addEventListener("DOMContentLoaded", () => {
    updateAuthorForm();
});

addAuthorButton.addEventListener("click", (event) => {
    event.preventDefault();
    addAuthor();
});

displayAuthorsButton.addEventListener("click", () => {
    displayAuthors();
});