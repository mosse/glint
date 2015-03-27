// Markdown Controller
// ---------------
//
// The Markdown controller handles requests passed from the Markdown router.

var markdown = require('markdown').markdown;

module.exports = {

  render: function(req, res, next) {
    var text = req.body.markdown;
    var rendered = markdown.toHTML(text);
    res.json(rendered);
  }

};