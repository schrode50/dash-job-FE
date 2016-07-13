module.exports = function (app) {
  app.factory('sortJobs', function () {

    this.today = [];  //from active and isToay = true
    this.backlog = [];  //from active and value > 0 || isToday = false
    this.inprocess = []; //from active and value > 2
    this.applied = []; //from active and value = 1

    const service = {};

    service.getToday = function (jobs) {
      return jobs.filter(function (j) {
        return j.isToday;
      });
    };

    service.getBackLog = function (jobs) {
      return jobs.filter(function (j) {
        return (j.isToday != true);
      });
    };

    return service;
  });
};
