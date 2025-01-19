document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const buttons = document.querySelectorAll(".header button");

    // Function to load content dynamically
    async function loadPage(page) {
        try {
            const response = await fetch(`templates/${page}.html`);
            if (!response.ok) throw new Error("Page not found");
            const html = await response.text();
            content.innerHTML = html;
        } catch (error) {
            content.innerHTML = "<p>Sorry, this page could not be loaded.</p>";
        }
    }

    // Event listeners for navigation buttons
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("data-page");
            loadPage(page);
        });
    });
});
