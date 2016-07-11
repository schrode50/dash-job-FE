module.exports = function(app) {
  //TODO: need to add AuthService
  app.controller('JobController', function($http) {
    this.$http = $http;
    this.jobs = [];

    this.getJobs = function(){
      this.$http.get('http://localhost:3000/jobs')
      .then((res) => {
        this.jobs = res.data.jobs;
      },(err) => {
        console.log(err);
      });
    };

    this.addJobs = function(job) {
      this.$http.post('http://localhost:3000/jobs', job)
      .then((res) => {
        this.jobs.push(res.data);
        this.newJob = null;
      }, (err) => {
        console.log(err);
      });
    }.bind(this);

    this.deleteJobs = function(job) {
      this.$http.delete('http://localhost:3000/jobs/' + job._id)
      .then(() => {
        let index = this.jobs.indexOf(job);
        this.jobs.splice(index, 1);
      }, (err) => {
        console.log(err);
      });
    }.bind(this);

    this.updateJobs = function(job) {
      this.$http.put('http://localhost:3000/jobs', job)
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
