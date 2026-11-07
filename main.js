import { fetchData } from "./modules/data-access.js";

const nationalitySelect = document.getElementById("author-nationality");
const resetButton = document.getElementById("reset-data");
const clearButton = document.getElementById("clear-data");
const getButton = document.getElementById("get-data");

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
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