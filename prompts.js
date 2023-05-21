
// const determineKeywords = (genre) => {
//   const keywords = {
//     action: ["sword", "laser gun", "nunchuks", "power gauntlet", "kill", "war"],
//     adventure: ["treasure map", "pith helmet", "signpost", "stars", "platinum compass"],
//     strategy: ["battle planning map", "puzzle cube", "war", "blueprint", "puzzle"],
//     simulation: ["king", "bouquet of roses", "war", "hammer", "farm"],
//     sportsracing: ["basketball", "soccer", "cars", "marathon", "hockey"]
//   };
  
//   let ranNum = Math.floor(Math.random() * 5);

//   if (genre === "action") {
//     let keyword = keywords.action[ranNum];
//   } else if (genre === "adventure") {
//     let keyword = keywords.adventure[ranNum];
//   } else if (genre === "strategy") {
//     let keyword = keywords.strategy[ranNum];
//   } else if (genre === "simulation") {
//     let keyword = keywords.simulation[ranNum];
//   } else if (genre === "sportsracing") {
//     let keyword = keywords.sportsracing[ranNum];
//   }
  
//   return keyword;
// };


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
    The initial prompt should be that you are at an adventurers guild looking for a quest. The answers should be in the form of 5 people in the guild that you want to follow. The answers should pertain to these 5 genres: action, adventure, strategy, simulation, sports/racing.
    
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

// const systemMessage3 = [
//   {
//     role: "system",
//     content: `
//     I want to create a choose your own adventure game where we give prompts to the user to determine what kind of games they like. At the end of the game we recommend a game that they may like based on their answers to the prompts.

//     Rules:
//     The prompts need to be phrased so that the user is going through a journey.
//     Keep the word count below 150.
//     You must give 4 options after each story prompt.
//     The options must include these 4 keywords: ${keyword1}, ${keyword2}, ${keyword3}, ${keyword4}.
//     Options must be in the numbering format: '#1 ', '#2 ', '#3 ', etc.
    
//     Prompt 3 Context:
//     The third prompt should continue the story. Continue the story, placing the user into an interesting scenario.
    
//     What is the second prompt?
//     `,
//   },
// ];

const systemMessage3 = [
  {
    role: "system",
    content: `
    I want 10 recommendations based on the prompts and answers that I like.

    Rules:
    Do not continue the story in your response.
    Final recommendations must be in the numbering format: '#1 ', '#2 ', '#3 ', etc.
    Do not include any dialogue before or after the recommendations.
    Keep the word count below 150.
    You must give 10 recommendations.
    The recommendations must be relevant to the users previous responses.
    Only show the game titles, not the game description.
    
    Final recommendation Context:
    Please recommend 10 games that the user may like based on their previous responses.
    
    What are the 10 games that you recommend?
    `,
  },
];

module.exports = {
  // determineKeywords,
  systemMessage1,
  systemMessage2,
  systemMessage3,
  // systemMessage4,
};
