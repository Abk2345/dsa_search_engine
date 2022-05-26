const mongoose = require('mongoose');

//tf_idf_values of the matrix model
const problemSchema = new mongoose.Schema({
    tf_idf_values: String, 

  }, {timestamp: true});
  
  const tf_idf = mongoose.model('tf_idf', problemSchema);

  module.exports = tf_idf;

