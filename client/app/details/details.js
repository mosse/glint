// Details controller
// ----------------
//

// The pattern we're using here is the pattern we're using across all our controllers: the controllerAs syntax. This syntax is for Angular versions 1.2 and up, and means you don't have to use `$scope` anymore. Instead, inside of your HTML, you declare your controller with `ng-controller="IdeasCtrl as ictrl"` and reference your variables within that controlled scope as `ictrl.<varname>`. Additionally, instead of setting your properties within your controller to `$scope`, assign your controller's `this` to a variable called self and set your properties to that.
angular.module('glint.details', [])

// The ModalCtrl is part of the angular-ui directive to display a modal
.controller('ModalCtrl', function($modal) {
  var self = this;
  self.items = ['item1','item2','item3'];
  self.open = function() {
    var modalInstance = $modal.open({
      templateUrl: 'app/ideas/modal.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg'
    });
  };
})

.controller('ModalInstanceCtrl', function($scope, $modalInstance) {
  $scope.ok = function() {
    console.log($scope.test);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    console.log('clicked cancel');
    $modalInstance.dismiss('cancel');
  };
});
