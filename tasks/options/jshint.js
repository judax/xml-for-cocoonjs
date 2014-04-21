module.exports = {
    src: {
        src: [
            'src/**/*.js',
            '!src/Intro.js',
            '!src/Outro.js'
        ],
        options: { jshintrc: '.jshintrc' }
    },

    tooling: {
        src: [
            'Gruntfile.js',
            'tasks/**/*.js'
        ],
        options: { jshintrc: 'tasks/.jshintrc' }
    },

    options: {
        force: (process.env.NODE_ENV !== 'test')
    }
};