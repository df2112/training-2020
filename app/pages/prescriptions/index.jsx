/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import Button from 'progressive-web-sdk/dist/components/button'
import Divider from 'progressive-web-sdk/dist/components/divider'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Link from 'progressive-web-sdk/dist/components/link'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Tile from 'progressive-web-sdk/dist/components/tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {getAnalyticsManager} from '../../analytics'
import EmailSubscribe from '../../components/email-subscribe'
import {Desktop, Mobile, Tablet} from '../../components/media-queries'

const analyticsManager = getAnalyticsManager()
const PRODUCT_SKELETON_COUNT = 6

const Prescriptions = (props) => {
    const [isShippingSheetOpen, setIsShippingSheetOpen] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

    const {errorMessage, productSearch, category} = props

    const getBreadcrumbs = (category) => {
        const breadcrumb = [{text: 'Home', href: '/'}]
        if (category) breadcrumb.push({text: category['name']})
        return breadcrumb
    }

    const formatPrice = (price) => {
        return price % 1 === 0 ? (price = `$${price}.00`) : `$${price}`
    }

    const ShippingDeliveryModal = ({width}) => (
        <Sheet
            className="pw--no-shadow t-product-details__shipping-delivery-info-modal"
            coverage={width}
            open={isShippingSheetOpen}
            effect="modal-center"
            shrinkToContent
            headerContent={
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start-md u-text-align-start u-text-size-big">
                        Shipping & Delivery Info
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <Button innerClassName="u-padding-0" icon="close"
                            onClick={() => setIsShippingSheetOpen(!isShippingSheetOpen)}
                        />
                    </HeaderBarActions>
                </HeaderBar>
            }
        >
            <div className="t-product-details__shipping-delivery-modal-content">
                <span>
                    Receive free Standard Shipping within Canada for purchases of $150+,
                    excluding taxes, when signed into a Mobify.com account.
                </span>
            </div>
        </Sheet>
    )

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
                <div className="u-margin-top-lg u-margin-bottom-lg">
                    Tips for getting started on this page:
                </div>

                <List>
                    <ListTile className="pw--instructional-block"
                        startAction={<Button className="pw--blank" icon="user" />}
                        endAction={<Button className="pw--blank" icon="chevron-right" />}
                    >
                        <div>
                            ListItem with <code>startAction</code> and <code>endAction</code>
                        </div>
                    </ListTile>
                    <ListTile className="pw--instructional-block"
                        startAction={<Button className="pw--blank" icon="user" />}
                        endAction={<Button className="pw--blank" icon="chevron-right" />}
                    >
                        <div>
                            ListItem with <code>startAction</code> and <code>endAction</code>
                        </div>
                    </ListTile>
                    <ListTile className="pw--instructional-block"
                        startAction={<Button className="pw--blank" icon="user" />}
                        endAction={<Button className="pw--blank" icon="chevron-right" />}
                    >
                        <div>
                            ListItem with <code>startAction</code> and <code>endAction</code>
                        </div>
                    </ListTile>
                </List>

                <ListTile className="pw--instructional-block">
                    <div className="u-margin-bottom-lg">Set up a modal with with example:</div>

                    <Button className="t-product-details__modal-button pw--primary qa-modal-button"
                        onClick={() => setIsShippingSheetOpen(!isShippingSheetOpen)}>
                        Modal Button
                    </Button>
                </ListTile>

                <ListTile className="pw--instructional-block">
                    <div className="u-margin-bottom-lg">
                        Set up forms like a Join Mailing List section using this example:
                    </div>

                    {!isSubscribed ? (
                        <EmailSubscribe analyticsManager={analyticsManager}
                            onSubmit={() => setIsSubscribed(true)}/>
                    ) : (
                        <span>Thank you for subscribing!</span>
                    )}
                </ListTile>

                <ListTile className="pw--instructional-block">
                    <div>
                        Replace dummy products with real data using Commerce Integrations.&nbsp;
                        <Link
                            className="pw--underline"
                            openInNewTab
                            href="https://dev.mobify.com/v2.x/apis-and-sdks/commerce-integrations/overview"
                        >
                            Read the guide
                        </Link>
                    </div>
                </ListTile>
                <div className="u-margin-bottom-lg">
                    View more guides on&nbsp;
                    <Link className="pw--underline" openInNewTab href="https://dev.mobify.com">
                        dev.mobify.com
                    </Link>
                </div>
            </div>

            {/* Floating element/components */}
            <Mobile>
                <ShippingDeliveryModal width="80%" />
            </Mobile>

            <Tablet>
                <ShippingDeliveryModal width="60%" />
            </Tablet>

            <Desktop>
                <ShippingDeliveryModal width="40%" />
            </Desktop>

        </div>
    )
}

Prescriptions.getTemplateName = () => {
    return 'prescriptions'
}

Prescriptions.shouldGetProps = ({previousParams, params}) => {
    return !previousParams || previousParams.categoryId !== params.categoryId
}

Prescriptions.getProps = async ({params, connector}) => {
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
    return {category, productSearch}
}

Prescriptions.propTypes = {
    errorMessage: PropTypes.string,
    productSearch: PropTypes.object,
    category: PropTypes.object,
    match: PropTypes.object
}

export default Prescriptions
