//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"
let score=0;

window.onload = function(){
    getQuiz();
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
        quiz(data);
    })
}

function quiz(data) {
    let models = [];
    let correctModel = data[score].model;
    let correctId = data[score].id;

    // Set the picture source and correct answer
    document.getElementById("picture").src = data[score].picture;
  
    models.push(correctModel);
  
    // Generate three random models as wrong answers
    while (models.length < 4) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomModel = data[randomIndex].model;
      let randomId = data[randomIndex].id;
  
      if (!models.includes(randomModel) && randomId !== correctId) {
        models.push(randomModel);
      }
    }
  
  
    // Create buttons for the models
    let buttonsContainer = document.getElementById("grid");
    buttonsContainer.innerHTML = "";
  
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
    let selectedPicture = quizData[score].picture;
    console.log(selectedModel);
    console.log(selectedPicture);
    
    // Creates a formdata with all the data that gets sent to the server
    let FD = new FormData();
    FD.append("model", selectedModel);
    FD.append("picture", selectedPicture);
    fetch(serverurl+ 'checkAnswer/',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not save task")
    }
    }) .then(function(data){
        if (data === true) {
            // Correct answer
            let button = document.getElementById(selectedModel); // gets the pressed button
            score++;
            // Perform additional actions for a correct answer
            button.classList.add("green"); // Add the "green" class
            setTimeout(function () {
                window.location.href = "../index.html"; //will redirect to your blog page (an ex: blog.html)
             }, 4000); //will call the function after 2 secs.         
            } else {
                // Wrong answer
            let wrongButton = document.getElementById(selectedModel); // gets the pressed button
            wrongButton.classList.add("red"); // Add the "green" class
            let rightButton = document.getElementById(quizData[score].model); // gets the pressed button
            rightButton.classList.add("green"); // Add the "green" class
                // Perform additional actions for a wrong answer
            setTimeout(function () {
                window.location.href = "../index.html"; //will redirect to your blog page (an ex: blog.html)
             }, 4000); //will call the function after 2 secs.         
            }
    })
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