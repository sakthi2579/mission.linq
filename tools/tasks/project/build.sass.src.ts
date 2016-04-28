import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {APP_SRC, ENV} from '../../config';
const plugins = <any>gulpLoadPlugins();

const isProd = ENV === 'prod';

export = () => {
    let src = [join(APP_SRC, '**', '*.scss')];
    return gulp.src(src)
        .pipe(isProd ? plugins.util.noop() : plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(isProd ? plugins.util.noop() : plugins.sourcemaps.write()) //map written inline
        .pipe(gulp.dest(APP_SRC));
}
