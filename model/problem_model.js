const mongoose = require('mongoose');

//problem model
const problemSchema = new mongoose.Schema({
    problem_desc: String,
    problem_url: String,
    problem_title: String,
    problem_topic: String,
    problem_diff: String,
    problem_mag: Number,
    problem_id: Number
  }, {timestamp: true});
  
  const all_problem = mongoose.model('all_problem', problemSchema);

  module.exports = all_problem;

