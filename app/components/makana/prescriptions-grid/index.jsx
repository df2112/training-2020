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
        _gridRowKey: 1,
        field1: 'Initial dummy row!!!',
        field2: 'A'
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

const PrescriptionsGrid = (props) => {
    const { analyticsManager, doctors } = props

    const [doctorsList, setDoctorsList] = useState(doctors)
    const [emailValue, setEmailValue] = useState('')
    const [error, setError] = useState(false)
    const [gridRows, setGridRows] = useState(initGridRows)
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false)
    const [lastRowKey, setLastRowKey] = useState(initGridRows[0]._gridRowKey)
    const [activeRowKey, setActiveRowKey] = useState(initGridRows[0]._gridRowKey)
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

    const handleAddNewPrescription = (newRowKey) => {
        console.log('PrescriptionsGrid: handleAddNewPrescription()')
        lastRowKeyRef.current = newRowKey
        setLastRowKey(newRowKey)

        const newGridRow = {
            _gridRowKey: lastRowKeyRef.current,
            field1: 'Additional dummy row!!!',
            field2: lastRowKeyRef.current
        }

        setGridRows(gridRows.concat(newGridRow))
    }

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
                        Configure Prescription
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
                    analyticsManager={analyticsManager}
                    onPrescriptionConfigureSubmit={handlePrescriptionConfigureSubmit}
                />

            </div>
        </Sheet>
    )

    const handleDrugSelectSubmit = (event) => {
        console.log('PrescriptionsGrid: handleDrugSelectSubmit()')
        console.log(event)
        setIsDoctorModalOpen(false)
        setIsDrugModalOpen(true)
    }

    // TODO on Saturday 01/30
    //
    // Take the formData and update the CURRENTLY SELECTED GRID ROW fields
    //
    // - will need a useState for holding the currently-selected grid row?
    // - etc
    //
    const handlePrescriptionConfigureSubmit = (formData) => {
        console.log('PrescriptionsGrid: handlePrescriptionConfigureSubmit()')
        console.log('--- formData parameter: ')
        console.log(Object.fromEntries(formData.entries()))
        console.log('--- activeRowKey state variable: ')
        console.log(activeRowKey)
        setIsDoctorModalOpen(false)
        setIsDrugModalOpen(false)
    }

    return (
        <div className="c-prescriptions-grid">
            <div className="u-margin-bottom-lg">
                This is the Prescriptions Grid component:
            </div>

            <Tabs activeIndex={0}>
                <TabsPanel title="Prescriptions">

                    {/* Revised  */}
                    <div style={{ marginTop: "6px" }}>
                        <List>
                            <ListTile
                                className="pw--instructional-block"
                                endAction={<Button className="pw--blank" icon="more" onClick={() => setIsDrugModalOpen(true)} />}
                            >
                                <div style={{ fontWeight: 'bold' }}>Atorvastatin</div>
                                <div style={{ marginBottom: "5px" }}>30 tablets 40mg</div>
                                <Divider />
                                <ListTile startAction={<img style={{ maxWidth: "70%", marginRight: "5px" }} src="https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C" />}>
                                    <div>Piggly Wiggly</div>
                                </ListTile>
                            </ListTile>
                            <ListTile
                                className="pw--instructional-block"
                                endAction={<Button className="pw--blank" icon="more" onClick={() => setIsDrugModalOpen(true)} />}
                            >
                                <div style={{ fontWeight: 'bold' }}>Lipitor</div>
                                <div style={{ marginBottom: "5px" }}>90 tablets 10mg</div>
                                <Divider />
                                <ListTile startAction={<img style={{ maxWidth: "70%", marginRight: "5px" }} src="https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C" />}>
                                    <div>Publix</div>
                                </ListTile>
                            </ListTile>
                            <ListTile
                                className="pw--instructional-block"
                                endAction={<Button className="pw--blank" icon="more" onClick={() => setIsDrugModalOpen(true)} />}
                            >
                                <div style={{ fontWeight: 'bold' }}>Cozaar</div>
                                <div style={{ marginBottom: "5px" }}>30 tablets 50mg</div>
                                <Divider />
                                <ListTile startAction={<img style={{ maxWidth: "70%", marginRight: "5px" }} src="https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C" />}>
                                    <div>Walmart</div>
                                </ListTile>
                            </ListTile>
                            {/* Add New Prescription button */}
                            <ListTile className="pw--instructional-block">
                                <Button className="t-product-details__modal-button pw--primary qa-modal-button"
                                    onClick={() => handleAddNewPrescription(lastRowKey + 1)}>
                                    Add New Prescription
                                </Button>
                            </ListTile>

                        </List>
                    </div>

                    <List>
                        {/* Prescription Rows */}
                        {gridRows.map((item, index) => (
                            <ListTile
                                onClick={() => setActiveRowKey(item._gridRowKey)}
                                className="pw--instructional-block"
                                key={item._gridRowKey}
                                endAction={
                                    <Button
                                        className="pw--blank"
                                        icon="trash"
                                        onClick={() => handleRemovePrescription(item._gridRowKey)}
                                    />
                                }
                            >

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
                                                    <label className="c-prescriptions-grid__form-field-label" htmlFor="field2">
                                                        {'Field2'}
                                                    </label>
                                                </div>
                                            }
                                            <div className="c-prescriptions-grid__form-field-input">
                                                <span id="field2">{item.field2}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="u-flex">
                                        <div className="c-prescriptions-grid__form-field-inner">
                                            {(index === 0 || Mobile) &&
                                                <div className="c-prescriptions-grid__form-field-label-wrap">
                                                    <label className="c-prescriptions-grid__form-field-label" htmlFor="field1">
                                                        {'Field1'}
                                                    </label>
                                                </div>
                                            }
                                            <div className="c-prescriptions-grid__form-field-input">
                                                <span id="field1">{item.field1}</span>
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
                        ))}

                        {/* Add New Prescription button */}
                        <ListTile className="pw--instructional-block">
                            <Button className="t-product-details__modal-button pw--primary qa-modal-button"
                                onClick={() => handleAddNewPrescription(lastRowKey + 1)}>
                                Add New Prescription
                    </Button>
                        </ListTile>

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
                                        <Button
                                            className="pw--blank"
                                            icon="star"
                                            onClick={() => setIsDrugModalOpen(true)}
                                        />
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
