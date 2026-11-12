import { getAuthorsNamesFromIds, getCountryFromId, getThemesFromIds, getBookTitleFromId } from "./data-access.js";
import { submitAuthor, getAllAuthors, getAuthor, getCountry, getTheme } from "./data-access.js";
import { submitBook, deleteBook, getAllBooks, getBook } from "./data-access.js";
import { submitReading, deleteReading, getAllReadings, getReading } from "./data-access.js";
import { getAllCountries, getAllThemes } from "./data-access.js";

export function displayTable() {
    let table;
    let items; //Depois dair nomes melhores às variáveis...
    let list;

    const formPages = {
        authors: "./author-form.html",
        books: "./book-form.html",
        readings: "./reading-form.html"
    };

    function goToEditPage(formPage, itemId) {
        const params = new URLSearchParams({ id: itemId });
        window.location.href = formPage + "?" + params.toString();
    }

    if (document.getElementById("author-list")) {
        table = "authors";
        items = getAllAuthors();
        list = document.getElementById("author-list");
    } else if (document.getElementById("book-list")) {
        table = "books";
        items = getAllBooks();
        list = document.getElementById("book-list");
    } else if (document.getElementById("reading-list")) {
        table = "readings";
        items = getAllReadings();
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
        editButton.addEventListener("click", () => {
            goToEditPage(formPages[table], item.id);
        });

        Object.keys(item).forEach(key => {
            const row = document.createElement("td");
            if (key === "countryId") {
                row.textContent = getCountryFromId(item[key]); //Funções redundantes quando tem getCountry getAuthor etc mas acessar os valores por essas
            } else if (key === "authorIds") {                  //Por algum motivo não funcionava
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

            if (item[key] === null || item[key] === 0 || item[key].length === 0) { // === 0 é necessário por conta de conversões de null para numero
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
    const authorName = document.getElementById("author-name");
    const authorNationalitySelect = document.getElementById("author-nationality");
    const authorBirthDate = document.getElementById("birth-date");
    const authorDeathDate = document.getElementById("death-date");
    const countries = getAllCountries();
    const submitAuthorButton = document.getElementById("submit-author");

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.id;
        option.textContent = country.name;
        authorNationalitySelect.appendChild(option);
    });

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id === null) {
        submitAuthorButton.textContent = "Add Author";
        submitAuthorButton.addEventListener("click", (event) => {
            event.preventDefault();
            submitAuthor();
        });
    } else {
        const itemId = Number(id);
        const author = getAuthor(itemId);
        authorName.value = author.name;
        authorNationalitySelect.value = author.countryId;
        authorBirthDate.value = author.birthDate;
        authorDeathDate.value = author.deathDate;

        submitAuthorButton.textContent = "Edit Author";
        submitAuthorButton.addEventListener("click", (event) => {
            event.preventDefault();
            submitAuthor(itemId);
        });
    }
}


export function updateBookForm() {
    const bookTitle = document.getElementById("book-title");
    const bookAuthorSelect = document.getElementById("book-author");
    const publicationYear = document.getElementById("publication-year");
    const form = document.getElementById("form");
    const modeOfExpression = document.getElementById("mode-of-expression");
    const content = document.getElementById("content");
    const submitBookButton = document.getElementById("add-book");
    const authors = getAllAuthors();

    authors.forEach(author => {
        const option = document.createElement("option");
        option.value = author.id;
        option.textContent = author.name;
        bookAuthorSelect.appendChild(option);
    });

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id === null) {
        submitBookButton.textContent = "Add Book";
        submitBookButton.addEventListener("click", (event) => {
            event.preventDefault();
            submitBook(undefined);
        });
    } else {
        const itemId = Number(id);
        const book = getBook(itemId);
        bookTitle.value = book.title;
        bookAuthorSelect.value = book.authorIds;
        publicationYear.value = book.publicationYear;
        form.value = book.form;
        modeOfExpression.value = book.mode;
        content.value = book.content;

        book.themeIds.forEach(tag => addTag(tag, getTheme(tag).name));

        submitBookButton.textContent = "Edit Book";
        submitBookButton.addEventListener("click", (event) => {
            event.preventDefault();
            submitBook(itemId);
        });
    }
}


export function updateReadingForm() {
    const readingBookSelect = document.getElementById("reading-book");
    const books = getAllBooks();
    const yearReadSelect = document.getElementById("year-read");
    const yearReadSection = document.getElementById("year-read-section");
    const statusSelect = document.getElementById("reading-status");
    const status = statusSelect.value;
    const grade = document.getElementById("grade");
    const prioritySelect = document.getElementById("priority");
    const prioritySection = document.getElementById("priority-section");
    const submitReadingButton = document.getElementById("submit-reading");
    const recommendedBy = document.getElementById("recommended-by");
    const notes = document.getElementById("notes");

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

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id === null) {
        submitReadingButton.textContent = "Add Reading";
        submitReadingButton.addEventListener("click", (event) => {
            event.preventDefault();
            submitReading(undefined);
        });
    } else {
        const itemId = Number(id);
        const reading = getReading(itemId);
        readingBookSelect.value = reading.bookId;
        statusSelect.value = reading.status; //Quebrado no modo edição porque o form é atualizado sempre que muda. Consertar depois
        yearReadSelect.value = reading.yearRead;
        grade.value = reading.grade;
        recommendedBy.value = reading.recommendedBy;
        prioritySelect.value = reading.priority;
        notes.value = reading.notes;

        submitReadingButton.textContent = "Edit Reading";
        submitReadingButton.addEventListener("click", (event) => {
            event.preventDefault();
            submitReading(itemId);
        });
    }
}


export function suggestTag() {
    const input = document.getElementById("tag-input");
    const suggestionsList = document.getElementById("themes-suggestions");
    const themes = getAllThemes();
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