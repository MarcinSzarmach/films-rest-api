const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  id: {
    type: String
  },
  value: {
    type: String,
    required: true
  },
  film: { type: Schema.Types.ObjectId, ref: "film" }
});

module.exports = mongoose.model("comment", commentSchema);
