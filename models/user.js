const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    admin: {type: Boolean},
    username: {type: String, required: true },
    password:  { type: String, required: true },
    comment: [
        {
            text: { type: String },
            date: {}
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);