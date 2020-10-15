import {isServerSide} from './utils'

export const btoa = isServerSide()
    ? (decoded) => new Buffer.from(decoded).toString('base64')
    : window.btoa

// On the server, use keep alives: https://nodejs.org/api/http.html#http_new_agent_options
// Keeping the connection alive is only useful for API requests and not Auth requests
// as we only infrequently make requests to the API.
// eslint-disable-next-line no-unused-vars
export let agent
if (isServerSide()) {
    const httpAgent = new require('http').Agent({keepAlive: true})
    const httpsAgent = new require('https').Agent({keepAlive: true})
    agent = (u) => (u.protocol === 'http:' ? httpAgent : httpsAgent)
}

export const buildFetchOptions = (httpMethod, json) => {
    return {
        method: httpMethod,
        ...(json !== undefined && {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
    }
}
