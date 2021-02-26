/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Button from 'progressive-web-sdk/dist/components/button'
import { HeaderBar, HeaderBarActions, HeaderBarTitle } from 'progressive-web-sdk/dist/components/header-bar'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import { getAnalyticsManager } from '../../../analytics'
import { Desktop, Mobile, Tablet } from '../../../components/media-queries'
import { GlobalStateContext, GlobalDispatchContext, SET_CART_ITEMS } from '../../../components/global-state'
import DrugSearch from '../../../components/makana/drug-search'
import MasterData from '../../../data/makana/MasterData'
import PrescriptionConfigure from '../../../components/makana/prescription-configure'

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

const Search = (props) => {
    const { cart, category, productSearch } = props

    const globalState = useContext(GlobalStateContext)
    const globalDispatch = useContext(GlobalDispatchContext)

    console.log('Global State in Search page =>')
    console.log(globalState)

    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
    const [PrescriptionModalMode, setPrescriptionModalMode] = useState()
    const [PrescriptionModalViewModel, setPrescriptionModalViewModel] = useState({
        pharmacies: MasterData.pharmacies,
        doctors: MasterData.doctors
    })
    const [selectedDrug, setSelectedDrug] = useState()

    let history = useHistory()

    function handleCartAddItem(formData) {
        globalDispatch({ type: 'ADD_ITEM', formData })
        setIsPrescriptionModalOpen(false)
        history.push('/prescriptions')
    }

    const PrescriptionModal = ({ width }) => (
        <Sheet
            className="pw--no-shadow t-product-details__shipping-delivery-info-modal"
            coverage={width}
            open={isPrescriptionModalOpen}
            effect="modal-center"
            headerContent={
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start-md u-text-align-start u-text-size-big">
                        Prescription {PrescriptionModalMode}
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <Button
                            innerClassName="u-padding-0"
                            icon="close"
                            onClick={() => setIsPrescriptionModalOpen(false)}
                        />
                    </HeaderBarActions>
                </HeaderBar>
            }
        >
            <div className="t-product-details__shipping-delivery-modal-content">
                <br />
                <PrescriptionConfigure
                    viewModel={PrescriptionModalViewModel}
                    analyticsManager={analyticsManager}
                    onSubmit={handleCartAddItem}
                />

            </div>
        </Sheet>
    )

    const showPrescriptionModal = (id) => {
        console.log(`Search Page showPrescriptionModal: selectedProductId ${id} `)

        let drugMaster = MasterData.drugs
            .find(d => d.variants.find(v => v.variantKey === id))

        let variant = drugMaster.variants
            .find(v => v.variantKey === id)

        const newPrescriptionModalViewModel = {
            ...PrescriptionModalViewModel,
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
        console.log(newPrescriptionModalViewModel.prescription.drug)

        setPrescriptionModalViewModel(newPrescriptionModalViewModel)
        setSelectedDrug(id)
        setPrescriptionModalMode('add')
        setIsPrescriptionModalOpen(true)
    }

    return (
        <div className="t-search-list">

            <h2 className="u-margin-bottom-lg u-margin-top-lg">Search</h2>

            {cart && (
                <div className="t-search-list__container">
                    <div>
                        <div style={{ marginTop: "6px" }} className="c-prescriptions-grid__form-field-input">
                            <DrugSearch
                                id="drug-search"
                                viewModel={vmDrugSearch}
                                onSubmit={showPrescriptionModal}
                            />
                        </div>

                        <h3 className="u-margin-bottom-lg u-margin-top-lg">Popular Searches</h3>

                        <div style={{ marginTop: "6px", height: "450px", overflowX: "hidden", overflowY: "auto" }}>
                            <List>
                                {MasterData.drugs.map((drug, index) => (
                                    (index < 5 &&
                                        <ListTile key={drug.drugKey}
                                            className="pw--instructional-block"
                                            startAction={<img style={{ width: "30.8px", height: "30.8px", marginRight: "5px" }} src={drug.imgSrc} />}
                                            endAction={
                                                <Button className="pw--blank" icon="more" onClick={() => showPrescriptionModal(drug.variants[0].variantKey)} />
                                            }
                                        >
                                            <input name="variant-key" type="hidden" value={drug.variants[0].variantKey} />

                                            <div>{drug.variants[0].variantName}</div>
                                        </ListTile>
                                    )
                                ))}
                            </List>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating element/components */}
            <Mobile>
                <PrescriptionModal width="80%" />
            </Mobile>

            <Tablet>
                <PrescriptionModal width="60%" />
            </Tablet>

            <Desktop>
                <PrescriptionModal width="60%" />
            </Desktop>

        </div>
    )
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
