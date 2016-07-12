module.exports = function(app) {

  let updateListItem = function(newList, oldList) {

    var bIds = {};
    oldList.forEach(function(obj) {
      bIds[obj._id] = obj;
    });

    // Return all elements in A, unless in B
    let delta = newList.filter(function(obj) {
      return !(obj._id in bIds);
    });
    return delta;
  };


  app.directive('jobList', function() {
    return {
      templateUrl: './templates/job/joblist.html',
      scope: {
        backlog: '=',
        today: '=',
        form: '@'
      },
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.$watch('today', function(newModel, oldModel) {
          console.log('today', $scope.today, $scope.today.length);
          console.log();
          let delta = updateListItem(newModel, oldModel);
          if (delta.length == 1) {
            delta[0].isToday = true;
            controller.updateJobs(delta[0]);
            //   let index = $scope.today.indexOf(delta[0]);
            //   console.log(index);
            //   $scope.today.splice(index, 1);
          }
        }, true);

        $scope.$watch('backlog', function(newModel, oldModel) {
          console.log('bl', $scope.backlog, $scope.backlog.length);
          let delta = updateListItem(newModel, oldModel);
          if (delta.length == 1) {
            delta[0].isToday = false;
            controller.updateJobs(delta[0]);
            // let index = $scope.today.indexOf(delta[0]);
            // console.log(index);
            // $scope.today.splice(index, 1);
          }
        }, true);
      }
    };
  });
};
