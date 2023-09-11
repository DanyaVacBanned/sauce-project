
const roomName = JSON.parse(document.getElementById('room_name').textContent);
const userName = JSON.parse(document.getElementById("username").textContent);
const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/'
    + roomName
    + "/"
    );
      chatSocket.onopen = function (e) {
        console.log("The connection was setup successfully !");
      };
      chatSocket.onclose = function (e) {
        console.log("Something unexpected happened !");
      };

      // Enter input
      document.querySelector("#chat-message-input").focus();
      document.querySelector("#chat-message-input").onkeyup = function (e) {
        if (e.keyCode == 13) {
          document.querySelector("#chat-message-send").click();
        }
      };

      document.querySelector("#chat-message-send").onclick = function (e) {
        var messageInput = document.querySelector(
          "#chat-message-input"
        ).value;
        chatSocket.send(JSON.stringify({ message: messageInput, username : userName}));
      };
      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        var div = document.createElement("div");
        div.innerHTML = data.username + " : " + data.message;
        document.querySelector("#chat-message-input").value = "";
        document.querySelector("#chat-log").appendChild(div);
      };