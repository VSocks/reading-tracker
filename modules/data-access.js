import { validateAuthorSubmission, validateBookSubmission, validateReadingSubmission, validateThemeAddition, validateAuthorDeletion } from "./validation.js";
import { addTag } from "./rendering.js";


export function getAllAuthors() {
    return JSON.parse(localStorage.getItem("authors"));
}


export function getAuthor(id) {
    const authors = getAllAuthors();
    return authors.find(author => author.id === id);
}


export function getAllBooks() {
    return JSON.parse(localStorage.getItem("books"));
}


export function getBook(id) {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}


export function getAllReadings() {
    return JSON.parse(localStorage.getItem("readings"));
}


export function getReading(id) {
    const readings = getAllReadings();
    return readings.find(reading => reading.id === id);
}


export function getAllCountries() {
    return JSON.parse(localStorage.getItem("countries"));
}


export function getCountry(id) {
    const countries = getAllCountries();
    return countries.find(country => country.id === id);
}


export function getAllThemes() {
    return JSON.parse(localStorage.getItem("themes"));
}


export function getTheme(id) {
    const themes = getAllThemes();
    return themes.find(theme => theme.id === id);
}


export function getCountryFromId(countryId) {
    const countries = getAllCountries();
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : null;
}


export function getAuthorsNamesFromIds(authorIds) {
    if (!authorIds || authorIds.length === 0) {
        return "Not Specified";
    }
    const authors = getAllAuthors();
    let authorNames = [];
    authorIds.forEach(id => {
        const author = authors.find(a => a.id === id);
        if (author) {
            authorNames.push(author.name);
        }
    });
    return authorNames.join(", ");
}


export function getThemesFromIds(themeIds) {
    if (!themeIds || themeIds.length === 0) {
        return "Not Specified";
    }
    const themes = getAllThemes();
    let themeNames = [];
    themeIds.forEach(id => {
        const theme = themes.find(t => t.id === id);
        if (theme) {
            themeNames.push(theme.name);
        }
    });
    return themeNames.join(", ");
}


export function getBookTitleFromId(bookId) {
    const books = getAllBooks();
    const book = books.find(b => b.id === bookId);
    return book ? book.title : "Unknown";
}


export function getPublicationYearFromId(bookId) {
    const books = getAllBooks();
    const book = books.find(b => b.id === bookId);
    return book ? book.publicationYear : "Unknown";
}


export function nullifyBlank(obj){
    Object.keys(obj).forEach(key => {
        if (obj[key] === "" || obj[key] === 0 || obj[key] === undefined) {
            obj[key] = null;
        }
    });
    return obj;
}


export async function submitAuthor(authorId) {
    const authorName = document.getElementById("author-name").value;
    const birthDate = document.getElementById("birth-date").value;
    const deathDate = document.getElementById("death-date").value;
    const nationality = Number(document.getElementById("author-nationality").value);

    let author = {
        id: authorId,
        name: authorName,
        countryId: nationality,
        birthDate: birthDate,
        deathDate: deathDate,
    };

    author = nullifyBlank(author);

    if (!validateAuthorSubmission(author.name, author.birthDate, author.deathDate)) {
        return;
    }

    const authors = getAllAuthors();

    if (authorId === undefined || authorId === null) {
        authorId = authors.at(-1).id + 1;
        author.id = authorId;
        authors.push(author);
        localStorage.setItem("authors", JSON.stringify(authors));
        alert("Author added successfully.");
    } else {
        const authorIndex = authors.findIndex(a => a.id === authorId);
        authors.splice(authorIndex, 1, author);
        localStorage.setItem("authors", JSON.stringify(authors));
        alert("Author edited successfully.");
    }
}


export async function submitBook(bookId) {
    const bookTitle = document.getElementById("book-title").value;
    const bookAuthorIds = Array.from(document.getElementById("book-author").selectedOptions).map(option => parseInt(option.value));
    const publicationYearSelect = document.getElementById("publication-year"); //Voceis não tem ideia de quanto problema essa string me deu
    const publicationYear = Number(publicationYearSelect.value);
    const publicationYearText = String(publicationYearSelect.value);
    const form = document.getElementById("form").value;
    const modeOfExpression = document.getElementById("mode-of-expression").value;
    const content = document.getElementById("content").value;
    const themeIds = Array.from(document.getElementById("selected-tags").children).map(li => parseInt(li.value));

    let book = {
        id: bookId,
        title: bookTitle,
        authorIds: bookAuthorIds,
        publicationYear: publicationYear,
        form: form,
        mode: modeOfExpression,
        content: content,
        themeIds: themeIds
    };

    book = nullifyBlank(book);

    console.log(publicationYear, publicationYearText);

    if (!validateBookSubmission(book.title, publicationYearText)) { //Fazer essa validação funcionar foi mais difícil do que deveria ter sido
        return;
    }

    const books = getAllBooks();

    if (bookId === undefined || bookId === null) {
        bookId = books.at(-1).id + 1;
        book.id = bookId;
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
        alert("Book added successfully.");
    } else {
        const bookIndex = books.findIndex(b => b.id === bookId);
        books.splice(bookIndex, 1, book);
        localStorage.setItem("books", JSON.stringify(books)); //Talvez criar funções setters também
        alert("Book edited successfully.");
    }
}


export async function submitReading(readingId) {
    const bookId = Number(document.getElementById("reading-book").value);
    const status = document.getElementById("reading-status").value;
    const yearRead = Number(document.getElementById("year-read").value);
    const grade = document.getElementById("grade").value;
    const recommendedBy = document.getElementById("recommended-by").value;
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;
    let publicationYear;
    
    if (bookId) {
        publicationYear = getBook(bookId).publicationYear;
    } 

    let reading = {
        id: readingId,
        bookId: bookId,
        status: status,
        yearRead: yearRead,
        grade: grade,
        recommendedBy: recommendedBy,
        priority: priority,
        notes: notes
    };

    reading = nullifyBlank(reading);

    if (!validateReadingSubmission(reading.bookId, reading.status, reading.yearRead, publicationYear, reading.grade)) {
        return;
    }

    const readings = getAllReadings();

    if (readingId === undefined || readingId === null) {
        readingId = readings.at(-1).id + 1;
        reading.id = readingId;
        reading = nullifyBlank(reading);
        readings.push(reading);
        localStorage.setItem("readings", JSON.stringify(readings));
        alert("Reading added successfully.");
    } else {
        const readingIndex = readings.findIndex(r => r.id === readingId);
        reading = nullifyBlank(reading);
        readings.splice(readingIndex, 1, reading);
        localStorage.setItem("readings", JSON.stringify(readings));
        alert("Reading edited successfully.");
    }
}


export async function addTheme() {
    const themeId = JSON.parse(localStorage.getItem("themes")).at(-1).id + 1;
    const themeName = document.getElementById("tag-input").value;

    if (!validateThemeAddition(themeName)) {
        return;
    }

    const theme = {
        id: themeId,
        name: themeName
    };

    let themes = JSON.parse(localStorage.getItem("themes"));
    themes.push(theme);
    localStorage.setItem("themes", JSON.stringify(themes));
    alert("Theme added successfully.");

    addTag(theme.id, theme.name)
}


export async function deleteAuthor(authorId) {
    if (!validateAuthorDeletion(authorId)) {
        return;
    }

    let authors = JSON.parse(localStorage.getItem("authors"));
    authors = authors.filter(author => author.id !== authorId);
    localStorage.setItem("authors", JSON.stringify(authors));
    alert("Author deleted successfully.");
}


export async function deleteBook(bookId) {
    const readings = JSON.parse(localStorage.getItem("readings"));
    const readingsWithBook = readings.filter(reading => reading.bookId === bookId);

    if (readingsWithBook.length !== 0) {
        if (!confirm("This books has " + readingsWithBook.length + " associated readings, deleting it will delete the readings as well. Proceed?")) {
            return;
        }
    }
    readingsWithBook.forEach(reading => {
        deleteReading(reading.id);
    });
    let books = JSON.parse(localStorage.getItem("books"));
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book deleted successfully.");
}


export async function deleteReading(readingId) {
    let readings = JSON.parse(localStorage.getItem("readings"));
    readings = readings.filter(reading => reading.id !== readingId);
    localStorage.setItem("readings", JSON.stringify(readings));
    alert("Reading deleted successfully."); //Provavelmente retirar para quando deletar multiplas readings
}


export async function fetchData() {
    fetch("./data/seed.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            return response.text();
        })
        .then(data => {
            for (const [key, value] of Object.entries(JSON.parse(data))) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        })
        .catch(error => {
            console.error("Error fetching seed.json: ", error);
        });
}