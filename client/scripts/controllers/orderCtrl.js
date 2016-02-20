  app.controller('OrderCtrl', function ($scope, orderData, $state) {
    var me = this;

    $scope.totalsum = orderData.order.totalPrice;
    $scope.order = orderData.order.order;
    $scope.number = undefined;
    $scope.adress = undefined;
    $scope.remarks = undefined;
    $scope.information = '';
    this.saveContactData = function() {
        orderData.order.clientData = {
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
            orderData.sendOrder($scope.order)
                .then(function(res, err) {
                    // console.log(res)
                    orderData.clearData();
                    $state.go('status', {orderId: res.data.id});

                })
                .catch(function(err) {
                    console.log('Blad' + err);
                });

        }
    };
  });
