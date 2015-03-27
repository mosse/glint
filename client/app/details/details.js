// Details controller
// ----------------
//

// The pattern we're using here is the pattern we're using across all our controllers: the controllerAs syntax. This syntax is for Angular versions 1.2 and up, and means you don't have to use `$scope` anymore. Instead, inside of your HTML, you declare your controller with `ng-controller="IdeasCtrl as ictrl"` and reference your variables within that controlled scope as `ictrl.<varname>`. Additionally, instead of setting your properties within your controller to `$scope`, assign your controller's `this` to a variable called self and set your properties to that.
angular.module('glint.details', [])

// The ModalCtrl is part of the angular-ui directive to display a modal
.controller('DetailsCtrl', function($modal) {
  var self = this;
  self.open = function(idea) {
    var modalInstance = $modal.open({
      templateUrl: 'app/details/details.html',
      controller: 'DetailsInstanceCtrl',
      size: 'lg',
      resolve: {  // allows us to access idea object in DetailsInstanceCtrl
        idea: function () {
          return idea;
        }
      }
    });
  };
})

.controller('DetailsInstanceCtrl', function($scope, $modalInstance, $sce, Markdown, idea) {
  // user doesn't start with previewing rendered markdown
  $scope.previewing = false;

  $scope.submitDetails = function() {
    idea.details = $scope.markdownText;
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.previewMarkdown = function(text) {
    // must use .then() due to asynchronous call
    Markdown.render(text).then(function(data){
      $scope.previewing = true;
      $scope.renderedText = $sce.trustAsHtml(data);
    });
  };

  $scope.editMarkdown = function() {
    $scope.previewing = false;
  };
});
