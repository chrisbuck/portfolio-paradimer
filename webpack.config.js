const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('@babel/polyfill');

module.exports = (env) => {
    console.log('env', env);
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    const isProduction = process.env.NODE_ENV === 'production' || env === 'production';
    const isDevelopment = process.env.NODE_ENV === 'development' || env === 'development';

    return {
        entry: ['@babel/polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: isDevelopment ? 'styles.css' : 'styles.css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            })
        ],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};