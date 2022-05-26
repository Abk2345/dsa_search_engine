const mongoose = require('mongoose');

//when was trying out with prob_desc, model for number of keywords in all documents
const problemSchema = new mongoose.Schema({
    number_keyword_values: String, 

  }, {timestamp: true});
  
  const num_key_doc = mongoose.model('num_key_doc', problemSchema);

  module.exports = num_key_doc;

