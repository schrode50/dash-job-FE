module.exports = function(app){
  app.directive('eventList', function(){
    return {
      templateUrl:'./templates/job/eventList.html',
      scope: {
        events:'='
      }
    };
  });
};
