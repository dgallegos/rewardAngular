'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'rewardStyleServices', 'rsDirectives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);