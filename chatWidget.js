var ChatWidget = /** @class */ (function () {
    function ChatWidget() {
        var _this = this;
        var chatWidget = document.createElement("div");
        chatWidget.id = "chat-widget";
        chatWidget.style.position = "fixed";
        chatWidget.style.bottom = "20px";
        chatWidget.style.right = "20px";
        chatWidget.style.zIndex = "1000";
        chatWidget.innerHTML = "\n        <div id=\"chat-body\" style=\"flex-direction: column-reverse; display: none; position: absolute; bottom: 60px; right: 0; overflow-y: auto; width: 250px; height: 350px;\n        background: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.2); padding: 10px; \">\n          <div id=\"input-container\" style=\"display: flex; align-items: center;\">\n            <input type=\"text\" id=\"chat-user-input\" placeholder=\"Type your message...\" style=\"flex: 1; padding: 5px; margin-right: 10px;\">\n            <button id=\"chat-send-btn\" style=\"padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;\">Send</button>\n          </div>\n          <div style=\"flex-direction: column; display: flex; \" id=\"chat-messages\"></div>\n        </div>\n    ";
        document.body.appendChild(chatWidget);
        var chatBody = chatWidget.querySelector("#chat-body");
        var sendButton = chatWidget.querySelector("#chat-send-btn");
        var userInput = chatWidget.querySelector("#chat-user-input");
        var chatMessages = chatWidget.querySelector("#chat-messages");
        sendButton.addEventListener("click", function () {
            var message = userInput.value;
            _this.sendMessage(message, true);
            userInput.value = "";
            _this.sendMessage("hi,we'll be with you right away!", false);
        });
        var icon = document.createElement("img");
        icon.src = "https://chat-widget-ts.vercel.app/chat.png";
        icon.alt = "chat.png";
        icon.style.cursor = "pointer";
        icon.addEventListener("click", function () {
            chatBody.style.display =
                chatBody.style.display === "none" ? "flex" : "none";
        });
        chatWidget.appendChild(icon);
    }
    ChatWidget.prototype.sendMessage = function (message, sentByUser) {
        var chatMessages = document.getElementById("chat-messages");
        var messageContainer = document.createElement("div");
        messageContainer.style.marginBottom = "10px";
        messageContainer.style.padding = "10px";
        messageContainer.style.borderRadius = "5px";
        messageContainer.style.maxWidth = "80%";
        if (sentByUser) {
            messageContainer.style.backgroundColor = "#30a4f8";
            messageContainer.style.color = "white";
            messageContainer.style.alignSelf = "flex-start";
        }
        else {
            messageContainer.style.backgroundColor = "#f2f2f2";
            messageContainer.style.color = "#333";
            messageContainer.style.alignSelf = "flex-end";
        }
        messageContainer.textContent = message;
        if (chatMessages)
            chatMessages.appendChild(messageContainer);
    };
    return ChatWidget;
}());
if (document.currentScript) {
    new ChatWidget();
}
