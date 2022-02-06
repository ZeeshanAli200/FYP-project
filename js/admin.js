// let db = firebase.firestore();

async function getAllUser() {
  try {
    const users = await db.collection("streamUsers").get();
    const length = users.docs.length;
    console.log(document.getElementById("all-user"));
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
    const userData = users.docs.map((doc) => doc.data());
    const elem = getElement("active-user-table");
    var tr = "";
    for (let index = 0; index < userData.length; index++) {
      if (userData[index].isActive) {
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
    }
    elem.innerHTML = tr;
  } catch (error) {}
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
      <td><img class="thumb-img" src="${movieData[index].VideoImageThumbnail||movieData[index].VideoOnDemandThumb}"/></td>
    </tr>`;
    }
    console.log("trv: ",tr);
    elem.innerHTML = tr;
  } catch (error) {
    console.log("phat gyaaa");
  }
}
