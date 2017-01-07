var gulp = require('gulp'),
        jshint = require('gulp-jshint'),
        nodemon = require('gulp-nodemon'),
        jsFiles = ['*.js', 'src/**/*.js'];

//Validate our scripts
gulp.task('style', function (){
    return gulp.src(jsFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {
                verbose: true
            }));
});

//Inject source-scripts into index.html automatically
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    
    var injectSrc = gulp.src([
        './public/css/*.css',
        './public/js/*.js'],
        { read: false });
    
    var injectOptions = {
      ignorePath: '/public'  
    };
    
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    
    return gulp.src('./src/views/*.html')
            .pipe(wiredep(options))
            .pipe(inject(injectSrc, injectOptions))
            .pipe(gulp.dest('./src/views'));
});

//Refresh our browser on save(js files only)
gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: { 'PORT': 4000 },
        watch: jsFiles
    };
    
    return nodemon(options)
            .on('restart', function (ev) {
                console.log('Zoombie resurrecting...');     
    });
});