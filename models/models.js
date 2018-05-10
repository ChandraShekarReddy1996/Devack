var members = require('./membermodels');

module.exports.initialize = function () {
    return {
        members : members()
    };
}
