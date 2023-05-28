//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"
let parsedObject = "";

window.onload = function(){
    onstart();
}


function onstart(){   
if(document.cookie != ""){
// Read the value of a cookie
let cookieName = "session";
// Read the cookie and parse the string back to an object
let cookieString = document.cookie;
let cookies = cookieString.split(";");

cookies.forEach(function(cookie) {
  let cookiePair = cookie.split("=");
  let name = cookiePair[0].trim();
  let value = cookiePair[1].trim();

  if (name === cookieName) {
    let decodedValue = decodeURIComponent(value);
    parsedObject = JSON.parse(decodedValue);
  }})

// Edits the player name
let player = document.getElementById("player");
player.innerHTML = parsedObject[0].name;

document.getElementById("logOut").style.display = "initial";
document.getElementById("logIn").style.display = "none";

let logOut = document.getElementById("logOut");
logOut.addEventListener("click", logOutFunct);

let admin = document.getElementById("adminView");
if(parsedObject[0].admin == 1 && admin !== null) {
    document.getElementById("adminView").style.display = "initial";
}
};};

function logOutFunct(){
    console.log("test");
    // Set the name of the cookie to delete
var cookieName = "session";

// Set the expiration date to a past date
var expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() - 1);

// Construct the cookie deletion string
var cookieString = cookieName + "=; expires=" + expirationDate.toUTCString() + "; path=/";

// Set the cookie to delete
document.cookie = cookieString;
    // Refresh the page
    location.reload();
}