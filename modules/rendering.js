import { getCountryFromId, getAuthorsNamesFromIds, getThemesFromIds, getBookTitleFromId } from "./utils.js";
import { deleteAuthor, deleteBook, deleteReading } from "./data-access.js";

export function displayAuthors() {
    const authors = JSON.parse(localStorage.getItem("authors"));
    const authorsList = document.getElementById("author-list");

    if (!authors) {
        authorsList.textContent = "No authors found.";
        return;
    }

    Object.keys(authors[0]).forEach(key => { //Refatorar para dar títulos apropriados às colunas
        const header = document.createElement("th");
        header.textContent = key;
        authorsList.appendChild(header);
    });

    authors.forEach(author => {
        const tableItem = document.createElement("tr");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        deleteButton.addEventListener("click", () => {
            deleteAuthor(author.id);
        }); //por algum motivo ("click", deleteAuthor(author.id)) dá problema mas esse funciona

        Object.keys(author).forEach(key => {
            const row = document.createElement("td");
            if (key === "countryId") {
                row.textContent = getCountryFromId(author[key]);
            } else {
                row.textContent = author[key];
            }

            if (author[key] == null || author[key].length === 0) {
                row.textContent = "-";
            }
            tableItem.appendChild(row);
        });

        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        tableItem.appendChild(editButton);
        tableItem.appendChild(deleteButton);
        authorsList.appendChild(tableItem);
    });
}

//Provavelmente posso combinar as funções de display depois
export function displayBooks() {
    const books = JSON.parse(localStorage.getItem("books"));
    const booksList = document.getElementById("book-list");

    if (!books) {
        booksList.textContent = "No books found.";
        return;
    }

    Object.keys(books[0]).forEach(key => {
        const header = document.createElement("th");
        header.textContent = key;
        booksList.appendChild(header);
    });

    books.forEach(book => {
        const tableItem = document.createElement("tr");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        deleteButton.addEventListener("click", () => {
            deleteBook(book.id);
        });

        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";

        Object.keys(book).forEach(key => {
            const row = document.createElement("td");
            if (key === "authorIds") {
                row.textContent = getAuthorsNamesFromIds(book[key]);
            } else if (key === "themeIds") {
                row.textContent = getThemesFromIds(book[key]);
            } else {
                row.textContent = book[key];
            }

            if (book[key] === null || book[key].length === 0) {
                row.textContent = "-";
            }
            tableItem.appendChild(row);
        })

        tableItem.appendChild(editButton);
        tableItem.appendChild(deleteButton);
        booksList.appendChild(tableItem);
    });
}


export function displayReadings() {
    const readings = JSON.parse(localStorage.getItem("readings"));
    const readingsList = document.getElementById("reading-list");

    if (!readings) {
        readingsList.textContent = "No readings found.";
        return;
    }

    Object.keys(readings[0]).forEach(key => {
        const header = document.createElement("th");
        header.textContent = key;
        readingsList.appendChild(header);
    });

    readings.forEach(reading => {
        const tableItem = document.createElement("tr");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        deleteButton.addEventListener("click", () => {
            deleteReading(reading.id);
        });

        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        
        Object.keys(reading).forEach(key => {
            const row = document.createElement("td");
            if (key === "bookId") {
                row.textContent = getBookTitleFromId(reading[key]);
            } else {
                row.textContent = reading[key];
            }

            if (reading[key] === null || reading[key].length === 0) {
                row.textContent = "-";
            }
            tableItem.appendChild(row);
        })

        tableItem.appendChild(editButton);
        tableItem.appendChild(deleteButton);
        readingsList.appendChild(tableItem);
    });
}


export function hideAuthors() {
    const displayAuthorsButton = document.getElementById("show-button-author");
    const authorsList = document.getElementById("author-list");
    for (let i = authorsList.children.length - 1; i >= 0; i--) {
        authorsList.removeChild(authorsList.children[i]);
    }
    displayAuthorsButton.textContent = "Show Authors";
    displayAuthorsButton.removeEventListener("click", hideAuthors);
    displayAuthorsButton.addEventListener("click", displayAuthors);
}


export function hideBooks() {
    const displayBooksButton = document.getElementById("show-button-book");
    const booksList = document.getElementById("book-list");
    for (let i = booksList.children.length - 1; i >= 0; i--) {
        booksList.removeChild(booksList.children[i]);
    }
    displayBooksButton.textContent = "Show Books";
    displayBooksButton.removeEventListener("click", hideBooks);
    displayBooksButton.addEventListener("click", displayBooks);
}


export function hideReadings() {
    const displayReadingsButton = document.getElementById("show-button-reading");
    const readingsList = document.getElementById("reading-list");
    for (let i = readingsList.children.length - 1; i >= 0; i--) {
        readingsList.removeChild(readingsList.children[i]);
    }
    displayReadingsButton.textContent = "Show Readings";
    displayReadingsButton.removeEventListener("click", hideReadings);
    displayReadingsButton.addEventListener("click", displayReadings);
}


export function updateAuthorForm() {
    const authorNationalitySelect = document.getElementById("author-nationality");
    const countries = JSON.parse(localStorage.getItem("countries"));
    const deleteAuthorSelect = document.getElementById("delete-author");
    const authors = JSON.parse(localStorage.getItem("authors"));

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.id;
        option.textContent = country.name;
        authorNationalitySelect.appendChild(option);
    });

    authors.forEach(author => {
        const option = document.createElement("option");
        option.value = author.id;
        option.textContent = author.name;
        deleteAuthorSelect.appendChild(option);
    });
}


export function updateBookForm() {
    const bookAuthorSelect = document.getElementById("book-author");
    const authors = JSON.parse(localStorage.getItem("authors"));
    const deleteBookSelect = document.getElementById("delete-book");
    const books = JSON.parse(localStorage.getItem("books"));

    authors.forEach(author => {
        const option = document.createElement("option");
        option.value = author.id;
        option.textContent = author.name;
        bookAuthorSelect.appendChild(option);
    });

    books.forEach(book => {
        const option = document.createElement("option");
        option.value = book.id;
        option.textContent = book.title;
        deleteBookSelect.appendChild(option);
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
    const selectedTagsList = document.getElementById("selected-tags");
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

    filteredThemes.forEach(theme => {
        const tag = document.createElement("li");
        tag.textContent = theme.name;
        tag.value = theme.id;
        tag.classList.add("tag");
        tag.addEventListener("click", () => {
            const newTag = document.createElement("li");
            newTag.textContent = tag.textContent;
            newTag.value = tag.value;
            newTag.classList.add("tag");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "x";
            deleteButton.classList.add("delete-tag");
            deleteButton.addEventListener("click", () => {
                selectedTagsList.removeChild(newTag);
            });
            newTag.appendChild(deleteButton);
            selectedTagsList.appendChild(newTag);
            input.value = "";
            suggestionsList.hidden = true;
        });
        suggestionsList.appendChild(tag);
    });

    suggestionsList.hidden = false;
}