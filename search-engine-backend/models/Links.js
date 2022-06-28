const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinksSchema = new Schema({
  link_name: {
    type: String,
    required: true,
  },
  link_address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hits: {
    type: Number,
    default: 0
  },
  health: {
    type: Boolean,
    default: true
  }
  
});

module.exports = mongoose.model("links", LinksSchema);
