const path = require('path')
const { merge } = require('webpack-merge')

// 当前环境是生成环境
const env = process.env.NODE_ENV

const base = {
    entry: path.resolve(__dirname, 'src'),
    output: {
        filename: env === 'production' ? 'index.min.js' : 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Store',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['babel-loader', 'ts-loader'],
            include: /src/,
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
}

// development
const dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
}

// production
const pro = {
    mode: 'production',
    devtool: 'source-map',
}

module.exports = merge(base, env === 'production' ? pro : dev)