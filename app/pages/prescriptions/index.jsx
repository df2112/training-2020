/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import Divider from 'progressive-web-sdk/dist/components/divider'
import Link from 'progressive-web-sdk/dist/components/link'
import Tile from 'progressive-web-sdk/dist/components/tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import { getAnalyticsManager } from '../../analytics'
import PrescriptionsGrid from '../../components/prescriptions-grid'
import { Desktop } from '../../components/media-queries'

const analyticsManager = getAnalyticsManager()
const PRODUCT_SKELETON_COUNT = 6

const listItems = [
    {
        field1: 'Hear me roar!',
        field2: 'A'
    },
    {
        field1: 'Foobar',
        field2: 'B'
    },
    {
        field1: 'Quotes and stuff',
        field2: 'C'
    },
    {
        field1: 'Lorem ipsum',
        field2: 'D'
    }
]

const Prescriptions = (props) => {
    const { errorMessage, productSearch, category } = props
    const [isSubscribed, setIsSubscribed] = useState(false)

    const getBreadcrumbs = (category) => {
        const breadcrumb = [{ text: 'Home', href: '/' }]
        if (category) breadcrumb.push({ text: category['name'] })
        return breadcrumb
    }

    const formatPrice = (price) => {
        return price % 1 === 0 ? (price = `$${price}.00`) : `$${price}`
    }

    return (
        <div className="t-prescriptions-list">
            <Breadcrumbs
                className="u-margin-top-lg u-margin-bottom-lg"
                items={getBreadcrumbs(category)}
                includeMicroData
            />

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

            {category ? (
                <Fragment>
                    <h1 className="u-margin-bottom-lg">{category.name}</h1>
                </Fragment>
            ) : (
                    <SkeletonText type="h1" width="50%" />
                )}

            <Desktop>
                <Divider className="u-margin-bottom-md" />
            </Desktop>

            <div className="t-prescriptions-list__container">

                {errorMessage && (
                    <h1 className="u-margin-top-lg u-margin-center t-prescriptions-list__error-msg">
                        {errorMessage}
                    </h1>
                )}

                <div className="t-prescriptions-list__container-items">
                    {productSearch ? (
                        <Fragment>
                            {productSearch.hits && productSearch.hits.length > 0 &&
                                productSearch.hits.map((productSearchResult) => (
                                    <div
                                        className="t-prescriptions-list__products-items"
                                        key={productSearchResult.productId}
                                    >
                                        <Link href={`/products/${productSearchResult.productId}`}>
                                            <Tile
                                                isColumn
                                                imageProps={{
                                                    src: productSearchResult.image.link,
                                                    alt: productSearchResult.productName,
                                                    width: '250',
                                                    ratio: {
                                                        aspect: '1:1'
                                                    },
                                                    loadingIndicator: (
                                                        <SkeletonBlock height="250" />
                                                    ),
                                                    hidePlaceholder: false,
                                                    className: 'u-display-block',
                                                    useLoaderDuringTransitions: false
                                                }}
                                                title={productSearchResult.productName}
                                                price={formatPrice(productSearchResult.price)}
                                            />
                                        </Link>
                                        {/* PLACE META DATA INFORMATION HERE */}
                                        {/* Examples are "url", "availability", "productId" etc. */}
                                        <meta
                                            itemProp="productID"
                                            content={productSearchResult.productId}
                                        />
                                        <meta
                                            itemProp="url"
                                            content={`/products/${productSearchResult.productId}`}
                                        />
                                    </div>
                                ))}
                            {productSearch.hits && productSearch.hits.length <= 0 && (
                                <h2 className="u-margin-top-lg">No results found.</h2>
                            )}
                        </Fragment>
                    ) : (
                            <Fragment>
                                {[...new Array(PRODUCT_SKELETON_COUNT)].map((_, idx) => (
                                    <div key={idx} className="t-prescriptions-list__products-items">
                                        <SkeletonBlock height="300px" />
                                    </div>
                                ))}
                            </Fragment>
                        )}
                </div>

                {!isSubscribed ? (
                    <PrescriptionsGrid 
                        analyticsManager={analyticsManager}
                        listItems={listItems}
                        onSubmit={() => setIsSubscribed(true)} />
                ) : (
                        <span>Thank you for subscribing!</span>
                    )}

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

Prescriptions.getProps = async ({ params, connector }) => {
    const categoryId = 'prescriptions'
    const [category, productSearch] = await Promise.all([
        connector.getCategory(categoryId),
        connector.searchProducts({
            filters: {
                categoryId
            },
            query: ''
        })
    ])
    return { category, productSearch }
}

Prescriptions.propTypes = {
    errorMessage: PropTypes.string,
    productSearch: PropTypes.object,
    category: PropTypes.object,
    match: PropTypes.object
}

export default Prescriptions
