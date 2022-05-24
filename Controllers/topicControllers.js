//problem_array, problem_bit, problem_binary, problem_two_pointers, problem_dynamic_programming, problem_graphs, problem_trees, problem_greedy, problem_strings

const all_problem = require('../model/problem_model');
const resultsPerPage = 15;

const problem_array = (req, res) =>{
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
                    res.render('error404');
                }
            })
      
    });

}

const problem_binary = (req, res) => {
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
                    res.render('error404');
                }
            })
      
    });
}

const problem_bit = (req, res) =>{
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
                    res.render('error404');
                }
            })
      
    });
}

const problem_dynamic_programming = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });

}

const problem_two_pointers = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });
}

const problem_graphs = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });
}

const problem_greedy = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });
}

const problem_trees = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });

}

const problem_strings = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });
}

const problem_maths = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });
}

module.exports = {
    problem_array,
    problem_binary,
    problem_bit,
    problem_dynamic_programming,
    problem_graphs,
    problem_greedy,
    problem_maths,
    problem_strings,
    problem_trees,
    problem_two_pointers
}
