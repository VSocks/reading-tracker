export function getCountryFromId(countryId) {
    const countries = JSON.parse(localStorage.getItem("countries"));
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : "Unknown";
}


export function getAuthorsNamesFromIds(authorIds) {
    if (!authorIds || authorIds.length === 0) {
        return "Not Specified";
    }
    const authors = JSON.parse(localStorage.getItem("authors"));
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
    const themes = JSON.parse(localStorage.getItem("themes"));
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
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books.find(b => b.id === bookId);
    return book ? book.title : "Unknown";
}


export function getPublicationYearFromId(bookId) {
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books.find(b => b.id === bookId);
    return book ? book.publicationYear : "Unknown";
}