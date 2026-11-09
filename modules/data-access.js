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
}


export async function addBook() {
    const bookId = JSON.parse(localStorage.getItem("books")).at(-1).id + 1;
    const bookTitle = document.getElementById("book-title").value;
    const bookAuthorIds = Array.from(document.getElementById("book-author").selectedOptions).map(option => parseInt(option.value));
    const publicationYear = document.getElementById("publication-year").value;
    const form = document.getElementById("form").value;
    const modeOfExpression = document.getElementById("mode-of-expression").value;
    const content = document.getElementById("content").value;
    const themeIds = Array.from(document.getElementById("selected-tags").children).map(li => parseInt(li.value));

    if (!bookTitle) {
        alert("Please enter the book title.");
        return;
    }

    if (publicationYear > new Date().getFullYear()) {
        alert("Publication year cannot be in the future.");
        return;
    }

    if (publicationYear === 0) {
        alert("Please enter a valid publication year.");
        return;
    }

    const book = {
        id: bookId,
        title: bookTitle,
        authorIds: bookAuthorIds,
        publicationYear: publicationYear,
        form: form.value,
        modeOfExpression: modeOfExpression,
        content: content,
        themeIds: themeIds
    };

    let books = JSON.parse(localStorage.getItem("books"));
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book added successfully.");
    updateBookForm();
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

    if (!status) {
        alert("Please select a reading status.");
        return;
    }

    if (status === "Read" && !yearRead) {
        alert("Please enter the year read for a completed reading.");
        return;
    }

    if ((status === "Read") && !grade) {
        alert("Please enter a grade for a completed reading.");
        return;
    }

    if (yearRead && isNaN(yearRead)) {
        alert("Year read must be a number.");
        return;
    }

    if (grade && (isNaN(grade) || grade < 0 || grade > 10)) {
        alert("Grade must be a number between 0 and 10.");
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
}


export async function addTheme() {
    const themeId = JSON.parse(localStorage.getItem("themes")).at(-1).id + 1;
    const themeName = document.getElementById("tag-input").value;

    if (!themeName) {
        alert("Please enter a theme name.");
        return;
    }

    let themes = JSON.parse(localStorage.getItem("themes"));

    if (themes.some(t => t.name === themeName)) {
        alert("A theme with this name already exists.");
        return;
    }

    const theme = {
        id: themeId,
        name: themeName
    };

    themes.push(theme);
    localStorage.setItem("themes", JSON.stringify(themes));
    alert("Theme added successfully.");
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
}


export async function deleteBook(bookId) {
    const readings = JSON.parse(localStorage.getItem("readings"));
    const readingsWithBook = readings.filter(reading => reading.bookId === bookId);

    if (readingsWithBook.length !== 0) {
        if (confirm("This books has " + readingsWithBook.length + " associated readings, deleting it will delete the readings as well. Proceed?")) {
            readingsWithBook.forEach(reading => {
                deleteReading(reading.id);
            });
            let books = JSON.parse(localStorage.getItem("books"));
            books = books.filter(book => book.id !== bookId);
            localStorage.setItem("books", JSON.stringify(books));
            alert("Book deleted successfully.");
        }
    }
}


export async function deleteReading(readingId) {
    let readings = JSON.parse(localStorage.getItem("readings"));
    readings = readings.filter(reading => reading.id !== readingId);
    localStorage.setItem("readings", JSON.stringify(readings));
    alert("Reading deleted successfully.");
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