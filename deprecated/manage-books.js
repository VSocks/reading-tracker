import {addBook, deleteBook, addTheme} from "../modules/data-access.js";
import {displayBooks, updateBookForm, suggestTag} from "../modules/rendering.js";


const addBookButton = document.getElementById("add-book");
const displayBooksButton = document.getElementById("show-button-book");
const deleteBookButton = document.getElementById("delete-book-button");
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

displayBooksButton.addEventListener("click", () => {
    displayBooks();
});

deleteBookButton.addEventListener("click", () => {
    const bookId = parseInt(document.getElementById("delete-book").value);
    if (isNaN(bookId)) {
        alert("Please select a book to delete.");
        return;
    }
    deleteBook(bookId);
});

tagInput.addEventListener("keydown", () => {
    suggestTag(tagInput.value);
});

suggestTagsButton.addEventListener("click", () => {
    suggestTag(tagInput.value);
});

addThemeButton.addEventListener("click", () => {
    addTheme();
});