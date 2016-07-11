module.exports = function(app) {
  app.directive('jobForm', function() {
    return {
      templateUrl: './templates/job/jobform.html',
      scope: {
        job: '=',
      }
    };

  });
};
