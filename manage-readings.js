import {addReading} from "./modules/data-access.js";
import {displayReadings, updateReadingForm} from "./modules/rendering.js";


const addReadingButton = document.getElementById("add-reading");
const displayReadingsButton = document.getElementById("show-button-reading");


document.addEventListener("DOMContentLoaded", () => {
    updateReadingForm();
});

addReadingButton.addEventListener("click", (event) => {
    event.preventDefault();
    addReading();
});

displayReadingsButton.addEventListener("click", () => {
    displayReadings();
});