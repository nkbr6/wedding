document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const buttons = document.querySelectorAll(".header button");
    const daysRemainingElement = document.querySelector(".days-remaining");
    const bgBottom = document.querySelector(".bg-bottom");

    // Function to calculate and display the countdown
    function updateCountdown() {
        const targetDate = new Date("September 12, 2025 00:00:00").getTime(); // Target date
        const now = new Date().getTime(); // Current date
        const timeDifference = targetDate - now; // Difference in milliseconds

        // Calculate days remaining
        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // Update the "XXX days to go" text
        if (daysRemaining > 0) {
            daysRemainingElement.textContent = `${daysRemaining} days to go!`;
        } else if (daysRemaining === 0) {
            daysRemainingElement.textContent = "Today is the day!";
        } else {
            daysRemainingElement.textContent = "The event has passed!";
        }
    }

    // Function to update the position of .bg-bottom
    function updateBgBottomPosition() {
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        if (documentHeight <= viewportHeight) {
            // If document height is less than or equal to viewport height
            bgBottom.classList.add("fixed");
        } else {
            // If document height is greater than viewport height
            bgBottom.classList.remove("fixed");
        }
    }

    // Function to load content dynamically
    async function loadPage(page) {
        try {
            const response = await fetch(`${page}`);
            if (!response.ok) throw new Error("Page not found");
            const html = await response.text();
            content.innerHTML = html;

            // Update the active button
            updateActiveButton(page);

            // Update the position of .bg-bottom after loading new content
            updateBgBottomPosition();
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
            const externalUrl = button.getAttribute("data-url");

            if (externalUrl) {
                // Open the external URL in a new tab
                window.open(externalUrl, "_blank");
            } else {
                // Load the page dynamically
                page === "index" ? window.location.href = "/" : loadPage(page);
            }
        });
    });

    // Set the initial active button based on the current URL
    const initialPage = window.location.pathname.split('/').pop() || 'index';
    updateActiveButton(initialPage);

    // Update the countdown on page load
    updateCountdown();

    // Update the position of .bg-bottom on page load
    updateBgBottomPosition();

    // Update the position of .bg-bottom on window resize
    window.addEventListener("resize", updateBgBottomPosition);

    // Update the position of .bg-bottom on content changes (optional, if content is dynamically loaded)
    const observer = new MutationObserver(updateBgBottomPosition);
    observer.observe(document.body, { childList: true, subtree: true });
});