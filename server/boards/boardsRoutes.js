// Board Routes
// --------------
//
// The Boards routes further routes any requests to /api/boards in the middleware to specific Boards methods defined in the Boards controller.

var ideaController = require('../ideas/ideaController.js');

module.exports = function (app) {
    // Further route from the /api/comments path. A GET request will return all comments for the specified idea. A POST request will add a comment to the specified idea.
    app.get('/:board', ideaController.allIdeas);
};
