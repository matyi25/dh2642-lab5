// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource, $cookieStore) {
  
  var apiKey = "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB";
  var dishesTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"];

  this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
    get: {
      headers: {
        'X-Mashape-Key': apiKey
      }
    }
  });

  this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
    get: {
      headers: {
        'X-Mashape-Key': apiKey
      }
    }
  });

  var self = this;

  //Get selectedMenu from cookie
  this.getSelectedMenuFromCookie = function(cookieValue) {
    for (var i = 0; i < cookieValue.length; i++) {
      	self.Dish.get({id:cookieValue[i]},function(data){
        	self.addDishToMenu(data);
      }, function(){
        alert("Data retrival was faulty");
      	}
      )
  	}
  }

  //Load from cookie if there is one or initialized to 0 the number of guest
  if ($cookieStore.get('numOfGuests') != undefined) {
    this.numOfGuests = parseFloat($cookieStore.get('numOfGuests'))
  } else {
    this.numOfGuests = 0;
  }

  // Load from cookir if there is one or initialized to empty list the selected menu
  if ($cookieStore.get('selectedMenu') != undefined) {
    this.getSelectedMenuFromCookie($cookieStore.get('selectedMenu'));
    this.selectedMenu = [];
  } else {
    this.selectedMenu = [];
  }

  this.getMenuIds = function() {
  	var ids = []
  	for (var i = 0; i < this.selectedMenu.length; i++) {
  		ids.push(this.selectedMenu[i].id);
  	}
  	return ids;
  }

  this.updateCookies = function() {
  	$cookieStore.put('numOfGuests', this.numOfGuests);
  	$cookieStore.put('selectedMenu', this.getMenuIds());
  }
  this.getAllDishesType = function () {
    return dishesTypes;
  }

  this.getMenuDishesType = function() {
    menuDishesTypes = [];
    for (var i = 0; i < this.selectedMenu.length; i++) {
      if (menuDishesTypes.indexOf(this.selectedMenu[i].dishTypes[0]) < 0) {
        menuDishesTypes.push(this.selectedMenu[i].dishTypes[0]);
      }
    }
    return menuDishesTypes;
  }


  this.setNumberOfGuests = function(num) {
    this.numOfGuests = num;
    this.updateCookies();
  }

  // should return 
  this.getNumberOfGuests = function() {
    return this.numOfGuests;
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    for (var i = 0; i < this.selectedMenu.length; i++) {
      if (this.selectedMenu[i].type == type) {
        return this.selectedMenu[i];
      }
    }
    return undefined;
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    return this.selectedMenu;
  }


  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    var ingredients = [];
    for (var i = 0; i < this.selectedMenu.length; i++) {
      ingredients = ingredients.concat(this.selectedMenu[i].extendedIngredients);
    }
    return ingredients;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var price = 0;
    var ingredients = this.getAllIngredients();
    for (var i = 0; i < ingredients.length; i++) {
      price = (ingredients[i].amount * this.numOfGuests) + price;
    }
    return price;
  }

  this.addDishToMenu = function(dish) {
    var isThere = false;
    for(var i=0; i<this.selectedMenu.length; i++) {
	if(this.selectedMenu[i].id == dish.id) {
	    isThere = true;	
	  }
    }
    if (!isThere) {
      this.selectedMenu.push(dish);
      this.updateCookies();
      // Update the selectedMenu cookie with the new menu to which we added one dish id 
    }        
  }

  this.removeDishFromMenuId = function(id) {
    var removeIndex = -1;
    for (var i = 0; i < this.selectedMenu.length; i++) {
      if (this.selectedMenu[i].id == id) {
        removeIndex = i;
      }
    }
    if(removeIndex > -1) {
      this.selectedMenu.splice(removeIndex, 1);
      // Update the selectedMenu cookie with the new menu from which we removed one dish id
      this.updateCookies();
    }
  }
  
  return this;

});
