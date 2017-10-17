const kodRegExp = /^\d\d-\d\d\d$/g;

module.exports = {
    parse: function (input){
        return new Promise( (resolve, reject) => {
            var elems, valid, invalid;
           
            elems = input.split(/\s+|;|,/);
            invalid = elems.filter(k => !k.match(kodRegExp));
            if (invalid.length){
                reject(invalid);
            } else {
                valid = elems.filter(k => k.match(kodRegExp));
                resolve(valid);
            }
        });
    }
};
