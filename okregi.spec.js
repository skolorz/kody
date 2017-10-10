describe("Poprawność pliku okręgów:", function() {
    var	_ = require("underscore"),
        kody = require("./data/kody.json"),
        okregi = require("./data/okregi-razem.json"),
        sejm = require("./data/sejm.json");

        
    function wszystkiePowiaty() {
        var powiaty = [];
        for (var wojewodztwo in kody  ) {
            for (var powiat in kody[wojewodztwo]) {
                powiaty.push({ powiat: powiat, wojewodztwo: wojewodztwo });
            }
        }
        return powiaty;
    }

    describe("istnieje okręg obejmujący powiat:", function() {
        var braki = [],
            powiaty = wszystkiePowiaty();

        powiaty.forEach(function (powiat) {
            it (powiat.powiat, function () {
                var m = okregi[powiat.wojewodztwo].filter(function (o) {
                    if (o["województwo"] === powiat.wojewodztwo) {
                        return true;
                    }
                    if (o.powiaty && o.powiaty.indexOf(powiat.powiat) > -1) {
                        return true;
                    }
                    return false;
                });

                expect(m).not.toEqual([]);
            });
        });
    });

    it("powiat występuje tylko w jednym okręgu:", function() {
        var okreg, powiaty, duplikaty = [];
        for (var wojewodztwo in okregi) {
            powiaty = [];
            okregi[wojewodztwo].forEach(function(o){
                if (o.powiaty){
                    o.powiaty.forEach(function(p){
                        if (powiaty.indexOf(p) > -1){
                            duplikaty.push(p);
                        }
                        powiaty.push(p);
                    });
                }
            });
        }
        expect(duplikaty).toEqual([]);
    });

    xdescribe("okręg wyborczy do sejmu jest w jednym okręgu partyjnym:", function() {
        sejm.forEach(okreg => {
            it(okreg.nazwa, function () {
                var powiaty, c, m, razem = okregi[okreg.wojewodztwo];
                razem = razem.map( r => {
                    return {
                        nazwa: r.nazwa, 
                        powiaty: r.powiaty || _.keys(kody[r["województwo"]])};
                });

                powiaty = _.union(okreg.powiaty, okreg.miasta);
                if (!powiaty.length){
                    powiaty =  _.keys(kody[okreg.wojewodztwo]);
                }

                m = razem
                    .filter(r => _.intersection(r.powiaty, powiaty).length);

                expect(m.length).not.toEqual(0);
                if (m.length > 1){
                    c = m.map(r =>  {return {nazwa: r.nazwa, pow: _.intersection(r.powiaty, powiaty)};});
                    expect(c).toBe([]);
                }
                  
            });
        });
    });
});
