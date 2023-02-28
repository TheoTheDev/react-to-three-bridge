
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//

const plugins = [
    new CopyWebpackPlugin({
        patterns: [
            { from: path.resolve( __dirname, 'public' ), to: path.resolve( __dirname, 'build' ) }
        ]
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map',
        exclude: ['vendor.bundle.js']
    })
];

//

module.exports = conf = {
    devtool: false,
    mode: 'development',
    watchOptions: {
        poll: 500
    },
    entry: {
        main: './src/App.tsx'
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        alias: {
            'three': path.resolve( __dirname + '/node_modules/three/src/Three' )
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json',
                        onlyCompileBundledFiles: true
                    }
                }],
                exclude: [ /node_modules/ ]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build/scripts')
    },
    plugins,
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: /node_modules/
                }
            }
        }
    }
};
