import { getCountryFromId, getAuthorsNamesFromIds, getThemesFromIds, getBookTitleFromId } from "./utils.js";
import { deleteAuthor, deleteBook, deleteReading } from "./data-access.js";

export function displayTable() {
    let table;
    let items; //Depois dair nomes melhores às variáveis...
    let list;

    if (document.getElementById("author-list")) {
        table = "authors";
        items = JSON.parse(localStorage.getItem("authors"));
        list = document.getElementById("author-list");
    } else if (document.getElementById("book-list")) {
        table = "books";
        items = JSON.parse(localStorage.getItem("books"));
        list = document.getElementById("book-list");
    } else if (document.getElementById("reading-list")) {
        table = "readings";
        items = JSON.parse(localStorage.getItem("readings"));
        list = document.getElementById("reading-list");
    }

    if (!items) {
        list.textContent = "No items found.";
    }

    Object.keys(items[0]).forEach(key => { //Refatorar para dar títulos apropriados às colunas
        const header = document.createElement("th");
        header.textContent = key;
        list.appendChild(header);
    });

    items.forEach(item => {
        const tableItem = document.createElement("tr");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        if (table === "authors") {
            deleteButton.addEventListener("click", () => {
                deleteAuthor(item.id);
            }); //por algum motivo ("click", deleteAuthor(author.id)) dá problema mas esse funciona
        } else if (table === "books") {
            deleteButton.addEventListener("click", () => {
                deleteBook(item.id);
            });
        } else if (table === "readings") {
            deleteButton.addEventListener("click", () => {
                deleteReading(item.id);
            });
        }

        Object.keys(item).forEach(key => {
            const row = document.createElement("td");
            if (key === "countryId") {
                row.textContent = getCountryFromId(item[key]);
            } else if (key === "authorIds") {
                row.textContent = getAuthorsNamesFromIds(item[key]);
            } else if (key === "themeIds") {
                row.textContent = getThemesFromIds(item[key]);
            } else if (key === "bookId") {
                row.textContent = getBookTitleFromId(item[key]);
            } else if (key === "publicationYear" && item[key] < 0) {
                row.textContent = (-1 * item[key]) + "BC";
            } else {
                row.textContent = item[key];
            }

            if (item[key] == null || item[key].length === 0) {
                row.textContent = "-";
            }
            tableItem.appendChild(row);
        });

        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        tableItem.appendChild(editButton);
        tableItem.appendChild(deleteButton);
        list.appendChild(tableItem);
    });
}

export function updateAuthorForm() {
    const authorNationalitySelect = document.getElementById("author-nationality");
    const countries = JSON.parse(localStorage.getItem("countries"));

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.id;
        option.textContent = country.name;
        authorNationalitySelect.appendChild(option);
    });
}


export function updateBookForm() {
    const bookAuthorSelect = document.getElementById("book-author");
    const authors = JSON.parse(localStorage.getItem("authors"));

    authors.forEach(author => {
        const option = document.createElement("option");
        option.value = author.id;
        option.textContent = author.name;
        bookAuthorSelect.appendChild(option);
    });
}


export function updateReadingForm() {
    const readingBookSelect = document.getElementById("reading-book");
    const books = JSON.parse(localStorage.getItem("books"));
    const yearReadSelect = document.getElementById("year-read");
    const yearReadSection = document.getElementById("year-read-section");
    const status = document.getElementById("reading-status").value;
    const prioritySelect = document.getElementById("priority");
    const prioritySection = document.getElementById("priority-section");

    books.forEach(book => {
        const option = document.createElement("option");
        option.value = book.id;
        option.textContent = book.title;
        readingBookSelect.appendChild(option);
    });

    if (status == "Want to Read") {
        prioritySection.hidden = false;
    } else {
        prioritySection.hidden = true;
        prioritySelect.value = "";
    }

    if (status == "Read" || status == "Abandoned") {
        yearReadSection.hidden = false;
    } else {
        yearReadSection.hidden = true;
        yearReadSelect.value = null;
    }
}

export function suggestTag() {
    const input = document.getElementById("tag-input");
    const suggestionsList = document.getElementById("themes-suggestions");
    const themes = JSON.parse(localStorage.getItem("themes"));
    const inputValue = input.value.trim().toLowerCase();

    if (inputValue === "") {
        suggestionsList.hidden = true;
        return;
    }

    const filteredThemes = themes.filter(theme => theme.name.toLowerCase().includes(inputValue));

    if (filteredThemes.length === 0) {
        suggestionsList.hidden = true;
        return;
    }

    suggestionsList.innerHTML = ""

    filteredThemes.forEach(theme => {
        const tag = document.createElement("li");
        tag.textContent = theme.name;
        tag.value = theme.id;
        tag.classList.add("tag");
        tag.addEventListener("click", () => {
            addTag(tag.value, tag.textContent);
        });
        suggestionsList.appendChild(tag);
    });

    suggestionsList.hidden = false;
}


export function addTag(value, text) {
    const selectedTagsList = document.getElementById("selected-tags");
    const suggestionsList = document.getElementById("themes-suggestions");
    const input = document.getElementById("tag-input");
    const tag = document.createElement("li");
    
    tag.value = value;
    tag.textContent = text;
    tag.classList.add("tag");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-tag");
    deleteButton.addEventListener("click", () => {
        selectedTagsList.removeChild(tag);
    });

    tag.appendChild(deleteButton);
    selectedTagsList.appendChild(tag);
    input.value = "";
    suggestionsList.hidden = true;
}