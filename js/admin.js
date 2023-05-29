// Fetch var
const serverurl = "http://localhost/ovningar/Lightquiz/API/";
let parsedObject = "";

window.onload = function() {
  onLoadForm();
  getQuiz();
  onstart();
}

function getQuiz() {
  fetch(serverurl + "getQuiz")
    .then(function(response) {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then(function(data) {
      appendRows(data);
    })
}

// Onload
function onLoadForm() {
  document.getElementById("saveQuizButton").onclick = function() {
    saveQuiz();
  }

  // Hides Edit Form
  document.getElementById("saveEdit").style.display = "none";
  document.getElementById("goBack").style.display = "none";
  document.getElementById("goBack").onclick = function() {
    resetForm();
  }
}

function appendRows(data) {

  let list = document.getElementById('quizList');
  list.innerHTML = "";

  let tr = document.createElement('tr'); // Creates a row

  // Creates title cells for each
  let th = document.createElement('th');
  th.innerHTML = 'Model';
  tr.appendChild(th);

  let th2 = document.createElement('th');
  th2.innerHTML = 'Picture';
  tr.appendChild(th2);


  let th3 = document.createElement('th');
  th3.innerHTML = 'Edit';
  tr.appendChild(th3);

  let th4 = document.createElement('th');
  th4.innerHTML = 'Delete';
  tr.appendChild(th4);


  list.appendChild(tr);

  // Loops through every activity and creates cells for each
  for (let i = 0; i < data.length; i++) {

    tr = document.createElement('tr');

    let editIcon = document.createElement("img");
    editIcon.src = '../media/edit.png';

    let trachcanIcon = document.createElement("img");
    trachcanIcon.src = '../media/trashcan.png';

    let picture = document.createElement("img");
    picture.classList.add("picture");
    picture.src = 'data:image/jpeg;base64,' + data[i].picture;

    let td_model = document.createElement('td');
    td_model.innerHTML = data[i].model;
    tr.appendChild(td_model);

    // Picture
    let td_picture = document.createElement('td');
    td_picture.appendChild(picture);
    td_picture.classList.add("td_picture");

    // Edit 
    let td_edit = document.createElement('td');
    td_edit.appendChild(editIcon);
    td_edit.classList.add("icon");
    td_edit.onclick = function() {
    let picture = 'data:image/jpeg;base64,' + data[i].picture;
    editForm(data[i].id, data[i].model, picture)
    }

    // Delete
    let td_remove = document.createElement('td');
    td_remove.appendChild(trachcanIcon);
    td_remove.classList.add("icon");
    td_remove.onclick = function() {
      if (confirm("Are you sure you want to delete?")) {
        deleteQuiz(data[i].id)
      }
    }

    tr.appendChild(td_model);
    tr.appendChild(td_picture);
    tr.appendChild(td_edit);
    tr.appendChild(td_remove);
    list.appendChild(tr);
  }
}

// Save new Quiz
function saveQuiz() {
  let modelInput = document.getElementById("modelInput").value;
  //cleaning up the image file 
  let pictureInput = document.getElementById("pictureInput").files[0];
  let FD = new FormData(); // Creates a formdata with the data for creating a new model
  FD.append("model", modelInput);
  FD.append("picture", pictureInput);
  fetch(serverurl + 'saveQuiz/', {
      method: 'POST',
      body: FD
    })
    .then(function(response) {
      if (response.status == 200) {
        return response.json();
      } else {
        alert("Error, could not save quiz")
      }
    })
  resetForm();
}

// Deletes quiz with the same id
function deleteQuiz(id) {
  let FD = new FormData();
  FD.append("id", id);
  fetch(serverurl + 'deleteQuiz', {
      method: 'POST',
      body: FD
    })
    .then(function(response) {
      if (response.status == 200) {
        return response.json();
      } else {
        alert("Error, could not delete quiz")
      }
    })
  resetForm();
}

// Edit Quiz
function editQuiz(id) {
  let modelInput = document.getElementById("modelInput").value;
  let pictureInput = document.getElementById("pictureInput").files[0];
  let FD = new FormData(); // Creates a formdata with the data for editing a Quiz
  FD.append("model", modelInput);
  FD.append("picture", pictureInput);
  FD.append("id", id);
  fetch(serverurl + 'editQuiz', {
      method: 'POST',
      body: FD
    })
    .then(function(response) {
      if (response.status == 200) {
        return response.json();
      } else {
        alert("Error, could not edit quiz")
      }
    })
  resetForm();
}

// Resets back to the original form
function resetForm() {
  setTimeout(function () {
    getQuiz();
 }, 200);
  document.getElementById("pictureInput").value = null;
  document.getElementById("saveEdit").style.display = "none";
  document.getElementById("goBack").style.display = "none";
  document.getElementById("saveQuizButton").style.display = "initial";
  document.getElementById("modelInput").value = "";
  document.getElementById("quizTitle").innerHTML = "New model";

  document.getElementById("saveQuizButton").onclick = function() {
    saveQuiz();
  }
}

// Convert form to Edit
function editForm(id, model, picture) {
  let currentId = id;
  imageInput=document.getElementById("pictureInput")

  // Create a Blob object with the predetermined image data
  const blob = dataURItoBlob(picture);
  
  // Create a File object from the Blob
  const file = new File([blob], 'image.jpg');
  
  // Create a FileList object and add the File
  const fileList = new DataTransfer();
  fileList.items.add(file);
  
  // Set the FileList as the files property of the input element
  imageInput.files = fileList.files;

  document.getElementById("saveEdit").style.display = "initial";
  document.getElementById("goBack").style.display = "initial";
  document.getElementById("saveQuizButton").style.display = "none";

  document.getElementById("modelInput").value = model;
  document.getElementById("quizTitle").innerHTML = "Edit Quiz";
  document.getElementById("saveEdit").onclick = function() {
    editQuiz(currentId);
  }
  // Helper function to convert a data URI to a Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
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
  if(typeof parsedObject !== 'undefined' && typeof parsedObject[0] !== 'undefined' && parsedObject[0].name !== undefined){
      playername = parsedObject[0].name;
      let player = document.getElementById("player");
      player.innerHTML = playername;
      
      document.getElementById("logOut").style.display = "initial";
      document.getElementById("logIn").style.display = "none";
      
      let logOut = document.getElementById("logOut");
      logOut.addEventListener("click", logOutFunct);
      
      let admin = document.getElementById("adminView");
      if(parsedObject[0].admin == 1 && admin !== null) {
          document.getElementById("adminView").style.display = "initial";
      }}
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