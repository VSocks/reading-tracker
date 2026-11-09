import {addAuthor, deleteAuthor} from "../modules/data-access.js";
import {displayAuthors, updateAuthorForm} from "../modules/rendering.js";


const addAuthorButton = document.getElementById("add-author");
const displayAuthorsButton = document.getElementById("show-button-author");
const deleteAuthorButton = document.getElementById("delete-author-button");


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

deleteAuthorButton.addEventListener("click", () => {
    const authorId = parseInt(document.getElementById("delete-author").value);
    if (isNaN(authorId)) {
        alert("Please select an author to delete.");
        return;
    }
    deleteAuthor(authorId);
});