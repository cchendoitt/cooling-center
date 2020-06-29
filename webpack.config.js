require('dotenv').config()
const buildEnv = require('nyc-build-helper/build')
const build = buildEnv.getEnv(__dirname)

const replaceOptions = [{
  dir: 'dist',
  files: ['311.html'],
  rules: [{
    search: /%ver%/g,
    replace: build.projVer
  }]
}]
if (process.env.REFRESH_MINS) {
  replaceOptions.push({
    dir: 'dist/js',
    files: ['coolingCenter.js'],
    rules: [{
      search: /REFRESH_MINS\: 5/,
      replace: 'REFRESH_MINS: ' +process.env.REFRESH_MINS
    }]
  })
}

module.exports = require('nyc-build-helper').config.defaultWebpackConfig(
  __dirname,
  {
      copyOptions: [{
          from: 'src',
          test: /\.html$/
      }],
      replaceOptions
  }
)