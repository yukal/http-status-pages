const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

var statusCodes = require('./src/status_codes_ua');
var statusIcons = require('./src/status_icons');

// Paths to files
const paths = {
  pug: {
    src: 'src/templates/_layout.pug',
    dest: 'dist/'
  }
};

// Task for programmatically generating pages
function generateErrorPages() {
  const tasks = [];

  append(tasks, 400);
  append(tasks, 500);

  return Promise.all(tasks);
}

// Task for watching file changes
function watchFiles() {
  gulp.watch(paths.pug.src, generateErrorPages);
}

function append(tasks = [], start = 100) {
  var statusGroup = start / 100;
  var statusZone = `${statusGroup}xx`;
  var dist = `dist/${statusZone}/`;
  var iconPrefix = 'ico-';

  var task = gulp.src('src/assets/styles/error.css')
    .pipe(plumber())
    .pipe(gulp.dest(`${dist}/styles/`));
  tasks.push(task);

  task = gulp.src('src/assets/icons/sprite.xml')
    .pipe(plumber())
    .pipe(rename({ basename: 'sprite', extname: '.svg' }))
    .pipe(gulp.dest(`${dist}/styles/`));
  tasks.push(task);

  for (let statusCode = start, end = start + 99; statusCode <= end; statusCode++) {
    var statusInfo = Object.hasOwn(statusCodes, statusCode)
      ? statusCodes[statusCode] : statusCodes.defaults[statusZone];

    var statusIcon = Object.hasOwn(statusIcons, statusCode)
      ? statusIcons[statusCode] : statusIcons.defaults[statusZone];

    // process.stdout.write(`${status} - ${statusInfo.error}\r\n`)

    var task = gulp.src(paths.pug.src)
      // Error handler so Gulp doesn't stop
      .pipe(plumber())
      .pipe(pug({
        pretty: true,

        // Pass data to Pug template
        locals: {
          statusCode, ...statusInfo,
          statusIcon,
          iconPrefix,
        },
      }))

      // Rename file to "400", "401", etc.
      .pipe(rename({ basename: `${statusCode}` }))
      .pipe(gulp.dest(dist));

    tasks.push(task);
  }

}

// Export tasks
// exports.watch = gulp.series(generateErrorPages, watchFiles);
exports.generate = generateErrorPages;
exports.default = exports.generate;
