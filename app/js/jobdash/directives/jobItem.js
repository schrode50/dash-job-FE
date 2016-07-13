module.exports = function(app){
  app.directive('jobItem', function() {
    return{
      templateUrl:'./templates/job/jobItem.html',
      scope:{
        singleJob:'@'
      },
      require:'^^ngController',
      link:function($scope,elem,attr,controller){
        $scope.$watch('singleJob', function(){
          $scope.singleJob = controller.singleJob;
          console.log($scope.singleJob);
        });
      }
    };
  });
};
