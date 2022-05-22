const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    keyword_values: String, 

  }, {timestamp: true});
  
  const keyword = mongoose.model('keyword', problemSchema);

  module.exports = keyword;

