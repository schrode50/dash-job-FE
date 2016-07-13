module.exports = function (app) {

  let updateListItem = function (newList, oldList) {

    var bIds = {};
    oldList.forEach(function (obj) {
      bIds[obj._id] = obj;
    });

    // Return all elements in A, unless in B
    let delta = newList.filter(function (obj) {
      return !(obj._id in bIds);
    });
    return delta;
  };

  app.directive('jobList', function () {
    return {
      templateUrl: './templates/job/joblist.html',
      scope: {
        backlog: '=',
        today: '=',
        form: '@',
        mode:'='
      },
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        // $scope.mode = controller.mode;
        // $scope.changeView = controller.changeView;
        $scope.changeView= function(){
          console.log('change view', $scope.mode);
          if($scope.mode === 'list') $scope.mode= 'single';
          //if(!job) return $scope.mode = 'list';

          if($scope.mode === 'single'){
            console.log('changing the scope mode');
            // $scope.mode = 'list'
            controller.mode = 'single';
            // $scope.currentJob = job;
          }
        };

        $scope.$watch('today', function (newModel, oldModel) {
          let delta = updateListItem(newModel, oldModel);
          if (delta.length == 1) {
            delta[0].isToday = true;
            controller.updateJobs(delta[0]);
          }
        }, true);

        $scope.$watch('backlog', function (newModel, oldModel) {
          let delta = updateListItem(newModel, oldModel);
          if (delta.length == 1) {
            delta[0].isToday = false;
            controller.updateJobs(delta[0]);
          }
        }, true);
      }
    };
  });
};
