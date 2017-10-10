var fs = require("fs"),
    fastCsv = require("fast-csv"),
    stream = fs.createReadStream("./kody.csv"),
    parser = fastCsv(),
    result = {};

fastCsv
    .fromStream(stream, {headers : true, delimiter: ";"})
    .on("data", function(data){
        var wojewodztwo = data["WOJEWÓDZTWO"].match(/Województwo (.*)/)[1],
            powiat = data["POWIAT"],
            kod = data["KOD POCZTOWY"],
            nazwa, m;

        m = powiat.match(/.owiat (.*)/);
        if (!m){
            m = powiat.match(/Miasto (.+) na prawach powiatu/);
        }
        nazwa = m[1];

        result[wojewodztwo] = result[wojewodztwo] || {};
        result[wojewodztwo][nazwa] = result[wojewodztwo][nazwa] || {};
        result[wojewodztwo][nazwa]["kody"] = result[wojewodztwo][nazwa]["kody"] || {};
        result[wojewodztwo][nazwa]["kody"][kod] = true;
    })
    .on("end", function(){
        //console.log(JSON.stringify(result));
        for (var wojewodztwo in result  ) {
		    for (var powiat in result[wojewodztwo]) {
                if (result[wojewodztwo][powiat]["kody"])
                    result[wojewodztwo][powiat] = Object.keys(result[wojewodztwo][powiat]["kody"]);
            }
        }          
        fs.writeFileSync("./kody.json",  JSON.stringify(result, null, 2));
    });
