/* global workbox, DEBUG */
/**
 * This is your project's Service Worker. For information on customizing your
 * Service Worker, see:
 *
 *  - https://developers.google.com/web/fundamentals/primers/service-workers/
 *  - https://developers.google.com/web/tools/workbox/
 */

self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js')

workbox.setConfig({debug: DEBUG})

// Place your Workbox route configurations here, eg:
// workbox.routing.registerRoute(...)

// Minimum viable configuration to get offline mode.
workbox.routing.registerRoute(/^http:\/\/localhost:3000/, new workbox.strategies.NetworkFirst())
workbox.routing.registerRoute(
    /^https:\/\/.+\.mobify-storefront.com/,
    new workbox.strategies.NetworkFirst()
)
