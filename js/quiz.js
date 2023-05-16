//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"

window.onload = function(){
    getQuiz();
}


function getQuiz(){   
    fetch(serverurl+ "getQuiz")
    .then(function(response){
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        picture(data);
    })
}

function picture(data){
    let picture = data.picture;
    img.setAttribute('picture', picture);
}
//*** document.getElementById("randomCitat").onclick=function () { getCitat() } */