document.addEventListener("DOMContentLoaded", () => {
    const authSection = document.getElementById("auth-section");
    const dashboardSection = document.getElementById("dashboard-section");
    const displayName = document.getElementById("displayName");
    const poolsList = document.getElementById("poolsList");

    const users = {}; // To store user data locally (in-memory simulation)
    const pools = {}; // To store pools created by users

    // Switch between forms
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    document.getElementById("switchToLogin").addEventListener("click", () => {
        registerForm.classList.remove("active-form");
        loginForm.classList.add("active-form");
    });

    document.getElementById("switchToRegister").addEventListener("click", () => {
        loginForm.classList.remove("active-form");
        registerForm.classList.add("active-form");
    });

    // Switch from authentication to dashboard
    function switchToDashboard(username) {
        authSection.style.display = "none";
        dashboardSection.style.display = "block";
        displayName.textContent = username; // Show the logged-in user's name
        loadPools(username); // Load pools for the logged-in user
    }

    // Load pools for the logged-in user
    function loadPools(username) {
        poolsList.innerHTML = "";
        if (pools[username]) {
            pools[username].forEach(pool => {
                const li = document.createElement("li");
                li.textContent = pool;
                poolsList.appendChild(li);
            });
        }
    }

    // Handle user registration
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!users[email]) {
            // Store user data
            users[email] = { username, password, pools: [] };
            alert("Registration successful!");
            switchToDashboard(username); // Automatically log in after registration
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
            switchToDashboard(users[email].username);
        } else {
            alert("Invalid email or password.");
        }
    });

    // Handle pool creation
    document.getElementById("createPoolForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const poolName = document.getElementById("poolName").value.trim();
        const username = displayName.textContent;

        if (!pools[username]) {
            pools[username] = [];
        }

        pools[username].push(poolName); // Add the new pool
        loadPools(username); // Refresh the pools list
        alert(`Pool "${poolName}" created successfully!`);
    });
});
