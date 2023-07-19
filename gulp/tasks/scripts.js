import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';

import config from '../config.js';

export const scriptsBuild = () => {
  return gulp
    .src(config.src.scripts, { sourcemaps: true })
    .pipe(
      plumber(
        notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      webpack({
        mode: config.isProd ? 'production' : 'development',
        output: {
          filename: 'app.min.js',
        },
      })
    )
    .pipe(gulp.dest(config.dest.js));
};

export const scriptsWatch = () => gulp.watch(config.watch.scripts, scriptsBuild);
