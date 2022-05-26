const express = require('express');
var StopwordsFilter = require('node-stopwords-filter');
var f = new StopwordsFilter();
var bodyParser = require('body-parser');



const mongoose = require('mongoose');
const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problem?retryWrites=true&w=majority"
const all_problem = require('./model/problem_model');
const queryRoutes = require('./routes/routeQuery');
const topicRoutes = require('./routes/routeProblemTopics');
const diffRoutes = require('./routes/routeProblemDifficulty');

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("problen in connecting: " + err));

function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

const app = express();
var PORT = process.env.PORT || 3000;
app.listen(PORT);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));


//landing page rouute
app.get('/', (req, res) => {
    res.render('search_first_page');
})


//particular problem route
app.get('/problems/:id', (req, res) => {
    var id1 = req.params.id;

    //id - 1231

    all_problem.find({ problem_id: id1 }, (err, doc) => {
        if (!err) {
            var desc = doc[0]['problem_desc'];
            var my_desc = nl2br(desc);

            res.render('particular_problem', { body: doc, desc: my_desc });
        } else {
            console.log(err);
        }
    })
})

//submit code - work in progress
// app.post('/problems/:id/submit', (req, res)=> {
//     var prob_id = req.params.id;
//     var code_v = req.query.code;

//     console.log(prob_id, code_v);

//     const code_s = new code_submission({
//         code: code_v,
//         problem_id: parseInt(prob_id)
//     })

//     code_s.save().then((result) => {
//         alert('code Saved!' );

//     }).catch((err) => console.log("Error while submitting code"));
//     //todo: add error things
//     //
// })

//main page route
app.get('/home', (req, res) => {
    //get random questions
    all_problem.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)

        // Again query all users but only fetch one offset by our random #
        var resultsPerPage = 15;
        all_problem.find()
            .limit(resultsPerPage)
            .skip(random)
            .exec(
                function (err, result) {
                    // console.log(result) 
                    if (!err) {
                        res.render('homepage_15_problems', { body: result });
                    } else {
                        console.log(err);
                    }
                })
    })
})

app.use(diffRoutes);
app.use(topicRoutes);
// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use(queryRoutes);

// const fs = require('fs');

// var desc = fs.readFileSync('All_Problems_set/Problems_description/problem_1.txt').toString();

// //testing string proper orientation
// app.get('/test', (req, res) => {
//     var mystr = nl2br(desc);
//     res.send(mystr);
//     // alert(mystr);   


// })


