module.exports = function(app) {
  app.directive('jobDirective', function() {
    return {
      templateUrl: './templates/jobdash/job.html',
      scope: {
        job: '=',
        form:'@'
      }
    };

  });
};
