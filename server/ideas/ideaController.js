// Idea Controller
// ---------------
//
// The idea controller handles requests passed from the idea router.

// The Q module is used to bind Mongoose methods to use promises.
var Q = require('q');
var Idea = require('./ideaModel.js');
var markdown = require('markdown').markdown;

module.exports = {

  // Retrieve all of the ideas that exist in the MongoDB database.
  allIdeas: function(req, res, next) {

    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var findAllIdeas = Q.nbind(Idea.find, Idea);

    findAllIdeas(req.query)
      .then(function(ideas) {
        res.json(ideas);
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Add a new idea to the MongoDB database.
  newIdea: function(req, res, next) {
    // Bind the Mongoose create method to the Idea model, so that the Q module can use promises with it.
    var createIdea = Q.nbind(Idea.create, Idea);

    // Convert Markdown string into HTML to store in DB
    var detailsMD = req.body.details;
    var detailsHTML = markdown.toHTML(detailsMD);

    // Create a new document from the Idea model. If successfully created then the new Idea document is returned.
    var newIdea = {
      title: req.body.title,
      text: req.body.text,
      created_by: req.body.created_by,
      board: req.body.board,
      detailsMD: detailsMD,
      detailsHTML: detailsHTML
    };

    console.log(newIdea);

    createIdea(newIdea)
      .then(function (createdIdea) {
        if (createdIdea) {
            res.json(createdIdea);
        }
      })
      .fail(function(error) {
        next(error);
      });
  }

};
