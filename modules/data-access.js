import { validateAuthorSubmission, validateBookSubmission, validateReadingSubmission, validateThemeAddition, validateAuthorDeletion, validateBookDeletion, validateReadingDeletion } from "./validation.js";
import { addTag } from "./rendering.js";


export async function getAllAuthors() {
    return JSON.parse(localStorage.getItem("authors"));
}


export async function getAuthor(id) {
    const authors = await getAllAuthors();
    return authors.find(author => author.id === id);
}


export async function getAllBooks() {
    return JSON.parse(localStorage.getItem("books"));
}


export async function getBook(id) {
    const books = await getAllBooks();
    return books.find(book => book.id === id);
}


export async function getAllReadings() {
    return JSON.parse(localStorage.getItem("readings"));
}


export async function getReading(id) {
    const readings = await getAllReadings();
    return readings.find(reading => reading.id === id);
}


export async function getAllCountries() {
    return JSON.parse(localStorage.getItem("countries"));
}


export async function getCountry(id) {
    const countries = await getAllCountries();
    return countries.find(country => country.id === id);
}


export async function getAllThemes() {
    return JSON.parse(localStorage.getItem("themes"));
}


export async function getTheme(id) {
    const themes = await getAllThemes();
    return themes.find(theme => theme.id === id);
}


export async function getCountryFromId(countryId) {
    const countries = await getAllCountries();
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : null;
}


export async function getAuthorsNamesFromIds(authorIds) {
    if (!authorIds || authorIds.length === 0) {
        return "Not Specified";
    }
    const authors = await getAllAuthors();
    let authorNames = [];
    for (const id of authorIds) {
        const author = authors.find(a => a.id === id);
        if (author) {
            authorNames.push(author.name);
        }
    }
    return authorNames.join(", ");
}


export async function getThemesFromIds(themeIds) {
    if (!themeIds || themeIds.length === 0) {
        return "Not Specified";
    }
    const themes = await getAllThemes();
    let themeNames = [];
    for (const id of themeIds) {
        const theme = themes.find(t => t.id === id);
        if (theme) {
            themeNames.push(theme.name);
        }
    }
    return themeNames.join(", ");
}


export async function getBookTitleFromId(bookId) {
    const books = await getAllBooks();
    const book = books.find(b => b.id === bookId);
    return book ? book.title : "Unknown";
}


export async function getPublicationYearFromId(bookId) {
    const books = await getAllBooks();
    const book = books.find(b => b.id === bookId);
    return book ? book.publicationYear : "Unknown";
}


export function nullifyBlank(obj) {
    for (const key of Object.keys(obj)) {
        if (obj[key] === "" || obj[key] === 0 || obj[key] === undefined) {
            obj[key] = null;
        }
    }
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
    const authors = await getAllAuthors();

    if (!validateAuthorSubmission(author.name, author.birthDate, author.deathDate, authors)) {
        return;
    }

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

    if (!validateBookSubmission(book.title, publicationYearText)) { //Fazer essa validação funcionar foi mais difícil do que deveria ter sido
        return;
    }

    const books = await getAllBooks();

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
    const grade = Number(document.getElementById("grade").value);
    const recommendedBy = document.getElementById("recommended-by").value;
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;
    let publicationYear;

    if (bookId) {
        let book = await getBook(bookId);
        publicationYear = book.publicationYear;
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

    const readings = await getAllReadings();

    if (readingId === undefined || readingId === null) {
        readingId = readings.at(-1).id + 1;
        reading.id = readingId;
        readings.push(reading);
        localStorage.setItem("readings", JSON.stringify(readings));
        alert("Reading added successfully.");
    } else {
        const readingIndex = readings.findIndex(r => r.id === readingId);
        readings.splice(readingIndex, 1, reading);
        localStorage.setItem("readings", JSON.stringify(readings));
        alert("Reading edited successfully.");
    }
}


export async function addTheme() {
    let themes = await getAllThemes();
    const themeId = themes.at(-1).id + 1;
    const themeName = document.getElementById("tag-input").value;

    if (!validateThemeAddition(themeName, themes)) {
        return;
    }

    const theme = {
        id: themeId,
        name: themeName
    };


    themes.push(theme);
    localStorage.setItem("themes", JSON.stringify(themes));
    alert("Theme added successfully.");

    addTag(theme.id, theme.name)
}


export async function deleteAuthor(authorId) {
    const books = await getAllBooks();
    const booksWithAuthor = books.filter(book => book.authorIds.includes(authorId));

    if (!validateAuthorDeletion(booksWithAuthor)) {
        return;
    }

    let authors = await getAllAuthors();
    authors = authors.filter(author => author.id !== authorId);
    localStorage.setItem("authors", JSON.stringify(authors));
    alert("Author deleted successfully.");
}


export async function deleteBook(bookId) {
    const readings = await getAllReadings();
    const readingsWithBook = readings.filter(reading => reading.bookId === bookId);

    if (!validateBookDeletion(readingsWithBook)) {
        return;
    }

    for (const reading of readingsWithBook) {
        await deleteReadingNoConfirm(reading.id);
    }

    let books = await getAllBooks();
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book deleted successfully.");
}


export async function deleteReading(readingId) {
    if (!validateReadingDeletion()) {
        return;
    }

    let readings = await getAllReadings();
    readings = readings.filter(reading => reading.id !== readingId);
    localStorage.setItem("readings", JSON.stringify(readings));
    alert("Reading deleted successfully.");
}


export async function deleteReadingNoConfirm(readingId) {
    let readings = await getAllReadings();
    readings = readings.filter(reading => reading.id !== readingId);
    localStorage.setItem("readings", JSON.stringify(readings));
}


export async function fetchData() {
    try {
        const response = await fetch("./data/seed.json");
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }
        const data = await response.json();
        for (const [key, value] of Object.entries(data)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    } catch (error) {
        console.error("Error fetching seed.json: ", error);
    }
}