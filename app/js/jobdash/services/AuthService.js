'use strict';
module.exports = function(app){
  app.factory('AuthService', function($http){
    let token;
    const service = {};

    service.signUp = function(user){
      return $http.post('http://localhost:3000/signup', user)
      .then((res) => {
        token = res.data.token;
        return res;
      });
    };
    service.signIn = function(user){
      console.log('in service signin', user);
      let base64 = btoa(user.username + ':' + user.password);
      let authString = 'Basic ' + base64;
      return $http({
        method: 'POST',
        data:user,
        url: 'http://localhost:3000/signin',
        headers: {
          authorization: authString
        }
      })
      .then((res) => {
        token = res.data.token;
        return res;
      });
    };
    service.getToken = function(){
      return token;
    };
    return service;
  });
};
