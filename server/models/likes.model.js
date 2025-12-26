const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },

  username: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Like", likesSchema);
