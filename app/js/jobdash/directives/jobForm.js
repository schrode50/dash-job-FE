module.exports = function(app) {
  app.directive('jobForm', function() {
    return {
      templateUrl: './templates/job/jobform.html',
      scope: {
        job: '=',
        type: '@',
        url: '=',
        jobtitle: '=',
        jobcompany: '='
      },
      require: '^^ngController',
      link: function ($scope, elem, attr, controller) {
        $scope.deleteJob = controller.deleteJob;
        $scope.submit = function(job) {
          job.url = $scope.url;
          job.title = $scope.jobtitle;
          job.company =$scope.jobcompany;
          controller.addJobs(job);
          $scope.job = {};
          controller.paseteurl = '';
          controller.showform = false;
        };
      }

    };
  });
};
