const LocalStrategy = require('passport-local'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  User = require('./models/user'),
  config = require('./config.json');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    paswordField: 'password',
    session: false
  }, function(email, password, done) {
    User.findOne({
      email: email
    }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Неправильный email или пароль'});
      }
      return done(null, user);
    });
  }));

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.jwtsecret,
    session: false
  };

  passport.use(new JwtStrategy(jwtOptions, function(payload, done) {
    console.log(payload);
    User.findById({
      _id: payload._id
    }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }));
};
