/*
 * grunt-neuron-tpl2mod
 * https://github.com/supersheep/grunt-neuron-tpl2mod
 *
 * Copyright (c) 2013 supersheep
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var PREFIX = 'DP.define(function(){\n    return ';
  var SUFFIX = ';\n});';

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('neuron_tpl2mod', 'translate text template to neuron module', function() {
    
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })[0];

      if(!src){return false;}
      var file_content = grunt.file.read(src);

      var lines = file_content.split("\n");
      var lines_count = lines.length;

      file_content = PREFIX + lines.map(function(line,index){
        var plus = index===lines_count-1 ? "" : "+";
        return "'" + line.trim().replace(/'/g,"\\'") + "'" + plus;
      }).join("\n") + SUFFIX;

      // Write the destination file.
      grunt.file.write(f.dest, file_content);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
