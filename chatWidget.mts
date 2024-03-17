



class ChatWidget {
  constructor(placement: string) {
    const chatWidget = document.createElement("div");
    chatWidget.id = "chat-widget";
    chatWidget.style.position = "fixed";
    chatWidget.style.bottom = "20px";
    if(placement === "right"){
      chatWidget.style.right = "20px";
    }else{
      chatWidget.style.left = "20px";
    }
    chatWidget.style.zIndex = "1000";

    let chatBodyClass =`
      flex-direction: column-reverse; 
      display: none; 
      position: absolute; 
      bottom: 60px; 
      overflow-y: auto; 
      width: 250px; 
      height: 350px;
      background: #fff; 
      box-shadow: 0 0 10px rgba(0,0,0,0.2); 
      padding: 10px; `;

    if(placement === "right"){
      chatBodyClass += "right: 0;"
    }else{
      chatBodyClass += "left: 0;"
    }

    chatWidget.innerHTML = `
        <div id="chat-body" style="${chatBodyClass}">
          <div id="input-container" style="display: flex; align-items: center;">
            <input type="text" id="chat-user-input" placeholder="Type your message..." style="flex: 1; padding: 5px; margin-right: 10px;">
            <button id="chat-send-btn" style="padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;">Send</button>
          </div>
          <div style="flex-direction: column; display: flex; " id="chat-messages"></div>
        </div>
    `;

    document.body.appendChild(chatWidget);

    const chatBody: any = chatWidget.querySelector("#chat-body");
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
  let position: string  = "right"
  const scriptTag = document.querySelector('script[chat-data-position]') as HTMLScriptElement;
  if (scriptTag) {
    position = scriptTag.getAttribute('chat-data-position') || "right";
  }

  new ChatWidget(position);
}