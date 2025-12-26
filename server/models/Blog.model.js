const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  body: {
    type: String,
    required: [true, "Body is required"],
    trim: true
  },
  imageurl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Blog", BlogSchema);
