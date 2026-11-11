import {updateReadingForm} from "../modules/rendering.js";

const statusSelect = document.getElementById("reading-status");

document.addEventListener("DOMContentLoaded", () => {
    updateReadingForm();
});

statusSelect.addEventListener("change", () => {
    updateReadingForm();
});