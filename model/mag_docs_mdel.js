const mongoose = require('mongoose');

//magnitude of all documents model
const problemSchema = new mongoose.Schema({
    mag_values: String, 

  }, {timestamp: true});
  
  const mag_v = mongoose.model('mag_v', problemSchema);

  module.exports = mag_v;

