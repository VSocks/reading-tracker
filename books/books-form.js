import { addTheme } from "../modules/data-access.js";
import { updateBookForm, suggestTag } from "../modules/rendering.js";

document.addEventListener("DOMContentLoaded", () => {
    const tagInput = document.getElementById("tag-input");
    const addThemeButton = document.getElementById("add-new-theme");
    
    updateBookForm();

    tagInput.addEventListener("input", () => {
        suggestTag();
    });

    addThemeButton.addEventListener("click", () => {
        addTheme();
    });
});
