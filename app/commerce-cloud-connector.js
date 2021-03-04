import fetch from 'cross-fetch'
import merge from 'lodash.merge'

import {buildFetchOptions} from './utils/http'
import {checkHttpError} from './utils/error'

export default class CommerceCloudConnector {
    constructor({
        organizationId = 'f_ecom_zzsa_073',
        clientId = 'be5f44ed-6c07-431a-be20-b52439bb9e68',
        siteId = 'RefArch',
        apiBaseURL = 'https://kv7kzm78.api.commercecloud.salesforce.com'
    } = {}) {
        this.organizationId = organizationId
        this.clientId = clientId
        this.siteId = siteId
        this.apiBaseURL = apiBaseURL
        this.token = undefined
    }

    getToken() {
        if (this.getTokenPromise) {
            return this.getTokenPromise
        }
        const urlParams = new URLSearchParams({
            siteId: this.siteId,
            clientId: this.clientId
        })
        const path = `customer/shopper-customers/v1/organizations/${this.organizationId}/customers/actions/login?${urlParams}`
        const options = buildFetchOptions('POST', {type: 'guest'})
        this.getTokenPromise = fetch(`${this.apiBaseURL}/${path}`, options)
            .then(checkHttpError)
            .then((response) => response.headers.get('authorization'))
        return this.getTokenPromise
    }

    async getAccessToken() {
        return await this.getToken()
    }

    getEndpoint(path) {
        if (/undefined/.test(path)) {
            throw new Error(`path is invalid: ${path}`)
        }

        const url =
            typeof window !== 'undefined'
                ? // On the client-side, make sure that the url is absolute
                  new URL(`${this.apiBaseURL}/${path}`, window.location.origin)
                : new URL(`${this.apiBaseURL}/${path}`)

        url.searchParams.append('siteId', this.siteId)

        return url.href
    }

    async api(httpMethod, path, body) {
        const accessToken = await this.getAccessToken()

        const options = merge(
            {
                headers: {
                    Authorization: accessToken
                }
            },
            buildFetchOptions(httpMethod, body)
        )

        const agent = require('./utils/http').agent
        // https://github.com/node-fetch/node-fetch#custom-agent
        if (agent) options.agent = agent.agent

        const response = await fetch(this.getEndpoint(path), options)
        try {
            checkHttpError(response)
        } catch (err) {
            if (err.status === 401) {
                // Looks like token has expired.
                // Retry with a new token
                this.getTokenPromise = undefined
                return this.api(httpMethod, path, body)
            }

            // Otherwise, pass the error
            throw err
        }

        const data = await response.json()
        return data
    }

    getCategory(id, opts = {}) {
        const levels = opts.levels ? {levels: opts.levels} : ''
        const urlParams = new URLSearchParams(levels)
        return this.api(
            'GET',
            `product/shopper-products/v1/organizations/${this.organizationId}/categories/${id}?${urlParams}`
        )
    }

    getProduct(id) {
        const urlParams = new URLSearchParams({allImages: true})
        return this.api(
            'GET',
            `product/shopper-products/v1/organizations/${this.organizationId}/products/${id}?${urlParams}`
        )
    }

    searchProducts(opts = {}) {
        const urlParams = new URLSearchParams({q: opts.filters.categoryId})
        return this.api(
            'GET',
            `search/shopper-search/v1/organizations/${this.organizationId}/product-search?${urlParams}`
        )
    }

    createBasket() {
        return this.api(
            'POST',
            `checkout/shopper-baskets/v1/organizations/${this.organizationId}/baskets`,
            {}
        )
    }
}
