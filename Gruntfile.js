'use strict';
var config     = require('./config/config');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        fixmyjs: {
            options: {
                config: '.jshintrc',
                indentpref: 'spaces'
            },
            all: {
                files: [
                    {expand: true, cwd: 'www/scripts', src: ['**/*.js'], dest: 'www/scripts/', ext: '.js'}
                ]
            }
        }, jshint: {
            options: {
                reporter: require('jshint-stylish').toString(),
                jshintrc: true
            },
            all: {
                src: 'www/build/<%= pkg.name %>.js'
            }
        },
        concat: {
            dist: {
                src: [
                    'www/scripts/modules/*.js',
                    'www/scripts/config/*.js',
                    //'www/html2js/templates.js',
                    'www/scripts/routing/*.js',
                    'www/scripts/factory/*.js',
                    'www/scripts/services/*.js',
                    'www/scripts/controllers/*.js',
                    'www/scripts/directives/*.js'
                ],
                dest: 'www/build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            build: {
                src: 'www/build/<%= pkg.name %>.js',
                dest: 'www/build/<%= pkg.name %>.min.js'
            },
            options: {
                mangle: false
            }
        },
        html2js: {
            options: {
                base: 'www',
                module: 'myApp.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: 'www/**/**/**/*.html',
                dest: 'www/html2js/templates.js'
            },
        },
        mongobackup: {
            options: {
                host : config.mongoGrunt.host,
                port: config.mongoGrunt.port,
                db : config.mongoGrunt.db,
                dump:{
                    out : './dump',
                },
                restore:{
                    path : './dump/Be_Up',
                    drop : true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-fixmyjs');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-mongo-backup');
    // Default task(s).
    grunt.registerTask('default', [ 'fixmyjs','concat', 'uglify', 'jshint', 'html2js','mongobackup:dump']);

};