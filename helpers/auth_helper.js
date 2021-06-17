module.exports = {
  ensureAuthenticate: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("ERROR_MESSAGE", "you are not authorized");
      res.redirect("/auth/login", 301, () => {});
    }
  },
};
