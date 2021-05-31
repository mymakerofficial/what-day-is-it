const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [
            // Other plugins...
            new GenerateSW({
                maximumFileSizeToCacheInBytes: 10000000,
                navigateFallback: '/index.html',
            })
        ]
    },
    devServer: {
        disableHostCheck: true
    }
}