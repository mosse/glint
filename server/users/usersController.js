// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.
var User = require('./usersModel.js');
var jwt = require('jwt-simple');

module.exports = {

  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username}, function(err, data){
      if (data){
        data.comparePasswords(password, function(isMatch){
          if (isMatch){
            var token = jwt.encode(username, 'secret');
            res.json({token: token, data: data});
            console.log('Logged in:', username);
          } else {
            console.log('Incorrect password:', username);
            return next('Incorrect password');
          }
        });
      } else {
        console.log('Invalid username:', username);
        return next('Invalid username');
      }
    });
  },

  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + password);
    User.findOne({username: username}, function(err, data){
      if (data){
        console.log('Username unavailable:', username);
        return next('Username unavailable');
      } else {
        var newUser = {
          username: username,
          password: password
        };
        User.create(newUser, function(err, data){
          if (err){
            console.log('Failed to sign up:', username);
            return next('Internal Error');
          } else {
            console.log('Signed up:', username);
            var token = jwt.encode(username, 'secret');
            res.json({token: token, data: data});
          }
        });
      }
    });
  }

};



