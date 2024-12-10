// Form toggle functionality
document.getElementById("switchToRegister").addEventListener("click", function () {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
});

document.getElementById("switchToLogin").addEventListener("click", function () {
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
});

// Login and Register functionality
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email && password) {
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Please fill out all fields.");
    }
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (username && email && password) {
        alert("Registration successful! Please log in.");
        document.getElementById("switchToLogin").click();
    } else {
        alert("Please complete all fields.");
    }
});

// Chat functionality
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

// Pools functionality
document.getElementById("addPoolButton").addEventListener("click", function () {
    const newPool = prompt("Enter the name of the new pool:");
    if (newPool) {
        const poolsList = document.getElementById("poolsList");
        const newPoolItem = document.createElement("li");
        newPoolItem.className = "pool-item";
        newPoolItem.textContent = newPool;
        poolsList.appendChild(newPoolItem);
    }
});
