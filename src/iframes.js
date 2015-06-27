var $$ = require('get-me')(require, {
    resumeRaw: '[suspend].resumeRaw',
    env: '[jsdom].env'
});

module.exports = function*(html) {
    // first argument can be html string, filename, or url
    var res = yield $$.env(html, $$.resumeRaw()), window = res[1];
    if(res[0]) throw res[0];
    var $ = $$.jquery(window);
    return buildFrames($, $('body'), undefined, undefined, function() {
        return $('html')[0].outerHTML;
    });
}

function buildFrames($, content, frames, fid, wrapper) {
    var filename = fid === undefined ? 'index.html' : fid.id + '.html',
        children = content.children(),
        iframe;
    frames = frames || []; fid = fid || {id: -1}; wrapper = wrapper || wrap;
    content.children().each(function() {
        fid.id++;
        iframe = $('<iframe src="' + fid.id + '.html"></iframe>');
        // TODO: Copy sizing/styling attrs?
        $(this).replaceWith(iframe);
        buildFrames($, $(this), frames, fid);
    });
    frames.push({
        file: filename,
        content: wrapper(content[0].outerHTML)
    });
    return frames;
}

function wrap(content) {
    return '<html><head></head><body>' + content + '</body></html>';
}
