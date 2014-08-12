var tests = [ '../test/specs/index_spec' ];

require.config({
    baseUrl : '../app',
    paths : {
        'mocha' : 'libs/mocha/mocha',
        'expect' : 'libs/expect/index'
    },
    shim : {
        'mocha' : {
            exports : 'mocha'
        },
        'expect' : {
            exports : 'expect'
        },
    }
});

require([ 'require.config', 'mocha', 'expect' ], function() {
    var mocha = require('mocha');
    mocha.setup('bdd');
    require(tests, function() {
        mocha.run();
    });
});
