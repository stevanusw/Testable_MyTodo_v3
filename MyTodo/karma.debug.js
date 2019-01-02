module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        reporters: ['progress', 'html', 'coverage'],
        htmlReporter: {
            outputDir: 'scripts/tests/reports/debug',
            templatePath: __dirname + '/node_modules/karma-html-reporter/jasmine_template.html'
        },
        preprocessors: {
            'scripts/src/*.js': ['coverage']
        },
        coverageReporter: {
            type: 'html',
            dir: 'scripts/tests/coverage'
        },
        browsers: ['PhantomJS'],
        port: 9878,
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true
    });
};