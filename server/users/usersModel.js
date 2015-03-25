// User Model
// ----------
//
// The User model defines the structure of all of the User documents created.

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  wallet: {
    type: Number,
    default: 30
  }
});

UserSchema.methods.comparePasswords = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    callback(isMatch);
  });
};

UserSchema.pre('save', function (next) {
  var newUser = this;
  bcrypt.hash(this.password, null, null, function(err, hash){
    if (err){
      console.log(err);
    } else {
      newUser.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model('users', UserSchema);
