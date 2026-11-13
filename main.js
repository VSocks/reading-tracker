import { fetchData } from "./modules/data-access.js";

const resetButton = document.getElementById("reset-data");
const clearButton = document.getElementById("clear-data");
const getButton = document.getElementById("get-data");
//
//document.addEventListener("DOMContentLoaded", () => {
 //   fetchData();
//});

resetButton.addEventListener("click", async () => {
    localStorage.clear();
    await fetchData();
    alert("Data has been reset.");
});

clearButton.addEventListener("click", () => {
    localStorage.clear();
    alert("All data has been cleared.");
});

getButton.addEventListener("click", async () => {
    await fetchData();
    alert("Data has been fetched and stored in localStorage.");
});