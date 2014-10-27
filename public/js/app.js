var mainUrl="http://localhost:9000/api/";
var getAllUrl=mainUrl+"getAll";
var getOneUrl=mainUrl+"getOne";
console.log(getOneUrl);





function setHtml(title, content,status,id) {
    document.getElementById('selectedTodo').innerText = id;
    document.getElementById('selectedTitle').innerText = title;
    document.getElementById('selecetedContent').innerHTML = content;
    //document.getElementById('selectedTodo').innerText = id;
    var oop = document.getElementById('operations');
    oop.setAttribute('style','display:block');
}

var getOne= function (id) {

    var title ="";
    var content = "";
    var status = "";

    var getReq = new XMLHttpRequest();
    getReq.onreadystatechange = function (){

        if(getReq.readyState == 4)
        {
            console.log("readt state 4");
            if(getReq.status == 200 || getReq.status == 304){
                var todo = JSON.parse(getReq.responseText);

               title = todo.title;

               content = todo.content;
               status = todo.done;
               setHtml(title,content,status,id);
                console.log("set html");
            }
        }
        else   {
            //alert(getReq.status , getReq.statusText);
        }

    }

    getReq.open("GET",getOneUrl+"/"+id.toString(),true);

    getReq.send();


}


var deleteOne= function (id) {

    var a = confirm("Are you sure to delete?");
    if(!a){return;}


    var getReq = new XMLHttpRequest();
    getReq.onreadystatechange = function (){

        if(getReq.readyState == 4)
        {
            console.log("readt state 4");
            if(getReq.status == 200 || getReq.status == 304){
                alert("deleted!");
                updateUI(id,"del");
            }
        }
        else   {

        }

    }

    getReq.open("DELETE",getOneUrl+"/"+id.toString(),true);

    getReq.send();


}

var updateUI = function (id, op) {
    if(op==="del"){

        var row = document.getElementById(id);
        document.removeChild(row);
    }
    else if (op === "up"){


    }
}

var markAsCompleted = function  (id){
    var a = confirm("Mark as complete!?");
    if(!a){return;}


    var getReq = new XMLHttpRequest();
    getReq.onreadystatechange = function (){

        if(getReq.readyState == 4)
        {
            console.log("readt state 4");
            if(getReq.status == 200 || getReq.status == 304){
                alert("Updated!");
            }
        }
        else   {

        }

    }

    getReq.open("PUT",getOneUrl+"/"+id.toString(),true);

    getReq.send();

    }


var cancelOp = function(){
    var oop = document.getElementById('operations');
    oop.setAttribute('style','display:none');
}

var deleteTodo = function(id){


}
