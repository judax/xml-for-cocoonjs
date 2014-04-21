module.exports = {
   
    standalone: {
        options: {
            sourceMap: true,
            sourceMapName: '<%= compile_dir %>/xml-for-cocoonjs.map',
            banner: '/* XML for CocoonJS v<%= package.version %> - (c) 2014 Dan Cox. */\n'
        },
        src: ['<%= concat.standalone.dest %>'],
        dest: '<%= compile_dir %>/xml-for-cocoonjs.min.js'
    }
};