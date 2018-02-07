//import the path node module
const path = require('path')
const cleanwebpackplugin = require('clean-webpack-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')

const distPath = path.resolve(__dirname,'dist')

//main process for electron
var mainProcessConfig = {
    target: 'electron-main',
    entry: './src/main.ts',
    output: {
        path:distPath,
        filename:'xenstudio-main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: ['babel-loader', 'ts-loader']
            }
        ]
    },
    node: {
        __dirname: false
    },
    plugins:
    [
        new cleanwebpackplugin(distPath)
    ],
    resolve: {
        extensions:['.js', '.ts', '.json'] //json will help find any reference to anything with a .json extension. For example package,=.json can be referenced as require('package').bin
    }
}

//this is the renderer process configuration
var renderProcessConfig = {
    target: 'electron-renderer',
    entry: './src/gui.ts',
    output: {
        path:distPath,
        filename:'xenstudio-renderer.js'
    },
    module: {
        rules: 
        [
            {
                //compile all found vue file into JS using the
                //vue loader
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: '/node_modules/',
                options: {
                    esModule: true
                }
            },
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: 
                [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: ['/\.vue$/']
                        }
                    }
                ]
            }
            
        ]
    },
    node: {
        __dirname: false
    },
    plugins:
    [
        new htmlwebpackplugin({template: './src/main-template.html'})
    ],
    resolve: {
        extensions:['.js', '.ts','.vue','.json'],
         alias: {
             vue$: 'vue/dist/vue.esm.js'
         }
    }
}

module.exports = [mainProcessConfig,renderProcessConfig]