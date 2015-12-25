module.exports = function (grunt) {
    var config = {
        dist: {
            options: {
                style: 'compressed',
                loadPath: [
                    'bower_components/bootstrap-sass/assets/stylesheets/'
                ]
            },
            files: [{
                expand: true,
                cwd: 'source/',
                src: ['assets/app.scss'],
                dest: 'build/',
                ext: '.css'
            }]
        }
    };

    grunt.config.set('sass', config);
};
