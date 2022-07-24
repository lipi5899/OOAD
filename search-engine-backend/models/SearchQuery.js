const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchQuerySchema = new Schema({
  title: {
    type: String,
    required: true,  
  },
  hits: {
    type: Number,
    default: 1
  },
});

module.exports = mongoose.model("searchQueries", SearchQuerySchema);
