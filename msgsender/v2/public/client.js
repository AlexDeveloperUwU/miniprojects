const socket = io();
const messageInput = document.getElementById("message");
const messagesContainer = document.getElementById("messages");

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

document.getElementById("sendButton").addEventListener("click", () => {
  sendMessage();
});

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.emit("message", message);
    messageInput.value = "";
  }
}

socket.on("message", (message) => {
  const li = document.createElement("li");

  const parts = message.split(" => ");
  if (parts.length === 2) {
    const username = parts[0];
    const messageText = parts[1];

    const messageHTML = `<b>${username} =></b> ${messageText}`;
    li.innerHTML = messageHTML;
  } else {
    li.textContent = message;
  }

  messagesContainer.appendChild(li);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  const notificationSound = document.getElementById("notificationSound");
  notificationSound.play();
});
