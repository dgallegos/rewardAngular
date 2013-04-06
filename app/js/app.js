'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'rewardStyleServices', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);