const mongoose = require("mongoose");

//////////// MODELE DE POST ////////////
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    imageUrl: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
