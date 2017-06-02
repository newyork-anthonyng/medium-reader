module.exports = {
  scripts: {
    default: {
      script: 'webpack-dev-server --progress --inline --content-base dist/',
      description: 'Run webpack-dev-server'
    },

    serve: {
      default: {
        script: 'node server.js',
        description: 'Run server on localhost:3000'
      }
    },

    build: {
      default: {
        script: 'webpack',
        description: 'Build webpack'
      }
    },

    test: {
      default: {
        script: 'jest --watch --silent',
        description: 'Run jest in watch mode'
      }
    },

    standard: {
      script: 'standard --fix',
      description: 'Use the standard JavaScript style guide'
    }
  }
}
