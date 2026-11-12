import { addTheme } from "../modules/data-access.js";
import { loadBookForm, suggestTag } from "../modules/rendering.js";

document.addEventListener("DOMContentLoaded", () => {
    const tagInput = document.getElementById("tag-input");
    const addThemeButton = document.getElementById("add-new-theme");
    
    loadBookForm();

    tagInput.addEventListener("input", () => {
        suggestTag();
    });

    addThemeButton.addEventListener("click", () => {
        addTheme();
    });
});
