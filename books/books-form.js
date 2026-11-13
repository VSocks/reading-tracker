import { addTheme } from "../modules/data-access.js";
import { loadBookForm, suggestTag } from "../modules/rendering.js";

document.addEventListener("DOMContentLoaded", async () => {
    const tagInput = document.getElementById("tag-input");
    const addThemeButton = document.getElementById("add-new-theme");
    
    await loadBookForm();

    tagInput.addEventListener("input", async () => {
        await suggestTag();
    });

    addThemeButton.addEventListener("click", async () => {
        await addTheme();
    });
});
