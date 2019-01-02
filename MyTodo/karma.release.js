module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        reporters: ['progress', 'html'],
        htmlReporter: {
            outputDir: 'scripts/tests/reports/release',
            templatePath: __dirname + '/node_modules/karma-html-reporter/jasmine_template.html'
        },
        browsers: ['PhantomJS'],
        port: 9877,
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true
    });
};