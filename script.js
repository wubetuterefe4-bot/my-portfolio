
// ==================================
// 1. CONTACT FORM
// ==================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const button = contactForm.querySelector("button");
        button.disabled = true;
        button.textContent = "Sending...";

        try {
            const response = await fetch("https://my-portfolio-1-a1sp.onrender.com/api/contact", {
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

            if (response.ok) {
                alert("Your message was sent successfully!");
                contactForm.reset();
            } else {
                alert(result.message || "Message could not be sent.");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Connection error. Please try again.");
        }

        button.disabled = false;
        button.textContent = "Send Message";
    });
}
