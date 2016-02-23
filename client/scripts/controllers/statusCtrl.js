  app.controller('StatusCtrl', function ($scope, orderData, $stateParams, dataService) {

    me = this;
    this.orderStatus = '';
    $scope.order = '';
    $scope.totalsum = 0;
    $scope.estimatedTime = '';
    $scope.orderDate = '';
    $scope.menu ={};
    $scope.ingredients ={};

    this.convertMS = function(ms) {
      var d, h, m, s;
      s = Math.floor(ms / 1000);
      m = Math.floor(s / 60);
      s = s % 60;
      h = Math.floor(m / 60);
      m = m % 60;
      return { h: h, m: m, s: s };
    };
    var round = function(n, k) {
        var factor = Math.pow(10, k);
        return Math.round(n*factor)/factor;
    };

    this.countTotalSum = function(order) {
      total = 0;
      for (index in order) {
        total += order[index].price * order[index].quantity;
      }
      return round(total,2)
    }
    
    this.countTimeLeft = function(dateString) {
        var date = new Date(dateString)
        var now = new Date(Date.now());
        var timeRest = date - now
        if (timeRest < 0) timeRest = 0;
        return me.convertMS(timeRest);
    }

    var normalizeOrder = function(data) {
      // console.log(data)
      var order = data.order;
      for (i in order) {
        var pizza = $scope.menu[order[i].pizza.id]
        pizza.quantity = order[i].quantity
        pizza.extraIngredients = order[i].pizza.extraIngredients
        for(ing in pizza.extraIngredients) {
          pizza.price += $scope.ingredients[pizza.extraIngredients[ing]].price
        }
        order[i] = pizza;
      }
      return order;
    }

    $scope.getStatus = function(id) {
      orderData.checkStatus(id)
          .then(function(status, err) {
              me.orderStatus = status;
              $scope.status = status;
              $scope.orderId = id;
              $scope.order = normalizeOrder(status.data.order);
              $scope.estimatedTime = me.countTimeLeft(status.data.estimated);
              $scope.totalsum = me.countTotalSum($scope.order);
              document.querySelector('#status').hidden = false;
              // załaduj zamownienie
          })
          .catch(function(err) {
               console.log('nie ma takiego zamówienia')
               // załaduj nie ma zamowienia
          });

    }

    $scope.load = function() {
      dataService.getIngredientsList()
            .then(function(data, err) {
                var ingr = data.data
                var ingrDict = {}
                for (var i in ingr) {
                    ingrDict[ingr[i].id] = ingr[i];
                }
                $scope.ingredients = ingrDict
            })
            .then(dataService.getMenu()
            .then(function(data, err) {
                var menu = data.data
                var menuDict = {}
                for (var i in menu) {
                    menuDict[menu[i].id] = menu[i];
                }
                $scope.menu = menuDict
                if($stateParams.orderId !== undefined)
                  $scope.getStatus($stateParams.orderId);
            })
            );
        

    }
    $scope.load()
  });