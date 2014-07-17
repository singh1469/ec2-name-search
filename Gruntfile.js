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
        watch: {
            files: ['Gruntfile.js', 'index.js', 'auth.js'],
            tasks: "default"
        }
    });

    //include npm modules via load-grunt-tasks grunt plugin which auto-includes grunt plugins in package.json
    require('load-grunt-tasks')(grunt);

    //Default grunt
    grunt.registerTask('default', ['jsonlint','jshint']);
};