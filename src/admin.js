module.exports = function (wojewodztwa){
    
    function powiatByKod(kod) {
        for (var wojewodztwo in wojewodztwa  ) {
            for (var powiat in wojewodztwa[wojewodztwo]) {
                if (wojewodztwa[wojewodztwo][powiat].indexOf(kod) > -1){
                    return {powiat: powiat, wojewodztwo: wojewodztwo};
                }
            }
        }
    }

    return {
        powiatByKod: powiatByKod
    };
};

