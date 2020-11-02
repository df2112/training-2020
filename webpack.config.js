const config = require('progressive-web-sdk/dist/webpack/config')
const webpack = require('webpack')

const clientConfig = config.filter((entry) => entry.name == 'pwa-main')
const serverConfig = config.filter((entry) => entry.name == 'ssr-server')

const setClientEntry = (ctx) => ({
    main: `./app/${ctx}/main.jsx`
})

const setServerEntry = (ctx) => `./app/${ctx}/ssr.js`

module.exports = ({ctx}) => {
    if (ctx == 'undefined') {
        throw new Error('You must pass an env.ctx flag to run webpack')
    }
    // Update entry points
    clientConfig[0].entry = setClientEntry(ctx)
    serverConfig[0].entry = setServerEntry(ctx)
    // Define global constant based on environment variable
    clientConfig[0].plugins = [
        ...clientConfig[0].plugins,
        new webpack.DefinePlugin({
            __BRAND__: JSON.stringify(`${process.env.BRAND}`)
        })
    ]
    serverConfig[0].plugins = [
        ...serverConfig[0].plugins,
        new webpack.DefinePlugin({
            __BRAND__: JSON.stringify(`${process.env.BRAND}`)
        })
    ]
    return config
}
