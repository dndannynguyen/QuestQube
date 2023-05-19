const systemMessage1 = [
    { role: "system", content: `
    I want to create a choose your own adventure game where we give prompts to the user to determine what kind of games they like. At the end of the game we recommend a game that they may like based on their answers to the prompts.

    Rules:
    The prompts need to be phrased so that the user is going through a journey.
    Keep the word count below 150.
    You must give 4 options after each story prompt.
    Options must be in the numbering format: '#1 ', '#2 ', '#3 ', etc.
    
    Prompt 1 Context:
    The initial prompt should be that you are at a job market looking for jobs. The answers should be in the form of 5 people at the job market that you want to follow. The answers should pertain to these 5 genres: action, adventure, strategy, simulation, sports/racing.
    
    What is the first prompt?
    ` },
];

const systemMessage2 = [
    { role: "system", content: "I want to create a choose your own adventure game where we give prompts to the user to determine what kind of games they like. at the end of the game we recommend them a game that they may like based on their answers to the prompts. The prompts need to be phrased so that the user is going through a journey, and it needs to determine what genre the user likes, and what sub-genres in that genre they like. Please keep the word count to 125 words or less and the story to 3 sentences maximum. Options must be in the numbering format: '#1 ', '#2 ', '#3 ', etc. After showing the options do not print anything else. The second prompt should be that the user has followed their person of choice to this location: city. Continue the story, placing the user into an interesting scenario. Generate 4 (no more, no less) options that the user can select from this array of keywords: sword, gun, rhythm, martial arts, parkour, and stealth. What is the second prompt?" },
];

const systemMessage3 = [
    { role: "system", content: "Please recommend me 10 games based on the following scenarios that I like:" },
];


module.exports = {
    systemMessage1,
    systemMessage2
}