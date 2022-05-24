const mongoose = require('mongoose');
const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problem2?retryWrites=true&w=majority"
const all_problem = require('../model/problem_model');
const keyword = require('../model/keyword_model');
const itf_doc = require('../model/itf_values_model');
const tf_idf = require('../model/tf_idf_schema');
const num_key_doc = require('../model/number_keyword_model');
// const app = express();
const fs = require('fs');
var CircularJSON = require('circular-json');

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connected to db"))
.catch((err) => console.log("problen in connecting: "+err));

//get all data in query
// app.get('/', (req, res) => {
//     // const data = all_problem.find();
    
// })



// const all_prob = new all_problem({
//   problem_desc: "My name is problem",
//   problem_diff: "Easy",
//   problem_topic: "Introduction",
//   problem_title: "Self",
//   problem_url: "https://google.com",
// });

var all_keyws = fs.readFileSync('number_keyword_doc.txt').toString();
console.log(all_keyws);

const key = new num_key_doc({
  number_keyword_values: all_keyws
})

key.save().then(result => {
  console.log('Doc saved!')
}).catch((err) => {
  console.log(err);
})

// var tf_idf_v = fs.readFileSync('tf_value_doc_desc.txt').toString();
// console.log(tf_idf_v);

// const key = new tf_idf({
//     tf_idf_values: tf_idf_v 
//   })
  
//   key.save().then(result => {
//     console.log('TF-IDF values saved!')
//   }).catch((err) => {
//     console.log(err);
//   })

// var itf_v = fs.readFileSync('itf_value_titles.txt').toString();
// console.log(itf_v);

// const key = new itf_doc({
//     itf_values: itf_v 
//   })
  
// key.save().then(result => {
//     console.log('IDF values saved!')
//   }).catch((err) => {
//     console.log(err);
//   })

// all_prob.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// }).catch((err)=>{
//     console.log(err);
// });