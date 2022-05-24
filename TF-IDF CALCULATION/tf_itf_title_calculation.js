const fs = require('fs');
var problem_desc = [];
var problem_title = [];
var problem_url = [];
var problem_topic = [];
var problem_diff = [];

const descs = [];
    
let x = 2265;
function processFile(content) {
    // console.log(content);
    problem_desc = content;
}



for(var i=1; i<=2265; i++)
{
var str = fs.readFileSync('All_Problems_set/Problems_description/problem_'+i.toString()+'.txt').toString();
str = str.toLowerCase();
problem_desc.push(str);
var str = fs.readFileSync('All_Problems_set/Problem_topics/problem_topic_'+i.toString()+'.txt').toString();
str = str.toLowerCase();
problem_topic.push(str);
var str = fs.readFileSync('All_Problems_set/Problem_difficulty/problem_difficulty_'+i.toString()+'.txt').toString();
str = str.toLowerCase();
problem_diff.push(str);
var str = fs.readFileSync('All_Problems_set/Problems_links/problem_url_'+i.toString()+'.txt').toString();
str = str.toLowerCase();
problem_url.push(str);
var str = fs.readFileSync('All_Problems_set/Problems_titles/problem_title_'+i.toString()+'.txt').toString();
str = str.toLowerCase();
problem_title.push(str);
}


var StopwordsFilter = require('node-stopwords-filter');
var f = new StopwordsFilter();
 
// var input = problem_desc[0];
// array = f.filter(input);
 
//map in javascript
// var map = {};
// // add a item
// map[key1] = value1;
// // or remove it
// delete map[key1];
// // or determine whether a key exists
// key1 in map;

//var set1 = new Set();
 
// set contains 10, 20
// set1.add(10);
// set1.add(20);
 
// // As this method returns
// // the set object hence chaining
// // of add method can be done.
// set1.add(30).add(40).add(50);
 
// // prints 10, 20, 30, 40, 50
// console.log(set1);

//array 
const { removeStopwords } = require('stopword')

// var string = "tree tree tree tree tree";
//     string = string.split(' ');
//     var array = removeStopwords(string)
//     console.log(array);

//now start
var all_keywords = new Set();
for(var i=0; i<x; i++)
{
    var string = problem_title[i];
    string = string.replace(/(\r\n|\n|\r)/gm, "");
    string = string.replace(/,/g, '');
    // console.log(string);
    string = string.split(' ');
    // console.log(string);
    var array = removeStopwords(string);
    // console.log(array);
    
    array.forEach(element => {
        all_keywords.add(element);
    });
}
const sz = all_keywords.size;
var string_doc_presence_count = new Map();
var tf_values = [];

// console.log(all_keywords);

for(var i=0; i<x; i++)
{
    var string = problem_title[i];
    string = string.replace(/(\r\n|\n|\r)/gm, "");
    // console.log(string);
    string = string.split(' ');
    // console.log(string);
    var array = removeStopwords(string);
    var doc_map = new Map();
    
    var tf_row_values = [];
    for(let i =0; i<array.length; i++)
    {
        // console.log(array[i]);
        if(doc_map.has(array[i]))
        {
            console.log("say hi to me");
            doc_map.set(array[i], doc_map.get(array[i])+1);
        }else{
            doc_map.set(array[i], 1);
        }
       
    }
    var setArray = Array.from(all_keywords);
    setArray.sort();
    setArray.forEach(element => {
        if(doc_map.has(element))
        {
            if(string_doc_presence_count.has(element))
            {
                // console.log("say bitch");
                string_doc_presence_count.set(element, string_doc_presence_count.get(element)+1);
            }else{
                string_doc_presence_count.set(element, 1);
            }
            tf_row_values.push(doc_map.get(element)/doc_map.size);
        }else{
            tf_row_values.push(0);
        }


    });

    tf_values.push(tf_row_values);

    // console.log(tf_row_values);


    // var ele = doc_map.values();
    // // ele.forEach(element => {
        // console.log(ele);
    // });
    
}

// console.log(Array.from(all_keywords).sort());
// console.log(tf_values);
// console.log(tf_values);
//calculation done
//set
//count no of documents which has this string
//tf first value for each string

//now idf values
var setArray = Array.from(all_keywords);
setArray.sort();
console.log(setArray);
var itfValue = [];
setArray.forEach(element => {
    var val = Math.log10(x/string_doc_presence_count.get(element));
    itfValue.push(val);
    // console.log(val);
});
// console.log(itfValue);

//noe again iterate on j = 0 to 4219
//i on 0 to 1228

// console.log(sz);
for(var j=0; j<sz; j++)
{
    for(var i=0; i<x; i++)
    {
        tf_values[i][j] = tf_values[i][j]*itfValue[j];
    }
}

// console.log(tf_values);


content = itfValue.toString();
// console.log(sz);

fs.writeFile('itf_value_titles.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }else{
      console.log("check your file");
  }
  //file written successfully
})
// content = "";
// for(var i=0; i<1228; i++)
// {
//     content += tf_values[i].toString();
  
// }
content = tf_values.toString();

fs.writeFile('tf_value_doc_titles.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }else{
        console.log("check your file");
    }
    //file written successfully
  })
// save this data to a file

// 4219 each document
// 1228 document

console.log(tf_values.length);
console.log(tf_values[0].length);


console.log(sz);
console.log(itfValue.length);

// doc_map.set('hello', 5);
// doc_map.set('hello', doc_map.get('hello')+3);

// console.log(doc_map.get('hello'));
// console.log(doc_map.keys());
// doc_map.forEach(element => {
//    console.log(element); 
// });

//todo: thing is sorted thng and size variation
var setArray = Array.from(all_keywords);
setArray.sort();
content = setArray.toString();
console.log(setArray[0]);
console.log(content);
fs.writeFile('all_keywords_titles.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }else{
        console.log("check your file");
    }
    //file written successfully
  })

// var xu = fs.readFileSync('all_keywords_titles.txt').toString().split(',');
// console.log(xu[0]);
