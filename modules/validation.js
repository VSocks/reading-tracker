export function validateAuthorDeletion (authorName, birthDate, deathDate) {
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