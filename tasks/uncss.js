module.exports = function (grunt) {
    var config = {
        dist: {
            files: {
                'build/assets/style.css': ['build/index.html']
            }
        }
    };

    grunt.config.set('uncss', config);
};
