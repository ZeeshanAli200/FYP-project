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

var registerbool = false,
  loginbool = false;
async function register() {
  console.log(genderSelect.value);
  if (email.value && password.value && age.value && genderSelect.value&&userName.value) {
    if (
      email.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) == null
    ) {
      alert("Email is Invalid");

      console.log("done1");
      console.log(email.value);
    } else if (password.value.length < 8) {
      alert("Password Must be At least 8 Characters");
    } else if (age.value < 1 || age.value > 99) {
      alert("Age is Not Valid");
    } else {
      // console.log("admin", loginbool, registerbool);
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
          userName:userName.value.trim(),
          isActive:true
        };

        let setdt = await db
          .collection("streamUsers")
          .doc(UserCredientials.user.uid)
          .set(dataObj);
        
        window.location.replace("./userpages/userlogin.html");
        registerbool = true;
        console.log(registerbool);
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
console.log(registerbool);
async function login() {
  let user=await auth.signInWithEmailAndPassword(email.value, password.value);
  console.log(user);
  // await saveDataInStreamUsers()
}

async function saveDataToFirestore(dataObjEl) {
  let currentUser = auth.currentUser;
  console.log("uid", currentUser.uid);
  await db.collection("streamUsers").doc(currentUser.uid).set(dataObjEl);

}
async function saveDataInStreamUsers(id,data){
  return await db.collection("streamUsers").doc(id).set(data);
}

//////////////////////////////// checking for current user


auth.onAuthStateChanged(async (user) => {
  let pageLocArr = window.location.href.split("/");
// user pages
  let authenticatedPages = ["userpages/userlogin.html","userpages/userhome.html"];
// unauthuser pages  
  let unauth = ["login.html", "register.html", "index.html"];
// admin pages  
  let adminpages = ["adminpages/afterlogin.html","adminpages/adminpage1.html"];

  let pagename = pageLocArr[pageLocArr.length - 1];
  console.log(pagename);
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
    } else if (adminpages.find((dt) => dt.split("/")[dt.split("/").length-1] === pagename)) {
      let userdata = await db.collection("streamUsers").doc(user.uid).get();
      if (userdata?.data()?.role == "user") {
        let clone = pageLocArr.slice(0);
        clone.splice(pageLocArr.length - 2, 2, authenticatedPages[0]);
        window.location.replace(`${clone.join("/")}`);
      }   
    }
    else if (authenticatedPages.find((dt) => dt.split("/")[dt.split("/").length-1] === pagename)) {   
        let userdata = await db.collection("streamUsers").doc(user.uid).get();
       if (userdata?.data()?.role == "admin") {
          let clone = pageLocArr.slice(0);
          clone.splice(pageLocArr.length - 2, 2, adminpages[0]);
          window.location.replace(`${clone.join("/")}`);
        }
      }
  } else {
    if (!unauth.find((dt) => dt == pagename)) {
      let clone = pageLocArr.slice(0);
      clone.splice(pageLocArr.length - 2, 2, unauth[0]);
      console.log(clone);
      window.location.replace(`${clone.join("/")}`);
    }  
  }
});

/////////////////////////////// checking for current user

async function logOut() {
  await auth.signOut();
  alert("logout successfully");
}
