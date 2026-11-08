import {getCountryFromId, getAuthorsNamesFromIds, getThemesFromIds, getBookTitleFromId} from "./utils.js";

export function displayAuthors() {
    const displayAuthorsButton = document.getElementById("show-button-author");
    const authors = JSON.parse(localStorage.getItem("authors"));
    const authorsList = document.getElementById("author-list");
    authorsList.innerHTML = "";

    if (!authors) {
        authorsList.textContent = "No authors found.";
        return;
    }

    authors.forEach(author => {
        const listItem = document.createElement("li");
        listItem.textContent = "ID: " + author.id + 
                                ", Name: " + author.name + 
                                ", Birthdate: " + author.birthDate + 
                                ", Deathdate: " + author.deathDate + 
                                ", Nationality: " + getCountryFromId(author.countryId);
        authorsList.appendChild(listItem);
    });

    displayAuthorsButton.textContent = "Hide Authors";
    displayAuthorsButton.removeEventListener("click", displayAuthors);
    displayAuthorsButton.addEventListener("click", hideAuthors);
}


export function displayBooks() {
    const displayBooksButton = document.getElementById("show-button-book");
    const books = JSON.parse(localStorage.getItem("books"));
    const booksList = document.getElementById("book-list");
    booksList.innerHTML = "";

    if (!books) {
        booksList.textContent = "No books found.";
        return;
    }

    books.forEach(book => {
        const listItem = document.createElement("li");
        listItem.textContent = "ID: " + book.id + 
                                ", Title: " + book.title + 
                                ", Authors: " + getAuthorsNamesFromIds(book.authorIds) + 
                                ", Publication Year: " + book.publicationYear + 
                                ", Form: " + book.form +
                                ", Mode of Expression: " + book.mode + 
                                ", Content: " + book.content +
                                ", Themes: " + getThemesFromIds(book.themeIds);
        booksList.appendChild(listItem);
    });

    displayBooksButton.textContent = "Hide Books";
    displayBooksButton.removeEventListener("click", displayBooks);
    displayBooksButton.addEventListener("click", hideBooks);
}


export function displayReadings() {
    const displayReadingsButton = document.getElementById("show-button-reading");
    const readings = JSON.parse(localStorage.getItem("readings"));
    const readingsList = document.getElementById("reading-list");

    if (!readings) {
        readingsList.textContent = "No readings found.";
        return;
    }

    readings.forEach(reading => {
        const listItem = document.createElement("li");
        listItem.textContent = "ID: " + reading.id +
                                ", Book: " + getBookTitleFromId(reading.bookId) + 
                                ", Status: " + reading.status + 
                                ", Year Read: " + reading.yearRead + 
                                ", Grade: " + reading.grade +
                                ", Recommended By: " + reading.recommendedBy + 
                                ", Priority: " + reading.priority +
                                ", Notes: " + reading.notes;
        readingsList.appendChild(listItem);
    });

    displayReadingsButton.textContent = "Hide Readings";
    displayReadingsButton.removeEventListener("click", displayReadings);
    displayReadingsButton.addEventListener("click", hideReadings);
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
    
    books.forEach(book => {
        const option = document.createElement("option");
        option.value = book.id;
        option.textContent = book.title;
        readingBookSelect.appendChild(option);
    });
}


export function updateAllForms() {
    updateAuthorForm();
    updateBookForm();
    updateReadingForm();
}


export function suggestTag(inputValue) {
    const input = document.getElementById("tag-input");
    const suggestionsList = document.getElementById("themes-suggestions");
    const selectedTagsList = document.getElementById("selected-tags");
    const themes = JSON.parse(localStorage.getItem("themes"));
    inputValue = inputValue.trim().toLowerCase();

    suggestionsList.innerHTML = "";

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
                selectedTagsList.removeChild(newItem);
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