// Idea Controller
// ---------------
//
// The idea controller handles requests passed from the idea router.
var sendgrid_username = 'mjemacdonald' || process.env.SENDGRID_USERNAME;
var sendgrid_password = '' || process.env.SENDGRID_PASSWORD;


// The Q module is used to bind Mongoose methods to use promises.
var Q = require('q');
var Idea = require('./ideaModel.js');
var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);




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

    // Create a new document from the Idea model. If successfully created then the new Idea document is returned.
    var newIdea = {
      title: req.body.title,
      text: req.body.text,
      created_by: req.body.created_by,
      board: req.body.board
    };

    createIdea(newIdea)
      .then(function (createdIdea) {
        if (createdIdea) {
            res.json(createdIdea);
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  sendInvite: function(req, res, next){
    sendgrid.send({
      to: 'mjemacdonald@gmail.com',
      from: 'noreply@glinted.azurewebsites.net',
      subject: 'Join me on Glint: the collaborative idea generator that bites back!',
      text: 'Hi there!\n\nYour friend is looking for feedback on their ideas at Glint.\n\nCheck it out here:\n\nhttp://glinted.azurewebsites.net\n\nWith thanks from everyone at Glint.'
    });
  }

};
