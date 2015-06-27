var suspend = require('suspend');

module.exports = function(should, gen) {
    it(should, function(done) {
            suspend(function*() {
                yield* gen();
                done();
            })();
    });
}
