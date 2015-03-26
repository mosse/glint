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

  // Refresh the ideas on route change
  $rootScope.$on('$routeChangeSuccess', function(event) {
    self.displayIdeas();
  });

  self.logout = function(){
    self.Auth.user = null;
    Auth.logout();
  };

  // Display all ideas currently in the database.
  self.displayIdeas = function(){
    var board = $location.path().split('/').slice(-1)[0];
    Ideas.getIdeas(board)
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
    // console.log(Auth.getUser());
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
        self.displayIdeas();
      })
      .catch(function (error){
        console.error('createIdea error', error);
      });
    }
  };

  self.displayIdeas();
});
