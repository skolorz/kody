describe("Parsowanie danych wejściowych", function() {

    var data = require("../src/input-data.js");

    it("rozpoznaje pojedynczy kod", function() {
        var kod = data.parse("44-112");

        expect(kod).toEqual(["44-112"]);
    });

    it("odrzuca niepoprawny kod", function() {
        var kod = data.parse("yyyy");

        expect(kod).toEqual([]);
    });
});
