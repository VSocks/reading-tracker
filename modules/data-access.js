import {updateAuthorForm, updateBookForm, updateReadingForm} from "./rendering.js";

export async function addAuthor() {
    const authorId = JSON.parse(localStorage.getItem("authors")).at(-1).id + 1;
    const authorName = document.getElementById("author-name").value;
    const birthDate = document.getElementById("birth-date").value;
    const deathDate = document.getElementById("death-date").value;
    const nationality = nationalitySelect.value;

    if (!authorName) {
        alert("Please enter the author's name.");
        return;
    }

    if (birthDate > deathDate) {
        alert("Birthdate cannot be later than deathdate.");
        return;
    }

    if (birthDate > new Date().toISOString()) {
        alert("Birthdate cannot be in the future.");
        return;
    }
    
    const author = {
        id: authorId,
        name: authorName,
        countryId: nationality,
        birthDate: birthDate,
        deathDate: deathDate,
    };

    let authors = JSON.parse(localStorage.getItem("authors"));
    
    if (authors.some(a => a.name === authorName)) {
        alert("An author with this name already exists.");
        return;
    }

    authors.push(author);
    localStorage.setItem("authors", JSON.stringify(authors));
    alert("Author added successfully.");
    updateAuthorForm();
}


export async function addBook() {
    //TODO: atualizar para permitir uso de temas
    const bookId = JSON.parse(localStorage.getItem("books")).at(-1).id + 1;
    const bookTitle = document.getElementById("book-title").value;
    const bookAuthorId = document.getElementById("book-author").value;
    const publicationYear = document.getElementById("publication-year").value;
    const form = document.getElementById("form").value;
    const modeOfExpression = document.getElementById("mode-of-expression").value;
    const content = document.getElementById("content").value;
    //const theme = document.getElementById("theme").value;

    if (!bookTitle) {
        alert("Please enter the book title.");
        return;
    }

    if (publicationYear > new Date().getFullYear()) {
        alert("Publication year cannot be in the future.");
        return;
    }

    const book = {
        id: bookId,
        title: bookTitle,
        authorId: bookAuthorId,
        publicationYear: publicationYear,
        form: form.value,
        modeOfExpression: modeOfExpression,
        content: content,
        //theme: theme
    };

    let books = JSON.parse(localStorage.getItem("books"));
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book added successfully.");
    updateBookForm();
    updateReadingForm();
}


export async function addReading() {
    //TODO: fazer ano lido obrigatório para status lido, nota obrigatória para status lido ou abandonado
    const readingId = JSON.parse(localStorage.getItem("readings")).at(-1).id + 1;
    const bookId = Number(document.getElementById("reading-book").value);
    const status = document.getElementById("reading-status").value;
    const yearRead = document.getElementById("year-read").value;
    const grade = document.getElementById("grade").value;
    const recommendedBy = document.getElementById("recommended-by").value;
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;

    if (!bookId) {
        alert("Please select a book.");
        return;
    }

    if (yearRead > new Date().getFullYear()) {
        alert("Year read cannot be in the future.");
        return;
    }

    const reading = {
        id: readingId,
        bookId: bookId,
        status: status,
        yearRead: yearRead,
        grade: grade,
        recommendedBy: recommendedBy,
        priority: priority,
        notes: notes
    };

    let readings = JSON.parse(localStorage.getItem("readings"));
    readings.push(reading);
    localStorage.setItem("readings", JSON.stringify(readings));
    alert("Reading added successfully.");
    updateReadingForm();
}


export async function deleteAuthor(authorId) {
    let booksWithAuthor = JSON.parse(localStorage.getItem("books")).filter(book => book.authorIds.includes(authorId));
    if (booksWithAuthor.length > 0) {
        alert("Cannot delete author. There are books associated with this author: " + booksWithAuthor.map(book => book.title).join(", "));
        return;
    }
    let authors = JSON.parse(localStorage.getItem("authors"));
    authors = authors.filter(author => author.id !== authorId);
    localStorage.setItem("authors", JSON.stringify(authors));
    alert("Author deleted successfully.");
    updateAuthorForm();
}


export async function deleteBook(bookId) {
    //TODO: deletar livro deve deletar readings associadas após mensagem de confirmação
    let books = JSON.parse(localStorage.getItem("books"));
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book deleted successfully.");
    updateBookForm();
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