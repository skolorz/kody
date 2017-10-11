(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s;})({1:[function(require,module,exports){
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
            if (o.wojewodztwo !== res.wojewodztwo) {
                return false;
            }
            if (!o.powiaty && !o.miasta){
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


},{}]},{},[1]);
