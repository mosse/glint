// Votes controller
// ----------------

angular.module('glint.votes', [])

.controller('VotesCtrl', function($window, Votes, Auth, $location){
  var self = this;
  self.gCount = 1;

  // Display the user's upvotes and pass them along to the db.
  self.upvote = function(idea){
    var gCount = +self.gCount;
    if (!Auth.user){
      $location.path('/login');
      return;
    }
    if (Auth.user.wallet-gCount < 0 || Auth.user.username === idea.created_by){
      return;
    }
    var ideaRef = idea;
    idea = {idea: idea, gCount: gCount, username: Auth.user.username};
    idea = JSON.stringify(idea);
    ideaRef.votes+= gCount;
    Auth.user.wallet-= gCount;
    Auth.update();
    Votes.upvote(idea)
      .then(function (response){
        // Update the specific idea's vote count.
      })
      .catch(function (error){
        console.error('upvote error', error);
      });
  };

  // Display the user's downvotes and pass them along to the db.
  self.downvote = function(idea){
    var ideaRef = idea;

    idea = JSON.stringify(idea);
    Votes.downvote(idea)
      .then(function (response){
        // Update the specific idea's vote count.
        ideaRef.votes--;
      })
      .catch(function (error){
        console.error('downvote error', error);
      });
  };
});
