/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import Divider from 'progressive-web-sdk/dist/components/divider'

import { getAnalyticsManager } from '../../../analytics'
import PrescriptionsGrid from '../../../components/makana/prescriptions-grid'
import { Desktop } from '../../../components/media-queries'

import MasterData from '../../../data/makana/MasterData'

const analyticsManager = getAnalyticsManager()

const Search = (props) => {
    const { cart, category, productSearch } = props

    const getBreadcrumbs = (category) => {
        const breadcrumb = [{ text: 'Home', href: '/' }]
        if (category) breadcrumb.push({ text: category['name'] })
        return breadcrumb
    }

    const vmPrescriptionsGrid = cart ? getPrescriptionGridProps(cart) : []

    return (
        <div className="t-search-list">

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

            {category && (
                <Desktop>
                    <h1 className="u-margin-bottom-lg">My {category.name}</h1>
                    <Divider className="u-margin-bottom-md" />
                </Desktop>
            )}

            {cart && (
                <div className="t-search-list__container">
                    <PrescriptionsGrid
                        analyticsManager={analyticsManager}
                        doctors={MasterData.doctors}
                        viewModel={vmPrescriptionsGrid} />
                </div>
            )}

        </div>
    )
}

const getPrescriptionGridProps = (cart) => {

    const viewModel = cart.map((value, index) => {

        const drugMaster = MasterData.drugs.find(el => el.drugKey === value.drugKey)

        return {
            _gridRowKey: value._gridRowKey,

            doctor: MasterData.doctors.find(el => el.doctorKey === value.doctorKey),

            drug: {
                ...drugMaster,
                selectedDrugForm: value.selectedDrugForm,
                selectedDrugDosage: value.selectedDrugDosage,
                selectedDrugQuantity: value.selectedDrugQuantity,
                selectedVariantKey: value.variantKey,
                selectedVariantName: drugMaster.variants.find(el => el.variantKey === value.variantKey).variantName
            },

            pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === value.pharmacyKey)
        }
    })

    return viewModel
} 

Search.getTemplateName = () => {
    return 'search'
}

Search.shouldGetProps = ({ previousParams, params }) => {
    return !previousParams || previousParams.categoryId !== params.categoryId
}

Search.getProps = async ({ params, connector, fakeConnector }) => {
    const categoryId = 'prescriptions'

    const [cart, category, productSearch] = await Promise.all([
        fakeConnector.getCart(),
        connector.getCategory(categoryId),
        connector.searchProducts({
            filters: {
                categoryId
            },
            query: ''
        }),
    ])

    return { cart, category, productSearch }
}

Search.propTypes = {
    cart: PropTypes.array,
    category: PropTypes.object,
    productSearch: PropTypes.object,
}

export default Search
