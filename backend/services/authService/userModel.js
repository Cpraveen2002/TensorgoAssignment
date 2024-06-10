const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String
});

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this();
  this.findOne({ googleId: profile.id }, async (err, result) => {
    if (!result) {
      userObj.googleId = profile.id;
      userObj.email = profile.emails[0].value;
      userObj.name = profile.displayName;
      await userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
