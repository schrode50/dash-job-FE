module.exports = function (app) {
  app.directive('eventForm', function (globals) {
    return {
      templateUrl: './templates/job/eventForm.html',
      scope: {
        jobid: '='
      },

      require: '^^ngController',
      link: function ($scope, elem, attr, controller) {
        $scope.addEvent = function (event) {
          event.jobId = $scope.jobid;
          event.typeId = $scope.selected.id;
          event.value = $scope.selected.value;
          console.log($scope.items[0]);
          controller.addEvent(event);
        }
      },
      controller: function ($scope) {
        $scope.items = globals.eventTypes;
      }
    };
  });
};
