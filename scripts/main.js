document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 3000); // Loading spinner delay
});

function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const message = chatInput.value;

  if (message.trim()) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    chatMessages.appendChild(msgDiv);
    chatInput.value = "";
  }
}

function uploadBeReal() {
  alert("BeReal upload functionality coming soon!");
}
