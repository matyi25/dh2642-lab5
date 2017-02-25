// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var apiKey = "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB";
  var dishesTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"];
  
  this.numOfGuests = 0;
  this.selectedMenu = [];

  var self = this;

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
      price = (ingredients[i].amount * this.getNumberOfGuests()) + price;
    }
    return price;
  }

  this.addDishToMenu = function(dish) {
    if (this.selectedMenu.indexOf(dish)< 0) {
      this.selectedMenu.push(dish);  
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
    }
  }

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


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});