module.exports = function(app) {
  app.controller('JobController', function($http, AuthService, sortJobs) {
    this.$http = $http;
    this.jobs = [];
    this.today = [];  //from active and isToay = true
    this.backlog = [];  //from active and value > 0
    this.inprocess = []; //from active and value > 2
    this.applied = []; //from active and value = 1

    this.getActiveJobs = function(){
      $http({
        method: 'GET',
        url:'http://localhost:3000/jobs/active',
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        this.jobs = res.data;
        this.today = sortJobs.getToday(this.jobs)
        this.backlog = sortJobs.getBackLog(this.jobs)
        console.log("today",sortJobs.getToday(this.jobs));
      },(err) => {
        console.log(err);
      });
    };

    this.addJobs = function(job) {
      $http({
        method: 'POST',
        data: job,
        url: 'http://localhost:3000/jobs',
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        this.jobs.push(res.data);
      }, (err) => {
        console.log(err);
      });
    }.bind(this);

    this.deleteJobs = function(job) {
      $http({
        method: 'DELETE',
        data: job,
        url: 'http://localhost:3000/jobs/' + job._id,
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(() => {
        let index = this.jobs.indexOf(job);
        this.jobs.splice(index, 1);
      }, (err) => {
        console.log(err);
      });
    }.bind(this);

    this.updateJobs = function(job) {
      $http({
        method: 'PUT',
        data: job,
        url: 'http://localhost:3000/jobs/' + job._id,
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(() => {
        this.jobs = this.jobs.map(nJob => {
          return nJob._id === job._id ? job : nJob;
        });
      }, (err) => {
        console.log(err);
      });
    }.bind(this);
  });
};
