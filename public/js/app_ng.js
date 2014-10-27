/**
 * Created by adityanarayan on 10/24/14.
 */

angular.module('turnToTech', [])
    .controller('MainCtrl', ['$http','$scope', function($http,$scope) {
        var self = this;
        var items = [];
        var addingNew = false;

        self.enableAddNew = function(){

            self.addingNew =true;
        };

        self.newTodo = {};
        var fetchTodos = function() {
            return $http.get('/api/getAll').then(
                function(response) {
                    self.items = response.data;

                    //console.log(self.items);
                }, function(errResponse) {
                    console.error('Error while fetching todos');
                });
        };

        fetchTodos();


        self.addTodo =function() {
           $http.post("/api/add",self.newTodo).then(function(){
              fetchTodos();
               self.newTodo={};
               self.addingNew =false;
           });
        }
        
        self.deleteTodo = function (did) {

            var a = confirm('Are you sure to delete this todo?');
            if(!a){return;}
            $http.delete('/'+did)
                .then(fetchTodos())
                .then(function (response) {
                    console.log("status code : "+response.status+" , Status : "+response.statusText);
                })
        };

        self.changeTodoStatus = function (todo) {
            todo.done = todo.done ? false : true;

            $http.put('api/'+todo.id+"/"+todo.done)
                .then(fetchTodos())
                .then(function (response) {
                    console.log("status code : "+response.status+" , Status : "+response.statusText);
                })
        };


        self.showAll = function(){
            fetchTodos();
        }

        self.showUnComplete = function(){


            var UC = self.items;

            for(var i =0 ; i< UC.length; i++){
                if(UC[i].done){
                    UC.splice(i,1);
                }

            }

            self.items = UC;
        }


    }]);



