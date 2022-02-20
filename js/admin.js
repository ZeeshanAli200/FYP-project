// let db = firebase.firestore();

async function getAllUser() {
  try {
    const users = await db.collection("streamUsers").get();
    const length = users.docs.length;
    // console.log(document.getElementById("all-user"));
    document.getElementById("all-user").innerText = length;
    console.log("");
  } catch (error) {}
}
getAllUser();

async function getAllActiveUser() {
  try {
    const users = await db
      .collection("streamUsers")
      .where("isActive", "==", true)
      .get();
    const length = users.docs.length;
    document.getElementById("all-active-user").innerText = length;
  } catch (error) {}
}
getAllActiveUser();

async function getAllMoviesCount() {
  try {
    const data = await db.collection("movieList").get();
    const length = data.docs.length;
    document.getElementById("all-movies").innerText = length;
  } catch (error) {}
}
getAllMoviesCount();

// user page

async function onLoadUser() {
  try {
    const users = await db.collection("streamUsers").get();
    const userData = users.docs.map((doc) => doc.data());
    const elem = getElement("user-table");
    var tr = "";
    for (let index = 0; index < userData.length; index++) {
      tr += `<tr>
      <th scope="row">${index}</th>
      <td>${userData[index].userName || "-"}</td>
      <td>${userData[index].email || "-"}</td>
      <td>${userData[index].gender || "-"}</td>
      <td>${userData[index].age || "-"}</td>
      <td>${userData[index].role || "-"}</td>
      <td>${userData[index].isActive || "-"}</td>
    </tr>`;
    }
    elem.innerHTML = tr;
  } catch (error) {}
}
async function onLoadActiveUser() {
  try {
    const users = await db.collection("streamUsers").get();
    const userData = await users.docs.map((doc) => doc.data());

    console.log("userData : ", userData);

    const elem = getElement("active-user-table");
    var tr = "";
    userData?.map((userdt, index) => {
      if (userdt?.isActive) {
        tr += `<tr>
<th scope="row">${index}</th>
<td>${userdt.userName || "-"}</td>
<td>${userdt.email || "-"}</td>
<td>${userdt.gender || "-"}</td>
<td>${userdt.age || "-"}</td>
<td>${userdt.role || "-"}</td>
<td>${userdt.isActive || "-"}</td>
<td style="cursor: pointer;"><button class="navbar-brand stats" onclick="showAnalyticspage('${String(
          userdt?.UID
        )}')">Show Analytics</button></td>
</tr>`;
      }
    });

    elem.innerHTML = tr;
  } catch (error) {}
}

function showAnalyticspage(id) {
  console.log(id);
  window.location.replace(`../adminpages/analytics.html?id=${id}`);
}
async function onLoadMovies() {
  try {
    const movies = await db.collection("movieList").get();
    const movieData = movies.docs.map((doc) => doc.data());
    const elem = getElement("movie-table");

    var tr = "";
    for (let index = 0; index < movieData.length; index++) {
      tr += `<tr>
      <th scope="row">${index}</th>
      <td>${movieData[index].VideoName || "-"}</td>
      <td><img class="thumb-img" src="${
        movieData[index].VideoImageThumbnail ||
        movieData[index].VideoOnDemandThumb
      }"/></td>
    </tr>`;
    }
    console.log("trv: ", tr);
    elem.innerHTML = tr;
  } catch (error) {
    console.log("phat gyaaa");
  }
}

// ***************************************************************analytics
async function renderAnalytic() {
  try {
    let selectedUserarr = window.location.href.split("=");
    let selectedUserId = selectedUserarr[selectedUserarr.length - 1];
    console.log(selectedUserId);

    const users = await db
      .collection(`streamUsers/${selectedUserId}/WatchedVideos`)
      .onSnapshot((querySnapshot) => {
        const elem = getElement("analytic-table");
        var tr = "";
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          tr += `<tr>
       <th scope="row">${doc.data().videoId}</th>
       <td>${doc.data().videoName || "-"}</td>
       <td>${
        doc.data().currentTime < 60
          ?`${ Math.ceil(doc.data().currentTime)}sec`
          : `${Math.floor(doc.data().currentTime / 60)}:${Math.floor(doc.data().currentTime)
              -Math.floor(doc.data().currentTime / 60) * 60 
              
            }mins` || "-"
      }</td>
       <td>${
         doc.data().watchedTime < 60
           ?`${ Math.ceil(doc.data().watchedTime)}sec`
           : `${Math.floor(doc.data().watchedTime / 60)}:${Math.floor(doc.data().watchedTime)
               -Math.floor(doc.data().watchedTime / 60) * 60 
               
             }mins` || "-"
       }</td>
       <td>${doc.data().videoName || "-"}</td>
       <td>${doc.data().videoName || "-"}</td>
       <td>${doc.data().videoName || "-"}</td>
     </tr>`;
        });
        elem.innerHTML = tr;
        // console.log("Current cities in CA: ", cities.join(", "));
      });
    // const userData = users.docs.map((doc) => doc.data());
    // console.log(userData);
    // const userData = users.docs.map((doc) => doc.data());
    // db.collection("streamUsers").doc("SF")
    // .onSnapshot((doc) => {
    //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     console.log(source, " data: ", doc.data());
    // });
    // const elem = getElement("analytic-table");
    // var tr = "";
    // for (let index = 0; index < userData.length; index++) {
    //   if (userData[index].isActive) {
    //     tr += `<tr>
    //   <th scope="row">${index}</th>
    //   <td>${userData[index].userName || "-"}</td>
    //   <td>${userData[index].email || "-"}</td>
    //   <td>${userData[index].gender || "-"}</td>
    //   <td>${userData[index].age || "-"}</td>
    //   <td>${userData[index].role || "-"}</td>
    //   <td>${userData[index].isActive || "-"}</td>
    // </tr>`;
    //   }
    // }
    // elem.innerHTML = tr;
  } catch (error) {
    console.log(error);
  }
}
