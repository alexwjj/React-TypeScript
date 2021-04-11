const CracoLessPlugin = require('craco-less');
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
	webpack: {
		alias: {
			'@': pathResolve('src'),
			'@assets': pathResolve('src/assets'),
			'@components': pathResolve('src/components'),
		},
		module: {
			rules: [{
				test: /\.md$/i,
				use: "raw-loader"
			}]
		},
	},
	module: {
		rules: [{
			test: /\.md$/i,
			use: "raw-loader"
		}]
	},
	plugins: [{
		plugin: CracoLessPlugin,
		options: {
			lessLoaderOptions: {
				lessOptions: {
					modifyVars: {
						'@primary-color': '#3e7fee'
					},
					javascriptEnabled: true,
				},
			},
		},
	}, ],
};