class ChatWidget {
  constructor(placement: string, widgetType: string) {
    this.widgetType = widgetType;
    const chatWidget = document.createElement("div");
    chatWidget.id = "chat-widget";
    chatWidget.style.position = "fixed";
    chatWidget.style.bottom = "20px";

    if (placement === "bottom-right") {
      chatWidget.style.right = "20px";
    } else {
      chatWidget.style.left = "20px";
    }
    chatWidget.style.zIndex = "1000";

    let chatBodyClass = `
      flex-direction: column-reverse; 
      display: none; 
      position: absolute; 
      bottom: 60px; 
       
      width: 250px; 
      height: 350px;
      background: #fff; 
      box-shadow: 0 0 10px rgba(0,0,0,0.2); 
      padding: 10px; `;

    if (placement === "bottom-right") {
      chatBodyClass += "right: 0;";
    } else {
      chatBodyClass += "left: 0;";
    }

    const phoneImg = `<img src="https://chat-widget-ts.vercel.app/phone.png"/>`;
    const sendImg = `<img src="https://chat-widget-ts.vercel.app/send.png"/>`;

    switch (widgetType) {
      case "text-option-call":
        chatWidget.innerHTML = `
            <div id="chat-body" style="${chatBodyClass}">
              <div id="input-container-call" style="display: none; align-items: center;">
              <input type="text" id="call-user-input" placeholder="Phone or schedule.." style="flex: 1; padding: 5px; margin-right: 10px;">
              <button id="chat-call-btn" style="padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;">Call</button>
            </div>
            <div id="input-container" style="display: flex; align-items: center;">
              <input type="text" id="chat-user-input" placeholder="Type your message..." style="flex: 1; padding: 5px; margin-right: 10px;">
              <button id="chat-send-btn" style="padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;">Send</button>
            </div>
            <div id="chat-container" style="position: relative; flex-direction: column-reverse; display: flex; height: 90%;">
              <div style="flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;" id="chat-messages"></div>
              <button style="position: absolute; width: 100%; padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer; top: 0;" id="switch-widget-btn">
                ${phoneImg}
              </button>
            </div>
          </div>
        `
        break;
      case "text-only":
        chatWidget.innerHTML = `
            <div id="chat-body" style="${chatBodyClass}">
            <div id="input-container" style="display: flex; align-items: center;">
              <input type="text" id="call-user-input" placeholder="Type your message..." style="flex: 1; padding: 5px; margin-right: 10px;">
              <button id="chat-send-btn" style="padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;">Send</button>
            </div>
            <div id="chat-container" style="position: relative; flex-direction: column-reverse; display: flex; height: 90%;">
              <div style="flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;" id="chat-messages"></div>
            </div>
          </div>
        `
        break;
      case "call-option-text":
        chatWidget.innerHTML = `
            <div id="chat-body" style="${chatBodyClass}">
              <div id="input-container-call" style="display: flex; align-items: center;">
              <input type="text" id="call-user-input" placeholder="Phone or schedule.." style="flex: 1; padding: 5px; margin-right: 10px;">
              <button id="chat-call-btn" style="padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;">Call</button>
            </div>
            <div id="input-container" style="display: none; align-items: center;">
              <input type="text" id="chat-user-input" placeholder="Type your message..." style="flex: 1; padding: 5px; margin-right: 10px;">
              <button id="chat-send-btn" style="padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;">Send</button>
            </div>
            <div id="chat-container" style="position: relative; flex-direction: column-reverse; display: flex; height: 90%;">
              <div style="flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;" id="chat-messages"></div>
              <button style="position: absolute; width: 100%; padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer; top: 0;" id="switch-widget-btn">
                ${sendImg}
              </button>
            </div>
          </div>
        `
        break;
      case "call-only":
        chatWidget.innerHTML = 
        `
            <div id="chat-body" style="${chatBodyClass}">
              <div id="input-container-call" style="display: flex; align-items: center;">
              <input type="text" id="call-user-input" placeholder="Phone or schedule.." style="flex: 1; padding: 5px; margin-right: 10px;">
              <button id="chat-call-btn" style="padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;">Call</button>
            </div>
            <div id="chat-container" style="position: relative; flex-direction: column-reverse; display: flex; height: 90%;">
              <div style="flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;" id="chat-messages"></div>
            </div>
          </div>
        `
        break;
      default:
        chatWidget.innerHTML = 
        `
            <div id="chat-body" style="${chatBodyClass}">
            <div id="chat-container" style="position: relative; flex-direction: column-reverse; display: flex; height: 90%;">
              <div style="flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;" id="chat-messages"></div>
            </div>
          </div>
        `
        break;
    }

    document.body.appendChild(chatWidget);

    const chatBody: any = chatWidget.querySelector("#chat-body");

    if(widgetType.includes("text")){
      const sendButton = chatWidget.querySelector(
        "#chat-send-btn"
      ) as HTMLButtonElement;
      const userInput = chatWidget.querySelector(
        "#chat-user-input"
      ) as HTMLInputElement;
      const chatMessages = chatWidget.querySelector("#chat-messages");
      sendButton.addEventListener("click", () => {
        const message = userInput.value;
        this.sendMessage(message, true);
        userInput.value = "";
        this.sendMessage("hi,we'll be with you right away!", false);
      });
    }
    
    if(widgetType.includes("call")){
      const callButton = document.getElementById("chat-call-btn");
      if (callButton) {
        callButton.addEventListener("click", () => {
          this.initiateCall();
        });
      }
    }

    if(widgetType.includes("option")){
      const switchButton = document.getElementById("switch-widget-btn");
      if (switchButton) {
        switchButton.addEventListener("click", () => {
          const chatInput: any = chatWidget.querySelector("#input-container");
          const callInput: any = chatWidget.querySelector("#input-container-call");
          const chatMessages: any = document.getElementById("chat-messages");
          if(chatInput.style.display !== "none"){
            chatInput.style.display = "none";
            chatMessages.innerHTML = "";
            callInput.style.display = "flex";
            switchButton.innerHTML = sendImg;
          }else{
            chatInput.style.display = "flex";
            chatMessages.innerHTML = "";
            callInput.style.display = "none";
            switchButton.innerHTML = phoneImg;
          }
        });
      }
    }

    const chatContainer: any = chatWidget.querySelector("#chat-container");

    const icon = document.createElement("img");
    icon.src = "https://chat-widget-ts.vercel.app/chat.png";
    icon.alt = "chat.png";
    icon.style.cursor = "pointer";
    icon.addEventListener("click", () => {
      chatBody.style.display =
        chatBody.style.display === "none" ? "flex" : "none";
    });

    chatWidget.appendChild(icon);
  }

  widgetType: string = "";

  initiateCall() {
    // Placeholder for call logic
    alert("Initiating call...");
  }

  sendMessage(message: string, sentByUser: boolean) {
    const chatMessages = document.getElementById("chat-messages");
    const messageContainer = document.createElement("div");
    messageContainer.style.marginBottom = "10px";
    messageContainer.style.padding = "10px";
    messageContainer.style.borderRadius = "5px";
    messageContainer.style.maxWidth = "80%";

    if (sentByUser) {
      messageContainer.style.backgroundColor = "#30a4f8";
      messageContainer.style.color = "white";
      messageContainer.style.alignSelf = "flex-start";
    } else {
      messageContainer.style.backgroundColor = "#f2f2f2";
      messageContainer.style.color = "#333";
      messageContainer.style.alignSelf = "flex-end";
    }

    messageContainer.textContent = message;
    if (chatMessages) chatMessages.appendChild(messageContainer);
  }
}

if (document.currentScript) {
  let position: string = "bottom-right";
  let widgetType: string = "text-only";
  const scriptTag = document.querySelector(
    "script[chat-data-position]"
  ) as HTMLScriptElement;
  
  if (scriptTag) {
    position = scriptTag.getAttribute("chat-data-position") || "bottom-right";
    widgetType = scriptTag.getAttribute("widget-type") || "text-only";
  }

  new ChatWidget(position, widgetType);
}
