// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,$location,Dinner) {

	$scope.dishesTypes = Dinner.getAllDishesType();
	$scope.loadState = false;

	$scope.go = function ( path ) {
  		$location.path( path );
  	};

   	$scope.search = function(query,type) {
   		$scope.loadState = true;
   		Dinner.DishSearch.get({query:query,type:type},function(data){
     	$scope.dishes=data.results;
     	$scope.loadState = false;
   	}, function(data){
     	alert("Data retrival was faulty");
   	});
 }

});