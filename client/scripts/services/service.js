/** API:
 *  GET /contact - returns object
 *  GET /menu - returns array of objects, each containing id, name, ingredients and price
 *  POST /order - post order in form of array of object containing id (of the pizza) and quantity.
 *                Invalid id or quantity <= 0 will return 500 error
 *  GET /order/:id - returns object with order, ordered (time when order was processed) and estimated (time of arrival)
 */


 'use strict';
app
  .service('dataService', function ($http) {

    this.checkStatus = function(number) {
        return $http.get('http://127.0.0.1:8080/order/' + number)
    }
    this.getMenu = function() {
        return $http.get('http://127.0.0.1:8080/menu')
    };

    this.getIngredientsList = function () {
        return $http.get('http://127.0.0.1:8080/ingredients');
    }
  });