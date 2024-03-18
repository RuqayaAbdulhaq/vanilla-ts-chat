var ChatWidget = /** @class */ (function () {
    function ChatWidget(placement, widgetType) {
        this.phoneImg = "<img id=\"chat-header-icon\" src=\"https://chat-widget-ts.vercel.app/phone.png\"/>";
        this.sendImg = "<img  id=\"chat-header-icon\" src=\"https://chat-widget-ts.vercel.app/send.png\"/>";
        this.getInputWidget = function (display, type) {
            var inputWidget = "";
            var inputContainerStyle = "align-items: center;";
            var inputStyle = "flex: 1; padding: 5px; margin-right: 10px;";
            var sendBtnStyle = "padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;";
            switch (type) {
                case "chat":
                    inputWidget = "\n          <div id=\"input-container\" style=\"display: ".concat(display, "; ").concat(inputContainerStyle, "\">\n            <input type=\"text\" id=\"chat-user-input\" placeholder=\"Type your message...\" style=\"").concat(inputStyle, "\">\n            <button id=\"chat-send-btn\" style=\"").concat(sendBtnStyle, "\">Send</button>\n          </div>\n        ");
                    break;
                case "call":
                    inputWidget = "\n          <div id=\"input-container-call\" style=\"display: ".concat(display, "; ").concat(inputContainerStyle, "\">\n            <input type=\"text\" id=\"call-user-input\" placeholder=\"Phone or schedule..\" style=\"").concat(inputStyle, "\">\n            <button id=\"chat-call-btn\" style=\"").concat(sendBtnStyle, "\">Call</button>\n          </div>\n        ");
                    break;
                default:
                    break;
            }
            return inputWidget;
        };
        this.getIconWidget = function (type) {
            var icon = document.createElement("img");
            icon.src = "https://chat-widget-ts.vercel.app/".concat(type === "calling-small" ? "phone.png" : "chat.png");
            icon.alt = "chat.png";
            icon.id = "chat-widget-icon";
            icon.style.cursor = "pointer";
            return icon;
        };
        this.widgetType = widgetType;
        this.chatWidget = this.createChatWidget(placement, widgetType);
        document.body.appendChild(this.chatWidget);
        this.chatMessagesContainer = this.chatWidget.querySelector("#chat-messages");
        this.initializeEventListeners(widgetType);
    }
    ChatWidget.prototype.createChatWidget = function (placement, type) {
        var chatWidget = document.createElement("div");
        chatWidget.id = "chat-widget";
        chatWidget.style.cssText = "\n      position: fixed; bottom: 20px; ".concat(placement.includes("right") ? "right" : "left", ": 20px; \n      z-index: 1000;");
        chatWidget.innerHTML = this.getWidgetHTML(placement, type);
        var iconAtom = this.getIconWidget(type);
        chatWidget.appendChild(iconAtom);
        return chatWidget;
    };
    ChatWidget.prototype.getWidgetHTML = function (placement, type) {
        var baseChatBodyStyle = "\n      display: none; flex-direction: column-reverse; position: absolute; bottom: 60px; \n      width: 250px; height: 350px; background: #fff; \n      box-shadow: 0 0 10px rgba(0,0,0,0.2); padding: 10px; \n      right: ".concat(placement === 'bottom-right' ? '0' : 'auto', ";\n      left: ").concat(placement === 'bottom-left' ? '0' : 'auto', ";");
        var chatMessagesStyle = "flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;";
        var chatContainerStyle = "position: relative; flex-direction: column-reverse; display: flex; height: 90%;";
        var headerBtnStyle = "position: absolute; width: 100%; padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer; top: 0;";
        var messagesWidget = "<div style=\"".concat(chatMessagesStyle, "\" id=\"chat-messages\"></div>");
        // Conditionally render parts of the widget based on the widget type
        var widgetContent = '';
        if (this.widgetType !== 'calling-small') {
            switch (type) {
                case "text-option-call":
                    widgetContent = "\n          <div id=\"chat-body\" style=\"".concat(baseChatBodyStyle, "\">\n            ").concat(this.getInputWidget("none", "call"), "\n            ").concat(this.getInputWidget("flex", "chat"), "\n            <div id=\"chat-container\" style=\"").concat(chatContainerStyle, "\">\n              ").concat(messagesWidget, "\n              <button style=\"").concat(headerBtnStyle, "\" id=\"switch-widget-btn\">\n                ").concat(this.phoneImg, "\n              </button>\n            </div>\n          </div>\n          ");
                    break;
                case "text-only":
                    widgetContent = "\n          <div id=\"chat-body\" style=\"".concat(baseChatBodyStyle, "\">\n            ").concat(this.getInputWidget("flex", "chat"), "\n            <div id=\"chat-container\" style=\"").concat(chatContainerStyle, "\">\n              ").concat(messagesWidget, "\n            </div>\n          </div>\n          ");
                    break;
                case "call-option-text":
                    widgetContent = "\n            <div id=\"chat-body\" style=\"".concat(baseChatBodyStyle, "\">\n                ").concat(this.getInputWidget("flex", "call"), "\n                ").concat(this.getInputWidget("none", "chat"), "\n                <div id=\"chat-container\" style=\"").concat(chatContainerStyle, "\">\n                  ").concat(messagesWidget, "\n                  <button style=\"").concat(headerBtnStyle, "\" id=\"switch-widget-btn\">\n                    ").concat(this.sendImg, "\n                  </button>\n                </div>\n            </div>\n          ");
                    break;
                case "call-only":
                    widgetContent = "\n            <div id=\"chat-body\" style=\"".concat(baseChatBodyStyle, "\">\n              ").concat(this.getInputWidget("flex", "call"), "\n            </div>\n          ");
                default:
                    break;
            }
        }
        return widgetContent;
    };
    ChatWidget.prototype.initializeEventListeners = function (type) {
        var _this = this;
        this.chatWidget.addEventListener('click', function (event) {
            var target = event.target;
            if (target.id === 'chat-send-btn') {
                var chatInput = _this.chatWidget.querySelector('#chat-user-input');
                var message = chatInput.value;
                _this.sendMessage(message, true);
                chatInput.value = '';
                console.log(chatInput);
                _this.sendMessage("hi,we'll be with you right away!", false);
            }
            else if (target.id === 'chat-call-btn') {
                _this.initiateCall();
            }
            else if (target.id === 'switch-widget-btn' || target.id === 'chat-header-icon') {
                var switchBtn = document.querySelector("#switch-widget-btn");
                var chatInput = document.querySelector("#input-container");
                var callInput = document.querySelector("#input-container-call");
                var chatMessages = document.getElementById("chat-messages");
                if (chatInput.style.display !== "none") {
                    chatInput.style.display = "none";
                    chatMessages.innerHTML = "";
                    callInput.style.display = "flex";
                    if (switchBtn)
                        switchBtn.innerHTML = _this.sendImg;
                }
                else {
                    chatInput.style.display = "flex";
                    chatMessages.innerHTML = "";
                    callInput.style.display = "none";
                    if (switchBtn)
                        switchBtn.innerHTML = _this.phoneImg;
                }
                callInput.querySelector('#call-user-input').value = "";
                chatInput.querySelector('#chat-user-input').value = "";
            }
            else if (target.id === 'chat-widget-icon') {
                if (type === "calling-small") {
                    _this.initiateCall();
                }
                else {
                    var chatBody = document.querySelector("#chat-body");
                    if (chatBody) {
                        chatBody.style.display = chatBody.style.display === "none" ? "flex" : "none";
                    }
                }
            }
        });
    };
    ChatWidget.prototype.initiateCall = function () {
        alert("Initiating call...");
    };
    ChatWidget.prototype.sendMessage = function (message, sentByUser) {
        var messageContainer = document.createElement("div");
        messageContainer.style.cssText = "\n      margin-bottom: 10px; padding: 10px; border-radius: 5px; \n      max-width: 80%; background-color: ".concat(sentByUser ? '#30a4f8' : '#f2f2f2', "; color: ").concat(sentByUser ? 'white' : '#333', "; \n      align-self: ").concat(sentByUser ? 'flex-start' : 'flex-end', ";");
        messageContainer.textContent = message;
        this.chatMessagesContainer.appendChild(messageContainer);
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
