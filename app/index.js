'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore');

var UmxModuleGenerator = yeoman.generators.Base.extend({
    init : function() {
        this.pkg = require('../package.json');

        this.argument('appname', {
            type : String,
            required : false
        });
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this._.slugify(this.appname);

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor : function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous UmxModule generator!'));

        // var prompts = [ {
        // type : 'confirm',
        // name : 'someOption',
        // message : 'Would you like to enable this option?',
        // 'default' : true
        // } ];
        // this.prompt(prompts, function(props) {
        // this.someOption = props.someOption;
        // done();
        // }.bind(this));
        done();
    },

    app : function() {
        _.each([ 'src', 'test' ], function(dir) {
            this.mkdir(dir);
            this.src.recurse(dir, function(abspath, rootdir, subdir, filename) {
                var p = path.join(dir, (subdir || ''), filename);
                this.template(p, p);
            }.bind(this));
        }.bind(this));
    },

    projectfiles : function() {
        _.each([ '.bowerrc', '.gitignore', 'Gruntfile.js' ], function(file) {
            var content = this.src.read(file);
            this.write(file, content);
        }, this);

        _.each([ '.project', 'package.json', 'bower.json', 'LICENSE',
                'README.md' ], function(file) {
            this.template(file, file);
        }, this);
    }
});

module.exports = UmxModuleGenerator;
