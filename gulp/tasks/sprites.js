import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import svgMin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';

import config from '../config.js';

export const spritesBuild = () => {
  return gulp
    .src(config.src.svgSprite)
    .pipe(
      svgMin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(
      plumber(
        notify.onError({
          title: 'SPRITE',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(gulp.dest(config.dest.img));
};

export const spritesWatch = () => gulp.watch(config.watch.img[1], spritesBuild)
