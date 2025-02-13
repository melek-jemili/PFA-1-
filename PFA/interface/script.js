const chatinput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");
const chatbox = document.querySelector(".chatbox");
const APIKEY = "key"
let userMessage;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}
const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful touritique assistant."
            },
            {
                role: "user",
                content: userMessage
            }
        ]
    })
};
fetch(API_URL, requestOptions).then((response) => response.json()).then(data => {
    console.log(data);
}).then(data => {
    const incomingMessage = data.choices[0].message.content;
    chatbox.appendChild(createChatLi(incomingMessage, "incoming"));
}).catch(error => {
    console.error(error);
});
}


    



    const handleChat = () => {
    userMessage = chatinput.value.trim();
    if(!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));
        generateResponse();
    }, 1000);
}
sendChatBtn.addEventListener("click", () => {
    handleChat();
    chatinput.value = "";
});

chatinput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleChat();
        chatinput.value = "";
    }
})