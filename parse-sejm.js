var okreg = /^(\d+)\s+(.+?)\s+?(województwo|powiat|powiaty|miasto).*/;
var woj = /.*województwo\s+(\S+?)\s/;
var powiaty = /powiaty:\s*(.+?)(;|\s*\d+?)/;
var powiat = /powiat\s+(.+);.*\d+?/;
var miasto = /miast.+:\s*(.+?)\s+\d+?/;
var LineByLineReader = require("line-by-line"),
    _ = require("underscore"),
    kody = require("./data/kody.json");

fs = require("fs"),   
   lr = new LineByLineReader("./source-data/sejm.txt"),
   result = []; 

function parseOkreg(line){
  var m = line.match(okreg);
  if (m)
    return {nr: parseInt(m[1], 10),
      nazwa: m[2]};
  else {
    console.log("error", line);
    return {};
  }
}

function parseWoj(okreg, line){
  var m = line.match(woj);
  if (m){
    okreg.wojewodztwo = m[1]; 
  }
  return okreg;
}

function parsePowiaty(okreg, line){
  var m = line.match(powiaty);
  if (m){
    okreg.powiaty = m[1].replace(" i ",", ").split(", "); 
  }
  return okreg;
}

function parsePowiat(okreg, line){
  var m = line.match(powiat);
  if (m){
    okreg.powiaty = m[1]; 
  }
  return okreg;
}

function parseMiasto(okreg, line){
  var m = line.match(miasto);
  if (m){
    okreg.miasta = m[1].replace(" i ",", ").split(", "); 
  }
  return okreg;
}

lr.on("error", function (err) {
  console.log(err);
});

lr.on("line", function (line) {
  var okreg;
  okreg = parseOkreg(line);
  okreg = parseWoj(okreg, line);
  okreg = parsePowiaty(okreg, line);
  okreg = parsePowiat(okreg, line);
  okreg = parseMiasto(okreg, line);
  result.push(okreg);
});


function findWoj(okreg) {
  var powiaty;

  if (okreg.wojewodztwo){
    return okreg.wojewodztwo;
  }
  powiaty = _.union(okreg.powiaty, okreg.miasta);

  return _.keys(kody)
    .map(w => [w,  
        _.chain(_.keys(kody[w]))
          .intersection(powiaty)
          .value().length]
    )
    .filter(w => w[1])
    .sort((a,b) => a[1] < b[1])
    //.map(w => {console.log(okreg.nazwa,w); return w})
    .shift()[0];
}

lr.on("end", function(){
  result = result.sort(function(a, b){
    return a.nr - b.nr;
  });

    result.map(o => _.extend(o, {wojewodztwo: findWoj(o)}))
    fs.writeFileSync("./data/sejm.json",  JSON.stringify(result, null, 2));
});

