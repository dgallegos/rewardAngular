'use strict';

/* Controllers */



function RewardCtrl($scope,$routeParams,RewardService)
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
      RewardService.getFeatured.async(token).then(function(returnJson) {
      // Assign return data to Client Object
      $scope.favorites = returnJson;
    });

  }
 // $scope.getFavorites();

}

function FeaturedCtrl($scope,RewardService)
{
  $scope.featured = {};
  $scope.featured.products = [];

  $scope.updateProducts = function () {
    RewardService.getFavorites.async().then(function(returnJson) {

      $scope.featured = $scope.convertJsonToFeatured(returnJson);
    });
  }
  $scope.convertJsonToFeatured = function(returnJson)
  {
    var featured = {}
    featured.products = new Array();
    for(var json in returnJson)
    {
      var object = {};
      object = returnJson[json].favorites;

      featured.products = featured.products.concat(object);
    }
    return featured;
  }

  $scope.findProduct = function(productId)
  {
    for(var product in $scope.featured.products)
    {
      if($scope.featured.products[product].product_id == productId)
      {
        return $scope.featured.products[product];
      }
    }
  }
  $scope.openModal = function () {
    var productId = event.currentTarget.className;
    $scope.modalProduct = $scope.findProduct(productId);
    $scope.productModal = true;
  };
  $scope.closeModal = function () {
    $scope.productModal = false;
  };
  $scope.photoOpts = {
    backdropFade: true,
    dialogFade:true
  };

  $scope.updateProducts();
}


function PublishersCtrl($scope,RewardrobeService)
{
  $scope.publishers = [];
  $scope.publishers = [{name:"Gabe Marshall",token:"325c1cd5606244517254b720e21258c8",
                                                          blog:"http://gabemarshal.jit.su"},
                        {name:"David Gallegos",token:"b90afc2290d9e37d432fa6b4e4dea0d0",
                                                blog:"http://davidgallegos.net"}];

  $scope.updatePublishers = function () {
    // Get the publishers from our
    RewardrobeService.getPublishers.async().then(function(returnJson) {
      $scope.publishers = returnJson;
    });
  }

}