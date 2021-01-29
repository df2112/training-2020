import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import { getAnalyticsManager } from '../../../analytics'

const analyticsManager = getAnalyticsManager()
const DOCTOR_SEARCH_FORM_NAME = 'prescription-configure'

const PrescriptionConfigure = (props) => {
    const { onPrescriptionConfigureSubmit } = props
    const [error, setError] = useState(false)

    const handleDoctorSearchSubmit = (event) => {
        console.log('DoctorSearch: handleDoctorSearchSubmit()')

        const formData = new FormData(event.target)
        if (onPrescriptionConfigureSubmit) onPrescriptionConfigureSubmit(formData)
    }

    return (
        <form
            id={DOCTOR_SEARCH_FORM_NAME}
            className="c-prescription-configure"
            data-analytics-name={DOCTOR_SEARCH_FORM_NAME}
            onSubmit={handleDoctorSearchSubmit}
        >
            <List>
                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <select name="drug" >
                        <option value='1'>Atorvastatin (generic)</option>
                        <option value='2'>Lipitor (brand)</option>
                    </select>
                </ListTile>

                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <div>Form</div>
                    <select name="form">
                        <option value='1'>Tablet</option>
                    </select>
                </ListTile>

                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <div>Dosage</div>
                    <select name="dosage">
                        <option value='1'>10mg</option>
                        <option value='2'>20mg</option>
                        <option value='3'>40mg</option>
                    </select>
                </ListTile>
                
                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <div>Quantity</div>
                    <select name="quantity">
                        <option value='1'>10mg</option>
                        <option value='2'>20mg</option>
                        <option value='3'>40mg</option>
                    </select>
                </ListTile>
            </List>
            
            {/* Submit Button */}
            <div className="c-prescription-configure__form-field-row u-flexbox">
                <div className="c-prescription-configure__form-field c-prescription-configure__button u-flex-none u-margin-start-0">
                    <div className="c-prescription-configure__form-field-inner">
                        <div className="c-prescription-configure__form-field-input">
                            <div className="c-prescription-configure__form-field-label" aria-hidden="true"></div>
                            <Button type="submit" className="pw--primary">
                                Save Prescription
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

PrescriptionConfigure.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onPrescriptionConfigureSubmit: PropTypes.func
}

export default PrescriptionConfigure
