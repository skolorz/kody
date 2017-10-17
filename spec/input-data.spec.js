describe("Parsowanie danych wejściowych:", function() {

    const data = require("../src/input-data.js");

    function fail(done) {
        return function(err) {
            expect(err).not.toBe(err);
            if (done) done();
        };
    }

    describe("Parsowanie danych wejściowych:", function() {
        it("rozpoznaje pojedynczy kod", function(done) {
            data.parse("44-112")
                .then(kod => {
                    expect(kod).toEqual(["44-112"]);
                    done();
                },
                fail(done));
        });

        it("rozpoznaje dwa kody", function(done) {
            data.parse("44-112 33-123")
                .then(kod => {
                    expect(kod).toEqual(["44-112", "33-123"]);
                    done();
                },
                fail(done));
        });

        it("rozpoznaje rózne separatory", function(done) {
            data.parse("44-112  33-123,33-000;22-000")
                .then(kod => {
                    expect(kod).toEqual(["44-112","33-123","33-000","22-000"]);
                    done();
                })
                .catch(fail(done));
        });
    });

    describe("obsługa błędów:", function (){
        it("odrzuca niepoprawny kod", function(done) {
            data.parse("yyyy")
                .catch(err => {
                    expect(err).toEqual(["yyyy"]);
                    done();
                });
        });

        it("rozpoznaje tylko poprawne kody ", function(done) {
            data.parse("44-112  hhh 33-123 33-3333")
                .then(done)
                .catch(err => {
                    expect(err).toEqual(["hhh","33-3333"]);
                    done();
                });
        });
    });
});
