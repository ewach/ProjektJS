  app.controller('StatusCtrl', function ($scope, orderData, $stateParams) {

    me = this;
    this.orderStatus = '';
    $scope.order = '';
    $scope.totalsum = 0;
    $scope.estimatedTime = '';
    $scope.orderDate = '';

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

    var normalizeOrder = function(order) {
      for (i in order) {
        order[i].pizza.quantity = order[i].quantity;
        order[i] = order[i].pizza;
      }
      return order;
    }

    $scope.getStatus = function(id) {
      orderData.checkStatus(id)
          .then(function(status, err) {
              me.orderStatus = status;
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
      if($stateParams.orderId !== undefined)
        $scope.getStatus($stateParams.orderId);
    }
    $scope.load()
  });