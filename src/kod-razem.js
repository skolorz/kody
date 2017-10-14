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
        var okregi;

        okregi = kody.map(k => okregByKod(k));
        okregi = okregi.reduce((result, okreg) => {
            result[okreg.nazwa] = (result[okreg.nazwa] || 0) + 1;
            return result;
        }, {});

        return okregi;
    }

    return {
        stats: stats,
        okregByKod: okregByKod
    };
};
