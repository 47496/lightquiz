serverurl = "http://localhost/ovningar/Lightquiz/API/";

document.addEventListener("DOMContentLoaded", function() {

  let loginForm = document.getElementById("loginForm");
  let signUpForm = document.getElementById("signUpForm");

if(loginForm != null){
    console.log("test")
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
  
    let email = emailInput.value;
    let password = passwordInput.value;
  
    if (email === "" || password === "") {
      alert("email and password are required");
    } else {
      // perform operation with form input
      console.log(
        `This form has a email of ${email} and password of ${password}`
      );

    // Sanitize email input
    email = email.trim(); // Remove leading and trailing whitespace

    // Sanitize password input
    password = password.trim(); // Remove leading and trailing whitespace
    password = password.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Replace "<" and ">" characters with HTML entities
    
    login(email, password)
    }
  })
};
if(signUpForm != null){
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let nameInput = document.getElementById("name");
  
    let email = emailInput.value;
    let password = passwordInput.value;
    let name = nameInput.value;
  
    if (email === "" || password === "" || name === "") {
      alert("email, password and name are required");
    } else {
      // perform operation with form input
      console.log(
        `This form has a email of ${email} and password of ${password} and a name of ${name}`
      );

    // Sanitize email and name input
    email = email.trim(); // Remove leading and trailing whitespace
    name = name.trim(); // Remove leading and trailing whitespace

    // Sanitize password input
    password = password.trim(); // Remove leading and trailing whitespace
    password = password.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Replace "<" and ">" characters with HTML entities
    
    signUp(email, password, name)
    }
  });
}});

function signUp(email, password, name) {
    let FD = new FormData();
    FD.append("name", name);
    FD.append("email", email);
    FD.append("password", password);
    fetch(serverurl + 'saveUser/', {
        method: 'POST',
        body: FD
      })
      .then(function(response) {
        if (response.status == 200) {
          return response.json();
        } else {
          alert("Coudnt create user");
        }
      }).then(function(data) {
          window.location.href = "login.html"; //will redirect back to main screen
      });
  }

function login(email, password) {
    console.log("test")
  let FD = new FormData();
  FD.append("email", email);
  FD.append("password", password);
  fetch(serverurl + 'checkUser/', {
      method: 'POST',
      body: FD
    })
    .then(function(response) {
      if (response.status == 200) {
        return response.json();
      } else {
        alert("could'nt log in");
      }
    }).then(function(data) {
        cookies(data);
        window.location.href = "../index.html"; //will redirect back to main screen
    });
}
function cookies(data){
// Convert an object to a string
var jsonString = JSON.stringify(data);

// Construct the cookie string without an expiration date
var cookieString = "session" + "=" + encodeURIComponent(jsonString) + "; path=/";

// Set the cookie
document.cookie = cookieString;
}