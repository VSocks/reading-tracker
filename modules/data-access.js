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


export async function submitAuthor(author) {
    const authors = await getAllAuthors();

    if (author.id === undefined || author.id === null) {
        author.id = authors.at(-1).id + 1;
        authors.push(author);
        localStorage.setItem("authors", JSON.stringify(authors));
    } else {
        const authorIndex = authors.findIndex(a => a.id === author.id);
        authors.splice(authorIndex, 1, author);
        localStorage.setItem("authors", JSON.stringify(authors));
    }
}


export async function submitBook(book) {
    const books = await getAllBooks();

    if (book.id === undefined || book.id === null) {
        book.id = books.at(-1).id + 1;
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    } else {
        const bookIndex = books.findIndex(b => b.id === book.id);
        books.splice(bookIndex, 1, book);
        localStorage.setItem("books", JSON.stringify(books)); //Talvez criar funções setters também
    }
}


export async function submitReading(reading) {
    const readings = await getAllReadings();

    if (reading.id === undefined || reading.id === null) {
        reading.id = readings.at(-1).id + 1;
        readings.push(reading);
        localStorage.setItem("readings", JSON.stringify(readings));
    } else {
        const readingIndex = readings.findIndex(r => r.id === reading.id);
        readings.splice(readingIndex, 1, reading);
        localStorage.setItem("readings", JSON.stringify(readings));
    }
}


export async function addTheme(theme) {
    const themes = await getAllThemes();

    if (theme.id === undefined || theme.id === null) {
        theme.id = themes.at(-1).id + 1;
    }
    themes.push(theme);
    localStorage.setItem("themes", JSON.stringify(themes));
    return theme;
}


export async function deleteAuthor(authorId) {
    let authors = await getAllAuthors();
    authors = authors.filter(author => author.id !== authorId);
    localStorage.setItem("authors", JSON.stringify(authors));
}


export async function deleteBook(bookId) {
    let books = await getAllBooks();
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
}


export async function deleteReading(readingId) {
    let readings = await getAllReadings();
    readings = readings.filter(reading => reading.id !== readingId);
    localStorage.setItem("readings", JSON.stringify(readings));
}


export async function deleteReadingsWithBook(readingsWithBook) {
    //let readings = await getAllReadings();
    //readings = readings.filter(reading => reading.id !== readingsWithBook.some(b));
    //localStorage.setItem("readings", JSON.stringify(readings));
    return;
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