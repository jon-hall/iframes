var $ = require('get-me')(require, {
    iframes: '../src/iframes',
    genIt: './util/gen-it'
});

describe('iframes', function() {
    function wrap(content) {
        return '<html><head></head><body>' + content + '</body></html>';
    }

    $.genIt('1 html', function* () {
        var res = yield* $.iframes(wrap('<span>abc</span>'));
        expect(res).toEqual([{
            file: '0.html',
            content: wrap('<span>abc</span>')
        }, {
            file: 'index.html',
            content: wrap('<iframe src="0.html"></iframe>')
        }]);
    });

    $.genIt('1 html with attrs', function* () {
        var res = yield* $.iframes(wrap('<span style="width: 100px" class="pink">abc</span>'));
        expect(res).toEqual([{
            file: '0.html',
            content: wrap('<span style="width: 100px" class="pink">abc</span>')
        }, {
            file: 'index.html',
            content: wrap('<iframe src="0.html"></iframe>')
        }]);
    });

    $.genIt('2 html', function* () {
        var res = yield* $.iframes(wrap('<span>abc</span><div onclick="clicky()">Stuff and things</div>'));
        expect(res).toEqual([{
            file: '0.html',
            content: wrap('<span>abc</span>')
        }, {
            file: '1.html',
            content: wrap('<div onclick="clicky()">Stuff and things</div>')
        }, {
            file: 'index.html',
            content: wrap('<iframe src="0.html"></iframe><iframe src="1.html"></iframe>')
        }]);
    });

    $.genIt('2 nested html', function* () {
        var res = yield* $.iframes(wrap('<div onclick="clicky()"><span>abc</span>Stuff and things</div>'));
        expect(res).toEqual([{
            file: '1.html',
            content: wrap('<span>abc</span>')
        }, {
            file: '0.html',
            content: wrap('<div onclick="clicky()"><iframe src="1.html"></iframe>Stuff and things</div>')
        }, {
            file: 'index.html',
            content: wrap('<iframe src="0.html"></iframe>')
        }]);
    });

    $.genIt('many nested html', function* () {
        var res = yield* $.iframes(wrap('<div><span>abc</span>ABC</div>DEF<div>XYZ<a href="#">LOL</a>MNO</div>'));
        expect(res).toEqual([{
            file: '1.html',
            content: wrap('<span>abc</span>')
        }, {
            file: '0.html',
            content: wrap('<div><iframe src="1.html"></iframe>ABC</div>')
        }, {
            file: '3.html',
            content: wrap('<a href="#">LOL</a>')
        }, {
            file: '2.html',
            content: wrap('<div>XYZ<iframe src="3.html"></iframe>MNO</div>')
        }, {
            file: 'index.html',
            content: wrap('<iframe src="0.html"></iframe>DEF<iframe src="2.html"></iframe>')
        }]);
    });
});
