import * as gulp from 'gulp';
// import {join} from 'path';
import { ASSETS_SRC} from '../../config';
import * as gulpLoadPlugins from 'gulp-load-plugins';

const plugins = <any>gulpLoadPlugins();

export = () => {
    let src = ['./node_modules/ng2-material/font/MaterialIcons-Regular.*'];
    return gulp.src(src)
        .pipe(plugins.print(function(filepath: string) {
            return 'built: ' + filepath;
        }))
        .pipe(gulp.dest(ASSETS_SRC));
}
