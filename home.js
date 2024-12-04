// Add new channel logic
document.getElementById("addChannel").addEventListener("click", () => {
    const channelName = prompt("Enter new channel name:");
    if (channelName) {
        const newChannel = document.createElement("li");
        newChannel.textContent = `# ${channelName}`;
        document.querySelector(".channel-list").appendChild(newChannel);
        alert(`${channelName} channel added!`);
    }
});

// Simulate story click
document.querySelectorAll(".story").forEach((story) => {
    story.addEventListener("click", () => {
        alert("Viewing story...");
    });
});

// Fetch feed posts from the server
async function fetchPosts() {
    try {
        const response = await fetch("/api/posts");
        const posts = await response.json();
        const postSection = document.querySelector(".posts");
        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `<h3>@${post.username}</h3><p>${post.content}</p>`;
            postSection.appendChild(postElement);
        });
    } catch (err) {
        console.error("Error fetching posts:", err);
    }
}

fetchPosts();

// Submit a new post
document.querySelector(".post-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = document.querySelector("#newPostContent").value;
    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });
        if (response.ok) {
            alert("Post submitted!");
            document.querySelector("#newPostContent").value = "";
        }
    } catch (err) {
        console.error("Error submitting post:", err);
    }
});
