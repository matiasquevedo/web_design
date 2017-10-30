module.exports = function(grunt) {

  var concatFile = 'temp/js/materialize_concat.js.map';

  // configure the tasks
  var config = {
    //  Copy
    copy: {
      dist: { cwd: 'fonts', src: [ '**' ], dest: 'dist/fonts', expand: true },
    },

    
    //  Clean
    clean: {
      temp: {
        src: [ 'temp/' ]
      },
    },


    
    //  Jade
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          "index.html": "jade/index.jade",
          "en-index.html": "jade/en-index.jade",

          "contacto.html": "jade/contacto.jade",
          "en-contacto.html": "jade/en-contacto.jade",

          "template.html": "jade/template.jade",
          "en-template.html": "jade/en-template.jade",

        }
      }
    },

//  Sass
    sass: {                              // Task
      expanded: {                            // Target
        options: {                       // Target options
          outputStyle: 'expanded',
          sourcemap: false,
        },
        files: {
          'dist/css/materialize.css': 'sass/materialize.scss',
        }
      },

      min: {
        options: {
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'dist/css/materialize.min.css': 'sass/materialize.scss',
        }
      },

      // Compile ghpages css
      gh: {
        options: {
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'css/ghpages-materialize.css': 'sass/ghpages-materialize.scss',
        }
      },

      // Compile bin css
      bin: {
        options: {
          outputStyle: 'expanded',
          sourcemap: false
        },
        files: {
          'bin/materialize.css': 'sass/materialize.scss',
        }
      }
    },



// PostCss Autoprefixer
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: [
              'last 2 versions',
              'Chrome >= 30',
              'Firefox >= 30',
              'ie >= 10',
              'Safari >= 8']
          })
        ]
      },
      expanded: {
        src: 'dist/css/materialize.css'
      },
      min: {
        src: 'dist/css/materialize.min.css'
      },
      gh: {
        src: 'css/ghpages-materialize.css'
      },
      bin: {
        src: 'bin/materialize.css'
      }
    },




    babel: {
      options: {
        sourceMap: false,
        plugins: [
          'transform-es2015-arrow-functions',
          'transform-es2015-block-scoping',
          'transform-es2015-classes',
          'transform-es2015-template-literals'
        ]
      },
      bin: {
        options: {
          sourceMap: true
        },
        files: {
          'bin/materialize.js': 'temp/js/materialize_concat.js'
        }
      },
      dist: {
        files: {
          'dist/js/materialize.js': 'temp/js/materialize.js'
        }
      }
    },

    //Reactividad
    browserSync: {
      bsFiles: ["bin/*", "css/ghpages-materialize.css", "!**/node_modules/**/*"],
      options: {
        server: {
          baseDir: "./" // make server from root dir
        },
        port: 8000,
        ui: {
          port: 8080,
          weinre: {
            port: 9090
          }
        },
        open: false
      }
    },

    //  Concurrent
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 10,
      },
      monitor: {
        tasks: ["jade_compile", "sass_compile", "js_compile",
                "watch:jade", "watch:js", "watch:sass",
                "notify:watching", 'server']
      },
    },

    //  Notifications
    notify: {
      watching: {
        options: {
          enabled: true,
          message: 'Watching Files!',
          title: "web_desing", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      sass_compile: {
        options: {
          enabled: true,
          message: 'Sass Compiled!',
          title: "web_desing",
          success: true,
          duration: 1
        }
      },

      js_compile: {
        options: {
          enabled: true,
          message: 'JS Compiled!',
          title: "web_desing",
          success: true,
          duration: 1
        }
      },

      jade_compile: {
        options: {
          enabled: true,
          message: 'Jade Compilado // Jade Compiled!',
          title: "web_desing",
          success: true,
          duration: 1
        }
      },

      server: {
        options: {
          enabled: true,
          message: 'Server Running!',
          title: "web_desing",
          success: true,
          duration: 1
        }
      }
    },

    //  Concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
          "js/initial.js",
          "js/jquery.easing.1.4.js",
          "js/animation.js",
          "js/velocity.min.js",
          "js/hammer.min.js",
          "js/jquery.hammer.js",
          "js/global.js",
          "js/collapsible.js",
          "js/dropdown.js",
          "js/modal.js",
          "js/materialbox.js",
          "js/parallax.js",
          "js/tabs.js",
          "js/tooltip.js",
          "js/waves.js",
          "js/toasts.js",
          "js/sideNav.js",
          "js/scrollspy.js",
          "js/forms.js",
          "js/slider.js",
          "js/cards.js",
          "js/chips.js",
          "js/pushpin.js",
          "js/buttons.js",
          "js/transitions.js",
          "js/scrollFire.js",
          "js/date_picker/picker.js",
          "js/date_picker/picker.date.js",
          "js/date_picker/picker.time.js",
          "js/character_counter.js",
          "js/carousel.js",
          "js/tapTarget.js",
        ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize.js'
      },
      temp: {
        // the files to concatenate
        options: {
          sourceMap: true,
          sourceMapStyle: 'link'
        },
        src: [
          "js/initial.js",
          "js/jquery.easing.1.4.js",
          "js/animation.js",
          "js/velocity.min.js",
          "js/hammer.min.js",
          "js/jquery.hammer.js",
          "js/global.js",
          "js/collapsible.js",
          "js/dropdown.js",
          "js/modal.js",
          "js/materialbox.js",
          "js/parallax.js",
          "js/tabs.js",
          "js/tooltip.js",
          "js/waves.js",
          "js/toasts.js",
          "js/sideNav.js",
          "js/scrollspy.js",
          "js/forms.js",
          "js/slider.js",
          "js/cards.js",
          "js/chips.js",
          "js/pushpin.js",
          "js/buttons.js",
          "js/transitions.js",
          "js/scrollFire.js",
          "js/date_picker/picker.js",
          "js/date_picker/picker.date.js",
          "js/date_picker/picker.time.js",
          "js/character_counter.js",
          "js/carousel.js",
          "js/tapTarget.js",
        ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize_concat.js'
      },
    },

    //  Watch Files
    watch: {
      jade: {
        files: ['jade/**/*'],
        tasks: ['jade_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      js: {
        files: [ "js/**/*", "!js/init.js"],
        tasks: ['js_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      sass: {
        files: ['sass/**/*'],
        tasks: ['sass_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      }
    },


  };

  grunt.initConfig(config);

  // load the tasks
  // grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-rename-util');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-babel');


  // define the tasks
  grunt.registerTask(
    'release',[
      'lint',
      'copy',
      'sass:expanded',
      'sass:min',
      'postcss:expanded',
      'postcss:min',
      'concat:dist',
      'babel:dist',
      'uglify:dist',
      'uglify:extras',
      'usebanner:release',
      'compress:main',
      'compress:src',
      'compress:starter_template',
      'compress:parallax_template',
      'replace:version',
      'replace:readme',
      'rename:rename_src',
      'rename:rename_compiled',
      'clean:temp'
    ]
  );

  grunt.task.registerTask("configureBabel", "configures babel options", function() {
    config.babel.bin.options.inputSourceMap = grunt.file.readJSON(concatFile);
  });

  grunt.registerTask('jade_compile', ['jade', 'notify:jade_compile']);
  grunt.registerTask('js_compile', ['concat:temp', 'configureBabel', 'babel:bin', 'notify:js_compile', 'clean:temp']);
  grunt.registerTask('sass_compile', ['sass:gh', 'sass:bin', 'postcss:gh', 'postcss:bin', 'notify:sass_compile']);
  grunt.registerTask('server', ['browserSync', 'notify:server']);
  grunt.registerTask('lint', ['removelogging:source']);
  grunt.registerTask('monitor', ["concurrent:monitor"]);
  grunt.registerTask('travis', ['js_compile', 'sass_compile', 'jasmine']);
};
