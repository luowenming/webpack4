// webpack 是node写出来 node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devServer: {
		port: 3000,
		progress: true,
		contentBase: path.resolve(__dirname, 'build'),
		compress: true
	},
	mode: 'development', // 模式两种，production development
	entry: './src/index.js', // 人口文件
	output: {
		filename: 'bundle.[hash].js', // 打包后的文件名 [hash] 生成的文件带上hash
		path: path.resolve(__dirname, 'build'), // 路径必须是绝对路径，path可以把路径转化为绝对路径，__dirname：当前目录下
	},
	plugins: [ // 数组 放着所有的webpack插件
		new HtmlWebpackPlugin({
			template: './src/index.html', // 模板路径
			filename: 'index.html', // 打包后文件名字
			minify: {
				removeAttributeQuotes: true, // 删除模板中的双引号
				collapseWhitespace: true // 不换行
			},
			hash: true // 开启hash
		})
	]
}