/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import Divider from 'progressive-web-sdk/dist/components/divider'

import { getAnalyticsManager } from '../../../analytics'
import { Desktop } from '../../../components/media-queries'
import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

import DrugSearch from '../../../components/makana/drug-search'
import MasterData from '../../../data/makana/MasterData'

const analyticsManager = getAnalyticsManager()

const vmDrugSearch = MasterData.drugs.map((drug) => {

    return drug.variants.map((variant, index) => {

        return {
            className: ('masterId_' + variant.variantKey),
            isSimple: true,
            isFull: true,
            imageProps: {
                src: drug.imgSrc,
                width: '88px',
                height: '88px',
                alt: 'cat'
            },
            href: '#',
            options: [
                {
                    label: 'TODO: Dave ID (a)'
                }
            ],
            title: variant.variantName,
            price: index === 0 ? '$100' : '$25',
        }

    })

}).flat(2)

const showDrugModalAdd = (id) => {
    console.log(`showDrugModalAdd: selectedProductId ${id} `)

    let drugMaster = MasterData.drugs
        .find(d => d.variants.find(v => v.variantKey === id))

    let variant = drugMaster.variants
        .find(v => v.variantKey === id)

    const newDrugModalViewModel = {
        ...drugModalViewModel,
        prescription: {
            doctor: null,
            drug: {
                ...drugMaster,
                selectedDrugForm: drugMaster.forms[0],
                selectedDrugDosage: drugMaster.dosages[0],
                selectedDrugQuantity: drugMaster.quantities[0],
                selectedVariantKey: variant.variantKey,
                selectedVariantName: variant.variantName
            },
            pharmacy: null
        }
    }

    console.log('Add: viewModel =>')
    console.log(newDrugModalViewModel.prescription.drug)

    setDrugModalViewModel(newDrugModalViewModel)
    setSelectedDrug(id)
    setDrugModalMode('add')
    setIsDrugModalOpen(true)
}


const Settings = (props) => {
    const { cart, category, productSearch } = props

    const getBreadcrumbs = (category) => {
        const breadcrumb = [{ text: 'Home', href: '/' }]
        if (category) breadcrumb.push({ text: category['name'] })
        return breadcrumb
    }

    return (
        <div className="t-settings-list">

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

            <h2 className="u-margin-bottom-lg u-margin-top-lg">Settings (stub)</h2>

            {cart && (
                <div className="t-settings-list__container">
                    <div>

                        {/* <h3 className="u-margin-bottom-lg u-margin-top-lg">Account</h3> */}

                        <div style={{ marginTop: "20px", height: "450px", overflowX: "hidden", overflowY: "auto" }}>
                            <List>
                                <ListTile
                                    endAction={<Button className="pw--blank" icon="more" />}
                                    startAction={<Icon name="cart" />}>
                                    <div>Prescriptions</div>
                                </ListTile>
                                <Divider />

                                <ListTile
                                    endAction={<Button className="pw--blank" icon="more" />}
                                    startAction={<Icon name="help" />}>
                                    <div>Doctors</div>
                                </ListTile>
                                <Divider />

                                <ListTile
                                    endAction={<Button className="pw--blank" icon="more" />}
                                    startAction={<Icon name="plus" />}>
                                    <div>Pharmacies</div>
                                </ListTile>
                                <Divider />

                                <ListTile
                                    endAction={<Button className="pw--blank" icon="more" />}
                                    startAction={<Icon name="shipping" />}>
                                    <div>Order History</div>
                                </ListTile>
                                <Divider />

                                <ListTile
                                    endAction={<Button className="pw--blank" icon="more" />}
                                    startAction={<Icon name="settings" />}>
                                    <div>Profile and Password</div>
                                </ListTile>
                                <Divider />

                                <ListTile
                                    endAction={<Button className="pw--blank" icon="more" />}
                                    startAction={<Icon name="map" />}>
                                    <div>Address Book</div>
                                </ListTile>
                                <Divider />

                                <ListTile
                                    endAction={<Button className="pw--blank" icon="more" />}
                                    startAction={<Icon name="payment" />}>
                                    <div>Payment</div>
                                </ListTile>
                                <Divider />

                            </List>
                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}


Settings.getTemplateName = () => {
    return 'settings'
}

Settings.shouldGetProps = ({ previousParams, params }) => {
    return !previousParams || previousParams.categoryId !== params.categoryId
}

Settings.getProps = async ({ params, connector, fakeConnector }) => {
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

Settings.propTypes = {
    cart: PropTypes.array,
    category: PropTypes.object,
    productSearch: PropTypes.object,
}

export default Settings
