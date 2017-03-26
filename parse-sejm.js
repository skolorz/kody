var okreg = /^(\d+)\s+(.+?)\s+?(województwo|powiat|powiaty|miasto).*/;
var woj = /.*województwo\s+(\S+?)\s/;
var powiaty = /powiaty:\s*(.+?)(;|\s*\d+?)/;
var powiat = /powiat\s+(.+);.*\d+?/;
var miasto = /miast.+:\s*(.+?)\s+\d+?/;
var LineByLineReader = require('line-by-line'),
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

lr.on('error', function (err) {
	console.log(err);
});

lr.on('line', function (line) {
    var okreg;
    okreg = parseOkreg(line);
    okreg = parseWoj(okreg, line);
    okreg = parsePowiaty(okreg, line);
    okreg = parsePowiat(okreg, line);
    okreg = parseMiasto(okreg, line);
    result.push(okreg);
});

lr.on("end", function(){
    result = result.sort(function(a, b){
        return a.nr - b.nr;
    });
    fs.writeFileSync("./data/sejm.json",  JSON.stringify(result, null, 2));
});

