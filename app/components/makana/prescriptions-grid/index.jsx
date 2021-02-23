import React, { useEffect, useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import Button from 'progressive-web-sdk/dist/components/button'
import Divider from 'progressive-web-sdk/dist/components/divider'
import { HeaderBar, HeaderBarActions, HeaderBarTitle } from 'progressive-web-sdk/dist/components/header-bar'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import { Tabs, TabsPanel } from 'progressive-web-sdk/dist/components/tabs'

import { Desktop, Mobile, Tablet } from '../../media-queries'

import DoctorSearch from '../doctor-search'
import DrugSearch from '../drug-search'
import PrescriptionConfigure from '../prescription-configure'
import MasterData from '../../../data/makana/MasterData'

const fakeDoctors = [
    {
        _doctorKey: '601',
        name: 'Fake Doctor 1',
        age: 99,
    },
    {
        _doctorKey: '602',
        name: 'Fake Doctor 2',
        age: 40,
    },
    {
        _doctorKey: '603',
        name: 'Fake Doctor 3',
        age: 41,
    }
]

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

console.log('vmDrugSearch =>')
console.log(vmDrugSearch)

const PrescriptionsGrid = (props) => {
    const { analyticsManager, doctors, viewModel } = props

    const [doctorsList, setDoctorsList] = useState(doctors)
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false)
    const [drugModalMode, setDrugModalMode] = useState()
    const [drugModalViewModel, setDrugModalViewModel] = useState({
        pharmacies: MasterData.pharmacies,
        doctors: MasterData.doctors
    })
    const [activeGridRowKey, setActiveGridRowKey] = useState()
    const [selectedDoctor, setSelectedDoctor] = useState('999')
    const [selectedDrug, setSelectedDrug] = useState()

    const cartReducer = (state, action) => {
        switch (action.type) {

            case 'ADD_ITEM':
                console.log('cartReducer: ADD_ITEM')
                console.log('--- formData parameter =>')
                console.log(Object.fromEntries(action.formData.entries()))

                const newGridRow = {
                    _gridRowKey: uuidv4(),
                    doctor: MasterData.doctors.find(el => el.doctorKey === action.formData.get('doctor-key')),
                    drug: {
                        ...MasterData.drugs.find(el => el.drugKey === action.formData.get('drug-key')),
                        selectedDrugForm: action.formData.get('selected-drug-form'),
                        selectedDrugDosage: action.formData.get('selected-drug-dosage'),
                        selectedDrugQuantity: action.formData.get('selected-drug-quantity'),
                        //  BIG TODO FIX THIS
                        // selectedVariantKey: value.variantKey,
                        selectedVariantName: action.formData.get('selected-variant-name')
                    },
                    pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === action.formData.get('pharmacy-key')),
                }

                setIsDrugModalOpen(false)
                //return [newGridRow, ...state] // Stick the new item at the start
                return state.concat(newGridRow)

            case 'EDIT_ITEM':
                console.log('cartReducer: EDIT_ITEM')
                console.log('--- formData parameter =>')
                console.log(Object.fromEntries(action.formData.entries()))

                const newList = state.map((item) => {
                    if (item._gridRowKey === activeGridRowKey) {
                        const updatedItem = {
                            ...item,
                            doctor: MasterData.doctors.find(el => el.doctorKey === action.formData.get('doctor-key')),
                            drug: {
                                ...MasterData.drugs.find(el => el.drugKey === action.formData.get('drug-key')),
                                selectedDrugForm: action.formData.get('selected-drug-form'),
                                selectedDrugDosage: action.formData.get('selected-drug-dosage'),
                                selectedDrugQuantity: action.formData.get('selected-drug-quantity'),
                                //  BIG TODO FIX THIS
                                // selectedVariantKey: value.variantKey,
                                selectedVariantName: action.formData.get('selected-variant-name')
                            },
                            pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === action.formData.get('pharmacy-key'))
                        }
                        return updatedItem
                    } else {
                        return item
                    }
                })

                setIsDrugModalOpen(false)
                return newList

            case 'REMOVE_ITEM':
                console.log('cartReducer: REMOVE_ITEM')

                return state.filter((item) => item._gridRowKey !== action.id)

            default:
                throw new Error();
        }
    }

    const [cartState, cartAction] = useReducer(cartReducer, viewModel)

    const handleCartAddItem = (formData) => cartAction({ type: 'ADD_ITEM', formData })

    const handleCartEditItem = (formData) => cartAction({ type: 'EDIT_ITEM', formData })

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

    const showDrugModalEdit = (gridRowKey) => {
        console.log(`showDrugModalEdit: gridRowKey ${gridRowKey} `)

        console.log('showDrugModalEdit: cartState =>')
        console.log(cartState)

        const newDrugModalViewModel = {
            ...drugModalViewModel,
            prescription: cartState.find(el => el._gridRowKey === gridRowKey)
        }

        console.log('showDrugModalEdit: viewModel =>')
        console.log(newDrugModalViewModel.prescription.drug)

        setDrugModalViewModel(newDrugModalViewModel)
        setSelectedDrug(newDrugModalViewModel.prescription.drug.drugKey)
        setDrugModalMode('edit')
        setIsDrugModalOpen(true)
    }

    const DrugModal = ({ width }) => (
        <Sheet
            className="pw--no-shadow t-product-details__shipping-delivery-info-modal"
            coverage={width}
            open={isDrugModalOpen}
            effect="modal-center"
            headerContent={
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start-md u-text-align-start u-text-size-big">
                        Prescription {drugModalMode}
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <Button
                            innerClassName="u-padding-0"
                            icon="close"
                            onClick={() => setIsDrugModalOpen(false)}
                        />
                    </HeaderBarActions>
                </HeaderBar>
            }
        >
            <div className="t-product-details__shipping-delivery-modal-content">
                <br />
                <PrescriptionConfigure
                    viewModel={drugModalViewModel}
                    analyticsManager={analyticsManager}
                    onPrescriptionConfigureSubmit={drugModalMode === 'add' ? handleCartAddItem : handleCartEditItem}
                />

            </div>
        </Sheet>
    )

    const handleDoctorChange = (event) => {
        console.log('PrescriptionsGrid: handleDoctorChange()')

        if (event.target.value === '000') {
            setIsDoctorModalOpen(true)
        } else {
            setSelectedDoctor(event.target.value)
        }
    }

    const DoctorModal = ({ width }) => (
        <Sheet
            className="pw--no-shadow t-product-details__shipping-delivery-info-modal"
            coverage={width}
            open={isDoctorModalOpen}
            effect="modal-center"
            shrinkToContent
            headerContent={
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start-md u-text-align-start u-text-size-big">Add Doctor</HeaderBarTitle>

                    <HeaderBarActions>
                        <Button innerClassName="u-padding-0" icon="close"
                            onClick={() => setIsDoctorModalOpen(false)}
                        />
                    </HeaderBarActions>
                </HeaderBar>
            }
        >
            <div className="t-product-details__shipping-delivery-modal-content">
                <DoctorSearch
                    analyticsManager={analyticsManager}
                    onDoctorSelectSubmit={handleDoctorSelectSubmit}
                />
            </div>
        </Sheet>
    )

    const handleDoctorSelectSubmit = (selectedDoctorId) => {
        console.log(`PrescriptionsGrid: handleDoctorSelectSubmit() ${selectedDoctorId}`)
        setDoctorsList([...doctorsList, ...fakeDoctors.filter(el => el._doctorKey == selectedDoctorId)])
        setIsDoctorModalOpen(false)
    }

    return (
        <div className="c-prescriptions-grid">
            <div>
                <Tabs activeIndex={0}>

                    <TabsPanel title="Prescriptions">

                        <div style={{ marginTop: "6px" }} className="c-prescriptions-grid__form-field-input">
                            <DrugSearch
                                id="drug-search"
                                viewModel={vmDrugSearch}
                                onDrugSelectSubmit={showDrugModalAdd}
                            />
                        </div>
                        <div style={{ marginTop: "6px", height: "450px", overflowX: "hidden", overflowY: "auto" }}>
                            <List>
                                {cartState.map((lineItem, index) => (
                                    <ListTile
                                        key={lineItem._gridRowKey}
                                        className="pw--instructional-block"
                                        onClick={() => setActiveGridRowKey(lineItem._gridRowKey)}
                                        endAction={
                                            <div>
                                                {/* TODO: align these to use same key */}
                                                <Button className="pw--blank" icon="more" onClick={() => showDrugModalEdit(lineItem._gridRowKey)} />
                                                <Button className="pw--blank" icon="trash" onClick={() => cartAction({ type: 'REMOVE_ITEM', id: lineItem._gridRowKey })} />
                                            </div>
                                        }
                                    >
                                        <div style={{ fontWeight: 'bold' }}>{lineItem.drug.selectedVariantName}</div>
                                        <div style={{ marginBottom: "5px" }}>{lineItem.drug.selectedDrugQuantity} {lineItem.drug.selectedDrugForm} {lineItem.drug.selectedDrugDosage}</div>
                                        <Divider />
                                        <div style={{ fontWeight: 'bold', marginBottom: "5px", marginTop: "5px" }}>{lineItem.doctor.name}</div>
                                        <Divider />
                                        <ListTile
                                            startAction={
                                                <img style={{ width: "30.8px", height: "30.8px", marginRight: "5px" }} src={lineItem.pharmacy.pharmacyLogoUrl} />
                                            }>
                                            <div>{lineItem.pharmacy.pharmacyChain}</div>
                                        </ListTile>
                                    </ListTile>
                                ))}
                            </List>
                        </div>
                        {/* <div style={{ marginTop: "50px" }}>
                                <Button className="pw--primary">Checkout!</Button>
                            </div> */}
                    </TabsPanel>

                    <TabsPanel title="Pharmacies">
                        <h2 style={{ marginTop: "20px" }}>
                            Pharmacies (stub)
                        </h2>
                    </TabsPanel>


                    <TabsPanel title="Physicians">
                        <h2 style={{ marginTop: "20px" }}>
                            Physicians (stub)
                        </h2>
                    </TabsPanel>

                </Tabs>
            </div>

            {/* Floating element/components */}
            <Mobile>
                <DoctorModal width="80%" />
                <DrugModal width="80%" />
            </Mobile>

            <Tablet>
                <DoctorModal width="60%" />
                <DrugModal width="60%" />
            </Tablet>

            <Desktop>
                <DoctorModal width="40%" />
                <DrugModal width="60%" />
            </Desktop>
        </div>
    )
}

PrescriptionsGrid.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onSubmit: PropTypes.func,
    viewModel: PropTypes.array
}

export default PrescriptionsGrid
