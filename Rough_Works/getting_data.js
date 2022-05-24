const mongoose = require('mongoose');
const fs = require('fs');
const all_problem = require('../model/problem_model');

// console.log(mag_docs);
const URI = "mongodb+srv://abhishant:abhishant@cluster0.qmkv4.mongodb.net/problems?retryWrites=true&w=majority"

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("problen in connecting: " + err));


// // //experiment
// var medium_probs = [];

// medium_probs = await all_problem.find({problem_diff: 'medium_tag'}).exec();
// // all_problem.find({problem_diff : 'medium_tag'},(err, doc) => {
//     if (!err) {s
//         // medium_probs = doc;
//         medium_probs = await doc;
//         // console.log(doc);
//         //in this case find all these data and pass into data thing of view ejs, right like data done there
//         // for(var i=0; i<doc.length; i++)
//         // {

//         //     // console.log(doc[i]['problem_desc']);
//         // }
//     } else {
//         console.log("got some error");
//     }
// })

// console.log(medium_probs);
// const fetchHackerNews_data = async (inputSearchValue, page = 0, tags = "") => {
//     console.log(`${inputSearchValue} and page= ${page} and tags = ${tags}`);
//     try{
//     let response = null;
//     if(tags === 'front_page'){
//         response = await fetch(`${baseUrl}?tags=${tags}`);
//     }else{
//         response = await fetch(`${baseUrl}?query=${inputSearchValue}&page=${page}&tags=${tags}`);
//     }
//     if(response.ok){""
//         let jsonResponse = await response.json();
//         return jsonResponse;
//     }
//     }catch(error){
//         console.log(error);
//     }
// }

// export {fetchHackerNews_data};

// const Character = mongoose.model('Character', mongoose.Schema({
//     name: String,
//     age: Number,
//     rank: String
//   }));
//   await Character.create([
//     { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
//     { name: 'William Riker', age: 29, rank: 'Commander' },
//     { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
//     { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
//     { name: 'Worf', age: 24, rank: 'Lieutenant' }
//   ]);
//   // The query to find all the Lieutenants
//   const query = await Character.find({ rank: 'Lieutenant' });

//   console.log(query);

// all_problem.find({ problem_id: 10 }, (err, doc) => {
//     if (!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }

// });
// var all_probs = [];
// async function dbData() {
//     try {
//         var data = [];
//         for (var i = 1; i <= 10; i++) {
//             let dbData = await all_problem.find({ problem_id: i });
//             console.log(dbData);
//             data.push(dbData[0]);
//         }
//         return data;
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// (async function () {
//     const x = await dbData()
//     // console.log(x);
// })();

// console.log(all_probs);


// async functioon 