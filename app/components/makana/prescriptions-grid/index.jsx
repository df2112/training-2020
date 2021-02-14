import React, { useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import Button from 'progressive-web-sdk/dist/components/button'
import Divider from 'progressive-web-sdk/dist/components/divider'
import { HeaderBar, HeaderBarActions, HeaderBarTitle } from 'progressive-web-sdk/dist/components/header-bar'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import { Desktop, Mobile, Tablet } from '../../media-queries'

import DoctorSearch from '../doctor-search'
import DrugSearch from '../drug-search'
import PrescriptionConfigure from '../prescription-configure'
import MasterData from '../../../data/makana/MasterData'
import ViewModels from '../../../data/makana/ViewModels'

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

const vmDrugSearch = ViewModels.drugSearch
const vmPrescriptionConfigure = ViewModels.prescriptionConfigure

const PrescriptionsGrid = (props) => {
    const { analyticsManager, doctors, viewModel } = props

    const [doctorsList, setDoctorsList] = useState(doctors)
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false)
    const [drugModalMode, setDrugModalMode] = useState()
    const [activeGridRowKey, setActiveGridRowKey] = useState()
    const [selectedDoctor, setSelectedDoctor] = useState('999')
    const [selectedDrug, setSelectedDrug] = useState()

    const cartReducer = (state, action) => {
        switch (action.type) {

            case 'ADD_ITEM':
                console.log('cartReducer: ADD_ITEM')
                console.log('--- formData parameter: ')
                console.log(Object.fromEntries(action.formData.entries()))

                const newGridRow = {
                    _gridRowKey: uuidv4(),
                    masterKey: '2112', // TODO: wtf?
                    doctor: MasterData.doctors.find(el => el.doctorKey === action.formData.get('doctor-key')),
                    drug: {
                        ...MasterData.drugs.find(el => el.drugKey === action.formData.get('drug-key')),
                        drugForm: action.formData.get('drug-form'),
                        drugDosage: action.formData.get('drug-dosage'),
                        drugQuantity: action.formData.get('drug-quantity'),
                    },
                    pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === action.formData.get('pharmacy-key')),
                }

                setIsDrugModalOpen(false)
                return state.concat(newGridRow)

            case 'EDIT_ITEM':
                console.log('cartReducer: EDIT_ITEM')
                console.log('--- formData parameter: ')
                console.log(Object.fromEntries(action.formData.entries()))

                const newList = state.map((item) => {
                    if (item._gridRowKey === activeGridRowKey) {
                        const updatedItem = {
                            ...item,
                            doctor: MasterData.doctors.find(el => el.doctorKey === action.formData.get('doctor-key')),
                            drug: {
                                ...MasterData.drugs.find(el => el.drugKey === action.formData.get('drug-key')),
                                drugForm: action.formData.get('drug-form'),
                                drugDosage: action.formData.get('drug-dosage'),
                                drugQuantity: action.formData.get('drug-quantity'),
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

    const showAddItemModal = (id) => {
        console.log('showAddItemModal')
        console.log(id)
        // TODO: set up vmPrescriptionConfigure
        setSelectedDrug(id)
        setDrugModalMode('add')
        setIsDrugModalOpen(true)
    }

    const showEditItemModal = (id) => {
        console.log('showEditItemModal')
        console.log(id)
        // TODO: set up vmPrescriptionConfigure
        setSelectedDrug(id)
        setDrugModalMode('edit')
        setIsDrugModalOpen(true)
    }

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
        console.log('PrescriptionsGrid: handleDoctorSelectSubmit()')
        console.log(selectedDoctorId)
        setDoctorsList([...doctorsList, ...fakeDoctors.filter(el => el._doctorKey == selectedDoctorId)])
        setIsDoctorModalOpen(false)
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
                    viewModel={vmPrescriptionConfigure.find(el => el.masterKey === selectedDrug)}
                    analyticsManager={analyticsManager}
                    onPrescriptionConfigureSubmit={drugModalMode === 'add' ? handleCartAddItem : handleCartEditItem}
                />

            </div>
        </Sheet>
    )

    return (
        <div className="c-prescriptions-grid">
            <div style={{ marginTop: "6px" }} className="c-prescriptions-grid__form-field-input">
                <DrugSearch
                    id="drug-search"
                    viewModel={vmDrugSearch}
                    onDrugSelectSubmit={showAddItemModal}
                />
            </div>

            <div style={{ marginTop: "6px" }}>
                <List>
                    {cartState.map((lineItem, index) => (
                        <ListTile
                            key={lineItem._gridRowKey}
                            className="pw--instructional-block"
                            onClick={() => setActiveGridRowKey(lineItem._gridRowKey)}
                            endAction={
                                <div>
                                    {/* TODO: align these to use same key */}
                                    <Button className="pw--blank" icon="more" onClick={() => showEditItemModal(lineItem.masterKey)} />
                                    <Button className="pw--blank" icon="trash" onClick={() => cartAction({ type: 'REMOVE_ITEM', id: lineItem._gridRowKey })} />
                                </div>
                            }
                        >
                            <div style={{ fontWeight: 'bold' }}>{lineItem.drug.drugName}</div>
                            <div style={{ marginBottom: "5px" }}>{lineItem.drug.drugQuantity} {lineItem.drug.drugForm} {lineItem.drug.drugDosage}</div>
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

            <Button className="pw--primary">
                Checkout!
            </Button>

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
