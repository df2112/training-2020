import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import { HeaderBar, HeaderBarActions, HeaderBarTitle } from 'progressive-web-sdk/dist/components/header-bar'
import Divider from 'progressive-web-sdk/dist/components/divider'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import { Tabs, TabsPanel } from 'progressive-web-sdk/dist/components/tabs'
import { getAnalyticsManager } from '../../../analytics'
import { Desktop, Mobile, Tablet } from '../../media-queries'
import DoctorAddNew from '../doctor-add-new'
import DoctorSearch from '../doctor-search'
import DrugSearch from '../drug-search'
import PrescriptionConfigure from '../prescription-configure'

const analyticsManager = getAnalyticsManager()
const EMAIL_SUBSCRIBE_FORM_NAME = 'email-subscribe'

export const validate = (values) => {
    console.log('PrescriptionsGrid: validate()')
    const errors = {}
    if ((values.email || '').search(/@mobify.com$/) < 0) {
        errors.email = 'Must be a @mobify.com email address'
    }
    return errors
}

const initGridRows = [
    {
        _gridRowKey: 0,
        drugKey: '0',
        drugName: 'Atorvastatin',
        drugForm: 'tablets',
        drugDosage: '40mg',
        drugQuantity: '30',
        pharmacyKey: '',
        pharmacyChain: 'Piggly Wiggly',
        pharmacyLogoUrl: 'https://www.pigglywigglyfl.com/wp-content/uploads/2018/11/logo-footer@2x.png.webp',
        pharmacyCity: 'St. Petersburg'
    },
    {
        _gridRowKey: 1,
        drugKey: '1',
        drugName: 'Lipitor',
        drugForm: 'tablets',
        drugDosage: '10mg',
        drugQuantity: '90',
        pharmacyKey: '',
        pharmacyChain: 'Publix',
        pharmacyLogoUrl: 'https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C',
        pharmacyCity: 'Tampa'
    },
    {
        _gridRowKey: 2,
        drugKey: '2',
        drugName: 'Cozaar',
        drugForm: 'tablets',
        drugDosage: '50mg',
        drugQuantity: '10',
        pharmacyKey: '',
        pharmacyChain: 'Walmart',
        pharmacyLogoUrl: 'https://www.logolynx.com/images/logolynx/72/72228f020dfabd8322585148af496eb5.png',
        pharmacyCity: 'Clearwater'
    }
]

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

const vmPrescriptionConfigure = {
    variants: [
        {
            drugKey: '0',
            name: 'Atorvastatin (*generic)',
            generic: true,
            unitPrice: 2.50
        },
        {
            drugKey: '1',
            name: 'Lipitor (*brand)',
            generic: false,
            unitPrice: 3.75
        }
    ],
    forms: ['tablet', 'liquid'],
    dosages: ['10mg', '20mg', '30mg'],
    quantities: [11, 21, 51],
}

const vmDrugSearch = [
    {
        className: 'masterId_2112',
        isSimple: false,
        isfull: true,
        imageProps: {
            src:
                'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
            width: '88px',
            height: '88px',
            alt: 'cat'
        },
        href: '#',
        options: [
            {
                label: 'Dave ID 2112 yo!'
            }
        ],
        title: 'Product Title',
        price: '$2000',
        onClick: () => {
            console.log('clicked')
        }
    },
    {
        className: 'masterId_5150',
        isSimple: true,
        imageProps: {
            src:
                'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
            width: '88px',
            height: '88px',
            alt: 'cat'
        },
        href: '#',
        options: [
            {
                label: 'Dave ID 5150'
            }
        ],
        price: '$2000',
        title: 'Product Title2'
    }
]

const PrescriptionsGrid = (props) => {
    const { analyticsManager, doctors } = props

    const [doctorsList, setDoctorsList] = useState(doctors)
    const [emailValue, setEmailValue] = useState('')
    const [error, setError] = useState(false)
    const [gridRows, setGridRows] = useState(initGridRows)
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false)
    const [drugModalMode, setDrugModalMode] = useState()
    const [lastRowKey, setLastRowKey] = useState(initGridRows[2]._gridRowKey)
    const [activeRowKey, setActiveRowKey] = useState(initGridRows[2]._gridRowKey)
    const [selectedDoctor, setSelectedDoctor] = useState('999')

    const lastRowKeyRef = useRef(lastRowKey)

    const handleEmailChange = (event) => {
        console.log('PrescriptionsGrid: handleEmailChange()')
        return setEmailValue(event.target.value)
    }

    const handleSubmit = (event) => {
        console.log('PrescriptionsGrid: handleSubmit()')
        const { onSubmit } = props
        const emailError = validate({ email: emailValue }).email

        if (emailError) {
            event.preventDefault()
            setError(emailError)
            analyticsManager.track('error', {
                name: 'PrescriptionsGrid_form',
                content: emailError
            })
            return
        }

        if (onSubmit) onSubmit()
        setIsDoctorModalOpen(false)
    }

    //
    // ADD PRESCRIPTION (a) - Show the modal
    //
    const handleAddPrescriptionSelect = (newRowKey) => {
        console.log('PrescriptionsGrid: handleAddPrescriptionSelect()')
        lastRowKeyRef.current = newRowKey
        setLastRowKey(newRowKey)
        setDrugModalMode('add')
        setIsDrugModalOpen(true)
    }

    //
    // ADD PRESCRIPTION (b) - Submit the modal
    //
    const handleAddPrescriptionSubmit = (formData) => {
        console.log('PrescriptionsGrid: handleAddPrescriptionSubmit()')
        console.log('--- formData parameter: ')
        console.log(Object.fromEntries(formData.entries()))
        console.log('--- activeRowKey state variable: ')
        console.log(activeRowKey)

        const newGridRow = {
            _gridRowKey: lastRowKeyRef.current,
            drugName: formData.get('drug'),
            drugQuantity: formData.get('quantity'),
            drugForm: formData.get('form'),
            drugDosage: formData.get('dosage')
        }

        setGridRows(gridRows.concat(newGridRow))

        setIsDoctorModalOpen(false)
        setIsDrugModalOpen(false)
    }

    //
    // EDIT PRESCRIPTION (a) - Show the modal
    //
    const handleEditPrescriptionSelect = () => {
        console.log('PrescriptionsGrid: handleEditPrescriptionSelect()')
        setDrugModalMode('edit')
        setIsDrugModalOpen(true)
    }

    //
    // EDIT PRESCRIPTION (b) - Submit the modal
    //
    const handleEditPrescriptionSubmit = (formData) => {
        console.log('PrescriptionsGrid: handleEditPrescriptionSubmit()')
        console.log('--- formData parameter: ')
        console.log(Object.fromEntries(formData.entries()))
        console.log('--- activeRowKey state variable: ')
        console.log(activeRowKey)

        // TODO: Instead of updating in place, use setState to do it instead
        const gridRow = gridRows.find(element => element._gridRowKey == activeRowKey)
        gridRow.drugName = formData.get('drug')
        gridRow.drugQuantity = formData.get('quantity')
        gridRow.drugForm = formData.get('form')
        gridRow.drugDosage = formData.get('dosage')

        setIsDoctorModalOpen(false)
        setIsDrugModalOpen(false)
    }

    //
    // REMOVE PRESCRIPTION
    //
    const handleRemovePrescription = (rowKey) => {
        console.log('PrescriptionsGrid: handleRemovePrescription()')
        const newGridRows = gridRows.filter(el => el._gridRowKey != rowKey)
        setGridRows(newGridRows)
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
            shrinkToContent
            headerContent={
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start-md u-text-align-start u-text-size-big">
                        Prescription {drugModalMode}
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <Button innerClassName="u-padding-0" icon="close"
                            onClick={() => setIsDrugModalOpen(false)}
                        />
                    </HeaderBarActions>
                </HeaderBar>
            }
        >
            <div className="t-product-details__shipping-delivery-modal-content">
                <br />
                <PrescriptionConfigure
                    viewModel={vmPrescriptionConfigure}
                    analyticsManager={analyticsManager}
                    onPrescriptionConfigureSubmit={drugModalMode === 'add' ? handleAddPrescriptionSubmit : handleEditPrescriptionSubmit}
                />

            </div>
        </Sheet>
    )

    const handleDrugSelectSubmit = (event) => {
        console.log('PrescriptionsGrid: handleDrugSelectSubmit()')
        console.log(event)
        lastRowKeyRef.current = (lastRowKey + 1)
        setLastRowKey(lastRowKeyRef.current)
        setDrugModalMode('add')
        setIsDrugModalOpen(true)
    }

    return (
        <div className="c-prescriptions-grid">
            <Tabs activeIndex={0}>
                <TabsPanel title="Prescriptions">

                    <div style={{ marginTop: "6px" }} className="c-prescriptions-grid__form-field-input">
                        <DrugSearch
                            id="drug-search"
                            viewModel={vmDrugSearch}
                            onDrugSelectSubmit={handleDrugSelectSubmit}
                        />
                    </div>

                    {/* Revised  */}
                    <div style={{ marginTop: "6px" }}>
                        <List>
                            {/* <ListTile className="pw--instructional-block">
                                <Button
                                    className="t-product-details__modal-button pw--primary qa-modal-button"
                                    onClick={() => handleAddPrescriptionSelect(lastRowKey + 1)}>
                                    Add New Prescription
                                </Button>
                            </ListTile> */}

                            {gridRows.map((item, index) => (
                                <ListTile
                                    key={item._gridRowKey}
                                    className="pw--instructional-block"
                                    onClick={() => setActiveRowKey(item._gridRowKey)}
                                    endAction={
                                        <div>
                                            <Button className="pw--blank" icon="more" onClick={() => handleEditPrescriptionSelect()} />
                                            <Button className="pw--blank" icon="trash" onClick={() => handleRemovePrescription(item._gridRowKey)} />
                                        </div>
                                    }
                                >
                                    <div style={{ fontWeight: 'bold' }}>{item.drugName}</div>
                                    <div style={{ marginBottom: "5px" }}>{item.drugQuantity} {item.drugForm} {item.drugDosage}</div>
                                    <Divider />
                                    <div style={{ fontWeight: 'bold', marginBottom: "5px", marginTop: "5px" }}>{doctorsList[item._gridRowKey + 2].name}</div>
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

                                <div className="c-prescriptions-grid__form-field-row">
                                    <div className="u-flex">
                                        <div className="c-prescriptions-grid__form-field-inner">
                                            {(index === 0 || Mobile) &&
                                                <div className="c-prescriptions-grid__form-field-label-wrap">
                                                    <label className="c-prescriptions-grid__form-field-label" htmlFor="drug-search">
                                                        {'Drug Search'}
                                                    </label>
                                                </div>
                                            }
                                            <div className="c-prescriptions-grid__form-field-input">
                                                <DrugSearch id="drug-search" onDrugSelectSubmit={handleDrugSelectSubmit} />
                                            </div>
                                        </div>
                                    </div>

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
                </TabsPanel>

                <TabsPanel title="Pharmacies">
                </TabsPanel>

                <TabsPanel title="Doctors">
                    <List>
                        {doctorsList && doctorsList.length > 0 && doctorsList.map((doctor) => (
                            <ListTile
                                key={doctor._doctorKey}
                                endAction={
                                    <div>
                                        <Button className="pw--blank" icon="star" onClick={() => setIsDrugModalOpen(true)} />
                                    </div>
                                }
                            >
                                <div style={{ fontWeight: 'bold' }}>{doctor.name}</div>
                                <div>1000 Central Avenue</div>
                            </ListTile>
                        ))}
                    </List>
                </TabsPanel>
            </Tabs>


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
