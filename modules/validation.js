export function validateAuthorAddition(authorName, birthDate, deathDate) {
    if (!authorName) {
        alert("Please enter the author's name.");
        return false;
    }

    if (birthDate > deathDate) {
        alert("Birthdate cannot be later than deathdate.");
        return false;
    }

    if (birthDate > new Date().toISOString()) {
        alert("Birthdate cannot be in the future.");
        return false;
    }

    let authors = JSON.parse(localStorage.getItem("authors"));

    if (authors.some(a => a.name === authorName)) {
        alert("An author with this name already exists.");
        return false;
    }

    return true;
}


export function validateBookAddition(bookTitle, publicationYear) {
    if (!bookTitle) {
        alert("Please enter the book title.");
        return false;
    }

    if (publicationYear > new Date().getFullYear()) {
        alert("Publication year cannot be in the future.");
        return false;
    }

    if (publicationYear == 0) {
        alert("Please enter a valid publication year.");
        return false;
    }

    return true;
}


export function validateReadingAddition(bookId, status, yearRead, grade) {
    if (!bookId) {
        alert("Please select a book.");
        return false;
    }

    if (!status) {
        alert("Please select a reading status.");
        return false;
    }

    if (status === "Read" && !yearRead) {
        alert("Please enter the year read for a completed reading.");
        return false;
    }

    if ((status === "Read") && !grade) {
        alert("Please enter a grade for a completed reading.");
        return false;
    }

    if (yearRead && isNaN(yearRead)) {
        alert("Year read must be a number.");
        return false;
    }

    if (grade && (isNaN(grade) || grade < 0 || grade > 10)) {
        alert("Grade must be a number between 0 and 10.");
        return false;
    }

    if (yearRead > new Date().getFullYear()) {
        alert("Year read cannot be in the future.");
        return false;
    }

    return true;
}


export function validateThemeAddition(themeName) {
    if (!themeName) {
        alert("Please enter a theme name.");
        return false;
    }

    let themes = JSON.parse(localStorage.getItem("themes"));

    if (themes.some(t => t.name === themeName)) {
        alert("A theme with this name already exists.");
        return false;
    }

    return true;
}


export function validateAuthorDeletion(authorId) {
    let booksWithAuthor = JSON.parse(localStorage.getItem("books")).filter(book => book.authorIds.includes(authorId));

    if (booksWithAuthor.length > 0) {
        alert("Cannot delete author. There are books associated with this author: " + booksWithAuthor.map(book => book.title).join(", "));
        return false;
    }

    return true;
}