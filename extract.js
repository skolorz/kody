var fs = require("fs"),
    fastCsv = require("fast-csv"),
    stream = fs.createReadStream("./kody.csv"),
    parser = fastCsv(),
	result = {};
fastCsv
 .fromStream(stream, {headers : true, delimiter: ";"})
     .on("data", function(data){
		var wojewodztwo = data["WOJEWÓDZTWO"],
            powiat = data["POWIAT"],
            kod = data["KOD POCZTOWY"];
        result[wojewodztwo] = result[wojewodztwo] || {},
        result[wojewodztwo][powiat] = result[wojewodztwo][powiat] || {},
        result[wojewodztwo][powiat][kod] = true;
    })
 .on("end", function(){
          console.log(JSON.stringify(result));
           });
/*
{ 'KOD POCZTOWY': '85-460',
  ADRES: 'ul. Słowicza',
  'MIEJSCOWOŚĆ': 'Bydgoszcz',
  'WOJEWÓDZTWO': 'Województwo kujawsko-pomorskie',
  POWIAT: 'Miasto Bydgoszcz na prawach powiatu' }
*/
