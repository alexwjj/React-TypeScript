const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(createProxyMiddleware('/api', { target: 'http://123.57.208.169:8888/', changeOrigin: true }));
	app.use(
		createProxyMiddleware('/fileApi', {
			target: 'http://123.57.208.169:8888/',
			changeOrigin: true,
			pathRewrite: {
				'^/fileApi': '',
			},
		})
	);
};
