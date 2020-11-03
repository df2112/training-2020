const config = require('progressive-web-sdk/dist/webpack/config')

const clientConfig = config.find((entry) => entry.name == 'pwa-main')
const serverConfig = config.find((entry) => entry.name == 'ssr-server')

const typescriptExtensions = ['.ts', '.tsx']
const typescriptRules = [
    {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "ts-loader"
            }
        ]
    },
    {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    }
]

// Support typescript files
clientConfig.module.rules.push(...typescriptRules)
serverConfig.module.rules.push(...typescriptRules)
clientConfig.resolve.extensions.push(...typescriptExtensions)
serverConfig.resolve.extensions.push(...typescriptExtensions)

module.exports = config
