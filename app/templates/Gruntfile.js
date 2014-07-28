var BannerPlugin = require('webpack/lib/BannerPlugin');

module.exports = function(grunt) {

    // Project configuration.
    var pkg = grunt.file.readJSON('package.json');
    var licenses = '';
    (pkg.licenses || []).forEach(function(l) {
        if (licenses.length) {
            licenses += ', ';
        }
        licenses += l ? l.type || '' : '';
    });
    if (licenses.length) {
        licenses = ' | License: ' + licenses + ' ';
    }
    var banner = '<%= pkg.name %> v<%= pkg.version %>' + licenses;
    grunt.initConfig({
        pkg : pkg,
        webpack : {
            main : {
                entry : './src/index',
                output : {
                    path : './dist',
                    filename : pkg.name + '.js',
                    library : pkg.name,
                    libraryTarget : 'umd',
                    sourcePrefix : ''
                },
                plugins : [ new BannerPlugin(banner) ]
            },
            minified : {
                entry : './src/index',
                output : {
                    // optimize-minimize option
                    path : './dist',
                    filename : pkg.name + '.min.js',
                    library : pkg.name,
                    libraryTarget : 'umd',
                    sourcePrefix : ''
                }
            }
        },
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
                push : false,
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
                banner : '/*! ' + banner + ' */\n'
            },
            dest : {
                src : './dist/' + pkg.name + '.min.js',
                dest : './dist/' + pkg.name + '.min.js'
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
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bump');

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', [ 'jshint', 'mochaTest' ]);

    grunt.registerTask('build', [ 'jshint', 'mochaTest', 'webpack:main' ]);
    grunt.registerTask('build-min', [ 'jshint', 'mochaTest',
            'webpack:minified', 'uglify' ]);

    // Default task(s).
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', [ 'build', 'build-min' ]);
}