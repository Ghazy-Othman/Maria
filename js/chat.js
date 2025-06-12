// 
// 
// 

import { sendMsg } from "./api/ai_chatbot.js";

const aiBtn = document.getElementById('aiChatBtn');
const aiBox = document.getElementById('aiChatBox');
const aiSend = document.getElementById('aiSend');
const aiInput = document.getElementById('aiInput');
const aiMessages = document.getElementById('aiChatMessages');

aiBtn.addEventListener('click', () => {
    aiBox.classList.toggle('active');
});

aiSend.addEventListener('click', async () => {

    if(!localStorage.getItem('token')){
        alert("Please login first to do this action..");
        return ;
    }

    const userMsg = aiInput.value.trim();
    if (userMsg === '') return;

    // 
    const userBubble = document.createElement('p');
    userBubble.innerHTML = `<strong>You:</strong> ${userMsg}`;
    aiMessages.appendChild(userBubble);

    const aiReply = document.createElement('p');
    try {
        const data = {
            message: userMsg
        };
        const result = await sendMsg(data);
        if (result?.data?.model_response) {
            //
            aiReply.innerHTML = `<strong>AI:</strong> ${result.data.model_response}`;
        }
        else {
            aiReply.innerHTML = `<strong>AI:</strong> Something went wrong...Try again.`;
            throw result;
        }

    }
    catch (err) {
        console.log(err);
    }

    aiMessages.appendChild(aiReply);
    aiMessages.scrollTop = aiMessages.scrollHeight;

    aiInput.value = '';
});