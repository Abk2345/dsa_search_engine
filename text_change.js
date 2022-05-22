const fs = require('fs');

for(var i=0; i<57; i++)
{
    var content = 'Arrays_dsa';
    fs.writeFile('All_Problems_set/Problem_topics/problem_topic_'+i.toString()+'.txt', content, err => {
        if (err) {
          console.error(err)
          return
        }else{
            console.log("check your file");
        }
      })
}