'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('rewardStyleServices', ['ngResource']).
  factory('RewardService', function($http) {
    var RewardService = {};

    // Function to get Client JSON
    RewardService.getFavorites = {
      async: function() {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('/favorites').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };


    return RewardService;
  });

