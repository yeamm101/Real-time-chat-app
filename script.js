const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messagecont = document.getElementById('message-container')

const name = prompt('What is your name?');
console.log('You have joined the Visgram')
socket.emit('new-user', name)
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
})

socket.on("user-connected", (name) => {
  appendMessage(`${name} has connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} has disconnected`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
  const messageElementSender = document.createElement("div");
  messageElementSender.innerText = message;
  messageContainer.append(messageElementSender);
  messageElementSender.className = "my-div";
}