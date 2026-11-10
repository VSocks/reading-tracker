import { getAllAuthors, getAllBooks, getAllCountries, getAllThemes } from "./data-access.js";

export function getCountryFromId(countryId) {
    const countries = getAllCountries();
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : "Unknown";
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