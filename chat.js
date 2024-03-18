var ChatWidget = /** @class */ (function () {
    function ChatWidget(placement, widgetType) {
        var _this = this;
        this.widgetType = "";
        this.widgetType = widgetType;
        var chatWidget = document.createElement("div");
        chatWidget.id = "chat-widget";
        chatWidget.style.position = "fixed";
        chatWidget.style.bottom = "20px";
        if (placement === "bottom-right") {
            chatWidget.style.right = "20px";
        }
        else {
            chatWidget.style.left = "20px";
        }
        chatWidget.style.zIndex = "1000";
        var chatBodyClass = "\n      flex-direction: column-reverse; \n      display: none; \n      position: absolute; \n      bottom: 60px; \n       \n      width: 250px; \n      height: 350px;\n      background: #fff; \n      box-shadow: 0 0 10px rgba(0,0,0,0.2); \n      padding: 10px; ";
        if (placement === "bottom-right") {
            chatBodyClass += "right: 0;";
        }
        else {
            chatBodyClass += "left: 0;";
        }
        var phoneImg = "<img src=\"https://chat-widget-ts.vercel.app/phone.png\"/>";
        var sendImg = "<img src=\"https://chat-widget-ts.vercel.app/send.png\"/>";
        switch (widgetType) {
            case "text-option-call":
                chatWidget.innerHTML = "\n            <div id=\"chat-body\" style=\"".concat(chatBodyClass, "\">\n              <div id=\"input-container-call\" style=\"display: none; align-items: center;\">\n              <input type=\"text\" id=\"call-user-input\" placeholder=\"Phone or schedule..\" style=\"flex: 1; padding: 5px; margin-right: 10px;\">\n              <button id=\"chat-call-btn\" style=\"padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;\">Call</button>\n            </div>\n            <div id=\"input-container\" style=\"display: flex; align-items: center;\">\n              <input type=\"text\" id=\"chat-user-input\" placeholder=\"Type your message...\" style=\"flex: 1; padding: 5px; margin-right: 10px;\">\n              <button id=\"chat-send-btn\" style=\"padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;\">Send</button>\n            </div>\n            <div id=\"chat-container\" style=\"position: relative; flex-direction: column-reverse; display: flex; height: 90%;\">\n              <div style=\"flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;\" id=\"chat-messages\"></div>\n              <button style=\"position: absolute; width: 100%; padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer; top: 0;\" id=\"switch-widget-btn\">\n                ").concat(phoneImg, "\n              </button>\n            </div>\n          </div>\n        ");
                break;
            case "text-only":
                chatWidget.innerHTML = "\n            <div id=\"chat-body\" style=\"".concat(chatBodyClass, "\">\n            <div id=\"input-container\" style=\"display: flex; align-items: center;\">\n              <input type=\"text\" id=\"call-user-input\" placeholder=\"Type your message...\" style=\"flex: 1; padding: 5px; margin-right: 10px;\">\n              <button id=\"chat-send-btn\" style=\"padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;\">Send</button>\n            </div>\n            <div id=\"chat-container\" style=\"position: relative; flex-direction: column-reverse; display: flex; height: 90%;\">\n              <div style=\"flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;\" id=\"chat-messages\"></div>\n            </div>\n          </div>\n        ");
                break;
            case "call-option-text":
                chatWidget.innerHTML = "\n            <div id=\"chat-body\" style=\"".concat(chatBodyClass, "\">\n              <div id=\"input-container-call\" style=\"display: flex; align-items: center;\">\n              <input type=\"text\" id=\"call-user-input\" placeholder=\"Phone or schedule..\" style=\"flex: 1; padding: 5px; margin-right: 10px;\">\n              <button id=\"chat-call-btn\" style=\"padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;\">Call</button>\n            </div>\n            <div id=\"input-container\" style=\"display: none; align-items: center;\">\n              <input type=\"text\" id=\"chat-user-input\" placeholder=\"Type your message...\" style=\"flex: 1; padding: 5px; margin-right: 10px;\">\n              <button id=\"chat-send-btn\" style=\"padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;\">Send</button>\n            </div>\n            <div id=\"chat-container\" style=\"position: relative; flex-direction: column-reverse; display: flex; height: 90%;\">\n              <div style=\"flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;\" id=\"chat-messages\"></div>\n              <button style=\"position: absolute; width: 100%; padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer; top: 0;\" id=\"switch-widget-btn\">\n                ").concat(sendImg, "\n              </button>\n            </div>\n          </div>\n        ");
                break;
            case "call-only":
                chatWidget.innerHTML =
                    "\n            <div id=\"chat-body\" style=\"".concat(chatBodyClass, "\">\n              <div id=\"input-container-call\" style=\"display: flex; align-items: center;\">\n              <input type=\"text\" id=\"call-user-input\" placeholder=\"Phone or schedule..\" style=\"flex: 1; padding: 5px; margin-right: 10px;\">\n              <button id=\"chat-call-btn\" style=\"padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;\">Call</button>\n            </div>\n            <div id=\"chat-container\" style=\"position: relative; flex-direction: column-reverse; display: flex; height: 90%;\">\n              <div style=\"flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;\" id=\"chat-messages\"></div>\n            </div>\n          </div>\n        ");
                break;
            case "calling-small":
                chatWidget.innerHTML = "";
                break;
            default:
                chatWidget.innerHTML =
                    "\n            <div id=\"chat-body\" style=\"".concat(chatBodyClass, "\">\n            <div id=\"chat-container\" style=\"position: relative; flex-direction: column-reverse; display: flex; height: 90%;\">\n              <div style=\"flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;\" id=\"chat-messages\"></div>\n            </div>\n          </div>\n        ");
                break;
        }
        document.body.appendChild(chatWidget);
        var chatBody = chatWidget.querySelector("#chat-body");
        if (widgetType.includes("text")) {
            var sendButton = chatWidget.querySelector("#chat-send-btn");
            var userInput_1 = chatWidget.querySelector("#chat-user-input");
            var chatMessages = chatWidget.querySelector("#chat-messages");
            sendButton.addEventListener("click", function () {
                var message = userInput_1.value;
                _this.sendMessage(message, true);
                userInput_1.value = "";
                _this.sendMessage("hi,we'll be with you right away!", false);
            });
        }
        if (widgetType.includes("call")) {
            var callButton = document.getElementById("chat-call-btn");
            if (callButton) {
                callButton.addEventListener("click", function () {
                    _this.initiateCall();
                });
            }
        }
        if (widgetType.includes("option")) {
            var switchButton_1 = document.getElementById("switch-widget-btn");
            if (switchButton_1) {
                switchButton_1.addEventListener("click", function () {
                    var chatInput = chatWidget.querySelector("#input-container");
                    var callInput = chatWidget.querySelector("#input-container-call");
                    var chatMessages = document.getElementById("chat-messages");
                    if (chatInput.style.display !== "none") {
                        chatInput.style.display = "none";
                        chatMessages.innerHTML = "";
                        callInput.style.display = "flex";
                        switchButton_1.innerHTML = sendImg;
                    }
                    else {
                        chatInput.style.display = "flex";
                        chatMessages.innerHTML = "";
                        callInput.style.display = "none";
                        switchButton_1.innerHTML = phoneImg;
                    }
                });
            }
        }
        var chatContainer = chatWidget.querySelector("#chat-container");
        var icon = document.createElement("img");
        icon.src = "https://chat-widget-ts.vercel.app/".concat(widgetType === "calling-small" ? "phone.png" : "chat.png");
        icon.alt = "chat.png";
        icon.style.cursor = "pointer";
        icon.addEventListener("click", function () {
            if (widgetType === "calling-small") {
                _this.initiateCall();
            }
            else {
                chatBody.style.display =
                    chatBody.style.display === "none" ? "flex" : "none";
            }
        });
        chatWidget.appendChild(icon);
    }
    ChatWidget.prototype.initiateCall = function () {
        // Placeholder for call logic
        alert("Initiating call...");
    };
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
    var position = "bottom-right";
    var widgetType = "text-only";
    var scriptTag = document.querySelector("script[chat-data-position]");
    if (scriptTag) {
        position = scriptTag.getAttribute("chat-data-position") || "bottom-right";
        widgetType = scriptTag.getAttribute("widget-type") || "text-only";
    }
    new ChatWidget(position, widgetType);
}
