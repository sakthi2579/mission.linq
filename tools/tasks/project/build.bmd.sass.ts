import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {ASSETS_SRC, ENV } from '../../config';
//import * as Findup from 'findup-sync';

const plugins = <any>gulpLoadPlugins();
//const node_modules = Findup.findup('node_modules');

let options = {
    includePaths: [join(process.cwd(), 'node_modules')] // this will find any node_modules above the current working directory
};

const isProd = ENV === 'prod';

export = () => {
    let src = ['./node_modules/bootstrap-material-design/**/*.scss'];
    return gulp.src(src)
        .pipe(isProd ? plugins.util.noop() : plugins.sourcemaps.init())
        .pipe(plugins.sass(options).on('error', plugins.sass.logError))
        .pipe(isProd ? plugins.util.noop() : plugins.sourcemaps.write()) //map written inline
        .pipe(plugins.rename({ dirname: '' }))
        .pipe(gulp.dest(ASSETS_SRC));
}
