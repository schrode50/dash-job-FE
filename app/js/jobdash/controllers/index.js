module.exports = function(app) {
  require('./EventController.js')(app);
  require('./JobController.js')(app);
  require('./AuthController.js')(app);
};
