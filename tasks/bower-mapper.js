module.exports = function (grunt) {
    var config = {
        js: {
            src: ["twitter-text-js", "handlebars", "jquery"],
            dest: "./build/assets/",
            useMin: true
        }
    };

    grunt.config.set('bower-mapper', config);
};
