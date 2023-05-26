const scrapeImages = (gameName, gamePos) => {
  fetch(`https://www.backloggd.com/games/${gameName}/`)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const image = doc.querySelector(".card-img");
      const imageSrc = image.src;
      document.querySelector(`#${gamePos}`).src = imageSrc;
      document.querySelector(`#${gamePos}`).alt = gameName;
    });
};
