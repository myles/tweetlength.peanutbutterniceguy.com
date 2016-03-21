module.exports = function (grunt) {
    grunt.registerTask('build', [
        'assemble',
        'sass',
        'uglify',
        'bower-mapper'
    ]);

    grunt.registerTask('develop', [
        'build',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('deploy', [
        'clean',
        'build',
        'rsync:prod'
    ]);

    grunt.registerTask('default', [
        'develop'
    ]);
};
