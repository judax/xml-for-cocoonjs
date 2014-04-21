module.exports = {

    standalone: {
        options: {
            banner: '<%= banner %>'
        },
        src: [
            'src/Intro.js',
            'src/sax.js',
            'src/DOMException.js',
            'src/NodeList.js',
            'src/NamedNodeMap.js',
            'src/Node.js',
            'src/Attr.js',
            'src/Comment.js',
            'src/Text.js',
            'src/CDATA.js',
            'src/ProcessingInstruction.js',
            'src/Element.js',
            'src/DocumentType.js',
            'src/DOMImplementation.js',
            'src/Document.js',
            'src/DocumentFragment.js',
            'src/Outro.js'
        ],
        dest: '<%= compile_dir %>/xml-for-cocoonjs.js'
    }

};