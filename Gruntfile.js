module.exports = function(grunt) {

  var loadConfig = require('load-grunt-config');

  loadConfig(grunt, {
    configPath: __dirname + '/tasks/options',
    config: {
      release_dir: 'build',
      compile_dir: 'dist',
      banner: require('fs').readFileSync(__dirname + '/tasks/banner.js', 'utf8')
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', ['clean', 'concat', 'jshint', 'uglify']);

  grunt.registerTask('dist', ['build', 'copy']);

};