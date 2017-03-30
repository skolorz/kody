function stats (kody, wojewodztwa, okregi){
    var unikalne = Array.from(new Set(kody));
    return unikalne
        .sort()
        .map(function(kod) {
            return kodSejm(kod, wojewodztwa, okregi);
        })
        .reduce(function(result, okr){
            result[okr.nr] = (result[okr.nr] || 0) + 1;
            return result;
        }, {});
}

function kodSejm (kod, wojewodztwa, okregi){
    var res, okreg;
    function powiatByKod(kod, wojewodztwa) {
        for (var wojewodztwo in wojewodztwa  ) {
            for (var powiat in wojewodztwa[wojewodztwo]) {
                if (wojewodztwa[wojewodztwo][powiat].indexOf(kod) > -1){
                    return {powiat: powiat, wojewodztwo: wojewodztwo};
                }
            }
        }
    }
    res = powiatByKod(kod, wojewodztwa);
    okreg = okregi.filter(function(o){
        if (o.wojewodztwo === res.wojewodztwo) {
            return true;
        }
        if (o.powiaty && o.powiaty.indexOf(res.powiat) > -1) {
            return true;
        }
        if (o.miasta && o.miasta.indexOf(res.powiat) > -1) {
            return true;
        }
    });
    return okreg.pop();
}

module.exports = {
    kodSejm: kodSejm,
    stats: stats,
};
