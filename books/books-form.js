import { addTheme } from "../modules/data-access.js";
import { addTag, loadBookForm, suggestTag } from "../modules/rendering.js";

document.addEventListener("DOMContentLoaded", async () => {
    const tagInput = document.getElementById("tag-input");
    const addThemeButton = document.getElementById("add-new-theme");
    
    await loadBookForm();

    tagInput.addEventListener("input", async () => {
        await suggestTag();
    });

    addThemeButton.addEventListener("click", async () => {
        let theme = await addTheme();
        addTag(theme.id, theme.name);
    });
});
