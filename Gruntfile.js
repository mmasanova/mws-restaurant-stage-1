/*
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm', 
          sizes: [{
            rename: false,
            width: 160,
            suffix: '-small',
            quality: 60
          },
          {
            rename: false,
            width: 320,
            suffix: '-small_2x',
            quality: 40
          },
          {
            rename: false,
            width: 270,
            suffix: '-medium',
            quality: 40
          },
          {
            rename: false,
            width: 540,
            suffix: '-medium_2x',
            quality: 40
          },
          {
            rename: false,
            width: 350,
            quality: 60
          },
          {
            rename: false,
            width: 700,
            quality: 40,
            suffix: '_2x'
          }]
        },

        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'img/'
        }]
      }
    },

    imagemin: {
        dynamic: {
            options: {
              optimizationLevel: 5
            },
            files: [{
              expand: true,
              cwd: 'img/',
              src: ['*.{png,jpg,gif}'],
              dest: 'images-min/'
            }]
        }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'img/'
        }]
      },
    },

    eslint: {
        options: {
            configFile: 'conf/eslint.json',
            rulePaths: ['conf/rules']
        },
        target: ['file.js']
    }
  });
  
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);
  grunt.registerTask('eslint', ['eslint']);
};