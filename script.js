document.getElementById("authForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if (username && email) {
        alert(`Welcome, ${username}!`);
        window.location.href = "home.html";
    } else {
        alert("Please fill out all fields.");
    }
});

// Chat interaction
document.querySelector('.chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const message = e.target.value.trim();
        if (message) {
            const chatContainer = document.querySelector('.chat-container');
            const newMessage = document.createElement('div');
            newMessage.classList.add('chat-message');
            newMessage.innerHTML = `<strong>You:</strong> ${message}`;
            chatContainer.appendChild(newMessage);
            e.target.value = '';
        }
    }
});
