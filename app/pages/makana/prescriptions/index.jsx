/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import Divider from 'progressive-web-sdk/dist/components/divider'

import { getAnalyticsManager } from '../../../analytics'
import PrescriptionsGrid from '../../../components/makana/prescriptions-grid'
import { Desktop } from '../../../components/media-queries'

import MasterData from '../../../data/makana/MasterData'

const analyticsManager = getAnalyticsManager()

const Prescriptions = (props) => {
    const { category, productSearch } = props

    const getBreadcrumbs = (category) => {
        const breadcrumb = [{ text: 'Home', href: '/' }]
        if (category) breadcrumb.push({ text: category['name'] })
        return breadcrumb
    }

    return (
        <div className="t-prescriptions-list">

            {productSearch && (
                <Helmet>
                    <title>{`${productSearch.total} results for "${productSearch.query}"`}</title>
                    <meta name="keywords" content={productSearch.query} />
                    <meta
                        name="description"
                        content={productSearch.query || 'Default page description.'}
                    />
                </Helmet>
            )}

            {/* {category && (
                <Desktop>
                    <h1 className="u-margin-bottom-lg">My {category.name}</h1>
                    <Divider className="u-margin-bottom-md" />
                </Desktop>
            )} */}

            <h2 className="u-margin-bottom-lg u-margin-top-lg">Home</h2>

            <div className="t-prescriptions-list__container">
                <PrescriptionsGrid
                    analyticsManager={analyticsManager}
                    doctors={MasterData.doctors}
                />
            </div>

        </div>
    )
}

Prescriptions.getTemplateName = () => {
    return 'prescriptions'
}

Prescriptions.shouldGetProps = ({ previousParams, params }) => {
    return !previousParams || previousParams.categoryId !== params.categoryId
}

Prescriptions.getProps = async ({ params, connector, fakeConnector }) => {
    const categoryId = 'prescriptions'

    const [category, productSearch] = await Promise.all([
        connector.getCategory(categoryId),
        connector.searchProducts({
            filters: {
                categoryId
            },
            query: ''
        }),
    ])

    return { category, productSearch }
}

Prescriptions.propTypes = {
    category: PropTypes.object,
    productSearch: PropTypes.object,
}

export default Prescriptions
