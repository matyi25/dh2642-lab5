// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,$location,Dinner) {
  	
	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	$scope.pendingName = "Pending";
  	$scope.pendingCost = 0;
  	$scope.fullMenuPrice = Dinner.getTotalMenuPrice();
  	var dishCost = 0;

	$scope.go = function ( path ) {
  		$location.path( path );
  	};
  	
	$scope.getDish = function () {
  		Dinner.Dish.get({id:$routeParams.dishId},function(data){
  			$scope.loadState = "loading";
     		$scope.dish=data
     		$scope.loadState = "";
     		$scope.pendingName = data.title;
     		$scope.pendingCost = $scope.getDishPrice(data);
   		}, function(data){
     		alert("Data retrival was faulty");
   		});
   	}

   	$scope.getPendingName = function() {
   		return $scope.pendingName;
   	}

   	$scope.getPendingCost = function() {
   		return $scope.getDishPrice($scope.dish);
   	}

   	$scope.addDish = function () {
   		Dinner.addDishToMenu($scope.dish);
   	}

   	$scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
  	}

  	$scope.getFullMenuPrice = function() {
  		return Dinner.getTotalMenuPrice();
  	}

  	$scope.getDishPrice = function(dish) {
  		var price = 0;
  		if(dish == undefined) {return 0;}
  		for (var i = 0; i < dish.extendedIngredients.length; i++) {
      		price = (dish.extendedIngredients[i].amount * $scope.getNumberOfGuests()) + price;
    	}
    	return price;
  	}

  	if($routeParams.dishId != undefined) { 
  		$scope.getDish(); 
  	}
  
});