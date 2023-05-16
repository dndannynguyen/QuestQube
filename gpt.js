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

const gpt = async () => {
    const messages = [
        { role: "user", content: "Write the beginning of a two sentence action story. Finish by giving the user 3 potential options that could continue the story. Options should be less than 4 words. One of the options should include the keyword 'sword' Write this story in the 'you' perspective." },
    ];

    const options = {
        temperature: 0.8,
        max_tokens: 50,
    };

    const choices = await createChatCompletion(messages, options);

    return choices[0].message.content;
}

module.exports = gpt;