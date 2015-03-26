// Comments controller
// -------------------
//
// This feature is still in development, but a good deal of work for it has already been done.

angular.module('glint.comments', [])

.controller('CommentsCtrl', function (Comments, Auth){
  var self = this;
  self.comment = {};
  self.comments = [''];
  self.viewingComments = false;

  // Submit eventual form inputs to the db and display something back to the user on success.
  self.submitComment = function (idea_id){
    // The comment object needs to be populated with form inputs here.
    // User input will need to be escaped, and stringified. Refer to the comment schema for the fields needed, but likely `self.comment.text`, `self.comment.idea_id`, and `self.comment.created_by` will be necessary.
    self.comment.idea_id = idea_id;
    self.comment.created_by = Auth.user.username;
    comment = JSON.stringify(self.comment);
    self.comment = {};
    Comments.createComment(comment)
      .then(function (response){
        self.comments.push(response);
        // Display the supplied comment back to the user who submitted it.
      })
      .catch(function (error){
        console.error('comment error', error);
      });
  };

  // Display all comments for a specific idea.
  self.displayComments = function (idea_id){
    if (!self.viewingComments){
      self.viewingComments = true;
      Comments.getComments(idea_id)
        .then(function (response){
          self.comments = response;
          // Display this idea's comments.
        })
        .catch(function (error){
          console.error('displayComments error', error);
        });
    } else {
      self.viewingComments = false;
    }
  };

});
