const nationalitySelect = document.getElementById("author-nationality");

document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("reset-data");
    const clearButton = document.getElementById("clear-data");
    const getButton = document.getElementById("get-data");

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
});


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
                        option.value = country.name;
                        option.textContent = country.name;
                        nationalitySelect.appendChild(option);
                    });
                }
            }
        })
        .catch(error => {
            console.error("Error fetching seed.json: ", error);
        });
};