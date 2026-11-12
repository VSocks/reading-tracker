import { loadReadingForm, updateReadingForm } from "../modules/rendering.js";

const statusSelect = document.getElementById("reading-status");

document.addEventListener("DOMContentLoaded", () => {
    loadReadingForm();
});

statusSelect.addEventListener("change", () => {
    updateReadingForm();
});