module.exports = function (grunt) {
    var config = {
        options: {
            layout: 'source/layouts/default.hbs',
            flatten: true,
            production: false,
            data: 'source/data/*.yml',
            partials: ['source/partials/*.hbs']
        },
        pages: {
            options: {
                assets: 'build/assets'
            },
            files: {
                'build/': [
                    'source/pages/index.hbs'
                ]
            }
        }
    };

    grunt.config.set('assemble', config)
};
