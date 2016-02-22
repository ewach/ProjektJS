
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

    this.sendOrder = function() {
        console.log('send order:')
        me.order['extras'] = [];
        console.log(me.order)
        return $http.post('http://127.0.0.1:8080/order', me.order);
    };
    this.clearData()
  });
