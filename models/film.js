const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const filmSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  details: {
    type: Object,
    required: true
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

module.exports = mongoose.model("Films", filmSchema);
