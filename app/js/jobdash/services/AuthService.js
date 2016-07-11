module.exports = function(app) {
  app.factory('AuthService', function($http, $window) {
    let token = $window.localStorage.token;
    const service = {};

    service.signUp = function(user) {
      return $http.post('http://localhost:3000/signup', user)
        .then((res) => {
          token = res.data.token;
          $window.localStorage.token = token;
          return res;
        });
    };

    service.signIn = function(user) {
      let base64Auth = btoa(user.username + ':' + user.password);
      let authString = 'Basic ' + base64Auth;

      return $http({
        url: 'http://localhost:3000/signin',
        method: 'POST',
        headers: {
          authorization: authString
        }
      }).then((res) => {
        console.log('here');
        token = res.data.token;
        $window.localStorage.token = token;
        return res;
      });
    };

    service.signOut = function() {
      token = $window.localStorage.token = null;
    };

    service.getToken = function() {
      return token;
    };

    return service;
  });
};
