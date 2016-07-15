require('angular');
require('angular-route');
require('angular-route');
require('angular-drag-and-drop-lists');
var angular = window.angular;

var JobDash = angular.module('JobDash', ['ngRoute', 'dndLists']);
require('./jobdash')(JobDash);
require('./router')(JobDash);
<<<<<<< HEAD

let ApiUrl = process.env.URI;
console.log(ApiUrl);
=======
>>>>>>> 55ff6c3d5eebbc365a9aa581b25247f213529d4f
