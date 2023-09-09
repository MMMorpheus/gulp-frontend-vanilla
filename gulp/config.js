const srcPath = './src';
const destPath = './dist';

const config = {
  src: {
    root: srcPath,
    html: `${srcPath}/html/*.html`,
    scss: `${srcPath}/scss/main.scss`,
    scripts: `${srcPath}/scripts/app.js`,
    fonts: `${srcPath}/assets/fonts`,
    img: [`${srcPath}/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg}`, `${srcPath}/assets/icons/**/*.svg`],
    imgToWebp: `${srcPath}/assets/img/**/*.{jpg,jpeg,png}`,
    svgSprite: `${srcPath}/assets/icons/*.svg`,
    favicons: `${srcPath}/assets/favicons/*.{jpg,jpeg,png,gif}`
  },
  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    fonts: `${destPath}/fonts`,
    img: `${destPath}/img`,
    favicons: `${destPath}/img/favicons`,
  },
  watch: {
    root: srcPath,
    html: `${srcPath}/html/**/*.html`,
    scss: `${srcPath}/scss/**/*.scss`,
    scripts: `${srcPath}/scripts/**/*.js`,
    img: [`${srcPath}/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg}`, `${srcPath}/assets/icons/**/*.svg`],
  },
  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
