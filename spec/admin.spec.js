describe("Struktura administracyjna", function() {
    var kody = require("../data/kody.json"),
        admin = require("../src/admin.js")(kody);

    it("znajduje okręg po kodzie powiatu", function() {
        var powiat = admin.powiatByKod("44-310");

        expect(powiat).toEqual({ powiat : "wodzisławski", wojewodztwo : "śląskie" });
    });
});
