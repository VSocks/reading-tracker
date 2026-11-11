import {addReading} from "../modules/data-access.js";
import {updateReadingForm} from "../modules/rendering.js";

const addReadingButton = document.getElementById("add-reading");
const statusSelect = document.getElementById("reading-status");

document.addEventListener("DOMContentLoaded", () => {
    updateReadingForm();
});

addReadingButton.addEventListener("click", (event) => {
    event.preventDefault();
    addReading();
});

statusSelect.addEventListener("change", () => {
    updateReadingForm();
});