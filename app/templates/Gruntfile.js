module.exports = function(grunt) {

    // Project configuration.
    var banner = '/*! <%= pkg.name %> v<%= pkg.version %> */\n';
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        bump : {
            options : {
                files : [ 'package.json', 'bower.json' ],
                updateConfigs : [],
                commit : true,
                commitMessage : 'Release v%VERSION%',
                commitFiles : [ 'package.json', 'bower.json' ],
                createTag : true,
                tagName : 'v%VERSION%',
                tagMessage : 'Version %VERSION%',
                push : true,
                pushTo : 'upstream',
                gitDescribeOptions : '--tags --always --abbrev=1 --dirty=-d'
            }
        },
        mochaTest : {
            test : {
                options : {
                    reporter : 'spec'
                },
                src : [ 'test/spec_*.js' ]
            }
        },
        uglify : {
            options : {
                banner : banner
            },
            dest : {
                src : 'src/**/*.js',
                dest : 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint : {
            files : [ 'gruntfile.js', 'src/**/*.js', 'test/**/*.js' ],
            // configure JSHint (documented at
            // http://www.jshint.com/docs/)
            options : {
                // more options here if you want to override JSHint
                // defaults
                globals : {
                    console : true,
                    module : true,
                    require : true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bump');

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', [ 'jshint', 'mochaTest' ]);

    // Default task(s).
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', [ 'jshint', 'mochaTest', 'uglify' ]);
}