var geojson = require("./source-data/powiaty.geo.json"),
    kody = require("./data/kody.json"),
    wojewodztwa,
		mapwoj = {
			"Lesser Poland": "małopolskie",
			"Lower Silesian": "dolnośląskie",
			"Lódz": "łódzkie",
			"Swietokrzyskie": "świętokrzyskie",
			"Greater Poland": "wielkopolskie",
			"Kuyavian-Pomeranian": "kujawsko-pomorskie",
			"Lublin": "lubelskie",
			"Lubusz": "lubuskie",
			"Masovian": "mazowieckie",
			"Opole": "opolskie",
			"Podlachian": "podlaskie",
			"Pomeranian": "pomorskie",
			"Silesian": "śląskie",
			"Subcarpathian": "podkarpackie",
			"Warmian-Masurian": "warmińsko-mazurskie",
			"West Pomeranian": "zachodniopomorskie" 
		};

wojewodztwa = Object.getOwnPropertyNames(kody)
              .reduce(((acc,woj) => {
                var w = kody[woj],
                    p = Object.getOwnPropertyNames(w);      
                acc[woj] = p;
                return acc;
              }), {});

function guessPowiat(properties, wojewodztwo){
  var m, i, powiaty, powiatyEng;
  powiaty = wojewodztwa[wojewodztwo];
  powiatyEng = powiaty
                .map(p => p.replace(/Warsaw/,"Warszawa"))
                .map(p => p.replace(/Ople/,"Opole"))
                .map(p => p.replace(/ź/,"z"))
                .map(p => p.replace(/Ś/,"S"))
                .map(p => p.replace(/ś/,"s"))
                .map(p => p.replace(/ł/,"l"))
                .map(p => p.replace(/ę/,"e"))
                .map(p => p.replace(/ą/,"a"))
                .map(p => p.replace(/ś/,"s"))
                .map(p => p.replace(/Ż/,"Z"))
                .map(p => p.replace(/Ł/,"L"));
// ENGTYPE_2: 'City'
  if (properties.ENGTYPE_2 === "City"){
    i = powiatyEng.indexOf(properties.NAME_2);
    if (i > -1){
      return powiaty[i];
    }
  }
  if (properties.VARNAME_2) {
        m = properties.VARNAME_2.match(/Powiat (.+)/);
        if (m){
          //return m[1].toLowerCase();
        }

  }
  return properties;
}

function mapWoj(){
	var result;
	 result = geojson.features.map(f => {
            var wojewodztwo = mapwoj[f.properties.NAME_1]; 
            return {
						 		wojewodztwo: wojewodztwo,
                powiat: guessPowiat(f.properties, wojewodztwo)
							}
   });
	 return result;
}

powiaty = mapWoj();

powiaty = powiaty.filter(p => typeof p.powiat === "string");
console.log(powiaty, powiaty.length);

