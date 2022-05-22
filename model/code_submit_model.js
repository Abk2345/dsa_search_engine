const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    code: String, 
    problem_id: Number

  }, {timestamp: true});
  
  const code_submission = mongoose.model('code_submission', problemSchema);

  module.exports = code_submission;
