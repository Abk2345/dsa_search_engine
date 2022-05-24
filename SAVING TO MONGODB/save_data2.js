const mongoose = require('mongoose');
const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problem2?retryWrites=true&w=majority"
const all_problem = require('../model/problem_model');
const express = require('express');
const keyword = require('../model/keyword_model');
const mag_v = require('../model/mag_docs_mdel');
const itf_doc = require('../model/itf_values_model');
const app = express();
const fs = require('fs');


// const mongoose = require('mongoose');
// const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problem?retryWrites=true&w=majority"
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("problen in connecting: " + err));


app.get('/', (req, res) => {
    const data = keywords.find();
    console.log(data);
    res.send(data);
})

var problem_desc = [];
var problem_title = [];
var problem_url = [];
var problem_topic = [];
var problem_diff = [];


for(var i=1; i<=2265; i++)
{
var str = fs.readFileSync('All_Problems_set/Problems_description/problem_'+i.toString()+'.txt').toString();
// str = str.toLowerCase();
problem_desc.push(str);
var str = fs.readFileSync('All_Problems_set/Problem_topics/problem_topic_'+i.toString()+'.txt').toString();
// str = str.toLowerCase();
problem_topic.push(str);
var str = fs.readFileSync('All_Problems_set/Problem_difficulty/problem_difficulty_'+i.toString()+'.txt').toString();
// str = str.toLowerCase();
problem_diff.push(str);
var str = fs.readFileSync('All_Problems_set/Problems_links/problem_url_'+i.toString()+'.txt').toString();
// str = str.toLowerCase();
problem_url.push(str);
var str = fs.readFileSync('All_Problems_set/Problems_titles/problem_title_'+i.toString()+'.txt').toString();
// str = str.toLowerCase();
problem_title.push(str);
}

// key.save().then(result => {
//   console.log('keywords saved!')
// }).catch((err) => {
//   console.log(err);
// })




var tf_idf_matrix = fs.readFileSync('tf_value_doc_desc.txt').toString().split(',');
var tf_value_doc = [];
var x = 2265;

// var mp = new Map();
// for (var i = 0; i < x; i++) {
//     var values = [];
//     for (var j = 0; j < tf_idf_matrix.length / (x*3); j+=3) {
//         var x = tf_idf_matrix[(tf_idf_matrix.length / (x*3)) * i + j];
//         var y = tf_idf_matrix[(tf_idf_matrix.length / (x*3)) * i + j+1];
//         var val = tf_idf_matrix[(tf_idf_matrix.length / (x*3)) * i + j+2];


//     }
//     // console.log(values);
//     // tf_value_doc.push(values);
// }
// console.log(tf_value_doc);
// console.log(tf_value_doc[0].length);
// console.log(tf_idf_matrix.length/(2265*3));
// console.log(tf_idf_matrix)

var key_doc_length = fs.readFileSync('number_keyword_doc.txt').toString().split(',');




var mag_docs = [];
var prev_key_len = 0;
for (var i = 0; i < 2265; i++) {
    var value = 0;
    var key_len = parseInt(key_doc_length[i]);
    // console.log(prev_key_len);
    
    for (var j = 0; j < 3*key_len; j+=3) {
        // console.log(i*prev_key_len+j);
        
        var x = parseInt(tf_idf_matrix[prev_key_len+j]);
        var y = parseInt(tf_idf_matrix[prev_key_len+j+1]);

        

        // console.log(value);
        if (isNaN(tf_idf_matrix[prev_key_len+j+2])) {
            // console.log("here "+ i +" - "+ j );
        } else {
            var val = Number(tf_idf_matrix[prev_key_len+j+2]);
            value += val*val;
        }

    }
    // console.log(Math.sqrt(value));
    // mag_docs.push(Math.sqrt(value));

    prev_key_len += key_len*3;
   
    // mag_docs.push(Math.sqrt(value));

    const all_prob = new all_problem({
        problem_desc: problem_desc[i],
        problem_diff: problem_diff[i],
        problem_topic: problem_topic[i],
        problem_title: problem_title[i],
        problem_url: problem_url[i],
        problem_mag: Math.sqrt(value),
        problem_id: i+1
    });

    all_prob.save().then(result => {
        console.log('problem saved!')
    }).catch((err) => {
        console.log(err);
    });



}

// console.log(mag_docs)

var to_save = mag_docs.toString();

// const mag_save = new mag_v({
//     mag_values: to_save,
// });

// mag_save.save().then(result => {
//     console.log('mags saved!')
// }).catch((err) => {
//     console.log(err);
// });