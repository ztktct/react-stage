/* eslint-disable */
module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browsers: [
        "ie >= 9",
				"Android >= 4.3",
        "iOS >= 6.0",
        ">1%"
      ]
    })
  ],
}
