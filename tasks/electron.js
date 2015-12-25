module.exports = function (grunt) {
    var options = {
        name: 'lint.social',
        dir: 'build',
        out: 'dist',
        version: '<%= pkg.version %>'
    }

    var config = {
        osxBuild: {
            options: {
                
            }
        }
    };

    grunt.config.set('electron', config);
};
