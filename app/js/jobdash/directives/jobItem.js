module.exports = function(app){
  app.directive('jobItem', function() {
    return{
      templateUrl:'./templates/job/jobItem.html',
      scope:{
        job:'='
      }
    };
  });
};
