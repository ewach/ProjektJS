app = angular.module('myapp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/main");
  //
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "templates/main.html"
    })
    .state('order', {
      url: "/order",
      templateUrl: "templates/order.html"
    })
    .state('status', {
      url: "/status",
      templateUrl: "templates/status.html",
      params: {
        orderId: undefined
      }
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "templates/contact.html"
    });
    // .state('state2.list', {
    //   url: "/list",
    //   templateUrl: "partials/state2.list.html",
    //   controller: function($scope) {
    //     $scope.things = ["A", "Set", "Of", "Things"];
    //   }
    // });

// ####States:
// * /#/main
// * /#/order
// * /#/status/:orderId
// * /#/contact
});