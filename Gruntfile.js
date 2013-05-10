/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    buildManifest : {
      dist: {
        dir: '<%= pkg.dist_dir %>',
        src: ['<%= pkg.dist_dir %>/*.gif', '<%= pkg.dist_dir %>/*.jpg', '<%= pkg.dist_dir %>/*.png']
      }
    },
    bgShell : {
      _defaults: {
      },
      syncS3: {
        cmd: 's3cmd sync ./<%= pkg.dist_dir %>/ <%= pkg.S3_bucket %> --delete-removed --reduced-redundancy --add-header="Cache-Control: max-age=2592000" --no-preserve'
      },
    }
  });

  grunt.registerMultiTask('buildManifest', "creates .json file of images in the directory assigned by dist_dir", function () {
    var filesarr = [], filestr;

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        var filename = src.replace(/^.*[\\\/]/, '')
        filesarr.push("\"" + filename + "\"");
      });
    });

    filestr = filesarr.join(", ");
    grunt.file.write(this.data.dir + "/i.json",
      grunt.template.process(
        grunt.file.read('i.json.tmpl'),
        { data: { files : filestr } }
      )
    );
  });


  grunt.loadNpmTasks('grunt-bg-shell');


  // Default task.
  grunt.registerTask('default', ['buildManifest', 'bgShell:syncS3']);

};