'use strict';

/* Services */

var sessionData = localStorage.user;

// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('rewardStyleServices', ['ngResource'])

app.factory('RewardService', function($http) {
    var RewardService = {};

    // Function to get Client JSON
    RewardService.getFavorites = {
      async: function(token) {
        var controller = 'favorites?user='+sessionData+'';
        var favoritesRequest = '/json/'+controller;

        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get(favoritesRequest).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };

    RewardService.getFeatured = {
      async: function() {
        var controller = 'featured';
        var favoritesRequest = '/json/'+controller;

        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get(favoritesRequest).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };

    return RewardService;
  });


app.factory('RewardrobeService', function($http) {
    var RewardrobeService = {};

    // Function to get Client JSON
    RewardrobeService.getPublishers = {
      async: function(token) {
        var controller = 'publishers';
        var publishersRequest = '/json/'+controller;

        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get(publishersRequest).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };


    return RewardrobeService;
  });


