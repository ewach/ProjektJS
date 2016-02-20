  app.controller('MainCtrl', function ($scope, $state, $http, dataService, orderData) {

    $scope.variable = 'zmienna';
    $scope.menu = [];
    $scope.order = [];
    $scope.totalPrice = 0;
    orderData.zmienna = 'hej';


    var round = function(n, k) {
        var factor = Math.pow(10, k);
        return Math.round(n*factor)/factor;
    };

    var countTotalSum = function(order) {
      total = 0;
      for (index in order) {
        total += order[index].price * order[index].quantity;
      }
      return round(total,2)
    }

    $scope.hide = function($event) {
        var ingredients = $event.currentTarget.querySelector('.itemingredients');
        ingredients.hidden = !ingredients.hidden;
    }

    $scope.getMenu = function() {
        dataService.getMenu()
            .then(function(data, err) {
              $scope.menu = data; 
            }
        ); 
    }

    $scope.getTotal = function(pizza){
        return round(pizza.quantity * pizza.price, 2)
    }
    $scope.load = function() {
        $scope.getMenu();
        var data = orderData.getOrder();
        $scope.order = data.order;
        $scope.totalPrice = data.totalPrice;
    }
    var pizzaInOrder = function(pizza) {
        for (i in $scope.order) {
            if  ($scope.order[i].id === pizza.id) {return true};
        }
        return false;
    }
    $scope.addPizza = function(pizza) {
        if(!pizzaInOrder(pizza)) {
        // if($scope.order.indexOf(pizza) < 0) {
            pizza.quantity = 1;
            $scope.order.push(pizza);
            $scope.totalPrice = countTotalSum($scope.order);
            // console.log($scope.order);
        }
    }
    $scope.increaseNumber = function(pizza) {
        pizza.quantity++;
        $scope.totalPrice = countTotalSum($scope.order);
    }    
    $scope.decreaseNumber = function(pizza) {
        pizza.quantity--;
        $scope.totalPrice = countTotalSum($scope.order);
        if (pizza.quantity === 0) {
            var index = $scope.order.indexOf(pizza);
            if (index > -1) {
                $scope.order.splice(index, 1);
            }
        }
    }


    $scope.saveOrder = function() {
        if($scope.order.length > 0) {
            data = {'order' : $scope.order, 
                'totalPrice' : $scope.totalPrice}
            orderData.saveOrder(data);
            $state.go('order');
        }
    }
    $scope.load();
  });
// nadać id pizzom w order
// zrobić to jako słownik