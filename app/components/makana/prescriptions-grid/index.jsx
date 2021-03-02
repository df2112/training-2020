import React, { useContext, useState } from 'react'
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
import { GlobalStateContext, GlobalDispatchContext, SET_CART_ITEMS } from '../../global-state'
import DoctorSearch from '../doctor-search'
import MasterData from '../../../data/makana/MasterData'
import PrescriptionConfigure from '../prescription-configure'

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

    const globalState = useContext(GlobalStateContext)
    const globalDispatch = useContext(GlobalDispatchContext)

    console.log('Global State in PrescriptionsGrid =>')
    console.log(globalState)

    // Pharmacy tab data
    const pharmacyGroupings = globalState.cart.reduce((accumulator, current) => {
        const property = current['pharmacy']['pharmacyKey'];
        accumulator[property] = accumulator[property] || [];
        accumulator[property].push(current);
        return accumulator;
    }, [])

    const pharmacyGroupValues = Object.values(pharmacyGroupings)

    // Doctor tab data
    const doctorGroupings = globalState.cart.reduce((accumulator, current) => {
        const property = current['doctor']['doctorKey'];
        accumulator[property] = accumulator[property] || [];
        accumulator[property].push(current);
        return accumulator;
    }, [])

    const doctorGroupValues = Object.values(doctorGroupings)

    // Local state management
    const [doctorsList, setDoctorsList] = useState(doctors)
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
    const [PrescriptionModalMode, setPrescriptionModalMode] = useState()
    const [PrescriptionModalViewModel, setPrescriptionModalViewModel] = useState({
        pharmacies: MasterData.pharmacies,
        doctors: MasterData.doctors
    })
    const [selectedDoctor, setSelectedDoctor] = useState('999')
    const [selectedDrug, setSelectedDrug] = useState()

    const handleCartEditItem = (formData) => {
        globalDispatch({ type: 'EDIT_ITEM', formData })
        setIsPrescriptionModalOpen(false)
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
                    onSubmit={handleCartEditItem}
                />

            </div>
        </Sheet>
    )

    const showPrescriptionModal = (gridRowKey) => {
        console.log(`PrescriptionsGrid showPrescriptionModal: gridRowKey ${gridRowKey} `)

        const newPrescriptionModalViewModel = {
            ...PrescriptionModalViewModel,
            prescription: globalState.cart.find(el => el._gridRowKey === gridRowKey)
        }

        setPrescriptionModalViewModel(newPrescriptionModalViewModel)
        setSelectedDrug(newPrescriptionModalViewModel.prescription.drug.drugKey)
        setPrescriptionModalMode('edit')
        setIsPrescriptionModalOpen(true)
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
        console.log(`PrescriptionsGrid: handleDoctorSelectSubmit() ${selectedDoctorId}`)
        setDoctorsList([...doctorsList, ...fakeDoctors.filter(el => el._doctorKey == selectedDoctorId)])
        setIsDoctorModalOpen(false)
    }

    return (
        <div className="c-prescriptions-grid">
            <div>
                <Tabs activeIndex={0}>
                    <TabsPanel title="Prescriptions">
                        <div style={{ marginTop: "6px", height: "450px", overflowX: "hidden", overflowY: "auto" }}>
                            <List>
                                {globalState.cart.map((lineItem, index) => (
                                    <ListTile
                                        key={lineItem._gridRowKey}
                                        className="pw--instructional-block"
                                        endAction={
                                            <div>
                                                {/* TODO: align these to use same key */}
                                                <Button className="pw--blank" icon="more" onClick={() => showPrescriptionModal(lineItem._gridRowKey)} />
                                                <Button className="pw--blank" icon="trash" onClick={() => globalDispatch({ type: 'REMOVE_ITEM', id: lineItem._gridRowKey })} />
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
                    </TabsPanel>

                    <TabsPanel title="Pharmacies">
                        <div style={{ marginTop: "6px", height: "450px", overflowX: "hidden", overflowY: "auto" }}>
                            <List>
                                {pharmacyGroupValues.map((pharmacyGroup) => (
                                    <ListTile
                                        key={uuidv4()}
                                        className="pw--instructional-block"
                                    >
                                        {pharmacyGroup.map((prescription, prescriptionIndex) => (
                                            <div key={uuidv4()}>
                                                {prescriptionIndex === 0 && (
                                                    <ListTile
                                                        startAction={
                                                            <img style={{ width: "30.8px", height: "30.8px", marginRight: "5px" }} src={prescription.pharmacy.pharmacyLogoUrl} />
                                                        }>
                                                        <div style={{ fontWeight: 'bold' }}>{prescription.pharmacy.pharmacyChain}</div>
                                                    </ListTile>
                                                )}

                                                <Divider />
                                                <ListTile>
                                                    <div>{prescription.drug.selectedVariantName}</div>
                                                </ListTile>
                                            </div>
                                        ))}

                                    </ListTile>
                                ))}

                            </List>
                        </div>
                    </TabsPanel>

                    <TabsPanel title="Doctors">
                        <div style={{ marginTop: "6px", height: "450px", overflowX: "hidden", overflowY: "auto" }}>
                            <List>
                                {doctorGroupValues.map((doctorGroup) => (
                                    <ListTile
                                        key={uuidv4()}
                                        className="pw--instructional-block"
                                    >
                                        {doctorGroup.map((prescription, prescriptionIndex) => (
                                            <div key={uuidv4()}>
                                                {prescriptionIndex === 0 && (
                                                    <ListTile
                                                        startAction={
                                                            <img style={{ width: "30.8px", height: "30.8px", marginRight: "5px" }} src={prescription.doctor.imgSrc} />
                                                        }>
                                                        <div style={{ fontWeight: 'bold' }}>{prescription.doctor.name}</div>
                                                    </ListTile>
                                                )}

                                                <Divider />
                                                <ListTile>
                                                    <div>{prescription.drug.selectedVariantName}</div>
                                                </ListTile>
                                            </div>
                                        ))}

                                    </ListTile>
                                ))}

                            </List>
                        </div>
                    </TabsPanel>
                </Tabs>
            </div>

            {/* Floating element/components */}
            <Mobile>
                <DoctorModal width="80%" />
                <PrescriptionModal width="80%" />
            </Mobile>

            <Tablet>
                <DoctorModal width="60%" />
                <PrescriptionModal width="60%" />
            </Tablet>

            <Desktop>
                <DoctorModal width="40%" />
                <PrescriptionModal width="60%" />
            </Desktop>
        </div>
    )
}

PrescriptionsGrid.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onSubmit: PropTypes.func,
    doctors: PropTypes.array
}

export default PrescriptionsGrid
