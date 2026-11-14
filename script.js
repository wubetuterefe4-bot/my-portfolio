
// ==================================
// 1. DARK MODE
// ==================================

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀️ Light Mode";
    } else {
        themeButton.textContent = "🌙 Dark Mode";
    }

});


// ==================================
// 2. MOBILE MENU
// ==================================

const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }

});


// Close menu after clicking a link

document.querySelectorAll("#nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");
        menuButton.textContent = "☰";

    });

});


// ==================================
// 3. CONTACT FORM - BACKEND
// ==================================

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const status = document.getElementById("form-status");

    try {

        const response = await fetch("http://localhost:3000/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })

        });

        const result = await response.json();

        status.textContent = result.message;

        if (response.ok) {
            contactForm.reset();
        }

    } catch (error) {

        status.textContent = "Could not connect to the server!";

        console.error("Error:", error);

    }

});
