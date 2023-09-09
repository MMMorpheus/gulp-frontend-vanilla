import gulp from 'gulp';
import config from './gulp/config.js';
import {
  clean,
  server,
  htmlBuild,
  htmlWatch,
  stylesBuild,
  stylesWatch,
  scriptsBuild,
  scriptsWatch,
  fontsBuild,
  imagesBuild,
  imagesWatch,
  spritesBuild,
  spritesWatch
} from './gulp/tasks/index.js';

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.series(fontsBuild, gulp.parallel(htmlBuild, stylesBuild, scriptsBuild, imagesBuild, spritesBuild))
);

export const watch = gulp.series(
  build,
  gulp.parallel(server, htmlWatch, stylesWatch, scriptsWatch, imagesWatch, spritesWatch)
);
