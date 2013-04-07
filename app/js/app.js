'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'rewardStyleServices', 'rsDirectives'])
 .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
          when('/', {templateUrl: 'partials/featured.html', controller: 'FeaturedCtrl'}).
      otherwise({redirectTo: '/phones'});
  }]);