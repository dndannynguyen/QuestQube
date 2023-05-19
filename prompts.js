const systemMessage1 = [
  {
    role: "system",
    content: `
    I want to create a choose your own adventure game where we give prompts to the user to determine what kind of games they like. At the end of the game we recommend a game that they may like based on their answers to the prompts.

    Rules:
    The prompts need to be phrased so that the user is going through a journey.
    Keep the word count below 150.
    You must give 4 options after each story prompt.
    Options must be in the numbering format: '#1 ', '#2 ', '#3 ', etc.
    
    Prompt 1 Context:
    The initial prompt should be that you are at a job market looking for jobs. The answers should be in the form of 5 people at the job market that you want to follow. The answers should pertain to these 5 genres: action, adventure, strategy, simulation, sports/racing.
    
    What is the first prompt?
    `,
  },
];

const systemMessage2 = [
  {
    role: "system",
    content: `
    I want to create a choose your own adventure game where we give prompts to the user to determine what kind of games they like. At the end of the game we recommend a game that they may like based on their answers to the prompts.

    Rules:
    The prompts need to be phrased so that the user is going through a journey.
    Keep the word count below 150.
    You must give 4 options after each story prompt.
    Options must be in the numbering format: '#1 ', '#2 ', '#3 ', etc.
    
    Prompt 2 Context:
    The second prompt should be that the user has followed their person of choice to this location: city. Continue the story, placing the user into an interesting scenario.
    
    What is the second prompt?
    `,
  },
];

const systemMessage3 = [
  {
    role: "system",
    content: `
    I want to create a choose your own adventure game where we give prompts to the user to determine what kind of games they like. At the end of the game we recommend a game that they may like based on their answers to the prompts.

    Rules:
    Keep the word count below 150.
    You must give 10 recommendations.
    The recommendations must be relevant to the users previous responses.
    Final recommendations must be in the numbering format: '#1 ', '#2 ', '#3 ', etc.
    Only show the game titles, not the game description.
    
    Final recommendation Context:
    Please recommend 10 games that the user may like based on their previous responses.
    
    What are the 10 games that you recommend?
    `,
  },
];

module.exports = {
  systemMessage1,
  systemMessage2,
  systemMessage3,
};
