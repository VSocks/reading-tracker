import { submitAuthor, submitBook, submitReading } from "./data-access.js";
import { deleteAuthor, deleteBook, deleteReading } from "./data-access.js";
import { deleteReadingsWithBook } from "./data-access.js";
import { getAllAuthors, getAllBooks, getAllReadings, getAllThemes } from "./data-access.js";
import { getBook } from "./data-access.js";
import { addTheme } from "./data-access.js";
import { validateAuthorSubmission, validateBookSubmission, validateReadingSubmission, validateThemeAddition } from "./validation.js";
import { validateAuthorDeletion, validateBookDeletion, validateReadingDeletion } from "./validation.js";


export function nullifyBlank(obj) {
    for (const key of Object.keys(obj)) {
        if (obj[key] === "" || obj[key] === 0 || obj[key] === undefined) {
            obj[key] = null;
        }
    }
    return obj;
}


export async function submitAuthorForm(authorId) {
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
    const isNew = author.id === null;

    if (validateAuthorSubmission(author.id, author.name, author.birthDate, author.deathDate, authors)) {
        await submitAuthor(author);
        if (isNew) {
            alert("Author added successfully");
        } else {
            alert("Author edited successfully");
        }
    }
}



export async function submitBookForm(bookId) {
    const bookTitle = document.getElementById("book-title").value;
    const bookAuthorIds = Array.from(document.getElementById("book-author").selectedOptions).map(option => parseInt(option.value));
    const publicationYearSelect = document.getElementById("publication-year"); //Voceis não tem ideia de quanto problema essa string me deu
    const publicationYear = Number(publicationYearSelect.value); //Quem pensou que era uma boa ideia "" ser equivalente a 0?
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
    const isNew = book.id === null;

    if (validateBookSubmission(book.title, publicationYearText)) { //Fazer essa validação funcionar foi mais difícil do que deveria ter sido
        await submitBook(book);
        if (isNew) {
            alert("Book added successfully");
        } else {
            alert("Book edited successfully");
        }
    }
}



export async function submitReadingForm(readingId) {
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
    const isNew = reading.id === null

    if (validateReadingSubmission(reading.bookId, reading.status, reading.yearRead, publicationYear, reading.grade)) {
        await submitReading(reading);
        if (isNew) {
            alert("Reading added successfully");
        } else {
            alert("Reading edited successfully");
        }
    }
}


export async function submitTheme() { //Não funciona por algum motivo
    let themes = await getAllThemes();

    const themeName = document.getElementById("tag-input").value;

    let theme = {
        id: undefined,
        name: themeName
    };

    if (validateThemeAddition(themeName, themes)) {
        theme = await addTheme(theme);
        alert("Theme added successfully.");
        return theme;
    }
    return null;
}


export async function requestAuthorDeletion(authorId) {
    const books = await getAllBooks();
    const booksWithAuthor = books.filter(book => book.authorIds.includes(authorId));

    if (validateAuthorDeletion(booksWithAuthor)) {
        await deleteAuthor(authorId);
        alert("Author deleted successfully.");
    }
}


export async function requestBookDeletion(bookId) {
    const readings = await getAllReadings();
    const readingsWithBook = readings.filter(reading => reading.bookId === bookId);

    if (validateBookDeletion(readingsWithBook)) {
        await deleteReadingsWithBook(bookId);
        await deleteBook(bookId);
        alert("Book deleted successfully.");
    }
}


export async function requestReadingDeletion(readingId) {
    if (validateReadingDeletion()) {
        await deleteReading(readingId);
        alert("Reading deleted successfully.");
    }
}