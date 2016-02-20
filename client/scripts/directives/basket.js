
app.directive('basket', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
        order : '=',
        totalsum: '='
    },
    controller: function($scope){
        // console.log($scope)
    },
    templateUrl: '../templates/basket.html',
  };
});