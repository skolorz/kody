const Admin = require("./admin.js");

module.exports = function(kody, razem) {
    const admin = Admin(kody);

    function okregByKod(kod){
        var powiat, okregi;
           
        powiat  = admin.powiatByKod(kod);
        okregi = razem[powiat.wojewodztwo];
        if (okregi.length === 1){
            return okregi[0];
        }
        return okregi.filter(o => o.powiaty.indexOf(powiat.powiat) > -1)[0];
            
    }

    function stats(kody) {
        return kody.map(k => okregByKod(k));
    }

    return {
        stats: stats,
        okregByKod: okregByKod
    };
};
