module.exports = function (grunt) {
    var config = {
        options: {
            livereload: true
        },
        html: {
            tasks: ['assemble'],
            files: [
                'source/**/*.hbs',
                'source/**/*.yml',
                'source/helpers/*-helper.js'
            ]
        },
        sass: {
            tasks: ['sass'],
            files: ['source/assets/app.scss']
        },
        js: {
            tasks: ['uglify'],
            files: ['source/assets/app.js']
        },
        bower: {
            tasks: ['bower-mapper'],
            files: [
                'bower.json',
                'bower.mapper.json'
            ]
        }
    };

    grunt.config.set('watch', config);
};