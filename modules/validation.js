export function validateAuthorSubmission(authorName, birthDate, deathDate, authors) {
    authorName = authorName.trim().toLowerCase();

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

    if (document.getElementById("submit-author").textContent == "Add Author") { //Talvez não a melhor maneira de checar isso
        if (authors.some(a => a.name.trim().toLowerCase() === authorName)) {
            alert("An author with this name already exists.");
            return false;
        }
    }

    return true;
}


export function validateBookSubmission(bookTitle, publicationYear) {
    if (!bookTitle) {
        alert("Please enter the book title.");
        return false;
    }

    if (publicationYear > new Date().getFullYear()) {
        alert("Publication year cannot be in the future.");
        return false;
    }

    if (publicationYear == "0") {
        alert("Please enter a valid publication year.");
        return false;
    }

    return true;
}


export function validateReadingSubmission(bookId, status, yearRead, publicationYear, grade) {
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

    if ((status === "Read" || status === "Abandoned") && yearRead < publicationYear) {
        alert("Year read cannot be before publication year.");
        return false;
    }

    if (grade % 0.5 !== 0) {
        alert("Grade must be in steps of 0.5");
        return false;
    }

    return true;
}


export function validateThemeAddition(themeName, themes) {
    if (!themeName) {
        alert("Please enter a theme name.");
        return false;
    }

    if (themes.some(t => t.name === themeName)) {
        alert("A theme with this name already exists.");
        return false;
    }
    return true;
}


export function validateAuthorDeletion(booksWithAuthor) {
    if (booksWithAuthor.length > 0) {
        alert("Cannot delete author. There are books associated with this author: " + booksWithAuthor.map(book => book.title).join(", "));
        return false;
    } else {
        if (confirm("Are you sure you want to delete this author?")) {
            return true;
        }
    }
    return false;
}


export function validateBookDeletion(readingsWithBook) {
    if (readingsWithBook.length !== 0) {
        if (confirm("This books has " + readingsWithBook.length + " associated readings, deleting it will delete the readings as well. Proceed?")) {
            return true;
        }
    } else {
        if (confirm("Are you sure you want to delete this book?")) {
            return true;
        }
    }
    return false;
}


export function validateReadingDeletion() {
    if (confirm("Are you sure you want to delete this reading?")) {
        return true;
    } else {
        return false;
    }
}