document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    const users = {}; // Store user data locally

    // Switch to Login Form
    document.getElementById("switchToLogin").addEventListener("click", () => {
        registerForm.classList.remove("active-form");
        loginForm.classList.add("active-form");
    });

    // Switch to Register Form
    document.getElementById("switchToRegister").addEventListener("click", () => {
        loginForm.classList.remove("active-form");
        registerForm.classList.add("active-form");
    });

    // Handle user registration
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!users[email]) {
            users[email] = { username, password };
            alert("Registration successful!");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("User already exists. Please log in.");
        }
    });

    // Handle user login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (users[email] && users[email].password === password) {
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("Invalid email or password.");
        }
    });
});
