const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/multer");
const upload = multer({
  storage, //de structured
});
let { ensureAuthenticate } = require("../helpers/auth_helper");

const USER = require("../Model/auth");

//import schema
const GALLERY_SCHEMA = require("../Model/gallery");
//* all gets routes
router.get("/create-gallery", ensureAuthenticate, (req, res) => {
  res.render("./gallery/CreateGallery");
});
//fetch gallery data
router.get("/", ensureAuthenticate, async (req, res) => {
  let gallery = await GALLERY_SCHEMA.find({ user: req.user }).lean();
  res.render("./home", { gallery });
});

//==all public gallery
router.get("/public", async (req, res) => {
  let gallery = await GALLERY_SCHEMA.find().lean();
  res.render("./gallery/public", { gallery });
});

//===
//* all post routes
router.post(
  "/create-gallery",
  ensureAuthenticate,
  upload.single("photo"),
  async (req, res) => {
    try {
      let { photo_name } = req.body;
      let newGallery = {
        photo: req.file,
        photo_name,
        user: req.user,
      };
      await new GALLERY_SCHEMA(newGallery).save();
      res.redirect("/gallery", 302, () => {});
    } catch (error) {
      console.log(error);
    }
  }
);
//* all put routes
//* all delete routes

module.exports = router;
