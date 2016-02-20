
 'use strict';
app
  .service('orderData', function ($http) {
    var me = this;

    this.saveOrder = function(data) {
        this.order = data;
    }
    this.clearData = function() {
           this.order = {
            'order' : [],
            'totalPrice' : 0,
            'clientData' : ''
        };
        this.orderStatus = 0;
        this.orderId = '';     
    }

    this.checkStatus = function(number) {
        return $http.get('http://127.0.0.1:8080/order/' + number)
    }

    this.getOrder = function () {
        return this.order;
    }

    this.sendOrder = function(data) {
        return $http.post('http://127.0.0.1:8080/order', data);
    };
    this.clearData()
  });
