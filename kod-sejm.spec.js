describe("Mapowanie kodów pocztowych na okręgi", function() {
	var okregi = require("./data/sejm.json"),
    	kody = require("./data/kody.json"),
    	ks = require("./kod-sejm.js");

    describe("kod na okręg", function() {
         it("znajduje okręg po kodzie powiatu", function() {
            var okreg = ks.kodSejm("44-310", kody, okregi)
            expect(okreg.nr).toBe(30);
          });

         it("znajduje okręg po kodzie miasta", function() {
            var okreg = ks.kodSejm("44-240", kody, okregi)
            expect(okreg.nr).toBe(30);
          });

         it("znajduje okręg dla każdego kodu", function() {
            var bledne = [];
            for (var wojewodztwo in kody  ) {
                for (var powiat in kody[wojewodztwo]) {
                        kody[wojewodztwo][powiat].forEach(function(kod){
                            var okreg = ks.kodSejm(kod, kody, okregi)
                           if (!okreg){
                               bledne.push(kod);
                           }
                        });
                    }
                } 
            expect(bledne).toEqual([]);
          });
    })

    describe("lista kodów na listę okręgów", function() {
         it("zlicza kody w okregu", function() {
            var result = ks.stats(["44-240","44-310"], kody, okregi)
            expect(result).toEqual({ "30": 2});
          });
         it("znajduje dla 05-091", function() {
            var result = ks.stats(["05-091"], kody, okregi)
            expect(result).toEqual({ "20": 1});
          });
         it("zlicza kody w wielu okregach", function() {
            var result = ks.stats(["91-070", "44-102", "44-310"], kody, okregi)
            expect(result).toEqual({ "9" : 1, "29" : 1, "30" : 1 });
          });
         it("zlicza unikalne kody", function() {
            var result = ks.stats(["44-240","44-240","44-310"], kody, okregi)
            expect(result).toEqual({ "30": 2});
          });
    });
});
    
            
