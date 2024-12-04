document.addEventListener("DOMContentLoaded", () => {
    const authSection = document.getElementById("auth-section");
    const dashboardSection = document.getElementById("dashboard-section");
    const displayName = document.getElementById("displayName");
    const poolsList = document.getElementById("poolsList");

    const users = {};
    const pools = {};

    function switchToDashboard(username) {
        authSection.style.display = "none";
        dashboardSection.style.display = "block";
        displayName.textContent = username;
        loadPools(username);
    }

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

    document.getElementById("registerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementBy
