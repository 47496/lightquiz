//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"
let parsedObject = "";

window.onload = function(){
    getLeaderboard();
    onstart();
}

function getLeaderboard() {
    fetch(serverurl + "getLeaderboard")
      .then(function(response) {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then(function(data) {
        appendRows(data);
      })
  }
  
function appendRows(data) {
  
    let list = document.getElementById('leaderboard');
    list.innerHTML = "";
  
    let tr = document.createElement('tr'); // Creates a row
  
    // Creates title cells for each
    let th = document.createElement('th');
    th.innerHTML = 'name';
    tr.appendChild(th);
  
    let th2 = document.createElement('th');
    th2.innerHTML = 'score';
    tr.appendChild(th2);
  
    list.appendChild(tr);
  
    // Loops through every activity and creates cells for each
    for (let i = 0; i < data.length; i++) {
        tr = document.createElement('tr');
        
        let td_name = document.createElement('td');
        td_name.innerHTML = data[i].name;
        tr.appendChild(td_name);

        let td_score = document.createElement('td');
        td_score.innerHTML = data[i].score;
        tr.appendChild(td_score);  
        list.appendChild(tr);
        
        if(data.length == 10 && i == data.length - 1){
        // Convert an object to a string
        var jsonLeader = JSON.stringify(data[i].score);
        
        // Construct the cookie string without an expiration date
        var cookieLeader = "leaderboard" + "=" + encodeURIComponent(jsonLeader) + "; path=/";
        
        // Set the cookie
        document.cookie = cookieLeader;
      }
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