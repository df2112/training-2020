import React, { Fragment, useRef, useState, useReducer } from 'react'
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
import DoctorAddNew from '../doctor-add-new'
import DoctorSearch from '../doctor-search'
import DrugSearch from '../drug-search'
import PrescriptionConfigure from '../prescription-configure'
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

const PrescriptionsGrid = (props) => {
    const { analyticsManager, doctors } = props

    const [doctorsList, setDoctorsList] = useState(doctors)
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false)
    const [drugModalMode, setDrugModalMode] = useState()
    const [activeRowKey, setActiveRowKey] = useState()
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
                    drugName: action.formData.get('drug'),
                    drugQuantity: action.formData.get('quantity'),
                    drugForm: action.formData.get('form'),
                    drugDosage: action.formData.get('dosage'),
                    doctorName: action.formData.get('doctor-name'),
                    // TODO: fix all the below so that it comes from the form not hardcoded
                    masterKey: '2112',
                    pharmacyKey: '',
                    pharmacyChain: action.formData.get('pharmacy-chain'),
                    pharmacyLogoUrl: action.formData.get('pharmacy-logo-url'),
                    pharmacyCity: action.formData.get('pharmacy-city')
                }

                setIsDrugModalOpen(false)
                return state.concat(newGridRow)

            case 'EDIT_ITEM': {
                console.log('cartReducer: EDIT_ITEM')
                console.log('--- formData parameter: ')
                console.log(Object.fromEntries(action.formData.entries()))

                const newList = state.map((item) => {

                    if (item._gridRowKey === activeRowKey) {
                        const updatedItem = {
                            ...item,
                            drugName: action.formData.get('drug'),
                            drugQuantity: action.formData.get('quantity'),
                            drugForm: action.formData.get('form'),
                            drugDosage: action.formData.get('dosage'),
                            doctorName: action.formData.get('doctor-name'),
                            pharmacyChain: action.formData.get('pharmacy-chain'),
                            pharmacyLogoUrl: action.formData.get('pharmacy-logo-url'),
                            pharmacyCity: action.formData.get('pharmacy-city')                    
                        }
                        return updatedItem
                    } else {
                        return item
                    }
                })

                setIsDrugModalOpen(false)
                return newList                
            }

            case 'REMOVE_ITEM':
                console.log('cartReducer: REMOVE_ITEM')

                return state.filter((item) => item._gridRowKey !== action.id)

            default:
                throw new Error();
        }
    }

    const [cartState, cartAction] = useReducer(cartReducer, ViewModels.prescriptionsGrid)

    const handleCartAddItem = (formData) => {
        cartAction({ type: 'ADD_ITEM', formData })
    }

    const handleCartEditItem = (formData) => {
        cartAction({ type: 'EDIT_ITEM', formData })
    }

    const handleCartRemoveItem = (id) => {
        cartAction({ type: 'REMOVE_ITEM', id })
    }

    //
    // EDIT PRESCRIPTION (a) - Show the modal
    //
    const handleEditPrescriptionSelect = (selectedProductId) => {
        console.log('PrescriptionsGrid: handleEditPrescriptionSelect()')
        setSelectedDrug(selectedProductId)
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
                <Tabs activeIndex={0}>
                    <TabsPanel title="Search Doctors">
                        <br />
                        <DoctorSearch
                            analyticsManager={analyticsManager}
                            onDoctorSelectSubmit={handleDoctorSelectSubmit}
                        />

                    </TabsPanel>
                    <TabsPanel title="Add New Doctor">
                        <br />
                        <DoctorAddNew
                            analyticsManager={analyticsManager}
                            onDoctorAddNewSubmit={handleDoctorAddNewSubmit}
                        />
                    </TabsPanel>
                </Tabs>
            </div>
        </Sheet>
    )

    const handleDoctorSelectSubmit = (selectedDoctorId) => {
        console.log('PrescriptionsGrid: handleDoctorSelectSubmit()')
        console.log(selectedDoctorId)
        setDoctorsList([...doctorsList, ...fakeDoctors.filter(el => el._doctorKey == selectedDoctorId)])
        setIsDoctorModalOpen(false)
    }

    const handleDoctorAddNewSubmit = (formData) => {
        console.log('PrescriptionsGrid: handleDoctorAddNewSubmit(formData)')
        console.log('--- formData parameter: ')
        console.log(Object.fromEntries(formData.entries()))

        const newDoctor = {
            _doctorKey: '888',
            name: formData.get('name'),
            age: 2112
        }

        setDoctorsList([...doctorsList, newDoctor])
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
                    viewModel={ViewModels.prescriptionConfigure.find(el => el.masterKey === selectedDrug)}
                    analyticsManager={analyticsManager}
                    onPrescriptionConfigureSubmit={drugModalMode === 'add' ? handleCartAddItem : handleCartEditItem}
                />

            </div>
        </Sheet>
    )

    const handleDrugSelectSubmit = (selectedProductId) => {
        console.log('PrescriptionsGrid: handleDrugSelectSubmit()')
        console.log(selectedProductId)
        setSelectedDrug(selectedProductId)
        setDrugModalMode('add')
        setIsDrugModalOpen(true)
    }

    return (
        <div className="c-prescriptions-grid">
            <div style={{ marginTop: "6px" }} className="c-prescriptions-grid__form-field-input">
                <DrugSearch
                    id="drug-search"
                    viewModel={ViewModels.drugSearch}
                    onDrugSelectSubmit={handleDrugSelectSubmit}
                />
            </div>

            <div style={{ marginTop: "6px" }}>
                <List>
                    {cartState.map((item, index) => (
                        <ListTile
                            key={item._gridRowKey}
                            className="pw--instructional-block"
                            onClick={() => setActiveRowKey(item._gridRowKey)}
                            endAction={
                                <div>
                                    <Button className="pw--blank" icon="more" onClick={() => handleEditPrescriptionSelect(item.masterKey)} />
                                    <Button className="pw--blank" icon="trash" onClick={() => handleCartRemoveItem(item._gridRowKey)} />
                                </div>
                            }
                        >
                            <div style={{ fontWeight: 'bold' }}>{item.drugName}</div>
                            <div style={{ marginBottom: "5px" }}>{item.drugQuantity} {item.drugForm} {item.drugDosage}</div>
                            <Divider />
                            <div style={{ fontWeight: 'bold', marginBottom: "5px", marginTop: "5px" }}>{item.doctorName}</div>
                            <Divider />
                            <ListTile
                                startAction={<img style={{ width: "30.8px", height: "30.8px", marginRight: "5px" }} src={item.pharmacyLogoUrl} />}>
                                <div>{item.pharmacyChain}</div>
                            </ListTile>
                        </ListTile>
                    ))}
                </List>
            </div>

            {/* TODO: This is the old stuff ... to be removed */}
            <List>
                {/* Prescription Rows */}
                {/* {gridRows.map((item, index) => (

                                    <div className="u-flex">
                                        <div className="c-prescriptions-grid__form-field-inner">
                                            {(index === 0 || Mobile) &&
                                                <div className="c-prescriptions-grid__form-field-label-wrap">
                                                    <label className="c-prescriptions-grid__form-field-label" htmlFor="doctor-select">
                                                        {'Doctor Select'}
                                                    </label>
                                                </div>
                                            }
                                            <div className="c-prescriptions-grid__form-field-input">
                                                <select id="doctor-select" value={selectedDoctor} onChange={handleDoctorChange}>
                                                    {doctorsList && doctorsList.length > 0 && doctorsList.map((doctor) => (
                                                        <Fragment key={doctor._doctorKey}>
                                                            <option value={doctor._doctorKey}>{doctor.name}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </ListTile>
                        ))} */}

            </List>

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
    onSubmit: PropTypes.func
}

export default PrescriptionsGrid
