import {addBook, addTheme} from "../modules/data-access.js";
import {updateBookForm, suggestTag} from "../modules/rendering.js";


const addBookButton = document.getElementById("add-book");
const tagInput = document.getElementById("tag-input");
const addThemeButton = document.getElementById("add-new-theme");
const suggestTagsButton = document.getElementById("suggest-tags");


document.addEventListener("DOMContentLoaded", () => {
    updateBookForm();
});

addBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBook();
});

tagInput.addEventListener("input", () => {
    suggestTag();
});

suggestTagsButton.addEventListener("click", () => {
    suggestTag();
});

addThemeButton.addEventListener("click", () => {
    addTheme();
});