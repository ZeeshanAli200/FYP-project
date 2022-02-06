let moviesarr = [];
let childele = `<div class="col-sm-3">
<div class="card">
  <img class="card-img-top" src="" alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">
      With supporting text below as a natural lead-in to additional
      content.
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>`;
var addmovieslist = document.getElementById("addmovieslist");
var addmovieslistRecommended=document.getElementById("recommedSec")
var playerDiv=document.getElementById("playerDiv")
async function videodata() {
  // const response = await fetch(
  //   "https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16",
  //   { method: "GET" }
  // );
  const movies= await db.collection("movieList").get()
  const movieData = movies.docs.map((doc) => doc.data());
  // var data = await response.json();
  console.log(movieData);

  moviesarr = movieData;
}
async function videodata1() {
  // const response = await fetch(
  //   "https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16",
  //   { method: "GET" }
  // );
  const movies= await db.collection("movieList").get()
  const movieData = movies.docs.map((doc) => doc.data());
  // var data = await response.json();
  console.log(movieData);

  return movieData;
}
async function moviesLoad(eve) {
  await videodata();

  addmovieslist.innerHTML = `<div class="col-sm-12">
    <div class="card-body">
      <h4 class="card-title text-white">Most Watched Movies</h5>
      
    </div>
  </div>`;
  moviesarr?.map(
    (dt) =>
      (addmovieslist.innerHTML += `<div class="col-sm-3">
        <a class="navbar-brand " href="./showVideo.html?id=${dt?.VideoEntityId}">
        <div class="card">
          <img class="card-img-top" src="${dt?.VideoImageThumbnail || dt.VideoOnDemandThumb}" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${dt?.VideoName}</h5>
            
            
          </div>
        </div></a>
        </div>`)
  );
}
async function initializePlayer(url) {
  if (window.player) {
    console.log("three : ",url);
    window.player.constructor("video-player", {
      url: url,
    });
    window.player.on("seek", (e) => {
      console.log("seek ", e);
    });
    window.player.on("forward", (e) => {
      console.log(e);
    });
    window.player.on("rewind", (e) => {
      console.log("rewindddd : ", e);
    });
    window.player.on("currentQuality", (e) => {
      console.log(e);
    });
    window.player.on("qualitiesAvailable", (e) => {
      console.log(e);
    });
    window.player.on("play", (e) => {
      console.log("play event  : ", e);
    });
    window.player.on("pause", (e) => {
      console.log("pause : ", e);
    });
  }
}

async function watchMovie() {
  const loc = window.location.href.split("/");
  const idarr = loc[loc.length - 1].split("=");
  const id = idarr[idarr.length - 1];
  const bodyObj = {
    Version: "V1",
    Language: "en",
    Platform: "web",
    ChannelOrVODId: id,
    UserId: "0",
    IsChannel: "0",
  };
  const response = await fetch(
    "https://app.tapmad.com/api/getUserStreamWithPackagesChannelsChat",

    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    }
  );
  var data = await response.json();
  const { Video } = data;
  const { ContentStreamUrlLQ } = Video;
  console.log(Video);
  playerDiv.innerHTML+=`<h5 class="card-title">${Video.VideoName}</h5>
  <p class="card-text limitdesc">
   ${Video.VideoDescription}
  </p>`
  if (ContentStreamUrlLQ) {
    console.log("one");
    // s?etTimeout(() => {
      // console.log("two");
      console.log("url : ",ContentStreamUrlLQ);
      await initializePlayer(ContentStreamUrlLQ);
    // }, 2000);
  }
  
  await videodata();
  const allvideos = moviesarr;
  const selectedMovie = allvideos.find((dt) => dt?.VideoEntityId == id);
  let videoarr = [];
    
  for (let i = 0; i < 8; i++) {
    videoarr.push(allvideos[Math.floor(Math.random() * 14)]);
  }
  addmovieslistRecommended.innerHTML = `<div class="col-sm-12">
    <div class="card-body">
      <h4 class="card-title">Recommended</h5>
      
    </div>
  </div>`;
console.log(videoarr);
  videoarr?.map(
    (dt) =>
      (addmovieslistRecommended.innerHTML += `<div class="col-sm-12">
        <a class="navbar-brand " href="./showVideo.html?id=${dt?.VideoEntityId}">
        <div class="card">
          <img class="card-img-top" src="${dt?.VideoImageThumbnail||dt?.VideoOnDemandThumb}" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${dt?.VideoName}</h5>
           
            
          </div>
        </div></a>
        </div>`)
  );

  // console.log(allvideos.filter((dt)=>selectedMovie?.VideoDescription.includes(dt?.VideoDescription)));
}

setTimeout(() => {
  watchMovie();
}, 2000);
