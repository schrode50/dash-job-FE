module.exports = function(app){
  app.controller('AuthController', function($location, AuthService) {
    this.goSignUp = function(){
      $location.url('/signup');
    };
    this.signUp = function(user){
      AuthService.signUp(user);
    };
    this.signIn = function(user){
      console.log('in controller signin', user);
      AuthService.signIn(user);
    };
  });
};
