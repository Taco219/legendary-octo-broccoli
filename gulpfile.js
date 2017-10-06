const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const exec = require('child_process').exec;

// server
gulp.task('nodemon', function () {
    nodemon({
        script: "./out/server/server.js",
        watch: ["./out/server"],
        ext: 'js html',
        ignore: ["package.json", "gulpfile.js", ".gitignore"],
        verbose: true,
        nodeArgs: [],
        args: [process.argv[2]]
    }).on('restart', function () {
        // setTimeout(function () {
        //     browserSync.reload();
        // }, 1000);
    });
});

gulp.task('babel', function () {
    exec('babel ./src/server --out-dir ./out/server -dv --copy-files');
});

gulp.task('babel-watch', function () {
    exec('babel ./src/server --out-dir ./out/server --watch -dv --copy-files', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('dev', ['babel-watch', 'nodemon']);

