module.exports = function (app) {
  app.directive('addBar', function () {
    return {
      templateUrl: './templates/job/addBar.html',
      scope: {},
      require: '^^ngController',
      link: function ($scope, elem, attr, controller) {
        $scope.pasteHandler = function (event) {
          controller.getLink({
            url: event.clipboardData.getData('text/plain')
          });
          controller.showform = true;
        };

        $scope.$watch('pasteUrl', function (newModel, oldModel) {
          controller.pasteUrl = $scope.pasteUrl;
        });

      },
      controller: ['$scope', function ($scope) {

      }]
    };

  });
};
