import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import { HeaderBar, HeaderBarActions, HeaderBarTitle } from 'progressive-web-sdk/dist/components/header-bar'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import { Tabs, TabsPanel } from 'progressive-web-sdk/dist/components/tabs'
import { getAnalyticsManager } from '../../analytics'
import { Desktop, Mobile, Tablet } from '../../components/media-queries'
import DoctorAddNew from '../doctor-add-new'
import DoctorSearch from '../doctor-search'

const analyticsManager = getAnalyticsManager()
const EMAIL_SUBSCRIBE_FORM_NAME = 'email-subscribe'

export const validate = (values) => {
    const errors = {}
    if ((values.email || '').search(/@mobify.com$/) < 0) {
        errors.email = 'Must be a @mobify.com email address'
    }
    return errors
}

const initGridRows = [
    {
        _gridRowKey: 1,
        field1: 'Hear me roar!!!',
        field2: 'A'
    }
]

const PrescriptionsGrid = (props) => {
    const { analyticsManager, doctors } = props

    const [emailValue, setEmailValue] = useState('')
    const [error, setError] = useState(false)
    const [gridRows, setGridRows] = useState(initGridRows)
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState('999')
    const [lastRowKey, setLastRowKey] = useState(initGridRows[0]._gridRowKey)
    const lastRowKeyRef = useRef(lastRowKey)

    const [isDoctorSearchSubmitted, setisDoctorSearchSubmitted] = useState(false)
    const [isDoctorSelectSubmitted, setisDoctorSelectSubmitted] = useState(false)


    const handleDoctorChange = (event) => {
        console.log('handleDoctorChange()')

        if (event.target.value === '000') {
            setIsDoctorModalOpen(true)
        } else {
            setSelectedDoctor(event.target.value)
        }
    }

    const handleEmailChange = (event) => setEmailValue(event.target.value)

    const handleDoctorSearchSubmit = (event) => {
        console.log('handleDoctorSearchSubmit()')
        setisDoctorSearchSubmitted(true)
        setIsDoctorModalOpen(false)
    }

    const handleDoctorSelectSubmit = (event) => {
        console.log('handleDoctorSelectSubmit()')
        setisDoctorSelectSubmitted(true)
    }

    const handleSubmit = (event) => {
        console.log('handleSubmit()')
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

    const handleAddGridRow = (newRowKey) => {
        console.log('handleAddGridRow()')
        lastRowKeyRef.current = newRowKey
        setLastRowKey(newRowKey)

        const newGridRow = {
            _gridRowKey: lastRowKeyRef.current,
            field1: 'Hear me roar again!!!',
            field2: lastRowKeyRef.current
        }

        setGridRows(gridRows.concat(newGridRow))
    }

    const handleRemoveGridRow = (rowKey) => {
        console.log('handleRemoveGridRow()')        
        const newGridRows = gridRows.filter(el => el._gridRowKey != rowKey)
        setGridRows(newGridRows)
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

                        {/* {!isDoctorSearchSubmitted ? (
                            <DoctorSearch analyticsManager={analyticsManager} onSubmit={handleDoctorSearchSubmit} />
                        ) : (<span>Hello Dave!</span>)
                        } */}
                        <DoctorSearch analyticsManager={analyticsManager} onSubmit={handleDoctorSearchSubmit} />

                    </TabsPanel>
                    <TabsPanel title="Add New Doctor">
                        <br />

                        {!isDoctorSelectSubmitted ? (
                            <DoctorAddNew analyticsManager={analyticsManager} onSubmit={handleDoctorSelectSubmit} />
                        ) : (<span>Hello Dave!</span>)
                        }

                    </TabsPanel>
                </Tabs>
            </div>
        </Sheet>
    )

    return (
        <div>
            <div className="u-margin-bottom-lg">
                This is the Prescriptions Grid component:
            </div>

            <List>

                {/* Section 3: Prescription Rows */}
                {gridRows.map((item) => (
                    <ListTile
                        className="pw--instructional-block"
                        key={item._gridRowKey}
                        endAction={<Button className="pw--blank" icon="trash" onClick={() => handleRemoveGridRow(item._gridRowKey)} />}
                    >
                        <span>
                            {item.field2} : {item.field1}
                        </span>

                        <select value={selectedDoctor} onChange={handleDoctorChange}>
                            {doctors && doctors.length > 0 && doctors.map((doctor) => (
                                <Fragment key={doctor._doctorKey}>
                                    <option value={doctor._doctorKey}>{doctor.name}</option>
                                </Fragment>
                            ))}
                        </select>
                    </ListTile>
                ))}

                {/* Section 4: Add New Prescription button */}
                <ListTile className="pw--instructional-block">
                    <Button className="t-product-details__modal-button pw--primary qa-modal-button"
                        onClick={() => handleAddGridRow(lastRowKey + 1)}>
                        Add New Prescription
                    </Button>
                </ListTile>

            </List>

            {/* Floating element/components */}
            <Mobile>
                <DoctorModal width="80%" />
            </Mobile>

            <Tablet>
                <DoctorModal width="60%" />
            </Tablet>

            <Desktop>
                <DoctorModal width="40%" />
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
