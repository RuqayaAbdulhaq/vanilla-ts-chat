class ChatWidget {
  constructor() {
    const chatWidget = document.createElement("div");
    chatWidget.id = "chat-widget";
    chatWidget.style.position = "absolute";
    chatWidget.style.bottom = "20px";
    chatWidget.style.right = "20px";
    chatWidget.style.backgroundColor = "#ffffff";
    chatWidget.style.border = "1px solid #ccc";
    chatWidget.style.padding = "10px";
    chatWidget.style.display = "none";

    chatWidget.innerHTML = `
        <div id="chat-header">
          <div id="chat-icon" style="cursor: pointer;">&#x1F4AC;</div>
          <div id="chat-title">Chat Widget</div>
        </div>
        <div id="chat-body" style="display: none;">
          <div id="chat-messages"></div>
          <input type="text" id="chat-user-input" placeholder="Type your message..."/>
          <button id="chat-send-btn">Send</button>
        </div>
      `;

    document.body.appendChild(chatWidget);

    const chatIcon: any = chatWidget.querySelector("#chat-icon");
    const chatBody: any = chatWidget.querySelector("#chat-body");
    const sendButton = chatWidget.querySelector(
      "#chat-send-btn"
    ) as HTMLButtonElement;
    const userInput = chatWidget.querySelector(
      "#chat-user-input"
    ) as HTMLInputElement;
    const chatMessages = chatWidget.querySelector("#chat-messages");

    chatIcon.addEventListener("click", () => {
      chatBody.style.display =
        chatBody.style.display === "none" ? "block" : "none";
    });

    sendButton.addEventListener("click", () => {
      const message = userInput.value;
      this.sendMessage(message);
      userInput.value = "";
    });
  }

  sendMessage(message: string) {
    console.log("Sending message:", message);

    const chatMessages: any = document.getElementById("chat-messages");
    chatMessages.innerHTML += `<div>${message}</div>`;
  }
}


if (document.currentScript) {
  new ChatWidget();
}
