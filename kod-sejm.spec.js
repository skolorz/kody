describe("Mapowanie kodów pocztowych na okręgi", function() {
	var okregi = require("./sejm.json"),
    	kody = require("./kody.json"),
    	ks = require("./kod-sejm.js");

 it("should find okreg by code", function() {
    var okreg = ks.kodSejm("44-310", kody, okregi)
	expect(okreg.nr).toBe("30");
  });

 it("should count okregi for codes", function() {
    var okreg = ks.kodSejm("44-240", kody, okregi)
	expect(okreg.nr).toBe("30");
  });

});
    
