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
    sourceRoot,
    targetPath,
    isUglify
) {

    let tscP = ts.createProject(tsconfigPath);

    return gulp.src(pathArr)
        .pipe(sourcemaps.init())
        .pipe(tscP())
        .js
        //.pipe(uglify())
        .pipe(sourcemaps.write("./", {
            includeContent: false,
            sourceRoot: sourceRoot,
        }))
        .pipe(gulp.dest(targetPath));

};

let tsdCompiler = function (
    pathArr,
    tsconfigPath,
    targetPath
) {

    let tscP = ts.createProject(tsconfigPath, {
        "isolatedModules": false,
    });

    return gulp.src(pathArr)
        .pipe(tscP())
        .dts
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
        "tsconfig.test.json",
        "../src",
        "./test",
        false
    );
    m.add(test);

    return m;

});

gulp.task('ts_compile_dist', () => {

    let m = merge();

    let code = tsCompiler(
        [
            "./src/code/**/*.ts",
        ],
        "tsconfig.node.json",
        "../../src/code",
        "./dist/code",
        false
    );
    m.add(code);

    return m;

});

gulp.task('tsd_compile_dist', () => {

    let m = merge();

    let code = tsdCompiler(
        [
            "./src/code/**/*.ts",
        ],
        "./tsconfig.node.json",
        "./dist/code"
    );
    m.add(code);

    return m;

});

gulp.task("run_cucumber", shell.task([
    'cucumber.js test/**/*.feature --format progress'
    //'cucumber.js --format pretty'
]));

gulp.task("create_ts_definitions", shell.task([
    'tsc --declaration ./src/main.ts'
    //'cucumber.js --format pretty'
]));

//----------------------------------------------------------------------


gulp.task('default', (cb) => {
    runSequence(
        "clean",
        [
            "ts_compile_test",
            "copy_feature_to_test",
        ],
        [
            "run_cucumber",
        ],
        [
            "ts_compile_dist",
            "tsd_compile_dist"
        ],
        cb
    );
});

