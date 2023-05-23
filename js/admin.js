//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"

window.onload = function(){
    onstart();
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

function appendRows(data){
    let models = data.model;
    let list = document.getElementById('quizList')
    list.innerHTML="";

    let tr = document.createElement('tr'); // Creates a row

    // Creates tittle cells for each
    let th = document.createElement('th');
    th.innerHTML='Model';
    tr.appendChild(th);

    let th2 = document.createElement('th');
    th.innerHTML='Picture';
    tr.appendChild(th2);
    
    
    let th3 = document.createElement('th');
    th2.innerHTML='Edit';
    tr.appendChild(th3);
    
    let th4 = document.createElement('th');
    th3.innerHTML='Delete';
    tr.appendChild(th4);


    list.appendChild(tr);

    console.log(data);
    // Loops through every activity and creates cells for each
    for(let i=0; i<models.length; i++){ 
        
        tr=document.createElement('tr');
        
        let editIcon = document.createElement("img");
        editIcon.src = '../media/edit.png';
    
        let trachcanIcon = document.createElement("img");
        trachcanIcon.src = '../media/trashcan.png';

        let td_category = document.createElement('td');
        td_category.innerHTML=categories[i].activity;
        tr.appendChild(td_category);
        
        //Edit 
        let td_edit = document.createElement('td');
        td_edit.appendChild(editIcon);
        td_edit.onclick = function () {
            editActivity(categories[i].id, categories[i].activity)
        }

        //Delete
        let td_remove = document.createElement('td');
        td_remove.appendChild(trachcanIcon);
        td_remove.onclick = function () {
            if (confirm("Are you sure you want to delete?")) {
                deleteCategory(categories[i].id)
            }
        }
        tr.appendChild(td_category);
        tr.appendChild(td_edit);
        tr.appendChild(td_remove);
        list.appendChild(tr);
    }
}

//onload
function onLoadForm(){  
    document.getElementById("saveCategoryButton").onclick=function () {
        saveCategory();
    }

    // Hides Edit Form
    document.getElementById("saveEdit").style.display = "none";
    document.getElementById("goBack").style.display = "none";
    document.getElementById("goBack").onclick=function () {
        resetForm();
    }
}

//save new category
function saveCategory(){
    let categoryInput = document.getElementById("categoryInput").value;
    let FD = new FormData();// Creates a formdata with the data for creating a new category
    FD.append("activity", categoryInput);
    FD.append("action", "save")
fetch(serverurl+ 'activity/',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not save category")
    }
    })
    resetForm();
    getTaskList();
};

//Deletes category with the same id
function deleteCategory(id) {
    let FD = new FormData();
    FD.append("action", "delete")
fetch(serverurl+ 'activity/'+id+'/',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not delete category")
    }
    })
    resetForm();
    getTaskList();
};

//Edit category
function editCategory(id){
    let categoryInput = document.getElementById("categoryInput").value;
    let FD = new FormData();// Creates a formdata with the data for editing a category
    FD.append("activity", categoryInput);
    FD.append("action", "save")
fetch(serverurl+ 'activity/'+id+'/',
{
    method: 'POST',
    body: FD
})
    .then(function(response){
    if(response.status==200){
        return response.json();
    } else {
        alert("Error, could not save category")
    }
    })
    resetForm();
    getTaskList();
}

//Resets back to original form
function resetForm() {
    getTaskList();
    document.getElementById("saveEdit").style.display = "none";
    document.getElementById("goBack").style.display = "none";
    document.getElementById("saveCategoryButton").style.display = "initial";

    document.getElementById("categoryInput").value = "";
    document.getElementById("categoryTitle").innerHTML = "New category";

    document.getElementById("saveCategoryButton").onclick=function () {
        saveCategory();
    }
}

//convert form to Edit
function editActivity(id, category) {
    let currentId=id;
    document.getElementById("saveEdit").style.display = "initial";
    document.getElementById("goBack").style.display = "initial";
    document.getElementById("saveCategoryButton").style.display = "none";
    
    document.getElementById("categoryInput").value = category;
    document.getElementById("categoryTitle").innerHTML = "Edit category";
    document.getElementById("saveEdit").onclick=function () {
        editCategory(currentId);
    }
}
