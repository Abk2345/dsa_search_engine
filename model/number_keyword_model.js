const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    number_keyword_values: String, 

  }, {timestamp: true});
  
  const num_key_doc = mongoose.model('num_key_doc', problemSchema);

  module.exports = num_key_doc;

