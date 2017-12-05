/*!
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var config = {
    node: { path: 'node_modules/'}
  };
  
  var mq4HoverShim = require('mq4-hover-shim');
  var autoprefixer = require('autoprefixer')([
    "Chrome >= 45",
    "Firefox ESR",
    "Edge >= 12",
    "Explorer >= 10",
    "iOS >= 9",
    "Safari >= 9",
    "Android >= 4.4",
    "Opera >= 30"
  ]);
  // Project configuration.
grunt.initConfig({   
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    config: config,
    // Task configuration.
    clean: {
      dist: '_site',
   },
    concat: {
      bootstrap: {
        src: [
          '<%= config.node.path %>jquery/dist/jquery.min.js',
          '<%= config.node.path %>popper.js/dist/umd/popper.min.js',        
          '<%= config.node.path %>bootstrap/dist/js/bootstrap.min.js',
          'assets/js/fixedsticky.js'
        ],
        dest: '_site/js/app.js'
      }
    },
    sass: {
      options: {
        includePaths: [ config.node.path ],
        precision: 6,
        sourceComments: false,
        sourceMap: true,
        outputStyle: 'expanded'
      },
      dist: {
        files: {
          '_site/css/app.css': 'scss/app.scss'
        }
      }
    },

    // CSS build configuration
    scsslint: {
      options: {
        bundleExec: true,
        config: 'scss/.scss-lint.yml',
        reporterOutput: null
      },
      core: {
        src: ['scss/*.scss']
      }
    },

    postcss: {
      core: {
        options: {
          map: true,
          processors: [
            mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.bs-true-hover ' }),
            autoprefixer
          ]
        },
        src: '_site/css/*.css'
      }
    },
    nunjucks: {
      development: {
      options: {data:{'env':'development'}},
       files: [
           {
              expand: true,
              cwd: "html/",
              src: "*.html",
              dest: "_site/",
              ext: ".html"
           }
        ]
      },
      production: {
      options: {data:{'env':'development'}},
       files: [
           {
              expand: true,
              cwd: "html/",
              src: "*.html",
              dest: "_site/",
              ext: ".html"
           }
        ]
      }
    },
    htmllint: {
      options: {
        ignore: [
          'Element “img” is missing required attribute “src”.',
          'Attribute “autocomplete” is only allowed when the input type is “color”, “date”, “datetime”, “datetime-local”, “email”, “month”, “number”, “password”, “range”, “search”, “tel”, “text”, “time”, “url”, or “week”.',
          'Attribute “autocomplete” not allowed on element “button” at this point.',
          'Element “div” not allowed as child of element “progress” in this context. (Suppressing further errors from this subtree.)',
          'Consider using the “h1” element as a top-level heading only (all “h1” elements are treated as top-level headings by many screen readers and other tools).',
          'The “color” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “date” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “datetime-local” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “month” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “time” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “week” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.'
        ]
      },
      src: ['_site/**/*.html']
    },
    watch: {
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['compile-sass'],
        options: {
         livereload: true 
        }
      },
      html: {
        files: 'html/**/*.html',
        tasks: ['compile-html'],
        options: {
         livereload: true 
        }
      }          
    },
    connect: {
    server: {
      options: {
        base: '_site',
        port: 8080,
        livereload: true
      }
    }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {});
  require('time-grunt')(grunt);
      
  grunt.registerTask('compile-html', ['nunjucks:development', 'htmllint']);
  grunt.registerTask('compile-sass', ['sass', 'postcss']);
  grunt.registerTask('server', ['connect', 'watch']);
  // Default task.
  grunt.registerTask('default', ['clean', 'concat', 'compile-sass', 'compile-html', 'server']);
};
