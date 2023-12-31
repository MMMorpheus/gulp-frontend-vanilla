import gulp from 'gulp';
import fs from 'fs';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

import config from '../config.js';

// Конвертация из otf в ttf
const otfToTtf = () => {
  // Ищем файлы шрифтов
  return (
    gulp
      .src(`${config.src.fonts}/*.otf`, {})
      .pipe(
        plumber(
          notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // Ковертируем в .ttf
      .pipe(
        fonter({
          formats: ['ttf'],
        })
      )
      // Выгружаем в исходную папку
      .pipe(gulp.dest(`${config.src.fonts}`))
  );
};

// Конвертация из ttf в woff и woff2
const ttfToWoff = () => {
  return gulp
    .src(`${config.src.fonts}/*.ttf`, {})
    .pipe(
      plumber(
        notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(gulp.dest(config.dest.fonts))
    .pipe(gulp.src(`${config.src.fonts}/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(config.dest.fonts));
};

// Автоматическое подключение шрифтов через @font-face в файл _fonts.scss
const fontsStyle = () => {
  //Файл стилей подключения шрифтов
  let fontsFile = `${config.src.root}/scss/_fonts.scss`;
  //Проверяем, существуют ли файлы шрифтов
  fs.readdir(config.dest.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //Проверяем, существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        //Если файла нет, создаём его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          //Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === 'extrabold' ||
              fontWeight.toLowerCase() === 'heavy'
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        //Если файл есть, выводим сообщение
        console.log(
          'Файл scss/_fonts.scss уже существует. Для обновления файла шрифтов его нужно предварительно удалить!'
        );
      }
    }
  });
  return gulp.src(`${config.src.root}`);
  function cb() {}
};

export const fontsBuild = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
