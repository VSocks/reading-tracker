const nationalitySelect = document.getElementById("author-nationality");
const resetButton = document.getElementById("reset-data");
const clearButton = document.getElementById("clear-data");
const getButton = document.getElementById("get-data");

const addAuthorButton = document.getElementById("add-author");
const displayAuthorsButton = document.getElementById("show-button-author");
const deleteAuthorButton = document.getElementById("delete-author-button");


const addBookButton = document.getElementById("add-book");
const displayBooksButton = document.getElementById("show-button-book");
const deleteBookButton = document.getElementById("delete-book-button");

const addReadingButton = document.getElementById("add-reading");
const displayReadingsButton = document.getElementById("show-button-reading");


document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    updateAllForms();
});

resetButton.addEventListener("click", () => {
    localStorage.clear();
    fetchData();
    alert("Data has been reset.");
});

clearButton.addEventListener("click", () => {
    localStorage.clear();
    alert("All data has been cleared.");
});

getButton.addEventListener("click", () => {
    fetchData();
    alert("Data has been fetched and stored in localStorage.");
});

addAuthorButton.addEventListener("click", (event) => {
    event.preventDefault();
    addAuthor();
});

displayAuthorsButton.addEventListener("click", () => {
    displayAuthors();
});

addBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBook();
});

displayBooksButton.addEventListener("click", () => {
    displayBooks();
});

deleteAuthorButton.addEventListener("click", () => {
    const authorId = parseInt(document.getElementById("delete-author").value);
    if (isNaN(authorId)) {
        alert("Please select an author to delete.");
        return;
    }
    deleteAuthor(authorId);
});

deleteBookButton.addEventListener("click", () => {
    const bookId = parseInt(document.getElementById("delete-book").value);
    if (isNaN(bookId)) {
        alert("Please select a book to delete.");
        return;
    }
    deleteBook(bookId);
});

addReadingButton.addEventListener("click", (event) => {
    event.preventDefault();
    addReading();
});

displayReadingsButton.addEventListener("click", () => {
    displayReadings();
});


function addAuthor() {
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
    authors.push(author);
    localStorage.setItem("authors", JSON.stringify(authors));
    alert("Author added successfully.");
    updateAuthorForm();
}


function addBook() {
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


function addReading() {
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


function displayAuthors() {
    const authors = JSON.parse(localStorage.getItem("authors"));
    const authorsList = document.getElementById("author-list");
    authorsList.innerHTML = "";

    if (!authors) {
        authorsList.textContent = "No authors found.";
        return;
    }

    authors.forEach(author => {
        const listItem = document.createElement("li");
        listItem.textContent = "ID: " + author.id + 
                                ", Name: " + author.name + 
                                ", Birthdate: " + author.birthDate + 
                                ", Deathdate: " + author.deathDate + 
                                ", Nationality: " + getCountryFromId(author.countryId);
        authorsList.appendChild(listItem);
    });

    displayAuthorsButton.textContent = "Hide Authors";
    displayAuthorsButton.removeEventListener("click", displayAuthors);
    displayAuthorsButton.addEventListener("click", hideAuthors);
}


function displayBooks() {
    const books = JSON.parse(localStorage.getItem("books"));
    const booksList = document.getElementById("book-list");
    booksList.innerHTML = "";

    if (!books) {
        booksList.textContent = "No books found.";
        return;
    }

    books.forEach(book => {
        const listItem = document.createElement("li");
        listItem.textContent = "ID: " + book.id + 
                                ", Title: " + book.title + 
                                ", Authors: " + getAuthorsNamesFromIds(book.authorIds) + 
                                ", Publication Year: " + book.publicationYear + 
                                ", Form: " + book.form +
                                ", Mode of Expression: " + book.mode + 
                                ", Content: " + book.content +
                                ", Themes: " + getThemesFromIds(book.themeIds);
        booksList.appendChild(listItem);
    });

    displayBooksButton.textContent = "Hide Books";
    displayBooksButton.removeEventListener("click", displayBooks);
    displayBooksButton.addEventListener("click", hideBooks);
}


function displayReadings() {
    const readings = JSON.parse(localStorage.getItem("readings"));
    const readingsList = document.getElementById("reading-list");

    if (!readings) {
        readingsList.textContent = "No readings found.";
        return;
    }

    readings.forEach(reading => {
        const listItem = document.createElement("li");
        listItem.textContent = "ID: " + reading.id +
                                ", Book: " + getBookTitleFromId(reading.bookId) + 
                                ", Status: " + reading.status + 
                                ", Year Read: " + reading.yearRead + 
                                ", Grade: " + reading.grade +
                                ", Recommended By: " + reading.recommendedBy + 
                                ", Priority: " + reading.priority +
                                ", Notes: " + reading.notes;
        readingsList.appendChild(listItem);
    });

    displayReadingsButton.textContent = "Hide Readings";
    displayReadingsButton.removeEventListener("click", displayReadings);
    displayReadingsButton.addEventListener("click", hideReadings);
}


function hideAuthors() {
    const authorsList = document.getElementById("author-list");
    for (let i = authorsList.children.length - 1; i >= 0; i--) {
        authorsList.removeChild(authorsList.children[i]);
    }
    displayAuthorsButton.textContent = "Show Authors";
    displayAuthorsButton.removeEventListener("click", hideAuthors);
    displayAuthorsButton.addEventListener("click", displayAuthors);
}


function hideBooks() {
    const booksList = document.getElementById("book-list");
    for (let i = booksList.children.length - 1; i >= 0; i--) {
        booksList.removeChild(booksList.children[i]);
    }
    displayBooksButton.textContent = "Show Books";
    displayBooksButton.removeEventListener("click", hideBooks);
    displayBooksButton.addEventListener("click", displayBooks);
}


function hideReadings() {
    const readingsList = document.getElementById("reading-list");
    for (let i = readingsList.children.length - 1; i >= 0; i--) {
        readingsList.removeChild(readingsList.children[i]);
    }
    displayReadingsButton.textContent = "Show Readings";
    displayReadingsButton.removeEventListener("click", hideReadings);
    displayReadingsButton.addEventListener("click", displayReadings);
}


function deleteAuthor(authorId) {
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


function deleteBook(bookId) {
    let books = JSON.parse(localStorage.getItem("books"));
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book deleted successfully.");
    updateBookForm();
}


function getCountryFromId(countryId) {
    const countries = JSON.parse(localStorage.getItem("countries"));
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : "Unknown";
}


function getAuthorsNamesFromIds(authorIds) {
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


function getThemesFromIds(themeIds) {
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


function getBookTitleFromId(bookId) {
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books.find(b => b.id === bookId);
    return book ? book.title : "Unknown";
}


function updateAuthorForm() {
    const authorNationalitySelect = document.getElementById("author-nationality");
    const countries = JSON.parse(localStorage.getItem("countries"));
    const deleteAuthorSelect = document.getElementById("delete-author");
    const authors = JSON.parse(localStorage.getItem("authors"));

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.id;
        option.textContent = country.name;
        authorNationalitySelect.appendChild(option);
    });

    authors.forEach(author => {
        const option = document.createElement("option");
        option.value = author.id;
        option.textContent = author.name;
        deleteAuthorSelect.appendChild(option);
    });
}


function updateBookForm() {
    const bookAuthorSelect = document.getElementById("book-author");
    const authors = JSON.parse(localStorage.getItem("authors"));
    const deleteBookSelect = document.getElementById("delete-book");
    const books = JSON.parse(localStorage.getItem("books"));

    authors.forEach(author => {
        const option = document.createElement("option");
        option.value = author.id;
        option.textContent = author.name;
        bookAuthorSelect.appendChild(option);
    });

    books.forEach(book => {
        const option = document.createElement("option");
        option.value = book.id;
        option.textContent = book.title;
        deleteBookSelect.appendChild(option);
    });
}


function updateReadingForm() {
    const readingBookSelect = document.getElementById("reading-book");
    const books = JSON.parse(localStorage.getItem("books"));
    
    books.forEach(book => {
        const option = document.createElement("option");
        option.value = book.id;
        option.textContent = book.title;
        readingBookSelect.appendChild(option);
    });
}


function updateAllForms() {
    updateAuthorForm();
    updateBookForm();
    updateReadingForm();
}


function fetchData() {
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