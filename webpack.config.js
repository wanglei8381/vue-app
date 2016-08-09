var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        index: "./src/main.js"
    },
    output: {
        path: "./dist",
        publicPath: "./dist/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.styl$/, loader: "style!css!stylus"},
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015']
                },
                plugins: ['transform-runtime']
            },
            {test: /\.html$/, loader: "html"},
            {test: /\.vue$/, loader: 'vue'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.vue']
    },
    plugins: [
        //提取文件的公共部分
        //new webpack.optimize.CommonsChunkPlugin('commons','common.js'),
        //将css放在单独的文件中
        new ExtractTextPlugin("css/[name].css")
    ],
    devtool: "source-map",
    contentBase: '/'
}