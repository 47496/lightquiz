//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"

window.onload = function(){
    onLoadForm();
    getQuiz();
}

function getQuiz(){   
    fetch(serverurl + "getQuiz")
    .then(function(response){
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        appendRows(data);
    })
}

//onload
function onLoadForm(){  
    document.getElementById("saveQuizButton").onclick=function () {
        saveQuiz();
    }

    // Hides Edit Form
    document.getElementById("saveEdit").style.display = "none";
    document.getElementById("goBack").style.display = "none";
    document.getElementById("goBack").onclick=function () {
        resetForm();
    }
}

function appendRows(data){
    let list = document.getElementById('quizList');
    list.innerHTML="";

    let tr = document.createElement('tr'); // Creates a row

    // Creates tittle cells for each
    let th = document.createElement('th');
    th.innerHTML='Model';
    tr.appendChild(th);

    let th2 = document.createElement('th');
    th2.innerHTML='Picture';
    tr.appendChild(th2);
    
    
    let th3 = document.createElement('th');
    th3.innerHTML='Edit';
    tr.appendChild(th3);
    
    let th4 = document.createElement('th');
    th4.innerHTML='Delete';
    tr.appendChild(th4);


    list.appendChild(tr);

    // Loops through every activity and creates cells for each
    for(let i=0; i<data.length; i++){ 
        
        tr=document.createElement('tr');
        
        let editIcon = document.createElement("img");
        editIcon.src = '../media/edit.png';
    
        let trachcanIcon = document.createElement("img");
        trachcanIcon.src = '../media/trashcan.png';
        
        let picture = document.createElement("img");
        picture.classList.add("picture");
        picture.src = data[i].picture;

        let td_model = document.createElement('td');
        td_model.innerHTML=data[i].model;
        tr.appendChild(td_model);
        
        //picture
        let td_picture = document.createElement('td');
        td_picture.appendChild(picture);
        td_picture.classList.add("td_picture");

        //Edit 
        let td_edit = document.createElement('td');
        td_edit.appendChild(editIcon);
        td_edit.classList.add("icon");
        td_edit.onclick = function () {
            editForm(data[i].id, data[i].model, data[i].picture)
        }

        //Delete
        let td_remove = document.createElement('td');
        td_remove.appendChild(trachcanIcon);
        td_remove.classList.add("icon");
        td_remove.onclick = function () {
            if (confirm("Are you sure you want to delete?")) {
                deleteQuiz(data[i].id)}
        }
        
        tr.appendChild(td_model);
        tr.appendChild(td_picture);
        tr.appendChild(td_edit);
        tr.appendChild(td_remove);
        list.appendChild(tr);
    }
}

//save new Quiz
function saveQuiz(){
    let modelInput = document.getElementById("modelInput").value;
    let pictureInput = document.getElementById("pictureInput").value;
    let FD = new FormData();// Creates a formdata with the data for creating a new model
    FD.append("model", modelInput);
    FD.append("picture", pictureInput);
fetch(serverurl+ 'saveQuiz/',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not save quiz")
    }
    })
    resetForm();
    getQuiz();
};

//Deletes quiz with the same id
function deleteQuiz(id) {
    let FD = new FormData();
    FD.append("id", id);
fetch(serverurl+ 'deleteQuiz',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not delete quiz")
    }
    })
    resetForm();
    getQuiz();
};

//Edit Quiz
function editQuiz(id){
    let modelInput = document.getElementById("modelInput").value;
    let pictureInput = document.getElementById("pictureInput").value;
    let FD = new FormData();// Creates a formdata with the data for editing a Quiz
    FD.append("model", modelInput);
    FD.append("picture", pictureInput);
    FD.append("id", id);
fetch(serverurl+ 'editQuiz',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not edit quiz")
    }
    })
    resetForm();
    getQuiz();
}

//Resets back to original form
function resetForm() {
    getQuiz();
    document.getElementById("saveEdit").style.display = "none";
    document.getElementById("goBack").style.display = "none";
    document.getElementById("saveQuizButton").style.display = "initial";

    document.getElementById("modelInput").value = "";
    document.getElementById("quizTittle").innerHTML = "New model";

    document.getElementById("saveQuizButton").onclick=function () {
        saveQuiz();
    }
}

//convert form to Edit
function editForm(id, model, picture) {
    let currentId=id;
    document.getElementById("saveEdit").style.display = "initial";
    document.getElementById("goBack").style.display = "initial";
    document.getElementById("saveQuizButton").style.display = "none";
    
    document.getElementById("modelInput").value = model;
    document.getElementById("pictureInput").value = picture;
    document.getElementById("quizTittle").innerHTML = "Edit Quiz";
    document.getElementById("saveEdit").onclick=function () {
        editQuiz(currentId);
    }
}
