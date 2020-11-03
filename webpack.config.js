const config = require('progressive-web-sdk/dist/webpack/config')
const webpack = require('webpack')

const clientConfig = config.filter((entry) => entry.name == 'pwa-main')
const serverConfig = config.filter((entry) => entry.name == 'ssr-server')

const setClientEntry = (ctx) => ({
    main: `./app/${ctx}/main.jsx`
})

const setServerEntry = (ctx) => `./app/${ctx}/ssr.js`

module.exports = () => {
    if (!process.env.WEBPACK_ENTRY_PREFIX) {
        throw new Error('You must pass an entry prefix to run webpack')
    }
    // Update entry points
    clientConfig[0].entry = setClientEntry(process.env.WEBPACK_ENTRY_PREFIX)
    serverConfig[0].entry = setServerEntry(process.env.WEBPACK_ENTRY_PREFIX)
    // Define global constant based on environment variable
    clientConfig[0].plugins = [
        ...clientConfig[0].plugins,
        new webpack.DefinePlugin({
            __BRAND__: JSON.stringify(process.env.WEBPACK_ENTRY_PREFIX)
        })
    ]
    serverConfig[0].plugins = [
        ...serverConfig[0].plugins,
        new webpack.DefinePlugin({
            __BRAND__: JSON.stringify(process.env.WEBPACK_ENTRY_PREFIX)
        })
    ]
    return config
}
