  app.controller('ContactCtrl', function ($scope, $http) {
    this.contact = '';
    $scope.pizzeriaName = '';
    $scope.address = '';
    $scope.phone = '';
    $scope.hours = '';
    $scope.getContact = function() {
        $http.get('http://127.0.0.1:8080/contact')
            .then(function(data) {
              this.contact = data.data;
                $scope.pizzeriaName = this.contact.name;
                $scope.address = this.contact.address;
                $scope.phone = this.contact.phone;
                $scope.hours = this.contact.hours;              
            }
        ); 
    }
    $scope.load = function() {
        $scope.getContact()
    }
    $scope.load()
  });
