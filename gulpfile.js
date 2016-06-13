const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const uncss = require('gulp-uncss')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
const babelify = require('babelify')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')
const imageminOptipng = require('imagemin-optipng')
const imageminJpegtran = require('imagemin-jpegtran')
const cache = require('gulp-cache')
const del = require('del')
const inject = require('gulp-inject')
const wiredep = require('wiredep').stream
const deploy = require('gulp-gh-pages')
// Para que babelify trabaje se debe instalar babel-preset-es2015
// sudo npm install --save-dev babel-preset-es2015

// Variables
const globs = {
  build: './build',
  dist: './dist',
  src: './src',
  html: {
    main: './src/index.html',
    watch: './src/**/*.html',
    build: './build',
    dist: './dist'
  },
  styles: {
    main: './src/styles/scss/style.scss',
    watch: './src/styles/scss/**/*.scss',
    src: './src/styles',
    build: './build/styles',
    dist: './dist/styles'
  },
  scripts: {
    main: './src/scripts/main.js',
    watch: './src/scripts/main.js',
    src: './src/scripts',
    build: './build/scripts',
    dist: './dist/scripts'
  },
  images: {
    main: './src/images/**',
    watch: './src/images/**/*.*',
    src: './src/images',
    build: './build/images',
    dist: './dist/images'
  },
  videos: {
    main: './src/videos/**',
    watch: './src/videos/**/*.*',
    src: './src/videos',
    build: './build/videos',
    dist: './dist/videos'
  },
  fonts: {
    main: './src/styles/fonts/**',
    watch: './src/styles/fonts/**/*.*',
    src: './src/styles/fonts',
    build: './build/styles/fonts',
    dist: './dist/styles/fonts'
  }
}

// Servidor - Browsersync
gulp.task('serve', () => {
  browserSync.init({
    notify: false,
    logPrefix: 'BS',
    server: {
      baseDir: [globs.dist]
    },
    port: 8000,
    ui: {
      port: 8001
    },
    browser: ['google-chrome'
    // 'firefox'
    ]
  })
})

// HTML minificado
gulp.task('build:html', () => {
  return gulp.src(globs.html.watch)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(globs.build))
    .pipe(gulp.dest(globs.dist))
})

// Styles: CSS  Minificado
gulp.task('build:styles', ['styles'], () => {
  gulp.start('uncss')
})
gulp.task('styles', () => {
  return gulp.src(globs.styles.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(globs.styles.build))
    .pipe(gulp.dest(globs.styles.src))
})
// Optimiza styles.min.css
gulp.task('uncss', () => {
  return gulp.src(globs.styles.src + '/style.css')
    .pipe(uncss({
      html: ['index.html', globs.html.watch]
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(globs.styles.src))
    .pipe(gulp.dest(globs.styles.build))
    .pipe(gulp.dest(globs.styles.dist))
})

// Scripts: todos los archivos JS concatenados en uno solo minificado
gulp.task('build:scripts', () => {
  return browserify(globs.scripts.main)
    .transform(babelify, {presets: 'es2015'})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest(globs.scripts.build))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(globs.scripts.src))
    .pipe(gulp.dest(globs.scripts.build))
    .pipe(gulp.dest(globs.scripts.dist))
})

// Images
gulp.task('build:images', () => {
  return gulp.src(globs.images.main)
    .pipe(cache(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true,
      multipass: true,
      use: [
        pngquant(),
        imageminSvgo(),
        imageminOptipng({optimizationLevel: 7}),
        imageminJpegtran({progressive: true})
      ],
      svgoPlugins: [
        { removeViewBox: false }, // don't remove the viewbox atribute from the SVG
        { removeUselessStrokeAndFill: false }, // don't remove Useless Strokes and Fills
        { removeEmptyAttrs: false } // don't remove Empty Attributes from the SVG
      ]
    })))
    .pipe(gulp.dest(globs.images.build))
    .pipe(gulp.dest(globs.images.dist))
})

// Inyectando css y js al index.html
gulp.task('inject', () => {
  return gulp.src(globs.html.main)
    .pipe(inject(gulp.src([globs.styles.src + '/style.min.css', globs.scripts.src + '/main.min.js'], {read: false}, {relative: true})))
    .pipe(gulp.dest(globs.src))
})

// Inyectando las librerias Bower
gulp.task('wiredep', () => {
  gulp.src('./src/*.html')
    .pipe(wiredep({
      directory: './src/bower_components'
    }))
    .pipe(gulp.dest(globs.src))
})

// Clean
gulp.task('clean', (cb) => {
  return del([globs.build, globs.dist], cb)
})

// Deploy to gh-pages
gulp.task('deploy', () => {
  return gulp.src('./dist/**/*')
    .pipe(deploy())
})

// Copy
gulp.task('copy', () => {
  gulp.src(globs.html.main)
    .pipe(gulp.dest('./'))
  gulp.src(['./src/bower_components/**'])
    .pipe(gulp.dest('./build/bower_components'))
    .pipe(gulp.dest('./dist/bower_components'))
  gulp.src(globs.fonts.src + '/fonts-mfizz/**/*.*')
    .pipe(gulp.dest(globs.fonts.dist + '/fonts-mfizz'))
  gulp.src(globs.fonts.src + '/fontawesome/**/*.*') // Comentar si se va a usar el cdnjs
    .pipe(gulp.dest(globs.fonts.dist + '/fontawesome')) // Comentar si se va a usar el cdnjs
  gulp.src(globs.scripts.src + '/TodoController.js')
    .pipe(gulp.dest(globs.scripts.dist))
})

// Reload
gulp.watch([
  globs.html.watch,
  globs.styles.watch,
  globs.scripts.watch,
  './bower.json'
]).on('change', reload)

// Watch
gulp.task('watch', () => {
  gulp.watch(globs.html.watch, ['build:html'])
  gulp.watch(globs.styles.watch, ['build:styles'])
  gulp.watch(globs.scripts.watch, ['build:scripts'])
  gulp.watch(globs.images.watch, ['build:images'])
  gulp.watch(['./bower.json'], ['wiredep', 'copy'])
})

// Build
gulp.task('build', ['copy'], () => {
  gulp.start('build:html', 'build:scripts', 'build:images', 'wiredep', 'build:styles')
})

// Default
gulp.task('default', ['clean'], () => {
  gulp.start('serve', 'watch', 'build')
})
