module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'index.js']
        },
        release: {
            options: {
                changelog: true
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['tests/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['jshint']);
};
