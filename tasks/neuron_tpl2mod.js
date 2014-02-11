/*
 * grunt-neuron-tpl2mod
 * https://github.com/supersheep/grunt-neuron-tpl2mod
 *
 * Copyright (c) 2013 supersheep
 * Licensed under the MIT license.
 */

'use strict';

var tpl2mod = require("tpl2mod");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tpl2mod', 'translate text template to neuron module', function() {
    var options = this.options({
      prefix: '',
      suffix: ''
    });

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

      file_content = tpl2mod(file_content,options);

      // Write the destination file.
      grunt.file.write(f.dest, file_content);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
