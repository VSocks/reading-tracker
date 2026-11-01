const nationalitySelect = document.getElementById("author-nationality");
const resetButton = document.getElementById("reset-data");
const clearButton = document.getElementById("clear-data");
const getButton = document.getElementById("get-data");
const addAuthorButton = document.getElementById("add-author");

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


function addAuthor() {
    const authorId = JSON.parse(localStorage.getItem("authors")).findLastIndex(author => author.id) + 1;
    const authorName = document.getElementById("author-name").value;
    const birthDate = document.getElementById("birth-date").value;
    const deathDate = document.getElementById("death-date").value;
    const nationality = nationalitySelect.value;

    if (!authorName) {
        alert("Please enter the author's name.");
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
                if (key === "countries") {
                    value.forEach(country => {
                        const option = document.createElement("option");
                        option.value = country.id;
                        option.textContent = country.name;
                        nationalitySelect.appendChild(option);
                    });
                }
            }
        })
        .catch(error => {
            console.error("Error fetching seed.json: ", error);
        });
}