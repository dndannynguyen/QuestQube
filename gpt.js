const axios = require("axios");

const openai = axios.create({
  baseURL: "https://models.inference.ai.azure.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

const createChatCompletion = async (messages, options = {}) => {
  try {
    const response = await openai.post("/chat/completions", {
      model: options.model || "gpt-4o",
      messages,
      ...options,
    });

    return response.data.choices;
  } catch (error) {
    console.error("Error creating chat completion:", error);
  }
};

const gpt = async (message) => {
  const options = {
    temperature: 1.0,
    max_tokens: 250,
  };

  const choices = await createChatCompletion(message, options);

  try {
    return choices[0].message.content;
  } catch (error) {
    return false;
  }
};

module.exports = gpt;
