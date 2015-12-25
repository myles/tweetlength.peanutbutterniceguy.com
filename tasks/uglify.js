module.exports = function (grunt) {
    var config = {
        target: {
            options: {
                sourceMap: true,
                sourceMapName: 'build/assets/app.js.map'
            },
            files: {
                'build/assets/app.js': ['source/assets/app.js']
            }
        }
    };

    grunt.config.set('uglify', config);
};
