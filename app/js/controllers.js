'use strict';

/* Controllers */



function RewardCtrl($scope,RewardService)
{
  $scope.hello = "Hello World";

  RewardService.getFavorites.async().then(function(returnJson) {
      // Assign return data to Client Object
      $scope.favorites = returnJson;
    });

}
