'use strict'

/* global WEBPACK_PACKAGE_JSON_MOBIFY */

import path from 'path'
import {
    createApp,
    createHandler,
    serveStaticFile
} from 'progressive-web-sdk/dist/ssr/server/express'
import {render} from 'progressive-web-sdk/dist/ssr/server/react-rendering'
import {createIntl, createIntlCache} from 'react-intl'

const cache = createIntlCache()

// Create the `intl` object
const intl = createIntl(
    {
        // Locale of the application
        locale: 'de',
        // Locale of the fallback defaultMessage
        defaultLocale: 'en',
        messages: {}
    },
    cache
)

const foo = intl.formatDate(new Date(9e8), {month: 'long'})
console.log('TEST DATE: ', foo) // Expected: "Januar" when using full-icu data, "January" otherwise

const app = createApp({
    // The build directory (an absolute path)
    buildDir: path.resolve(process.cwd(), 'build'),

    // The cache time for SSR'd pages (defaults to 600 seconds)
    defaultCacheTimeSeconds: 600,

    // The path to the favicon. This must also appear in
    // the mobify.ssrShared section of package.json.
    faviconPath: path.resolve(process.cwd(), 'build/static/ico/favicon.ico'),

    // The location of the apps manifest file relative to the build directory
    manifestPath: 'static/manifest.json',

    // This is the value of the 'mobify' object from package.json
    // provided by a webpack DefinePlugin
    mobify: WEBPACK_PACKAGE_JSON_MOBIFY,

    // The port that the local dev server listens on
    port: 3000,

    // The protocol on which the development Express app listens.
    // Note that http://localhost is treated as a secure context for development.
    protocol: 'http'
})

app.get('/robots.txt', serveStaticFile('static/robots.txt'))
app.get('/*', render)

// SSR requires that we export a single handler function called 'get', that
// supports AWS use of the server that we created above.
export const get = createHandler(app)
