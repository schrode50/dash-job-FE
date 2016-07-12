module.exports = function(app) {
  require('./jobList')(app);
  require('./jobForm')(app);
  require('./eventList')(app);
  require('./jobItem')(app);
};
