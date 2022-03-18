let moviesarr = [];
var currentime = 0,
  videoSkipped = 0;
let childele = `<div class="col-sm-3">
<div class="card">
  <img class="card-img-top" src="" alt="Card image cap" />
  <div class="gitcard-body">
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
var addmovieslistRecommended = document.getElementById("recommedSec");
var playerDiv = document.getElementById("playerDiv");
async function videodata() {
  // const response = await fetch(
  //   "https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16",
  //   { method: "GET" }
  // );
  const movies = await db.collection("movieList").get();
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
  const movies = await db.collection("movieList").get();
  const movieData = movies.docs.map((doc) => doc.data());
  // var data = await response.json();
  console.log(movieData);

  return movieData;
}
async function moviesLoad(eve) {
  let prevvidid = document.referrer.split("=");
  console.log(window.history, document.referrer.split("="));
  await videodata();
  if (!isNaN(prevvidid)) {
    let user = await auth.currentUser;
    // console.log("newIDDDD",id,loc);
    let upddoc = await db
      .collection("streamUsers")
      .doc(`${user?.uid}`)
      .collection("WatchedVideos")
      .doc(`${prevvidid}`)
      .update({
        active: true,
      });
  }
  addmovieslist.innerHTML = `<div class="col-sm-12">
    <div class="card-body">
      <h4 class="card-title text-white">Most Watched Movies</h5>
      
    </div>
  </div>`;
  moviesarr?.map(
    (dt) =>
      (addmovieslist.innerHTML += `<div class="col-sm-3">
        <a class="navbar-brand " href="./showVideo.html?id=${
          dt?.VideoEntityId
        }">
        <div class="card">
          <img class="card-img-top" src="${
            dt?.VideoImageThumbnail || dt.VideoOnDemandThumb
          }" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${dt?.VideoName}</h5>
            
            
          </div>
        </div></a>
        </div>`)
  );
}
async function initializePlayer(url) {
  // console.log();
  if (window.player) {
    console.log("urlss", url, window.player);
    window.player.constructor("video-player", {
      url: url,
    });
    window.player.on("seek", (e) => {
      console.log("seek ", e);

      if (e.seekedFrom < e.seekedTo) {
        let cal = 0;
        cal = e.seekedTo - e.seekedFrom;
        videoSkipped += cal;
        console.log(cal, videoSkipped);
      } else if (e.seekedTo < e.seekedFrom) {
        let cal = 0;
        cal = e.seekedFrom - e.seekedTo;
        videoSkipped -= cal;
        console.log(cal, videoSkipped);
      }
    });
    window.player.on("forward", (e) => {
      console.log(e);
      // let cal=0
      // if(e.prevTime<e.currentTime){
      //   cal=e.currentTime-e.prevTime
      //   console.log(cal);
      //   videoSkipped+=cal

      // }
    });
    window.player.on("rewind", (e) => {
      console.log("rewindddd : ", e);
      // let cal=0
      //   cal=e.prevTime-e.currentTime
      //   // cal=e.seekedFrom-e.seekedTo
      //   videoSkipped-=cal
    });
    window.player.on("currentQuality", (e) => {
      console.log(e);
    });
    window.player.on("qualitiesAvailable", (e) => {
      console.log(e);
    });
    window.player.on("onCurrentTimeChange", (e) => {
      // console.log(e);
      currentime = e;
    });
    window.player.on("play", async (e) => {
      // if(e==0){
      // }
      // console.log(window.location.href.split("="));
      // let idvideo=window.location.href.split("=")
      // let idvid=idvideo[idvideo.length-1]
      // let user=await auth.currentUser
      // console.log(user.uid);
      // var messageRef = await db.collection('streamUsers').doc(`${user?.uid}`)
      //           .collection('WatchedVideos').doc(`${idvid}`).set(e);
      // console.log("play event  : ", e);
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
  playerDiv.innerHTML += `<h5 class="card-title">${Video.VideoName}</h5>
  <p class="card-text limitdesc">
   ${Video.VideoDescription}
  </p>`;
  if (ContentStreamUrlLQ) {
    console.log("one");

    console.log("url : ", ContentStreamUrlLQ);
    await initializePlayer(ContentStreamUrlLQ);
  }

  await videodata();
  const allvideos = moviesarr;
  const selectedMovie = allvideos.find((dt) => dt?.VideoEntityId == id);
  let videoarr = [];
  let recommededArr = await fetch(`http://localhost:5000/${id}`);
  const recData = await recommededArr.json();

   console.log("recommededArr",recData,allvideos);
   

  for (let i = 0; i < recData?.moviesList?.length; i++) {
    videoarr.push(allvideos?.find((dt)=>dt?.VideoEntityId==recData?.moviesList[i]));
  }
console.log("videoarr",videoarr,allvideos,recData);
  addmovieslistRecommended.innerHTML = `<div class="col-sm-12">
    <div class="card-body">
      <h4 class="card-title">Recommended</h5>
      
    </div>
  </div>`;
  // console.log(videoarr);
  videoarr?.map(
    (dt) =>
      (addmovieslistRecommended.innerHTML += `<div class="col-sm-12" >
        <a class="navbar-brand " style="cursor: pointer;" onclick="getWatchedTimePlusRoute(${
          dt?.VideoEntityId
        })" >
        <div class="card">
          <img class="card-img-top" src="${
            dt?.VideoImageThumbnail || dt?.VideoOnDemandThumb
          }" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${dt?.VideoName}</h5>
           
            
          </div>
        </div></a>
        </div>`)
  );
  let user = await auth.currentUser;
  console.log("newIDDDD", id, loc);
  let upddoc = await db
    .collection("streamUsers")
    .doc(`${user?.uid}`)
    .collection("WatchedVideos")
    .doc(`${id}`)
    .update({
      active: true,
    });
}
// href="./showVideo.html?id=${dt?.VideoEntityId}"
// setTimeout(() => {
//   watchMovie();
// }, 2000);
async function getWatchedTimePlusRoute(nextVideoId) {
  let curretVidid = window.location.href.split("=");
  let currVidId = curretVidid[curretVidid.length - 1];
  let watchedTimeorg = currentime - videoSkipped;
  window.history.state = Number(currVidId);
  let user = await auth.currentUser;
  // console.log(curretVidid,moviesarr);
  let itemobj = moviesarr?.find((dt) => dt?.VideoEntityId == currVidId);
  var getpastview = await db
    .collection("streamUsers")
    .doc(`${user?.uid}`)
    .collection("WatchedVideos")
    .doc(`${currVidId}`)
    .get();

  if (getpastview?.data()?.watchedTime && getpastview?.data()?.currentTime) {
    const { watchedTime, currentTime, highestTimeWatched } = getpastview.data();
    let updwatchedtime = watchedTimeorg + watchedTime;
    let updhighesttime = 0;
    if (highestTimeWatched < watchedTimeorg) {
      console.log("condition");
      updhighesttime = watchedTimeorg;
    } else {
      console.log("condition2", highestTimeWatched, watchedTimeorg);

      updhighesttime = highestTimeWatched;
    }

    let upddoc = await db
      .collection("streamUsers")
      .doc(`${user?.uid}`)
      .collection("WatchedVideos")
      .doc(`${currVidId}`)
      .update({
        watchedTime: updwatchedtime,
        highestTimeWatched: updhighesttime,
        currentTime: currentime,
        active: false,
      });
    window.location.replace(`./showVideo.html?id=${nextVideoId}`);
  } else {
    console.log("newvideo:", getpastview.data());
    var vidRef = await db
      .collection("streamUsers")
      .doc(`${user?.uid}`)
      .collection("WatchedVideos")
      .doc(`${currVidId}`)
      .set({
        highestTimeWatched: watchedTimeorg,
        videoName: itemobj?.VideoName,
        videoId: itemobj?.VideoEntityId,
        image: itemobj?.VideoImageThumbnail || itemobj?.VideoOnDemandThumb,
        currentTime: currentime,
        watchedTime: watchedTimeorg,
        active: false,
      });
    window.location.replace(`./showVideo.html?id=${nextVideoId}`);
  }

  // console.log(nextVideoId,"CurrentTime:",currentime,"videospkipped",videoSkipped,"calcul",currentime-videoSkipped);
  // window.location.replace(`./showVideo.html?id=${nextVideoId}`)
}
