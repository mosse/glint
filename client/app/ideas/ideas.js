// Ideas controller
// ----------------
//

// The pattern we're using here is the pattern we're using across all our controllers: the controllerAs syntax. This syntax is for Angular versions 1.2 and up, and means you don't have to use `$scope` anymore. Instead, inside of your HTML, you declare your controller with `ng-controller="IdeasCtrl as ictrl"` and reference your variables within that controlled scope as `ictrl.<varname>`. Additionally, instead of setting your properties within your controller to `$scope`, assign your controller's `this` to a variable called self and set your properties to that.
angular.module('glint.ideas', [])
.controller('IdeasCtrl', function (Ideas, $rootScope, $filter, Auth, $location){
  var self = this;
  self.data = { ideas: [] };
  self.idea = {};
  self.postSuccess = false;
  self.submitted = false;
  self.Auth = Auth;
  self.board = true;
  self.title = "What's your great idea?";

  // Refresh the ideas on route change
  $rootScope.$on('$routeChangeSuccess', function(event) {
    var args = $location.path().split('/');
    if (args.length > 2){
      var query = {};
      if (args[1] === 'user') {
        args[1] = 'created_by';
        self.board = false;
        self.title = args[2] + "'s ideas";
      } else {
        self.board = true;
        self.title = args[2] + " idea board";
      }
      query[args[1]] = args[2];
      self.displayIdeas(query);
    } else {
      self.board = true;
      self.title = "What's your great idea?";
      self.displayIdeas({board:'global'});
    }
  });

  self.logout = function(){
    self.Auth.user = null;
    Auth.logout();
  };

  // Display all ideas currently in the database.
  self.displayIdeas = function(query){
    Ideas.getIdeas(query)
      .then(function (results){
        results = $filter('orderBy')(results, 'votes', true);
        self.data.ideas = results;
      })
      .catch(function (error){
        console.error('displayIdeas error', error);
      });
  };

  // Submit a new idea.
  self.submitIdea = function ($timeout){

    if (!self.Auth.user){
      $location.path('/login');
      return;
    }

    // Show description box.
    if (self.submitted === false){
      self.submitted = true;
    } else {

    // Escape user input.
    self.idea.title = _.escape(self.idea.title);
    self.idea.text = _.escape(self.idea.text);
    self.idea.created_by = self.Auth.user.username;
    self.idea.board = $location.path().split('/').slice(-1)[0];
    if (!self.idea.board) self.idea.board = 'global';
    var idea = JSON.stringify(self.idea);

    // POST new idea, display confirmation, redisplay all ideas.
    Ideas.createIdea(idea)
      .then(function (response){
        // Show user feedback.
        self.postSuccess = true;
        // Hide idea description field.
        self.submitted = false;
        // Clear form fields after submit.
        self.idea = {};
        self.data.ideas.push(response);
        // self.displayIdeas();
      })
      .catch(function (error){
        console.error('createIdea error', error);
      });
    }
  };

  self.displayIdeas();
})
// The ModalCtrl is part of the angular-ui directive to display a modal
.controller('ModalCtrl', function($modal) {
  var self = this;
  self.items = ['item1','item2','item3'];
  self.open = function() {
    var modalInstance = $modal.open({
      templateUrl: 'app/ideas/modal.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        items: function() {
          return self.items;
        }
      }
    });
  };
})

.controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
