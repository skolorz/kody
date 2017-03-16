var fs = require("fs"),
    fastCsv = require("fast-csv"),
    stream = fs.createReadStream("./kody.csv"),
    parser = fastCsv();
fastCsv
 .fromStream(stream, {headers : true, delimiter: ";"})
     .on("data", function(data){
              console.log(data);
               })
 .on("end", function(){
          console.log("done");
           });
