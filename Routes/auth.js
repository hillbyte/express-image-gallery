const express = require("express");
const router = express.Router();
let USER = require("../Model/auth");
const bcrypt = require("bcryptjs");
const passport = require("passport");
//get router
router.get("/register", (req, res) => {
  res.render("auth/Register");
});
//login get route
router.get("/login", (req, res) => {
  res.render("./auth/Login");
});
//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("SUCCESS_MESSAGE", "Successfully logout");
  res.redirect("/auth/login", 301, () => {});
});

//post req
router.post("/register", async (req, res) => {
  let { username, email, password, c_password } = req.body;
  try {
    let error = [];
    if (password !== c_password) {
      error.push({ text: "password is not matched" });
    }
    if (password < 6) {
      error.push({ text: "password should be min six char" });
    }
    if (username === "" || username === null) {
      error.push({ text: "username is required" });
    }
    if (email === "" || email === null) {
      error.push({ text: "email is required" });
    }
    if (password === "" || password === null) {
      error.push({ text: "password is required" });
    }
    if (error.length > 0) {
      res.render("./auth/Register", {
        error,
        username,
        email,
        password,
        c_password,
      });
    } else {
      //need to check user email rigister or not
      let registerInfo = await USER.findOne({ email });
      if (registerInfo) {
        console.log("Email is already registered ,try new one");
        res.redirect("/auth/Register", 301, () => {});
      } else {
        let newUser = new USER({
          username,
          email,
          password,
        });
        bcrypt.genSalt(12, (err, salt) => {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            await newUser.save();
            req.flash("SUCCESS_MESSAGE", "Successfully Account Created");
            res.redirect("/auth/login", 301, () => {});
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  //   console.log(req.body);
});

//login post route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/gallery",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
});

//==logout

module.exports = router;
