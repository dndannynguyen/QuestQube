const loader = () => {
  var loading = document.createElement("div");
  loading.classList.add("loading");
  loading.innerHTML = "<div class='loader'></div>";
  var card = document.createElement("div");
  card.classList.add("card");
  card.style.position = "fixed";
  card.style.left = "50%";
  card.style.top = "50%";
  card.style.transform = "translate(-50%, -50%)";
  card.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  var spinner = `<img src="mediaResources/loading.svg" alt="" style="width: 20rem; height: 20rem;">`;
  var text = `<p style="font-size: xx-large; color: #FFD700; text-align: center">Loading...</p>`;
  card.innerHTML = spinner + text;
  loading.style.zIndex = "1000";
  loading.appendChild(card);
  document.body.appendChild(loading);
};
