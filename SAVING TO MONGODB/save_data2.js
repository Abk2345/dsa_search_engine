const mongoose = require('mongoose');
const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problem2?retryWrites=true&w=majority"
const all_problem = require('../model/problem_model');
const express = require('express');
const keyword = require('../model/keyword_model');
const mag_v = require('../model/mag_docs_mdel');
const itf_doc = require('../model/itf_values_model');
const app = express();
const fs = require('fs');

//connecting to mongo db
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("problen in connecting: " + err));


//storing data in array
var problem_desc = [];
var problem_title = [];
var problem_url = [];
var problem_topic = [];
var problem_diff = [];


//total number of document is 2265
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


var tf_idf_matrix = fs.readFileSync('tf_value_doc_desc.txt').toString().split(',');
var tf_value_doc = [];
var x = 2265;


var key_doc_length = fs.readFileSync('number_keyword_doc.txt').toString().split(',');

var all_keyw = fs.readFileSync('all_keywords_titles.txt').toString().split(',');
var sz = all_keyw.length;


var mag_docs = [];

//calculating tf-idf for problem titles
for (var i = 0; i < 2265; i++) {
    var value = 0;
    for(var j=0; j<sz; j++)
    {
        if(!isNaN(tf_idf_matrix[i*sz+j]))
        {
            value+= tf_idf_matrix[i*sz+j]*tf_idf_matrix[i*sz+j];
        }
    }
    

    // console.log(Math.sqrt(value))
    mag_docs.push(Math.sqrt(value));

    //saving all the problems to data base (mongo db atlas)
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

//saving magnitude of all documents to db
var to_save = mag_docs.toString();

const mag_save = new mag_v({
    mag_values: to_save,
});

mag_save.save().then(result => {
    console.log('mags saved!')
}).catch((err) => {
    console.log(err);
});