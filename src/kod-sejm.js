const Admin = require("./admin.js");

module.exports = function (wojewodztwa, okregi){
    const admin = Admin(wojewodztwa);
    
    function stats (kody){
        return kody
            .sort()
            .map(function(kod) {
                return kodSejm(kod);
            })
            .reduce(function(result, okr){
                result[okr.nr] = (result[okr.nr] || 0) + 1;
                return result;
            }, {});
    }

    function kodSejm (kod){
        var res, okreg;

        res = admin.powiatByKod(kod);
        okreg = okregi.filter(function(o){
            if (o.wojewodztwo !== res.wojewodztwo) {
                return false;
            }
            if (!o.powiaty && !o.miasta){
                return true;
            }
            if (o.powiaty && o.powiaty.indexOf(res.powiat) > -1) {
                return true;
            }
            if (o.miasta && o.miasta.indexOf(res.powiat) > -1) {
                return true;
            }
        });
        return okreg.pop();
    }

    return {
        stats: stats,
        kodSejm: kodSejm 
    };
};

