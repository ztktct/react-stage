/* eslint-disable */
module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browsers: [
        'Android >= 2.3', 
        'Firefox >= 20',
        'iOS >= 6.0',
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ]
    })
  ],
}
