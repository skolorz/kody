const kodRegExp = /\d\d-\d\d\d/;

module.exports = {
    parse: function (input){
        if (input.match(kodRegExp)){
            return [input];
        } else {
            return [];
        }
    }
};
