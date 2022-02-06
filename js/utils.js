function writeJson(data, fileName) {
  const fs = require("fs");
  const movie = JSON.stringify(data);
  fs.writeFile(fileName, movie, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}

function getElement(name) {
  var elem = null;
  if (name) {
    if (document.getElementById(name)) elem = document.getElementById(name);
    else if (document.querySelector("." + name))
      elem = document.querySelector("." + name);
    return elem;
  }
  return elem;
}

async function saveMovies() {
  try {
    fetch("https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16")
      .then((r) => r.json())
      .then((resp) => {
        resp.Sections.Movies[0].Videos.forEach(async (element) => {
          await db.collection("movieList").add(element);
        });
        // writeJson(mov, "../json/movies.json");
      });
  } catch (error) {}
}
