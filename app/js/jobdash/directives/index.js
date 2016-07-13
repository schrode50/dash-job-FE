module.exports = function(app) {
  require('./backlog')(app);
  require('./jobForm')(app);
  require('./pane')(app);
  require('./paneContainer')(app);
  require('./addbar')(app);
  require('./eventForm')(app);
  require('./eventList')(app);
};
