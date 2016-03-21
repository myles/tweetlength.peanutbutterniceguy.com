module.exports = function (grunt) {
    var config = {
        options: {
            args: ["--verbose"],
            recursive: true
        },
        prod: {
            options: {
                src: './build/',
                dest: '/srv/www/peanutbutterniceguy.com/tweetlength/html/',
                host: 'bear'
            }
        }
    };

    grunt.config.set('rsync', config);
};
