// webpack 是node写出来 node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	optimization: { // 优化项
		minimizer: [
			new UglifyJsPlugin({
				cache: true, // 启用文件缓存，
				parallel: true, // 使用多进程并行运行来提高构建速度
				sourceMap: true,
			}),
			new OptimizeCss() // 压缩css文件成一行
		]
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
			filename: 'index.html' // 打包后文件名字
		}),
		new MiniCssExtractPlugin({
			filename: 'main.css' // 抽离css成一个main.css文件
		})
	],
	module: { // 模块
		rules: [ // 规则
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: { // babel-loader 需要把es6 -> es5
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			},
			// css-loader 解析@import这种语法的
			// style-loader 他是把css 插入到head的标签中
			// loader的特点，希望单一
			// loader的用法 字符串只有一个loader
			// 多个loader需要 []
			// loader的顺序，默认是从右向左执行, 从下往上
			// loader还可以写成 对象方式
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // 生成link
					'css-loader',
					'postcss-loader',
				]
			},
			// 处理less文件
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader, // 生成link
					'css-loader', // @import 解析路径
					'postcss-loader',
					'less-loader' // 把less -> css
				]
			},
		]
	}
}