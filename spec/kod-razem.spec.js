describe("Mapowanie kodów pocztowych na okręgi Razem", function() {

    var razem = require("../data/okregi-razem.json"),
        kody = require("../data/kody.json"),
        ks = require("../src/kod-razem.js")(kody, razem);

    describe("kod na okręg", function() {
        it("znajduje okręg po kodzie powiatu", function() {
            var okreg = ks.okregByKod("44-310");

            expect(okreg.nazwa).toBe("Katowicki");
        });
    });
});
