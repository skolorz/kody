module.exports = {
    kodSejm:    function (kod, wojewodztwa, okregi){
    var powiat, okreg;
    function powiatByKod(kod, wojewodztwa) {
		for (var wojewodztwo in wojewodztwa  ) {
		    for (var powiat in wojewodztwa[wojewodztwo]) {
                if (wojewodztwa[wojewodztwo][powiat].indexOf(kod) > -1){
                    return powiat;
                }
            }
        }
    }

    powiat = powiatByKod(kod, wojewodztwa);
    okreg = okregi.filter(function(o){
        if (o.powiaty && o.powiaty.indexOf(powiat) > -1) {
            return true;
        }
        if (o.miasta && o.miasta.indexOf(powiat) > -1) {
            return true;
        }
    });
    return okreg.pop();
}
}
