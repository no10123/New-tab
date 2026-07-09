const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>loading...</p>";
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).then(response => response.json()).then(data => {
    console.log(data);
    let t = ""
    let T = ""
    if(data.media_type == "video") {
      t = "video"
      T = "</video>"
    } else if (data.url.includes("youtube")) {
      t = "iframe"
      T = "</iframe>"
    } else {
      t = "img"
    }
    document.querySelector("#app").innerHTML = `<h1 id="title">${data.title}</h1>\n` + 
    `<${t} id="bg" src=${data.url}>${T}\n` + 
    `<p id="desc">${data.explanation}</p>`;
}).catch(err => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
});


//const date = document.querySelector("#datepicker").value;
//fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)