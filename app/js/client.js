require('angular');
require('angular-route');
var angular = window.angular;

var JobDash = angular.module('JobDash', ['ngRoute']);
require('./jobdash')(JobDash);
require('./router')(JobDash);
