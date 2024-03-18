class ChatWidget {
  private widgetType: string;
  private chatWidget: HTMLElement;
  private chatMessagesContainer: HTMLElement;
  private phoneImg = `<img id="chat-header-icon" src="https://chat-widget-ts.vercel.app/phone.png"/>`;
  private sendImg = `<img  id="chat-header-icon" src="https://chat-widget-ts.vercel.app/send.png"/>`;
  
  constructor(placement: string, widgetType: string) {
    this.widgetType = widgetType;
    this.chatWidget = this.createChatWidget(placement, widgetType);
    document.body.appendChild(this.chatWidget);
    this.chatMessagesContainer = this.chatWidget.querySelector("#chat-messages")!;
    this.initializeEventListeners(widgetType);
  }

  private createChatWidget(placement: string, type:string): HTMLElement {
    const chatWidget = document.createElement("div");
    chatWidget.id = "chat-widget";
    chatWidget.style.cssText = `
      position: fixed; bottom: 20px; ${placement.includes("right")? "right" : "left"}: 20px; 
      z-index: 1000;`;

    chatWidget.innerHTML = this.getWidgetHTML(placement,type);
    const iconAtom = this.getIconWidget(type);
    chatWidget.appendChild(iconAtom);
    return chatWidget;
  }

  private getWidgetHTML(placement: string, type: string): string {
    const baseChatBodyStyle = `
      display: none; flex-direction: column-reverse; position: absolute; bottom: 60px; 
      width: 250px; height: 350px; background: #fff; 
      box-shadow: 0 0 10px rgba(0,0,0,0.2); padding: 10px; 
      right: ${placement === 'bottom-right' ? '0' : 'auto'};
      left: ${placement === 'bottom-left' ? '0' : 'auto'};`;

    const chatMessagesStyle = `flex-direction: column; display: flex; overflow-y: auto; max-height: 80%;`
    const chatContainerStyle = `position: relative; flex-direction: column-reverse; display: flex; height: 90%;`;
    const headerBtnStyle = `position: absolute; width: 100%; padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer; top: 0;`;

    const messagesWidget = `<div style="${chatMessagesStyle}" id="chat-messages"></div>`

    // Conditionally render parts of the widget based on the widget type
    let widgetContent = '';
    if (this.widgetType !== 'calling-small') {
      switch (type) {
        case "text-option-call":
          widgetContent = `
          <div id="chat-body" style="${baseChatBodyStyle}">
            ${this.getInputWidget("none","call")}
            ${this.getInputWidget("flex","chat")}
            <div id="chat-container" style="${chatContainerStyle}">
              ${messagesWidget}
              <button style="${headerBtnStyle}" id="switch-widget-btn">
                ${this.phoneImg}
              </button>
            </div>
          </div>
          `
          break;
        case "text-only":
          widgetContent = `
          <div id="chat-body" style="${baseChatBodyStyle}">
            ${this.getInputWidget("flex","chat")}
            <div id="chat-container" style="${chatContainerStyle}">
              ${messagesWidget}
            </div>
          </div>
          `
          break;
        case "call-option-text":
          widgetContent = `
            <div id="chat-body" style="${baseChatBodyStyle}">
                ${this.getInputWidget("flex","call")}
                ${this.getInputWidget("none","chat")}
                <div id="chat-container" style="${chatContainerStyle}">
                  ${messagesWidget}
                  <button style="${headerBtnStyle}" id="switch-widget-btn">
                    ${this.sendImg}
                  </button>
                </div>
            </div>
          `;
          break;
        case "call-only":
          widgetContent = `
            <div id="chat-body" style="${baseChatBodyStyle}">
              ${this.getInputWidget("flex","call")}
            </div>
          `
        default:
          break;
      }
    }
    return widgetContent;
  }

  private getInputWidget = (display: string, type: string) => {
    let inputWidget = "";
    const inputContainerStyle = `align-items: center;`;
    const inputStyle = `flex: 1; padding: 5px; margin-right: 10px;`;
    const sendBtnStyle = `padding: 5px 10px; background-color: #30a4f8; color: white; border: none; cursor: pointer;`
    switch (type) {
      case "chat":
        inputWidget = `
          <div id="input-container" style="display: ${display}; ${inputContainerStyle}">
            <input type="text" id="chat-user-input" placeholder="Type your message..." style="${inputStyle}">
            <button id="chat-send-btn" style="${sendBtnStyle}">Send</button>
          </div>
        `
        break;
      case "call":
        inputWidget = `
          <div id="input-container-call" style="display: ${display}; ${inputContainerStyle}">
            <input type="text" id="call-user-input" placeholder="Phone or schedule.." style="${inputStyle}">
            <button id="chat-call-btn" style="${sendBtnStyle}">Call</button>
          </div>
        `;
        break;
      default:
        break;
    }
    return inputWidget;
  }

  private getIconWidget = (type: string) => {
    const icon = document.createElement("img");
    icon.src = `https://chat-widget-ts.vercel.app/${type === "calling-small" ? "phone.png" : "chat.png"}`;
    icon.alt = "chat.png";
    icon.id = "chat-widget-icon"
    icon.style.cursor = "pointer";
    return icon;
  }

  private initializeEventListeners(type: string) {
    this.chatWidget.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'chat-send-btn') {
        const chatInput = this.chatWidget.querySelector('input[type="text"]') as HTMLInputElement;
        const message = chatInput.value;
        this.sendMessage(message, true);
        chatInput.value = '';
        this.sendMessage("hi,we'll be with you right away!", false);
      } else if (target.id === 'chat-call-btn') {
        this.initiateCall();
      } else if (target.id === 'switch-widget-btn' || target.id === 'chat-header-icon') {
        const switchBtn: any = document.querySelector("#switch-widget-btn")
        const chatInput: any = document.querySelector("#input-container");
        const callInput: any = document.querySelector("#input-container-call");
        const chatMessages: any = document.getElementById("chat-messages");
        if(chatInput.style.display !== "none"){
          chatInput.style.display = "none";
          chatMessages.innerHTML = "";
          callInput.style.display = "flex";
          if(switchBtn) switchBtn.innerHTML = this.sendImg;
        }else{
          chatInput.style.display = "flex";
          chatMessages.innerHTML = "";
          callInput.style.display = "none";
          if(switchBtn) switchBtn.innerHTML = this.phoneImg;
        }
        callInput.value = "";
        chatInput.value = "";
      } else if(target.id === 'chat-widget-icon'){
        if(type === "calling-small"){
          this.initiateCall();
        }else{
          const chatBody: any = document.querySelector("#chat-body");
          if(chatBody){
            chatBody.style.display = chatBody.style.display === "none" ? "flex" : "none";
          }
        }
      }
    });
  }

  private initiateCall() {
    alert("Initiating call...");
  }

  private sendMessage(message: string, sentByUser: boolean) {
    const messageContainer = document.createElement("div");
    messageContainer.style.cssText = `
      margin-bottom: 10px; padding: 10px; border-radius: 5px; 
      max-width: 80%; background-color: ${
        sentByUser ? '#30a4f8' : '#f2f2f2'
      }; color: ${sentByUser ? 'white' : '#333'}; 
      align-self: ${sentByUser ? 'flex-start' : 'flex-end'};`;

    messageContainer.textContent = message;
    this.chatMessagesContainer.appendChild(messageContainer);
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
