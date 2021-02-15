/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import Divider from 'progressive-web-sdk/dist/components/divider'

import { getAnalyticsManager } from '../../../analytics'
import PrescriptionsGrid from '../../../components/makana/prescriptions-grid'
import { Desktop } from '../../../components/media-queries'

import MasterData from '../../../data/makana/MasterData'
import UserData from '../../../data/makana/UserData'

const analyticsManager = getAnalyticsManager()

const vmPrescriptionsGrid = UserData.cart.map((value, index) => ({
    _gridRowKey: value._gridRowKey,

    doctor: MasterData.doctors.find(el => el.doctorKey === value.doctorKey),

    drug: {
        ...MasterData.drugs.find(el => el.drugKey === value.drugKey),
        selectedDrugName: value.selectedDrugName,
        selectedDrugForm: value.selectedDrugForm,
        selectedDrugDosage: value.selectedDrugDosage,
        selectedDrugQuantity: value.selectedDrugQuantity
    },
    
    pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === value.pharmacyKey)
}))

console.log(vmPrescriptionsGrid)

const Prescriptions = (props) => {
    const { category } = props

    const getBreadcrumbs = (category) => {
        const breadcrumb = [{ text: 'Home', href: '/' }]
        if (category) breadcrumb.push({ text: category['name'] })
        return breadcrumb
    }

    return (
        <div className="t-prescriptions-list">
            <Breadcrumbs
                className="u-margin-top-lg u-margin-bottom-lg"
                items={getBreadcrumbs(category)}
                includeMicroData
            />

            <Desktop>
                {category && (
                    <Fragment>
                        <h1 className="u-margin-bottom-lg">My {category.name}</h1>
                        <Divider className="u-margin-bottom-md" />
                    </Fragment>
                )}
            </Desktop>

            <div className="t-prescriptions-list__container">
                <PrescriptionsGrid
                    analyticsManager={analyticsManager}
                    doctors={MasterData.doctors}
                    viewModel={vmPrescriptionsGrid} />
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
    category: PropTypes.object
}

export default Prescriptions
