// DetailsView controller
// ----------------
//

angular.module('glint.detailsView', [])

.controller('DetailsViewCtrl', function() {
  var self = this;
  self.open = function(idea) {
    console.log('the idea was clicked!', idea);
  };
});