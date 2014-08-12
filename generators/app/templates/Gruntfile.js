var UmxGruntConfig = require('umx-grunt-config');
module.exports = function(grunt) {
    var configurator = new UmxGruntConfig(require, grunt);
    configurator.initBump();
    configurator.initWatch();
    configurator.initJshint();
    configurator.initUglify();
    configurator.registerBumpTasks();
    configurator.config.connect = {
        options : {
            port : 9000,
            open : true,
            // Change this to '0.0.0.0' to access the server from outside
            hostname : 'localhost',
            middleware : function(connect) {
                return [ connect.static('app') ];
            }
        }
    };
    grunt.initConfig(configurator.config);
    grunt.registerTask('commit', [ 'bump-commit' ]);
}
