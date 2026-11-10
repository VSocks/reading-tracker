import {addAuthor} from "../modules/data-access.js";
import {updateAuthorForm} from "../modules/rendering.js";

const addAuthorButton = document.getElementById("add-author");

document.addEventListener("DOMContentLoaded", () => {
    updateAuthorForm();
});

addAuthorButton.addEventListener("click", (event) => {
    event.preventDefault();
    addAuthor();
});