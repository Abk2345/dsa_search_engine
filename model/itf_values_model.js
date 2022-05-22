const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    itf_values: String, 

  }, {timestamp: true});
  
  const itf_docs = mongoose.model('itf_docs', problemSchema);

  module.exports = itf_docs;

