describe("Mapowanie kodów pocztowych na okręgi Razem:", function() {

    var razem = require("../data/okregi-razem.json"),
        kody = require("../data/kody.json"),
        ks = require("../src/kod-razem.js")(kody, razem);

    it("Katowicki", function() {
        var okreg = ks.okregByKod("44-310");

        expect(okreg.nazwa).toBe("Katowicki");
    });

    it("Białostocki", function() {
        var okreg = ks.okregByKod("16-001");

        expect(okreg.nazwa).toBe("Białostocki");
    });

    describe("Statystyki", function (){
        it("jeden kod", function() {
            var okregi = ks.stats(["16-001"]);

            expect(okregi[0].nazwa).toBe("Białostocki");
        });
    });
});
