const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>loading...</p>";
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).then(response => response.json()).then(data => {
    console.log(data);
    let media = ""
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
    `;
}).catch(err => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
});


//const date = document.querySelector("#datepicker").value;
//fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)