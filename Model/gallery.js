const { Schema, model } = require("mongoose");
let gallerySchema = new Schema(
  {
    photo: {
      type: [""],
      required: true,
    },
    photo_name: {
      type: String,
      required: true,
    },
    user: {
      type: [""],
      required: true,
    },
  },
  // { collection: "abc" },
  { timestamps: true }
);
module.exports = model("gallery", gallerySchema);
