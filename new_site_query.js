const express = require('express');
let ejs = require('ejs');
const fs = require('fs');
var StopwordsFilter = require('node-stopwords-filter');
const { exit } = require('process');
const { bre } = require('stopword');
var f = new StopwordsFilter();
const { removeStopwords } = require('stopword');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problem2?retryWrites=true&w=majority"
const all_problem = require('./model/problem_model');
const keyword = require('./model/keyword_model');
const itf_doc = require('./model/itf_values_model');
const tf_idf = require('./model/tf_idf_schema');
var CircularJSON = require('circular-json');
const mag_v = require('./model/mag_docs_mdel');
const num_key_doc = require('./model/number_keyword_model')
const code_submission = require('./model/code_submit_model');

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("problen in connecting: " + err));

const app = express();

app.listen(3000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

var all_keyws = [];

keyword.find((err, doc) => {
    if (!err) {
        all_keyws = doc[0]['keyword_values'].split(',');
    } else {
        console.log("got some erro");
    }
})

console.log(all_keyws);

const resultsPerPage = 15;

app.get('/', (req, res)=>{
    res.render('question_form');
})

//todo: complete if mix of parameters
app.get('/problem/medium/graphs', (req, res)=>{
    all_problem.find({problem_diff: 'medium_tag', problem_topic:'graphs_dsa'}, (err, doc)=>{
        if(!err)
        {
            res.render('problems_links_file', {body: doc});
        }else{
            console.log(err);
        }
    })
})

//router by difficulty
app.get('/problem/difficulty/medium', (req, res) => {
    all_problem.find({ problem_diff: 'medium_tag' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }

        page = page - 1;
        var tag = 'medium';

        all_problem.find({ problem_diff: 'medium_tag' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    //link kaise bheje?
                    res.render('view_problem_by_diff', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/difficulty/easy', (req, res) => {
    all_problem.find({ problem_diff: 'easy_tag' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='easy';

        page = page - 1;

        all_problem.find({ problem_diff: 'easy_tag' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_diff', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/difficulty/hard', (req, res) => {
    all_problem.find({ problem_diff: 'hard_tag' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='hard';

        page = page - 1;

        all_problem.find({ problem_diff: 'hard_tag' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_diff', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});


//routers by topic
app.get('/problem/topic/arrays', (req, res) => {
    all_problem.find({ problem_topic: 'Arrays_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='arrays';

        page = page - 1;
        console.log(numberOfPages);

        all_problem.find({ problem_topic: 'Arrays_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/topic/binary-search', (req, res) => {
    all_problem.find({ problem_topic: 'bsearch_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='binary-search';
        console.log(numberOfPages);

        page = page - 1;

        all_problem.find({ problem_topic: 'bsearch_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/topic/bit-manip', (req, res) => {
    all_problem.find({ problem_topic: 'bit_manip_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='bit-manip';
        console.log(numberOfPages);

        page = page - 1;

        all_problem.find({ problem_topic: 'bit_manip_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/topic/two-pointers', (req, res) => {
    all_problem.find({ problem_topic: 'two_pointers_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='two-pointers';
        console.log(numberOfPages);

        page = page - 1;

        all_problem.find({ problem_topic: 'two_pointers_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});


app.get('/problem/topic/dynamic-programming', (req, res) => {
    all_problem.find({ problem_topic: 'dp_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='dynamic-programming';
        console.log(numberOfPages);

        page = page - 1;

        all_problem.find({ problem_topic: 'dp_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});


app.get('/problem/topic/graphs', (req, res) => {
    all_problem.find({ problem_topic: 'graphs_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='graphs';
        console.log(numberOfPages);

        page = page - 1;

        all_problem.find({ problem_topic: 'graphs_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/topic/greedy', (req, res) => {
    all_problem.find({ problem_topic: 'greedy_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        console.log(numberOfPages);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='greedy';

        page = page - 1;

        all_problem.find({ problem_topic: 'greedy_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/topic/strings', (req, res) => {
    all_problem.find({ problem_topic: 'strings_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        console.log(numberOfPages);
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='strings';

        page = page - 1;

        all_problem.find({ problem_topic: 'strings_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/topic/trees', (req, res) => {
    all_problem.find({ problem_topic: 'tree_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
     
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        console.log(numberOfPages);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='trees';

        page = page - 1;

        all_problem.find({ problem_topic: 'tree_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});

app.get('/problem/topic/maths', (req, res) => {
    all_problem.find({ problem_topic: 'Maths_dsa' }, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        var tag ='maths';

        page = page - 1;

        all_problem.find({ problem_topic: 'Maths_dsa' })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .exec((err, doc) => {
                if (!err) {
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    // if (endingLink < (page + 4)) {
                    //     iterator -= (page + 4) - numberOfPages;
                    // }
                    res.render('view_problem_by_topic', { body: doc, page, tag, iterator, endingLink, numberOfPages });
                } else {
                    console.log("got some erro");
                }
            })
      
    });
});







app.get('/problems/:id', (req, res)=>{
    var id1 = req.params.id;
    all_problem.find({problem_id: id1}, (err, doc)=>{
        if(!err)
        {
            res.render('new_any_problem_view', {body: doc});
        }else{
            console.log(err);
        }
    })
})

// app.post('/code_submission/problem/:id', (req, res)=> {
//     var prob_id = req.params.id;
//     var code_v = req.body.code;

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




var mag_docs = [];
mag_v.find((err, doc) => {
    if (!err) {
        // console.log(doc[0]);
        mag_docs = doc[0]['mag_values'].split(',');
        // console.log(mag_docs.length)
    } else {
        console.log("got some erro");
    }
})

var num_key_container = []
num_key_doc.find((err, doc)=>{
    if(!err)
    {
        num_key_container = doc[0]['number_keyword_values'].split(',');
    }else{
        console.log("got some error in num_key_container");
    }

})


var itf_values = [];

itf_doc.find((err, doc) => {
    if (!err) {
        itf_values = doc[0]['itf_values'].split(',');
        // console.log(itf_values.length);
    } else {
        console.log("got some erro");
    }
})

var tf_idf_matrix = [];
tf_idf.find((err, doc) => {
    if (!err) {
        tf_idf_matrix = doc[0]['tf_idf_values'].split(',');
        // console.log(tf_idf_matrix.length);
        // console.log(tf_idf_matrix.length/2265);
    } else {
        console.log("got some erro");
    }
})





// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');


app.get('/problems/graphs', (req, res) => {
    all_problem.find({ problem_topic: 'graphs_dsa' }, (err, doc) => {
        if (!err) {
            res.render('problems_links_file', { body: doc });
        } else {
            console.log("got some erro");
        }
    })
})


app.post('', (req, res) => {
    console.log(req.body.name);
    var query = req.body.name;
    var string = query.toLowerCase();

    var x = 2265;
    string = string.replace(/(\r\n|\n|\r)/gm, ' ');
    string = string.split(' ');
    string = string;
    var carr = removeStopwords(string);
    carr.sort();

    var mp_query = new Map();

    carr.forEach(element => {
        if (mp_query.has(element)) {
            mp_query.set(element, mp_query.get(element) + 1);
        } else {
            mp_query.set(element, 1);
        }
    });

    var sz_query_keywords = carr.length;
    var tf_query = [];
    var cnt = 0;
    all_keyws.forEach(element => {
        cnt += 1;
        if (mp_query.has(element)) {
            tf_query.push(mp_query.get(element) / sz_query_keywords);
        } else {
            tf_query.push(0);
        }
    });
    var tf_itf_query = [];
    var cbt_zero = 0;
    for (var i = 0; i < itf_values.length; i++) {
        tf_itf_query.push(tf_query[i] * itf_values[i]);
    }

    var mag_query = 0;
    for (var i = 0; i < itf_values.length; i++) {
        if (tf_itf_query[i] > 0) {
            cbt_zero++;
            mag_query += tf_itf_query[i] * tf_itf_query[i];
        }
    }
    mag_query = Math.sqrt(mag_query);

    var tf_value_doc = [];
    var mp_cosine_values = new Map();
    var prev_key_len = 0;
    for (var i = 0; i < x; i++) {
        var len_doc_x = num_key_container[i];
        var values = [];
        var val = 0;
        for (var j = 0; j < 3*len_doc_x; j+= 3) {
            var x = tf_idf_matrix[prev_key_len+j];
            var y = tf_idf_matrix[prev_key_len+j+1];
            var val1 = tf_idf_matrix[prev_key_len+j+2];
            if (!isNaN(tf_itf_query[y])) {
                val += val1 * tf_itf_query[y];
            }
            
        }
        val = val / mag_docs[i];
        val = val / mag_query;
        mp_cosine_values.set(val, i + 1);
        prev_key_len += len_doc_x*3;
    }

  
    // for (var i = 0; i < tf_value_doc.length; i++) {
    //     var val = 0;
    //     for (var j = 0; j < tf_value_doc[0].length; j++) {

    //         if (!isNaN(tf_itf_query[j])) {
    //             val += tf_value_doc[i][j] * tf_itf_query[j];
    //         }
    //     }
    //     val = val / mag_docs[i];
    //     val = val / mag_query;
       
    // }

    var mapAsc = new Map([...mp_cosine_values.entries()].sort().reverse());

    var cnt = 0;
    var arr_q = [];
    var arr_titles = [];
    var arr_pr_desc = [];
    var query_keys = [];

    //store it in decreasinf form by key
    mapAsc.forEach((key, value) => {
        query_keys.push(key);
        console.log(key);
    })
    console.log(query_keys);
    async function dbData() {
        try {
            var data = [];
            for (var i = 0; i < Math.min(10, query_keys.length); i++) {
                console.log(query_keys[i]);
                let dbData = await all_problem.find({ problem_id: query_keys[i] });
                console.log(dbData);
                // console.log(all_problem.find({problem_id: query_keys[i]}))
                data.push(dbData[0]);
            }
            return data;
        }
        catch (err) {
            console.log(err)
        }
    }
    (async function () {
        const doc = await dbData()
        // console.log(doc);
        res.render('problems_links_file', { body: doc });

    })();

})


app.post('/home/', (req, res) => {
    console.log(req.body.name);
    var query = req.body.name;
    var string = query.toLowerCase();

    var x = 2265;
    string = string.replace(/(\r\n|\n|\r)/gm, "");
    string = string.split(' ');
    string = string;
    var carr = removeStopwords(string);
    carr.sort();

    var mp_query = new Map();

    carr.forEach(element => {
        if (mp_query.has(element)) {
            mp_query.set(element, mp_query.get(element) + 1);
        } else {
            mp_query.set(element, 1);
        }
    });

    var sz_query_keywords = carr.length;
    var tf_query = [];
    var cnt = 0;
    all_keyws.forEach(element => {
        cnt += 1;
        if (mp_query.has(element)) {
            tf_query.push(mp_query.get(element) / sz_query_keywords);
        } else {
            tf_query.push(0);
        }
    });
    var tf_itf_query = [];
    var cbt_zero = 0;
    for (var i = 0; i < itf_values.length; i++) {
        tf_itf_query.push(tf_query[i] * itf_values[i]);
    }
    var tf_value_doc = [];
    for (var i = 0; i < x; i++) {
        var values = [];
        for (var j = 0; j < tf_idf_matrix.length / x; j++) {
            values.push(tf_idf_matrix[(tf_idf_matrix.length / x) * i + j]);
        }
        tf_value_doc.push(values);
    }

    var mag_query = 0;
    for (var i = 0; i < itf_values.length; i++) {
        if (tf_itf_query[i] > 0) {
            cbt_zero++;
            mag_query += tf_itf_query[i] * tf_itf_query[i];
        }
    }
    mag_query = Math.sqrt(mag_query);

    var mp_cosine_values = new Map();
    for (var i = 0; i < tf_value_doc.length; i++) {
        var val = 0;
        for (var j = 0; j < tf_value_doc[0].length; j++) {

            if (!isNaN(tf_itf_query[j])) {
                val += tf_value_doc[i][j] * tf_itf_query[j];
            }
        }
        val = val / mag_docs[i];
        val = val / mag_query;
        mp_cosine_values.set(val, i + 1);
    }

    var mapAsc = new Map([...mp_cosine_values.entries()].sort().reverse());

    var cnt = 0;
    var arr_q = [];
    var arr_titles = [];
    var arr_pr_desc = [];
    var query_keys = [];

    //store it in decreasinf form by key
    mapAsc.forEach((key, value) => {
        query_keys.push(key);
        console.log(key);
    })
    console.log(query_keys);
    async function dbData() {
        try {
            var data = [];
            for (var i = 0; i < Math.min(10, query_keys.length) ; i++) {
                console.log(query_keys[i]);
                let dbData = await all_problem.find({ problem_id: query_keys[i] });
                console.log(dbData);
                // console.log(all_problem.find({problem_id: query_keys[i]}))
                data.push(dbData[0]);
            }
            return data;
        }
        catch (err) {
            console.log(err)
        }
    }
    (async function () {
        const doc = await dbData()
        // console.log(doc);
        res.render('render_search_home', { body: doc });

    })();

})


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
            if(!err)
            {
                res.render('problems_links_file', {body: result});
            }else{
                console.log(err);
            }
          })
        })
})