module.exports = function (app) {

  app.directive('paneContainer', function () {
    return {
      templateUrl: './templates/clickPanes/paneContainer.html',
      scope: {
        backlog: '=',
        today: '=',
        inprocess: '=',
        applied: '='
      },
      require: '^^ngController',
      link: function ($scope, elem, attr, controller) {
        $scope.$watch('backlog', function () {
          $scope.backlogCount = $scope.backlog.length;
        }, true);

        $scope.$watch('today', function () {
          $scope.todayCount = $scope.today.length;
        }, true);

        $scope.$watch('inprocess', function () {
          $scope.inprocessCount = $scope.inprocess.length;
        }, true);

        $scope.$watch('applied', function () {
          $scope.appliedCount = $scope.applied.length;
        }, true);

        $scope.todayclick = function (){
          controller.showjobevents = true;
          controller.showbacklog = false;
        };

        $scope.backlogclick = function (){
          controller.showjobevents = false;
          controller.showbacklog = true;
        };

      },
      controller: ['$scope', function($scope) {


        $scope.inprocessclick = function (){alert();};
        $scope.appliedclick = function (){alert();};
      }]
    };
  });
};
