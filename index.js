var $ = require('get-me')(require, {
    fsx: 'fs-extra',
    iframes: './src/iframes',
    fork: '[suspend].fork',
    join: '[suspend].join',
    resume: '[suspend].resume'
});

function* iframeise(dest, source, opts) {
    dest = $.path.resolve(process.cwd(), dest || 'iframes');
    source = $.path.resolve(process.cwd(), source || 'index.html');

    var frames = yield* $.iframes(source);

    yield $.fsx.emptyDir(dest, $.resume());
    frames.forEach(f => {
        var p = $.path.resolve(dest, f.file);
        $.fsx.writeFile(p, f.content, $.fork());
    });

    yield $.join();

    if(opts && typeof opts.done === 'function') {
        opts.done();
    }
};
module.exports = iframeise;
iframeise.iframes = $.iframes;
