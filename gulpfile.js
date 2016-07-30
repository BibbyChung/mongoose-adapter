"use strict";

let gulp = require("gulp");
let shell = require("gulp-shell");
let merge = require("merge-stream");
let rimraf = require("rimraf");
let runSequence = require("run-sequence");
let through = require('through2');

let ts = require("gulp-typescript");
let sourcemaps = require("gulp-sourcemaps");
let path = require('path');

//=================================== Method ===================================

let tsCompiler = function (
    pathArr,
    tsconfigPath,
    sroucemapPostfix,
    targetPath,
    isUglify) {

    return gulp.src(pathArr)
        .pipe(sourcemaps.init())
        .pipe(ts(ts.createProject(tsconfigPath)))
        .js
        //.pipe(uglify())
        .pipe(sourcemaps.write("./", {
            includeContent: false,
            sourceRoot: function (file) {
                let arr = file.relative.split("/");
                let prefix = "";
                for (let i = 0; i < arr.length; i++) {
                    prefix += "../";
                }
                return prefix + sroucemapPostfix;
            }
        }))
        .pipe(gulp.dest(targetPath));
};

let getCopyFilesPipe = (sourcePatten, targetPath) => {

    return gulp.src(sourcePatten)
        .pipe(gulp.dest(targetPath));

};

//=================================== Tasks ===================================

gulp.task("clean", (cb) => {

    rimraf("./test", () => {
        rimraf("./dist", cb);
    });

});

gulp.task("copy_feature_to_test", () => {

    let m = merge();

    let test = gulp.src([
        "./src/**/*.feature",
    ]).pipe(gulp.dest("./test/"));
    m.add(test);

    return m;

});

gulp.task('ts_compile_test', () => {

    let m = merge();

    let test = tsCompiler(
        [
            "./src/**/*.ts",
        ],
        "tsconfig.json",
        "src",
        "./test",
        false
    );
    m.add(test);

    return m;

});

gulp.task('ts_compile_dist', () => {

    let m = merge();

    let dist = tsCompiler(
        [
            "./src/code/**/*.ts",
        ],
        "tsconfig.json",
        "src/code",
        "./dist",
        false
    );
    m.add(dist);

    return m;

});

gulp.task("run_cucumber", shell.task([
    'cucumber.js test/**/*.feature --format progress'
    //'cucumber.js --format pretty'
]));

//----------------------------------------------------------------------


gulp.task('default', (cb) => {
    runSequence(
        "clean",
        [
            "ts_compile_test",
            "ts_compile_dist",
            "copy_feature_to_test",
        ],
        [
            "run_cucumber",
        ],
        cb
    );
});

