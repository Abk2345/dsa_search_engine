
const all_problem = require('../model/problem_model');
const resultsPerPage = 15;

//controllers for
//problem_easy, problem_medium, problem_hard

const problem_easy = (req, res)=>{
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
                    res.render('error404');
                }
            })
      
    });

}

const problem_medium = (req, res) =>{
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
                    res.render('error404');
                }
            })
      
    });

}

const problem_hard = (req, res) =>{
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
                    res.render('error404');
                }
            })
      
    });

}

module.exports = {
    problem_easy,
    problem_medium,
    problem_hard
}