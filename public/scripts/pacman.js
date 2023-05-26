let musicPlaying = false;

function easterEgg() {
  var username = document.getElementById("username").value;
  if (username === "upupdowndownleftrightleftrightbastart") {
    wakaWaka();
    event.preventDefault();
  }
}

function wakaWaka() {
  if (document.getElementById("pacman") != null) {
    return;
  }

  let pacman = document.createElement("img");
  pacman.src = "/mediaResources/pacman.gif";
  pacman.style.position = "absolute";
  pacman.style.left = "calc(75% - 50px)";
  pacman.style.top = "100px";

  let ghosts = document.createElement("img");
  ghosts.src = "/mediaResources/ghosts.gif";
  ghosts.style.position = "absolute";
  ghosts.style.left = "25%";
  ghosts.style.top = "100px";

  document.body.appendChild(pacman);
  document.body.appendChild(ghosts);

  // Play pacman sound
  let audio = new Audio("/mediaResources/pacman_music.mp3");
  if (!musicPlaying) {
    audio.play();
    musicPlaying = true;
  }

  setTimeout(function () {
    document.body.removeChild(pacman);
    document.body.removeChild(ghosts);
    musicPlaying = false;
  }, 5000);
}
