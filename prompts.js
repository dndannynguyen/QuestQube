const systemMessage1 = [
    { role: "system", content: "I want to create a choose your own adventure game where we give prompts to the user to determine what kind of games they like. at the end of the game we recommend them a game that they may like based on their answers to the prompts. The prompts need to be phrased so that the user is going through a journey, and it needs to determine what genre the user likes, and what sub-genres in that genre they like. Please keep the word count to 150 words or less.The initial prompt should be that you are at a job market looking for jobs. The answers should pertain to these 5 genres: action, adventure, strategy, simulation, sports and racing. What is the first prompt? The answers should be people you want to follow. Please give options in the format '#1', '#2', '#3', etc. After showing the options do not print anything else." },
];

const systemMessage2 = "";


module.exports = {
    systemMessage1,
    systemMessage2
}