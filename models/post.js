const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: {},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true },
    published: { type: Boolean },
    comments: [
        {
            user: { type: String },
            text: { type: String },
            date: {}
        }
    ]
});

PostSchema
    .virtual("url")
    .get(function() {
        return '/blog/post/' + this._id;
    });

module.exports = mongoose.model("Post", PostSchema);