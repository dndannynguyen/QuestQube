const axios = require("axios");

const openai = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
});

const createChatCompletion = async (messages, options = {}) => {
    try {
        const response = await openai.post("/chat/completions", {
            model: options.model || "gpt-3.5-turbo",
            messages,
            ...options,
        });

        return response.data.choices;
    } catch (error) {
        console.error("Error creating chat completion:", error);
    }
}

const gpt = async (message) => {

    const options = {
        temperature: 0.7,
        max_tokens: 200,
    };

    const choices = await createChatCompletion(message, options);

    try {
        return choices[0].message.content;
    } catch (error) {
        return false
    }
}

module.exports = gpt;