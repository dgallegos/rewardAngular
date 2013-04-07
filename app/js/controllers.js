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
      RewardService.getFavorites.async(token).then(function(returnJson) {
      // Assign return data to Client Object
      $scope.favorites = returnJson;
    });

  }
 // $scope.getFavorites();

}

function FeaturedCtrl($scope,$routeParams,$route,RewardService)
{
  $scope.featured = {};
  $scope.featured.products = [];

  $scope.modalProduct;

  $scope.update = function () {
    RewardService.getFeatured.async().then(function(returnJson) {
      $scope.featured = returnJson;
    });
  }

  $scope.update();

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
  $scope.open = function () {
    var params = {};
    qs(params);
    $scope.modalProduct = $scope.findProduct(params.pid);
    $scope.productModal = true;
  };
  $scope.close = function () {
    $scope.productModal = false;
  };
  $scope.photoOpts = {
    backdropFade: true,
    dialogFade:true
  };

  $scope.openModal = function(newModal)
  {
    for(var modal in $scope.modal)
    {
      if(newModal.modal == modal)
      {
        $scope.modal[modal].active = true;
      }
      else
      {
        $scope.modal[modal].active = false;
      }
    }
  }
  $scope.closeModal = function()
  {
    for(var modal in $scope.modal)
    {
      $scope.modal[modal].active = false;
    }
  }
}

function qs(params) {
  var query = window.location.search.substring(1);
  var parms = query.split('&');
  for (var i=0; i<parms.length; i++) {
    var pos = parms[i].indexOf('=');
    if (pos > 0) {
      var key = parms[i].substring(0,pos);
      var val = parms[i].substring(pos+1);
      params[key] = val;
    }
  }
}