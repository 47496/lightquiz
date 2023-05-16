//fetch var
serverurl="http://localhost/ovningar/Lightquiz/API/"

window.onload = function(){
    onstart();
}


function onstart(){   
    document.getElementById("randomCitat").onclick=function () {
        getCitat();
    }
}