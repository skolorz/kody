
describe("Poprawność pliku okręgów", function() {
    var	kody = require("./data/kody.json"),
        okregi = require("./data/okregi-razem.json");

        it("wszystkie powiaty są uwzględnione", function() {
            var braki = [], powiaty = [];
            for (var wojewodztwo in kody  ) {
                for (var powiat in kody[wojewodztwo]) {
                    powiaty.push({ powiat: powiat, wojewodztwo: wojewodztwo });
                }
            }
            powiaty.forEach(function (p) {
                var m = okregi[p.wojewodztwo].filter(function (o) {
                    (p.wojewodztwo === "świętokrzyskie") 
                        && console.log(o["województwo"] ,  p.wojewodztwo,o["województwo"] === p.wojewodztwo);
                    if (o["województwo"] === p.wojewodztwo) {
                        return true;
                    }
                    if (o.powiaty && o.powiaty.indexOf(p.powiat) > -1) {
                        return true;
                    }
                    return false;
                  });
                (p.wojewodztwo === "świętokrzyskie") && console.log(p,m);
                if (!m.length){
                    braki.push(p);
                }
            });
            expect(braki).toEqual([]);
        });

        it("powiaty są unikalne", function() {
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
});
