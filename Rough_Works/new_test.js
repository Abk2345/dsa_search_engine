var query = "my name is Abhishant";
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
    // async function dbData() {
    //     try {
    //         var data = [];
    //         for (var i = 0; i < Math.min(10, query_keys.length) ; i++) {
    //             console.log(query_keys[i]);
    //             let dbData = await all_problem.find({ problem_id: query_keys[i] });
    //             console.log(dbData);
    //             // console.log(all_problem.find({problem_id: query_keys[i]}))
    //             data.push(dbData[0]);
    //         }
    //         return data;
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }
    // (async function () {
    //     const doc = await dbData()
    //     // console.log(doc);
    //     res.render('render_search_home', { body: doc });

    // })();
})