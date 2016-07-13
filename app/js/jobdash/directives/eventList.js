module.exports = function(app){
  app.directive('eventList', function(){
    return {
      templateUrl:'./templates/job/eventList.html',
      scope: {
        events:'=',
        mode:'='
      },
      require:'^^ngController',
      link:function($scope,elem,attr,controller){
        console.log('directive',controller.mode);
        $scope.$watch('mode', function(){
          $scope.mode = controller.mode;
        });

      }
    };
  });
};
