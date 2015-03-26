// DetailsView controller
// ----------------
//

angular.module('glint.detailsView', [])

.controller('DetailsViewCtrl', function($modal) {
  var self = this;
  self.open = function(idea) {
    var modalInstance = $modal.open({
      templateUrl: 'app/detailsView/detailsView.html',
      controller: 'DetailsViewInstanceCtrl',
      size: 'lg',
      resolve: {
        idea: function(){
          return idea;
        }
      }
    });
  };
})

.controller('DetailsViewInstanceCtrl', function($scope, $modalInstance, $sce, idea) {
  $scope.renderedText = $sce.trustAsHtml(idea.detailsHTML);
  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  }
});