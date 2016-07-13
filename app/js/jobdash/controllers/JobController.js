module.exports = function (app) {
  app.controller('JobController', function ($http, AuthService, sortJobs) {
    this.$http = $http;
    this.jobs = [];
    this.events = [];
    this.today = []; //from active and isToay = true
    this.backlog = []; //from active and value > 0
    this.inprocess = []; //from active and value > 2
    this.applied = []; //from active and value = 1
    this.showform = false;
    this.showjobevents = false;
    this.showbacklog = true;
    this.paseteurl = '';
    this.mode='list';
    this.singleJob;
    this.formjobTitle = '';
    this.formjobCompany = '';

    this.getLink = function (link) {
      $http({
        method: 'POST',
        data: link,
        url: 'http://localhost:3000/link',
        headers: {
          token: AuthService.getToken()
        }
      })
        .then((res) => {
          this.formjobCompany = res.data.company;
          this.formjobTitle  = res.data.title;
        }, (err) => {
          console.log(err);
        });
    }.bind(this);


    this.getActiveJobs = function () {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/jobs/active',
        headers: {
          token: AuthService.getToken()
        }
      })

        .then((res) => {
          this.jobs = res.data;
          this.today = sortJobs.getToday(this.jobs);
          this.backlog = sortJobs.getBackLog(this.jobs);
        })
        .then(() => {
          $http({
            method: 'GET',
            url: 'http://localhost:3000/events/active',
            headers: {
              token: AuthService.getToken()
            }
          })
            .then((res) => {
              this.events = res.data;
            }, (err) => {
              console.log(err);
            });
        });
    };
    this.addJobs = function (job) {
      $http({
        method: 'POST',
        data: job,
        url: 'http://localhost:3000/jobs',
        headers: {
          token: AuthService.getToken()
        }
      })
        .then((res) => {
          this.backlog.push(res.data);
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.addEvent = function (events) {
      $http({
        method: 'POST',
        data: events,
        url: 'http://localhost:3000/events',
        headers: {
          token: AuthService.getToken()
        }
      })
        .then((res) => {
          this.events.push(res.data);
        }, (err) => {
          console.log(err);
        });
    };

    this.deleteJobs = function (job) {
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

    this.updateJobs = function (job) {
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

    // this.changeView = function(){
    //   console.log('change view controller');
    //   if(this.mode === 'list') {
    //     this.mode = 'single';
    //   }
    //   console.log('change view controller', this.mode);
    // };
  });
};
