#!/usr/bin/env node
require('harmonize')();
var $ = require('get-me')(require, {
    argv: '[yargs].usage("Usage: $0 [<dest folder>] [-s <source file>]").argv',
    index: './index.js'
});

$.suspend($.index)($.argv._[0], $.argv.s, {
    done: function() {
        console.log('All done.');
    }
});
