// Votes controller
// ----------------

angular.module('glint.votes', [])

.controller('VotesCtrl', function($window, Votes, Auth, $location){
  var self = this;
  self.gCount = 1;
  self.message = "How many G's?";
  self.hasError = false;

  // Display the user's upvotes and pass them along to the db.
  self.upvote = function(idea){
    if (!Auth.user) { $location.path('/login'); return; }
    var gCount = +self.gCount;
    if (isNaN(gCount)) { self.hasError = true; self.message = "That's not a number!"; return; }
    if (gCount < 1) { self.hasError = true; self.message = "It needs to be more than 1..."; return; }
    if (Auth.user.wallet-gCount < 0) { self.hasError = true; self.message = "You don't have enough G's!"; return; }
    if (Auth.user.username === idea.created_by) { self.hasError = true; self.message = "You can't give yourself G's!"; return; }
    self.hasError = false;
    self.message = "How many G's?";
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
