const socket = io();
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages');

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

document.getElementById('sendButton').addEventListener('click', () => {
  sendMessage();
});

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.emit('message', message);
    messageInput.value = '';
  }
}

socket.on('message', (message) => {
  const li = document.createElement('li');

  const parts = message.split(' => ');
  if (parts.length === 2) {
    li.textContent = `${parts[0]}: ${parts[1]}`;
  } else {
    li.textContent = message;
  }

  messagesContainer.appendChild(li);

  // Scroll hacia abajo para mostrar el último mensaje
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
