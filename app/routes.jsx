import React from 'react'
import loadable from '@loadable/component'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const fallback = <SkeletonBlock height="100%" width="100%" />

const Home = loadable(() => import('./pages/home'), {fallback})
const ProductList = loadable(() => import('./pages/product-list'), {fallback})
const ProductDetails = loadable(() => import('./pages/product-details'), {fallback})
const Prescriptions = loadable(() => import('./pages/makana/prescriptions'), {fallback})
const Search = loadable(() => import('./pages/makana/search'), {fallback})
const Settings = loadable(() => import('./pages/makana/settings'), {fallback})

const routes = [
    {
        path: '/prescriptions',
        component: Prescriptions
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '/category/:categoryId',
        component: ProductList
    },
    {
        path: '/products/:productId',
        component: ProductDetails
    },
    {
        path: '/',
        component: Home,
        exact: true
    }
]

export default routes
