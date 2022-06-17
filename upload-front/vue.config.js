// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const merge = require('webpack-merge')
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const tsImportPluginFactory = require('ts-import-plugin')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	// publicPath: process.env.NODE_ENV === 'production' ? '/yyj/' : '/',
	parallel: false,

	//配置路径别名
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'@a': resolve('src/assets'),
				'@c': resolve('src/components'),
			},
		},
	},

	// chainWebpack: config => {
	// 	config.module
	// 		.rule('ts')
	// 		.use('ts-loader')
	// 		.tap(options => {
	// 			options = merge(options, {
	// 				transpileOnly: true,
	// 				getCustomTransformers: () => ({
	// 					before: [
	// 						tsImportPluginFactory({
	// 							libraryName: 'vant',
	// 							libraryDirectory: 'es',
	// 							// style: name => `${name}/style/less`,
	// 							style: true,
	// 						}),
	// 					],
	// 				}),
	// 				compilerOptions: {
	// 					module: 'es2015',
	// 				},
	// 			})
	// 			return options
	// 		})
	// },
	devServer: {
		proxy: {
			'/bigFile': {
				// target: 'http://106.14.172.134/',
				target: 'http://127.0.0.1:8880/',
				// ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/bigFile': '/bigFile',
				},
			},
      '/list': {
				// target: 'http://106.14.172.134/',
				target: 'http://127.0.0.1:8880/',
				// ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/list': '/list',
				},
			},
			// '/pcCourse': {
			// 	target: 'http://wh.xhd.cn/',
			// 	ws: true,
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		'^/pcCourse': 'http://wh.xhd.cn/pcCourse',
			// 	},
			// },
		}, // 配置多个代理
	},
}
