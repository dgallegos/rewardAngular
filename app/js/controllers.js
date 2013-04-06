'use strict';

/* Controllers */



function RewardCtrl($scope,RewardService)
{
  $scope.hello = "Hello World";
  $scope.publishers = [{name:"Gabe Marshall",token:"325c1cd5606244517254b720e21258c8"},
                        {name:"David Gallegos",token:"b90afc2290d9e37d432fa6b4e4dea0d0"}];


  /*$scope.getFavorites = function(token)
  {
      var url = 'https://localhost:8000/favorites?oauth_token='+token;

      $.getJSON(url, function(json) {
        console.log(json, json.name);
        $scope.$apply(function(){
            $scope.favorites = json;
        });
      });
  }
*/

  $scope.getFavorites = function(token)
  {
      RewardService.getFavorites.async(token).then(function(returnJson) {
      // Assign return data to Client Object
      $scope.favorites = returnJson;
    });

  }
 // $scope.getFavorites();

}

function FeaturedCtrl($scope,RewardService)
{
      RewardService.getFeatured.async().then(function(returnJson) {
        $scope.featured = returnJson;
      });
}
