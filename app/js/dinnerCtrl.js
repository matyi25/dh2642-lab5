// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope, $location, Dinner) {

  	$scope.numberOfGuests = Dinner.getNumberOfGuests();
  	$scope.fullMenu = Dinner.getFullMenu();
  	$scope.fullMenuPrice = Dinner.getTotalMenuPrice();

  	$scope.go = function ( path ) {
  		$location.path( path );
  	};

  	$scope.setNumberOfGuest = function(number){
    	Dinner.setNumberOfGuests(number);
  	}

  	$scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
  	}

  	$scope.getDishPrice = function(dish) {
  		var price = 0;
  		for (var i = 0; i < dish.extendedIngredients.length; i++) {
      		price = (dish.extendedIngredients[i].amount * $scope.getNumberOfGuests()) + price;
    	}
    	return price;
  	}

  	$scope.removeDish = function(dishId) {
  		Dinner.removeDishFromMenuId(dishId);
  	}

  	$scope.getFullMenu = function () {
  		return Dinner.getFullMenu();
  	}

  	$scope.getFullMenuPrice = function() {
  		return Dinner.getTotalMenuPrice();

  	}


});