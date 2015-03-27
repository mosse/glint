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
  // header info
  $scope.title = idea.title;
  $scope.text = idea.text;

  // rendered markup
  $scope.renderedText = $sce.trustAsHtml(idea.detailsHTML);

  // footer stuff
  $scope.created_by = idea.created_by;
  $scope.board = idea.board;
  $scope.created_at = idea.created_at;
  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  }
});