document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    // Navigation between pages
    const registerPage = document.getElementById("registerPage");
    const loginPage = document.getElementById("loginPage");
    const homePage = document.getElementById("homePage");

    const goToLogin = document.getElementById("goToLogin");
    const goToRegister = document.getElementById("goToRegister");
    const logoutButton = document.getElementById("logoutButton");

    const registerButton = document.getElementById("registerButton");
    const loginButton = document.getElementById("loginButton");

    goToLogin.addEventListener("click", () => {
        registerPage.classList.add("hidden");
        loginPage.classList.remove("hidden");
    });

    goToRegister.addEventListener("click", () => {
        loginPage.classList.add("hidden");
        registerPage.classList.remove("hidden");
    });

    logoutButton.addEventListener("click", () => {
        homePage.classList.add("hidden");
        loginPage.classList.remove("hidden");
        localStorage.removeItem("username");
    });

    // Register
    registerButton.addEventListener("click", async () => {
        const username = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value.trim();

        if (username && email && password) {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                alert("Registration successful!");
                registerPage.classList.add("hidden");
                loginPage.classList.remove("hidden");
            } else {
                alert("Error: Registration failed.");
            }
        }
    });

    // Login
    loginButton.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (email && password) {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const username = await response.text();
                localStorage.setItem("username", username);
                loginPage.classList.add("hidden");
                homePage.classList.remove("hidden");
                loadStories();
                loadFeed();
            } else {
                alert("Error: Login failed.");
            }
        }
    });

    // Stories
    const storyInput = document.getElementById("storyInput");
    const addStoryButton = document.getElementById("addStory");
    const storyList = document.getElementById("storyList");

    addStoryButton.addEventListener("click", async () => {
        const content = storyInput.value.trim();
        if (content) {
            await fetch("/story", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: localStorage.getItem("username"), content }),
            });
            storyInput.value = "";
            loadStories();
        }
    });

    async function loadStories() {
        const response = await fetch("/stories");
        const stories = await response.json();
        storyList.innerHTML = stories.map(s => `<div>${s.username}: ${s.content}</div>`).join("");
    }

    // Feed
    const postInput = document.getElementById("postInput");
    const addPostButton = document.getElementById("addPost");
    const postList = document.getElementById("postList");

    addPostButton.addEventListener("click", async () => {
        const content = postInput.value.trim();
        if (content) {
            await fetch("/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: localStorage.getItem("username"), content }),
            });
            postInput.value = "";
            loadFeed();
        }
    });

    async function loadFeed() {
        const response = await fetch("/feed");
        const posts = await response.json();
        postList.innerHTML = posts.map(p => `<div>${p.username}: ${p.content}</div>`).join("");
    }

    // Chat
    const chatInput = document.getElementById("chatInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatMessages = document.getElementById("chatMessages");
    const pools = document.getElementById("pools");

    let currentPool = "General";

    pools.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            currentPool = e.target.dataset.pool;
            socket.emit("joinPool", currentPool);
            loadMessages();
        }
    });

    sendMessageButton.addEventListener("click", () => {
        const text = chatInput.value.trim();
        if (text) {
            socket.emit("sendMessage", { pool: currentPool, username: localStorage.getItem("username"), text });
            chatInput.value = "";
        }
    });

    socket.on("receiveMessage", (message) => {
        chatMessages.innerHTML += `<div>${message.username}: ${message.text}</div>`;
    });

    async function loadMessages() {
        const response = await fetch(`/messages?pool=${currentPool}`);
        const messages = await response.json();
        chatMessages.innerHTML = messages.map(m => `<div>${m.username}: ${m.text}</div>`).join("");
    }
});
