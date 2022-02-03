// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDQEEh6u-Ctu2oquYbX2J7nBt5NPuyRhaM",
    authDomain: "hackathon-task-project.firebaseapp.com",
    projectId: "hackathon-task-project",
    storageBucket: "hackathon-task-project.appspot.com",
    messagingSenderId: "786120623198",
    appId: "1:786120623198:web:dab54ca1b265a9486960cf",
    measurementId: "G-LPVDV5C12S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
///////////////////////////////


let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

let email = document.getElementById('email');
let password = document.getElementById('password');

let age = document.getElementById('typeNumber');


var genderSelect = document.getElementById('citySelect')


function register() {
    console.log(genderSelect.value);
    if(email.value && password.value &&age.value&&genderSelect.value){
        if (email.value.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )==null) {
              alert("Email is Invalid")
    
            console.log("done1")
            console.log(email.value)
           
        }else if(password.value.length<8){
                alert("Password Must be At least 8 Characters")
        }else if(age.value<1||age.value>99){
            alert("Age is Not Valid")
        }else{
             auth.createUserWithEmailAndPassword(email.value, password.value)
                .then(async (UserCredientials) => {
                    let dataObj = {
                        email: UserCredientials.user.email,
                        age:age.value,
                        gender:genderSelect.value,

                        UID: UserCredientials.user.uid,
                    }
                    await saveDataToFirestore(dataObj)
                    if (UserCredientials.user) {
                        email.value = '';
                        password.value = '';
                        age.value = '';
    
                    }
                })
                .catch((error) => {
                    alert(error.message)

                    console.log(error.message)
                })
        }
    }else{
        alert("Please Fill Empty Fields")
    }
}
let parag=document.getElementById("helo")

function login() {
    auth.signInWithEmailAndPassword(email.value, password.value)
        


}

async function saveDataToFirestore(dataObjEl) {
    let currentUser = auth.currentUser;
    await db.collection('streamUsers').doc(currentUser.uid).set(dataObjEl);

    console.log('agha', dataObjEl)


}


//////////////////////////////// checking for current user

 auth.onAuthStateChanged((user) => {
    let pageLocArr = window.location.href.split('/');
    // let pageName = pageLocArr[pageLocArr.length - 1];
    let authenticatedPages = ['afterlogin.html'];
    let unauth=["login.html","register.html","index.html"]
    let pagename=pageLocArr[pageLocArr.length-1]
console.log(pagename);
    if(user){
        
        if(!authenticatedPages.find((dt)=>dt===pagename)){
            let clone =pageLocArr.slice(0)
            clone.splice(pageLocArr.length-1,1,authenticatedPages[0])
            console.log(clone);
            window.location.replace(`${clone.join("/")}`)
        }

        
    }else{

        if(!unauth.find((dt)=>dt==pagename)){
            let clone =pageLocArr.slice(0)

            clone.splice(pageLocArr.length-1,1,unauth[0])
            console.log(clone);
            window.location.replace(`${clone.join("/")}`)
        }

        // else{

        // }
      
    }
});

/////////////////////////////// checking for current user




async function logOut() {

    await auth.signOut()
    alert("logiut successfully")

}