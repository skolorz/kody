describe("Mapowanie kodów pocztowych na okręgi", function() {
	var okregi = require("./data/sejm.json"),
    	kody = require("./data/kody.json"),
    	ks = require("./kod-sejm.js");

describe("kod na okręg", function() {
 it("znajduje okręg po kodzie powiatu", function() {
    var okreg = ks.kodSejm("44-310", kody, okregi)
	expect(okreg.nr).toBe("30");
  });

 it("znajduje okręg po kodzie miasta", function() {
    var okreg = ks.kodSejm("44-240", kody, okregi)
	expect(okreg.nr).toBe("30");
  });
}

describe("lista kodów na listę okręgów", function() {
 it("zlicza kody w okregu", function() {
    var result = ks.stats(["44-240","44-310"], kody, okregi)
	expect(result).toEqual({ "30": 2});
  });
}
});
    
