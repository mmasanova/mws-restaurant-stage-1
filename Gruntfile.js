/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
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
          // {
          //   rename: false,
          //   width: 480,
          //   suffix: '-small_3x',
          //   quality: 40
          // },
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
          // {
          //   rename: false,
          //   width: 810,
          //   suffix: '-medium_3x',
          //   quality: 40
          // },
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
          // {
          //   rename: false,
          //   width: 1050,
          //   quality: 30,
          //   suffix: '_3x'
          // }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'img/'
        }]
      }
    },

    imagemin: {
        // static: {
        //     options: {
        //         optimizationLevel: 3
        //     },
        //     files: {
        //         'dist/img.png': 'src/img.png',
        //         'dist/img.jpg': 'src/img.jpg',
        //         'dist/img.gif': 'src/img.gif'
        //     }
        // },
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
  });
  
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
