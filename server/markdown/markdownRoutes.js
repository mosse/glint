// Markdown Routes
// -----------
//
// The Markdown routes further routes any requests to /api/markdown in the middleware to specific User methods defined in the Markdown controller.

var markdownController = require('./markdownController.js');

module.exports = function (app) {
  app.post('/', markdownController.render);
};