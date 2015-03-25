// Server-Side Middleware
// ----------------------
//
// The middleware connects the Express server app with the Express routers and configures the Express app to use additional modules such as body-parser, and morgan.

// Allows for parsing of POST request body.
var bodyParser  = require('body-parser');
// Error logging and handling helper functions.
var helpers = require('./helpers.js'); 
// Logs requests sent from the client.
var morgan = require('morgan'); 

module.exports = function (app, express) {

  // Create Express routers for each type of route.
  var ideaRouter = express.Router();
  var voteRouter = express.Router();
  var commentRouter = express.Router();
  var usersRouter = express.Router();
  var emailRouter = express.Router();

  // Associate the Express server app with the different modules that it should use.
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(morgan('dev'));
  app.use(helpers.logErrors);
  app.use(helpers.handleErrors);

  // Use the idea router for all idea requests.
  app.use('/api/ideas', ideaRouter); 
  // Use vote router for requests related to upvoting or downvoting.
  app.use('/api/vote', voteRouter);
  // Use comment router for requests related to adding and getting comments.
  app.use('/api/comments', commentRouter);
  // Use users router for requests related to adding and getting user data.
  app.use('/api/users', usersRouter);
  // Use the email router for all email requests.
  app.use('/api/email', emailRouter);

  // Inject our Express routers into their respective route files.
  require('../ideas/ideaRoutes.js')(ideaRouter);
  require('../votes/voteRoutes.js')(voteRouter);
  require('../comments/commentRoutes.js')(commentRouter);
  require('../users/usersRoutes.js')(usersRouter);
  require('../emails/emailRoutes.js')(emailRouter);

};
