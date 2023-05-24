const determineKeywords = (genre) => {
  const keywords = {
    0: ["Pistol", "Tactical Knife", "Grappling Hook", "Explosives", "Rope", "Night Vision Goggles", "First Aid Kit", "Multi-tool", "Smoke Grenades", "Portable Surveillance Equipment"],
    1: ["Sword", "Bow and Arrows", "Staff", "Shield", "Potion", "Lockpick", "Magic Scroll", "Armor", "Map", "Quest Journal"],
    2: ["Chessboard", "Strategy Guide", "Codebreaker", "Logic Puzzle", "Planning Notebook", "Map", "Calculator", "Mind Teaser", "Cipher Wheel", "Strategy Board Game"],
    3: ["VR headset", "bouquet of roses", "Augmented reality glasses", "virtual pet dinosaur", "digital alarm clock"],
    4: ["basketball", "soccer ball", "super car", "foot ball", "vintage sports car", "tennis racket", "golf club", "fishing rod", "baseball bat"]
  };
  let keywordsList = [];
  let usedKeywords = []; // Array to keep track of used keywords

  for (let i = 0; i < 5; i++) {
    let randomIndex;
    let keyword;

    do {
      randomIndex = Math.floor(Math.random() * keywords[genre].length);
      keyword = keywords[genre][randomIndex];
    } while (usedKeywords.includes(keyword)); // Keep selecting a random keyword until it hasn't been used

    keywordsList.push(keyword);
    usedKeywords.push(keyword);
  }

  return keywordsList;
};


system = {
    role: "system",
    content: `
    You are an interactive narrative story teller. You will generate a story prompt for the user followed by 5 choices that the user can choose from. You will be given a set of rules and context to follow for each section of the story. After you have generated 3 story prompts along with their choices, you will conclude the story.

    Rules:
    The story prompt must be written in second person ("you" perspective).
    Phrase the story prompts as if the user is going on a journey/adventure.
    The story prompts must be between less than 100 words.
    You must give 5 choices after each story prompt. no more, no less.
    Each choice must be between 7 to 12 words and be a single sentence.
    Choices must be in the numbering format: '#1 ', '#2 ', '#3 ', etc.
    `,
}

storyPrompt1 = {
  role: "system",
  content: `
    Story Prompt 1 Context:
    The user will arrive at an adventurers guild in search of a thrilling quest. There are five individuals at the guild each of whom relates to/represents these five video game genres in this exact order: action, adventure, real time strategy, simulation, sports/racing. The choices you give to the user must pertain to these 5 people. Describe these people and their professions in detail. The people must be interesting and have a unique traits. The user will follow/meet/learn about the person they choose. Do not mention video games or genres in the story or the choices.

    Keywords to help you describe the people:
    action: Fearless, Tenacious, Charismatic, Resourceful, Loyal, Muscular, Athletic, Tall, Agile, Striking
    adventure: Adventurous, Brave, Curious, Daring, Resilient, Fit, Agile, Energetic, Strong, Nimble
    real time strategy: Intelligent, Analytical, Logical, Strategic, Tactical, Calculating, Cunning, Clever, Quick-witted, Observant
    simulation: Creative, Imaginative, Artistic, Inventive, Innovative, Original, Unique, Eccentric, Quirky, Unconventional
    sports/racing: Competitive, Athletic, Energetic, Fit, Agile, Strong, Fast, Quick, Nimble, Determined

    Desired format:
    The story prompt goes here.
    #1 Choice 1
    #2 Choice 2
    #3 Choice 3
    #4 Choice 4
    #5 Choice 5
    `,
}

storyPrompt2 = {
  role: "system",
  content: `
  Story Prompt 2 Context:
  The user has followed the person they chose from the previous prompt. The person they chose is now taking them on a journey/adventure in one of the following location: City. The user and the person they chose run into a problem that they must solve together. The choices you give to the user must pertain to the problem they are trying to solve. The problem and choices must have a direct connection to the theme/genre/profession of the person they chose. The problem must be interesting and have choices relevant to the person they originally chose. Do not mention video games or genres in the story or the choices.

  Desired format:
  The story prompt goes here.
  #1 Choice 1
  #2 Choice 2
  #3 Choice 3
  #4 Choice 4
  #5 Choice 5
  `,
}

storyPrompt3 = {
  role: "system",
  content: `
  Story Prompt 3 Context:
  The user has picked a choice from the previous prompt. There is a new problem that the user must solve. The choices you give to the user must pertain to the problem. The problem must be interesting and have unique choices.

  Desired format:
  The story prompt goes here.
  #1 Choice 1
  #2 Choice 2
  #3 Choice 3
  #4 Choice 4
  #5 Choice 5
  `,
}

conclusionPrompt = {
  role: "system",
  content: `
  Conclusion Prompt Context:
  Use the previous choices and prompts to conclude the story. The conclusion must be interesting and have a unique, happy ending. The conclusion must be less than 75 words. Do not give any choices to the user.

  Desired format:
  Conclusion goes here.
  `,
}

recommendPrompt = {
  role: "system",
  content: `
  Recommendation Prompt Context:
  Recommend 10 games to the user based on the choices they made. The recommendations must be relevant to the choices they made and the story they experienced.

  Desired format:
  #1 Game 1
  #2 Game 2
  #3 Game 3
  #4 Game 4
  #5 Game 5
  #6 Game 6
  #7 Game 7
  #8 Game 8
  #9 Game 9
  #10 Game 10
  `,
}


module.exports = {
  determineKeywords,
  system,
  storyPrompt1,
  storyPrompt2,
  storyPrompt3,
  conclusionPrompt,
  recommendPrompt
};