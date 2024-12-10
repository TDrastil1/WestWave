document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    // Stories
    const storyList = document.getElementById("storyList");
    const storyInput = document.getElementById("storyInput");
    document.getElementById("addStory").addEventListener("click", async () => {
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
    const postList = document.getElementById("postList");
    const postInput = document.getElementById("postInput");
    document.getElementById("addPost").addEventListener("click", async () => {
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
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendMessage = document.getElementById("sendMessage");

    let currentPool = "General";

    document.getElementById("pools").addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            currentPool = e.target.getAttribute("data-pool");
            socket.emit("joinPool", currentPool);
            loadMessages();
        }
    });

    sendMessage.addEventListener("click", () => {
        const text = chatInput.value.trim();
        if (text) {
            socket.emit("sendMessage", {
                pool: currentPool,
                username: localStorage.getItem("username"),
                text,
            });
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

    // Initial Load
    loadStories();
    loadFeed();
});
