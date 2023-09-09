
const roomName = JSON.parse(
    document.getElementById('room_name').textContent
    );

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/'
    + roomName
    + '/'
    );

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#chat-log').value += (data.message + "\n");


};

chatSocket.onclose = function(e) {
console.error("Сокет чата неожиданно закрылся");


};

document.querySelector("#chat-message-input").focus();
document.querySelector("#chat-message-input").onkeyup = function(e) {
    if (e.key == "Enter") {
        document.querySelector("#chat-message-send").click();

    }

};

document.querySelector("#chat-message-send").onclick = function(e) {
    const messageInputDom = document.querySelector("#chat-message-input");
    const message = messageInputDom.value;  
    chatSocket.send(JSON.stringify({
        "message":message 
    }));
    messageInputDom.value = '';
};

