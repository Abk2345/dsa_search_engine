const mongoose = require('mongoose');
const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problems?retryWrites=true&w=majority"
const all_problem = require('./model/problem_model');
const keyword = require('./model/keyword_model');
const itf_doc = require('./model/itf_values_model');
const tf_idf = require('./model/tf_idf_schema');
// const app = express();
const fs = require('fs');
var CircularJSON = require('circular-json');

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connected to db"))
.catch((err) => console.log("problen in connecting: "+err));

var loc = window.location.href;
console.log(loc);