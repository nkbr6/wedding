document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const buttons = document.querySelectorAll(".header button");

    // Function to load content dynamically
    async function loadPage(page) {
        try {
            const response = await fetch(`${page}`);
            if (!response.ok) throw new Error("Page not found");
            const html = await response.text();
            content.innerHTML = html;

            // Update the active button
            updateActiveButton(page);
        } catch (error) {
            content.innerHTML = "<p>Sorry, this page could not be loaded.</p>";
        }
    }

    // Function to update the active button
    function updateActiveButton(page) {
        // Remove the 'active' class from all buttons
        buttons.forEach(button => button.classList.remove("active"));

        // Add the 'active' class to the button that matches the current page
        buttons.forEach(button => {
            if (button.getAttribute("data-page") === page) {
                button.classList.add("active");
            }
        });
    }

    // Event listeners for navigation buttons
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("data-page");
            page === "index" ? window.location.href = "/" : loadPage(page);
        });
    });

    // Set the initial active button based on the current URL
    const initialPage = window.location.pathname.split('/').pop() || 'index';
    updateActiveButton(initialPage);
});

// document.addEventListener('scroll', function () {
//     const body = document.body;
//     const scrollY = window.scrollY;
//     const viewportHeight = window.innerHeight;
//     const pageHeight = document.documentElement.scrollHeight;

//     // Hide the top background image when scrolling down
//     if (scrollY > 50) { // Reduced threshold to 50px
//         body.classList.add('hide-top-bg');
//     } else {
//         body.classList.remove('hide-top-bg');
//     }

//     // Show the bottom background image when near the bottom of the page
//     const bottomOffset = pageHeight - (scrollY + viewportHeight);
//     if (bottomOffset < 50) { // Reduced threshold to 50px
//         body.classList.add('show-bottom-bg');
//     } else {
//         body.classList.remove('show-bottom-bg');
//     }
// });