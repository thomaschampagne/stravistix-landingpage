var gulp = require('gulp-param')(require('gulp'), process.argv);
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');

var src = './src/';
var dist = './dist/';

// Cleaning task
gulp.task('clean', function() {
    return gulp.src(dist)
        .pipe(plugins.clean({
            force: true
        }));
});

// Styles less compile and css copy (src + libs)
gulp.task('styles', function(prod) {

    if (prod) {
        gutil.log('Minifying css for <production> environnement');
    }

    return gulp.src(
            [
                'node_modules/fullpage.js/jquery.fullPage.css',
                'node_modules/animate.css/animate.css',
                'node_modules/bootstrap/dist/css/bootstrap.css',
                'modules/swipebox/src/css/swipebox.css',
                src + 'less/main.less' // Font-awesome is loaded in that file
            ]
        ).pipe(plugins.less())
        .pipe(plugins.csscomb())
        .pipe(plugins.concat('style/main.css'))
        .pipe(plugins.if(prod, plugins.cleanCss()))
        .pipe(gulp.dest(dist));
});

// JS concat (+ minify & uglify if --prod parameter)
gulp.task('scripts', function(prod) {

    if (prod) {
        gutil.log('Uglify scripts for <production> environnement');
    }

    return gulp.src(['node_modules/jquery/dist/jquery.js',
            'node_modules/fullpage.js/vendors/jquery.slimscroll.js',
            'node_modules/fullpage.js/jquery.fullPage.js',
            'node_modules/underscore/underscore.js',
            'node_modules/angular/angular.js',
            'modules/swipebox/src/js/jquery.swipebox.js',
            src + 'js/**/*.js'
        ]).pipe(plugins.concat('script.js'))
        .pipe(plugins.if(prod, plugins.uglify()))
        .pipe(gulp.dest(dist + 'js/'));
});

// Copy others resources
gulp.task('resCopy', function() {

    // Copy HTML & Template
    gulp.src(src + '/index.html')
        .pipe(gulp.dest(dist));

    gulp.src(src + '/builds/index.html')
        .pipe(gulp.dest(dist + '/builds/'));

    gulp.src(src + 'templates/**/*')
        .pipe(gulp.dest(dist + 'templates/'));

    // Copy font
    gulp.src([src + 'font/MANIFESTO.ttf',
        'node_modules/font-awesome/fonts/*'
    ]).pipe(gulp.dest(dist + 'fonts'));

    // Copy Images
    return gulp.src([src + 'img/**/*',
        'modules/swipebox/src/img/**'
    ]).pipe(gulp.dest(dist + 'img/'));
});

// Defining tasks
gulp.task('build', ['styles', 'scripts', 'resCopy']); // Add option "--prod" for minify & uglify & concat javascript+css
gulp.task('default', ['build']);
gulp.task('watch', function() {
    gulp.watch(src + '/**/*', ['build']);
});
