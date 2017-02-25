// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,$location,Dinner) {
  	
	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.go = function ( path ) {
  		$location.path( path );
  	};
  	

  	$scope.getDish = function () {
  		var dishCost = 0;
  		Dinner.Dish.get({id:$routeParams.dishId},function(data){
  			$scope.loadState = "loading";
     		$scope.dish=data
     		$scope.loadState = "";
     		for (var i = 0; i < data.extendedIngredients.length; i++) {
  				dishCost = (data.extendedIngredients[i].amount * $scope.numberOfGuests) + dishCost;
  			}
  			$scope.totalPrice = dishCost;
   		}, function(data){
     		alert("Data retrival was faulty");
   		});
   	}
   	$scope.getDish();

   	$scope.addDish = function () {
   		Dinner.addDishToMenu($scope.dish);
   	}
  
});