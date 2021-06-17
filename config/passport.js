let localStrategy = require("passport-local").Strategy;
let bcrypt = require("bcryptjs");
//load user schema model
let USER = require("../Model/auth");

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //email strategy
        let user = await USER.findOne({ email });
        if (!user) {
          return done(null, false, { message: `no record found in db` });
        }
        //password strategy
        await bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: `incorrect passwd` });
          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    USER.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
