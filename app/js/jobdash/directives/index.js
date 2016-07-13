module.exports = function(app) {
  require('./backlog')(app);
  require('./jobForm')(app);
  require('./eventList')(app);
  require('./pane')(app);
  require('./paneContainer')(app);
};
