
require("dotenv").config({
    path: require("path").join(__dirname, ".env")
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("My Portfolio Backend is Running!");
});

// Test route
app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKS!");
});

// Contact form route using Resend API
app.post("/api/contact", async (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RECEIVER_EMAIL) {
        return res.status(500).json({
            success: false,
            message: "Email configuration is missing."
        });
    }

    try {

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "My Portfolio <onboarding@resend.dev>",
                to: [process.env.RECEIVER_EMAIL],
                reply_to: email,
                subject: "New Message From My Portfolio",
                text: `
New Contact Message

Name: ${name}
Email: ${email}

Message:
${message}
                `
            })
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Resend Error:", result);

            return res.status(500).json({
                success: false,
                message: "Email could not be sent."
            });
        }

        console.log("Email sent successfully!", result.id);

        res.json({
            success: true,
            message: "Your message was sent successfully!"
        });

    } catch (error) {

        console.error("Email Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Connection error. Please try again later."
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
