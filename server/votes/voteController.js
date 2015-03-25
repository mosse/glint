// Vote Controller
// ---------------
//
// The vote controller handles requests passed from the vote router.

var Q = require('q');
var Idea = require('../ideas/ideaModel.js');
var User = require('../users/usersModel.js');

module.exports = {

  // Add one to the vote count for a given idea.
  upvote: function(req, res, next) {
    updateVoteCount(req, res, req.body.gCount);
  },

  // Subtract one from the vote count for a given idea.
  downvote: function(req, res, next) {
    updateVoteCount(req, res, -1);
  }

};

// Update the vote count for an idea.
var updateVoteCount = function(req, res, changeValue) {

  // Bind the findOneandUpdate method to use promises
  var updateVotes = Q.nbind(Idea.findOneAndUpdate, Idea);
  var updateUserWallet = Q.nbind(User.findOneAndUpdate, User);

  // Create queries for updating
  var ideaQuery = { title: req.body.idea.title };
  var userClickedQuery = { username: req.body.username };
  var ideaOwnerQuery = { username: req.body.idea.created_by };

  updateVotes(ideaQuery, { $inc: { votes: changeValue } })
    .then(function (idea) {
        res.send(idea);
      })
    .fail(function (err) {
      console.log(err);
      next(err);
    });

    updateUserWallet(userClickedQuery, { $inc: { wallet: -changeValue } })
      .then(function (user) {
        res.send(user);
      })
      .fail(function (err) {
        console.log(err);
        next(err);
      });

    updateUserWallet(ideaOwnerQuery, { $inc: { wallet: changeValue } })
      .then(function (user) {
        res.send(user);
      })
      .fail(function (err) {
        console.log(err);
        next(err);
      });
};
