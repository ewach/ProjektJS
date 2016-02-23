  app.controller('OrderCtrl', function ($scope, orderData, $state, dataService) {
    var me = this;


    this.saveContactData = function() {
        orderData.order.orderInfo = {
            'number' : $scope.number,
            'adress' : $scope.adress,
            'remarks' : $scope.remarks
        }
    }

    this.validateNumber = function(number) {
        if (number !== undefined)
        return true;
        return false
    }
    this.validateAdress = function(adress) {
        if (adress !== undefined)
        return true;
        return false;
    }
    this.validate = function() {
        if (!this.validateNumber($scope.number)) {
            $scope.information = 'Wprowadz poprawny numer';
            console.log('numer')
            return false;
        }
        else if(!this.validateAdress($scope.adress)) {
            $scope.information = 'Wprowadz poprawny adres';
            console.log('adres')
            return false;
        }   
        else {
            return true;
        }         
    }


    $scope.sendData = function() {
        if (me.validate()) {
 // * sends the POST request to the server,
 // * will show error message if request fails,
 // * will go to 'Order Status' view with order id from successful request,
            me.saveContactData()
            orderData.sendOrder()
                .then(function(res, err) {
                    // console.log(res)
                    orderData.clearData();
                    $state.go('status', {orderId: res.data.id});

                })
                .catch(function(err) {
                    console.log('error')
                    console.log(err);
                });

        }
    };

    var getIngredientsList = function() {
        dataService.getIngredientsList()
            .then(function(data, err) {
                var ingr = data.data
                var ingrDict = {}
                for (var i in ingr) {
                    ingrDict[ingr[i].id] = ingr[i];
                }
                $scope.ingredients = ingrDict
            }); 
    };
    this.load = function() {
        getIngredientsList();
        $scope.totalsum = orderData.order.totalPrice;
        $scope.order = orderData.order.order;
        $scope.information = '';
    }
    this.load();
  });
