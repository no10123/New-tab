const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function loadApod(dateParam = "") {
  const urlDate = dateParam ? `&date=${dateParam}` : "";
  const titleEl = document.querySelector("#title");
  if (titleEl) titleEl.textContent = "Loading...";

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${urlDate}`)
    .then(response => response.json())
    .then(data => {
      if (data.code && data.code !== 200) {
         throw new Error(data.msg); 
      }
      let media = "";
      if (data.media_type === "video") {
        if (data.url.includes("youtube")) {
          const separator = data.url.includes("?") ? "&" : "?";
          media = `<iframe id="bg" src="${data.url}${separator}autoplay=1&mute=1&controls=0&loop=1" frameborder="0" allow="autoplay; fullscreen"></iframe>`;
        } else {
          media = `<video id="bg" src="${data.url}" autoplay loop muted playsinline></video>`;
        }
      } else {
        media = `<img id="bg" src="${data.url}" alt="${data.title}">`;
      }
      document.querySelector("#app").innerHTML = `
        ${media}
        <div class="content-overlay">
          <h1 id="title">${data.title}</h1>
          <p id="desc">${data.explanation}</p>
        </div>
        <h1 id="clock" style="opacity: 1;">00:00:00</h1>
      `;
    })
    .catch(err => {
      document.querySelector("#app").innerHTML += `
        <div class="content-overlay" style="background: red;">
          <p>Error: ${err.message}</p>
        </div>`;
    });
}

loadApod();

const datePicker = document.querySelector("#datepicker");
if (datePicker) {
  const today = new Date().toISOString().split('T')[0];
  datePicker.max = today;
  datePicker.addEventListener('change', (event) => {
    loadApod(event.target.value);
  });
}

document.querySelector("#r").addEventListener("click", () => {
  const start = new Date(1995, 5, 16).getTime();
  const end = new Date().getTime();
  const randomTime = new Date(start + Math.random() * (end - start));
  const randomDate = randomTime.toISOString().split('T')[0]; 
  loadApod(randomDate);
});

document.querySelector("#c").addEventListener("click", () => {
  const clock = document.getElementById('clock');
  if (clock) {
    clock.style.opacity = clock.style.opacity === "0" ? "1" : "0";
  }
});

setInterval(() => {
  const clock = document.getElementById('clock');
  if (clock) {
    clock.textContent = new Date().toLocaleTimeString();
  }
}, 1000);