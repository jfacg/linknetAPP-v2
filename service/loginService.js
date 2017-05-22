var app = angular.module('linknetServices',[]);

app.service('AuthService',function($window){
     return{
       isLoggedIn:isLoggedIn
     };
     function isLoggedIn(){
       if($window.localStorage.getItem('loggedIn')){
         return true;
       }else{
         console.log("User is not logged in");
         return false;
       }
     }
});

app.service('Storage',function($window){
  var store = $window.localStorage;
      return{
            getUsername: getUsername,
            setUsername: setUsername,
            remove:remove,
            save:save
      };
    function getUsername() {
      return store.getItem('username');
    }
    function setUsername(username) {
      return store.setItem('username',username);
    }
    function remove(key){
      return store.removeItem(key);
    }
    function save(key,value){
      return store.setItem(key,value);
    }

});

app.service('UserService',function($http,Storage, UrlFactory){
      this.login = function(user){
        // return $http.post('http://www.linknetcg.com.br:3000/login',user,{headers:{'Content-Type': 'application/json'}});
        return $http.post('http://localhost:3000/login',user,{headers:{'Content-Type': 'application/json'}});
      };

      this.logout = function(){
         Storage.remove('auth-token');
         Storage.remove('username');
         Storage.remove('loggedIn');
      };
});
