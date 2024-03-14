var ChatWidget = /** @class */ (function () {
    function ChatWidget() {
        var _this = this;
        var chatWidget = document.createElement("div");
        chatWidget.id = "chat-widget";
        chatWidget.style.position = "absolute";
        chatWidget.style.bottom = "20px"; // Adjust as needed
        chatWidget.style.right = "20px"; // Adjust as needed
        chatWidget.style.backgroundColor = "#ffffff";
        chatWidget.style.border = "1px solid #ccc";
        chatWidget.style.padding = "10px";
        chatWidget.style.display = "none"; // Initially hide the widget
        chatWidget.innerHTML = "\n        <div id=\"chat-header\">\n          <div id=\"chat-icon\" style=\"cursor: pointer;\">&#x1F4AC;</div>\n          <div id=\"chat-title\">Chat Widget</div>\n        </div>\n        <div id=\"chat-body\" style=\"display: none;\">\n          <div id=\"chat-messages\"></div>\n          <input type=\"text\" id=\"user-input\" placeholder=\"Type your message...\"/>\n          <button id=\"send-btn\">Send</button>\n        </div>\n      ";
        document.body.appendChild(chatWidget);
        var chatIcon = chatWidget.querySelector("#chat-icon");
        var chatBody = chatWidget.querySelector("#chat-body");
        var sendButton = chatWidget.querySelector("#send-btn");
        var userInput = chatWidget.querySelector("#user-input");
        var chatMessages = chatWidget.querySelector("#chat-messages");
        chatIcon.addEventListener("click", function () {
            chatBody.style.display =
                chatBody.style.display === "none" ? "block" : "none";
        });
        sendButton.addEventListener("click", function () {
            var message = userInput.value;
            _this.sendMessage(message);
            userInput.value = "";
        });
    }
    ChatWidget.prototype.sendMessage = function (message) {
        console.log("Sending message:", message);
        var chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML += "<div>".concat(message, "</div>");
    };
    return ChatWidget;
}());
// Initialize ChatWidget if called via script tag
if (document.currentScript) {
    new ChatWidget();
}
