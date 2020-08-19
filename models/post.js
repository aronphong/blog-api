const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postTitle: { type: String, required: true },
  text: { type: String, required: true },
  date: {},
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  published: { type: Boolean },
  comments: [
    {
      commenter: { type: mongoose.Types.ObjectId, ref: "User" },
      text: { type: String },
      date: {},
    },
  ],
});

PostSchema.virtual("url").get(function () {
  return "/blog/post/" + this._id;
});

module.exports = mongoose.model("Post", PostSchema);
