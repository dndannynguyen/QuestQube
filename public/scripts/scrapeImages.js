const scrapeImages = (gameName, gamePos) => {
  fetch(`https://www.backloggd.com/games/${gameName}/`)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // Try to find the element with class "card-img"
      const image = doc.querySelector(".card-img");

      if (image) {
        const imageSrc = image.src;
        document.querySelector(`#${gamePos}`).src = imageSrc;
        document.querySelector(`#${gamePos}`).alt = gameName;
      } else {
        // Handle the case where the element is not found
        console.error("Image element with class 'card-img' not found");
      }
    });
};