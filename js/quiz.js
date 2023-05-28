//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"
let score=0;
let parsedObject = "";

window.onload = function(){
    getQuiz();
    onstart();
    
}
let quizData; // Variable to store the quiz data

function getQuiz(){   
    fetch(serverurl + "getQuiz")
    .then(function(response){
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        quizData = data; // Store the quiz data in the global variable
        quiz(quizData);
    })
}

function quiz(data) {
    let models = [];
    let correctModel = data[score].model;

    let picture = document.getElementById('picture');
    picture.src = 'data:image/jpeg;base64,' + data[score].picture;
  
    models.push(correctModel);
  
    // Generate three random models as wrong answers
    while (models.length < 4) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomModel = data[randomIndex].model;
  
      if (!models.includes(randomModel) && randomModel !== correctModel) {
        models.push(randomModel);
      }
    }
  
  
    // Create buttons for the models
    let buttonsContainer = document.getElementById("grid");
    buttonsContainer.innerHTML = "";
    models= shuffle(models);
  
    for (let i = 0; i < models.length; i++) {
      let button = document.createElement("button");
      button.innerHTML = models[i];
      button.id = models[i]
      button.classList.add("button");
      button.addEventListener("click", checkAnswer);
      buttonsContainer.appendChild(button);
    }
  }

function checkAnswer(event) {
    let selectedModel = event.target.innerHTML;
    let id = quizData[score].id;
    
    // Creates a formdata with all the data that gets sent to the server
    let FD = new FormData();
    FD.append("model", selectedModel);
    FD.append("id", id);
    fetch(serverurl+ 'checkAnswer/',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not check answer")
    }
    }) .then(function(data){
        if (data === true) {
            // Correct answer
            let button = document.getElementById(selectedModel); // gets the pressed button
            score++;
            let scoreText = document.getElementById("score");
            scoreText.innerHTML = "score: " + score;
            // Perform additional actions for a correct answer
            button.classList.add("green"); // Add the "green" class
            setTimeout(function () {
                if(typeof(quizData[score]?.model) == 'undefined'){
                    console.log("congratz");
                    alert("Du klarade av hela quizzen!");
                    window.location = "../index.html";
                } else {
                    quiz(quizData);
                }
             }, 2000); //will call the function after 2 secs.
            } else {

                // Wrong answer
            let wrongButton = document.getElementById(selectedModel); // gets the pressed button
            wrongButton.classList.add("red"); // Add the "red" class
            let rightButton = document.getElementById(quizData[score].model); // gets the correct button
            rightButton.classList.add("green"); // Add the "green" class
                // Perform additional actions for a wrong answer
            setTimeout(function () {
                window.location.href = "../index.html"; //will redirect back to main screen
             }, 2000); //will call the function after 2 secs.         
            }
    })
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

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }