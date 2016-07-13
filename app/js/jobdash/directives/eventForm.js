module.exports = function(app){
  app.directive('eventForm', function() {
    return {
      templateUrl:'./templates/job/eventForm.html',
      scope: {
        type:'@',
        event:'='
      },
      require:'^^ngController',
      link:function($scope,elem,attr,controller){
        $scope.addEvent = controller.addEvent;
      }
    };
  });
};
