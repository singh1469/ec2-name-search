module.exports = function(grunt){
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsonlint:{
            all:{
                src: ['package.json']
            }
        },
        jshint:{
            all:['Gruntfile.js','*.js']
        },
        'mochaTest': {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/auth.js']
        },
        watch: {
            options:{
                atBegin:true
            },
            files: ['Gruntfile.js', 'index.js', 'search.js'],
            tasks: "default"
        }
    });

    //include npm modules via load-grunt-tasks grunt plugin which auto-includes grunt plugins in package.json
    require('load-grunt-tasks')(grunt);

    //test
    grunt.registerTask('test', ['mochaTest']);

    //Default grunt
    grunt.registerTask('default', ['jsonlint','jshint','mochaTest']);
};