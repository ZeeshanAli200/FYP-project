// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDQEEh6u-Ctu2oquYbX2J7nBt5NPuyRhaM",
  authDomain: "hackathon-task-project.firebaseapp.com",
  projectId: "hackathon-task-project",
  storageBucket: "hackathon-task-project.appspot.com",
  messagingSenderId: "786120623198",
  appId: "1:786120623198:web:dab54ca1b265a9486960cf",
  measurementId: "G-LPVDV5C12S",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
///////////////////////////////

let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();
let email = document.getElementById("email");
let userName = document.getElementById("user");
let password = document.getElementById("password");
let age = document.getElementById("typeNumber");
var genderSelect = document.getElementById("citySelect");

async function register() {
  if (
    email.value &&
    password.value &&
    age.value &&
    genderSelect.value &&
    userName.value
  ) {
    if (
      email.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) == null
    ) {
      alert("Email is Invalid");
    } else if (password.value.length < 8) {
      alert("Password Must be At least 8 Characters");
    } else if (age.value < 1 || age.value > 99) {
      alert("Age is Not Valid");
    } else {
      let UserCredientials = await auth.createUserWithEmailAndPassword(
        email.value.trim(),
        password.value.trim()
      );
      // .then(async (UserCredientials) => {
      if (UserCredientials) {
        let dataObj = {
          email: email.value.trim(),
          age: age.value,
          gender: genderSelect.value,
          role: "user",
          UID: UserCredientials.user.uid,
          userName: userName.value.trim(),
          isActive: true,
        };

        let setdt = await db
          .collection("streamUsers")
          .doc(UserCredientials.user.uid)
          .set(dataObj);

        window.location.replace("./userpages/userHome.html");
      }

      // await saveDataToFirestore(dataObj)
      // console.log(setdt,UserCredientials.user.uid,dataObj);
      // if (UserCredientials.user) {
      //     email.value = '';
      //     password.value = '';
      //     age.value = '';

      // }
    }
  } else {
    alert("Please Fill Empty Fields");
  }
}
let parag = document.getElementById("helo");
async function login() {
  let { user } = await auth.signInWithEmailAndPassword(
    email.value,
    password.value
  );
  await UpdateDataInStreamUsers(user.uid, { isActive: true });
}

async function saveDataInStreamUsers(id, data) {
  return await db.collection("streamUsers").doc(id).set(data);
}
async function UpdateDataInStreamUsers(id, data) {
  return await db.collection("streamUsers").doc(id).update(data);
}

//////////////////////////////// checking for current user

auth.onAuthStateChanged(async (user) => {
  console.log(user);
  let pageLocArr = window.location.href.split("/");
  // let pageName = pageLocArr[pageLocArr.length - 1];
  let unauth = ["login.html", "register.html", "index.html"];
  let adminpages = ["adminpages/dashboard.html" , "adminpages/active-users.html" ,  "adminpages/adminpage1.html"];
  // user pages
  let authenticatedPages = [
    "userpages/userHome.html",
    "userpages/showVideo.html",
  ];
  // unauthuser pages
  // admin pages

  let pagename = pageLocArr[pageLocArr.length - 1];
  if(pagename.includes("?")){
   
    pagename=pagename.split("?")[0]
  }
  if (user) {
    if (
      unauth.find((dt) => dt === pagename) == unauth[2] ||
      unauth.find((dt) => dt === pagename) == unauth[0]
    ) {
      let userdata = await db.collection("streamUsers").doc(user.uid).get();
      if (userdata?.data()?.role == "user") {
        let clone = pageLocArr.slice(0);
        clone.splice(pageLocArr.length - 1, 1, authenticatedPages[0]);
        window.location.replace(`${clone.join("/")}`);
      } else if (userdata?.data()?.role == "admin") {
        let clone = pageLocArr.slice(0);
        clone.splice(pageLocArr.length - 1, 1, adminpages[0]);
        window.location.replace(`${clone.join("/")}`);
      }
    } else if (
      adminpages.find(
        (dt) => dt.split("/")[dt.split("/").length - 1] === pagename
      )
    ) {
      let userdata = await db.collection("streamUsers").doc(user.uid).get();
      if (userdata?.data()?.role == "user") {
        let clone = pageLocArr.slice(0);
        clone.splice(pageLocArr.length - 2, 2, authenticatedPages[0]);

        window.location.replace(`${clone.join("/")}`);
      }
    } else if (
      authenticatedPages.find(
        (dt) => dt.split("/")[dt.split("/").length - 1] === pagename
      )
    ) {
      let userdata = await db.collection("streamUsers").doc(user.uid).get();
      if (userdata?.data()?.role == "admin") {
        let clone = pageLocArr.slice(0);
        clone.splice(pageLocArr.length - 2, 2, adminpages[0]);
        window.location.replace(`${clone.join("/")}`);
      }
    }
  } else {
    // console.log();

    if (authenticatedPages.find((dt) => dt.split("/")[dt.split("/").length - 1] == pagename)|| adminpages.find((dt) => dt.split("/")[dt.split("/").length - 1] == pagename)) {
      let clone = pageLocArr.slice(0);
      clone.splice(pageLocArr.length - 2, 2, unauth[0]);
      window.location.replace(`${clone.join("/")}`);
      // console.log(clone.join("/"));

      // if(clone.length){
      //   console.log(clone.join("/"));
      //   window.location.replace("https://hackathon-task-project.web.app");
      // }
      // else{
      //   window.location.replace(`${clone.join("/")}`);
      // }
      
    }
  }
});

/////////////////////////////// checking for current user

async function logOut() {
  const user = await auth.currentUser;
  await UpdateDataInStreamUsers(user?.uid, { isActive: false });
  await auth.signOut();

  alert("logout successfully");
}
