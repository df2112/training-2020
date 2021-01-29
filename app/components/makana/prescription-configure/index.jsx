import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import { getAnalyticsManager } from '../../../analytics'

const analyticsManager = getAnalyticsManager()
const DOCTOR_SEARCH_FORM_NAME = 'prescription-configure'

const PrescriptionConfigure = (props) => {
    const { onPrescriptionConfigureSubmit } = props
    const [error, setError] = useState(false)

    const handleDoctorSearchSubmit = (event) => {
        console.log('DoctorSearch: handleDoctorSearchSubmit()')

        const formData = new FormData(event.target)

        event.preventDefault() //TODO: This needs to be reviewed
        if (onPrescriptionConfigureSubmit) onPrescriptionConfigureSubmit('yoyo2')
    }

    return (
        <form
            id={DOCTOR_SEARCH_FORM_NAME}
            className="c-prescription-configure"
            data-analytics-name={DOCTOR_SEARCH_FORM_NAME}
            onSubmit={handleDoctorSearchSubmit}
        >

            {/* Name */}
            <div className="c-prescription-configure__form-field-row u-flexbox">
                <div className={`c-prescription-configure__form-field u-flex ${error ? 'c-prescription-configure__form-field-error' : ''}`}>
                    <div className="c-prescription-configure__form-field-inner">
                        <div className="c-prescription-configure__form-field-label-wrap">
                            <label className="c-prescription-configure__form-field-label" htmlFor="prescription-configure-name">{'Name'}</label>
                        </div>
                        <div className="c-prescription-configure__form-field-input">
                            <input id="prescription-configure-name" name="name" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-prescription-configure__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* City */}
            <div className="c-prescription-configure__form-field-row u-flexbox">
                <div className={`c-prescription-configure__form-field u-flex ${error ? 'c-prescription-configure__form-field-error' : ''}`}>
                    <div className="c-prescription-configure__form-field-inner">
                        <div className="c-prescription-configure__form-field-label-wrap">
                            <label className="c-prescription-configure__form-field-label" htmlFor="prescription-configure-city">{'City'}</label>
                        </div>
                        <div className="c-prescription-configure__form-field-input">
                            <input id="prescription-configure-city" name="city" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-prescription-configure__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* State */}
            <div className="c-prescription-configure__form-field-row u-flexbox">
                <div className={`c-prescription-configure__form-field u-flex ${error ? 'c-prescription-configure__form-field-error' : ''}`}>
                    <div className="c-prescription-configure__form-field-inner">
                        <div className="c-prescription-configure__form-field-label-wrap">
                            <label className="c-prescription-configure__form-field-label" htmlFor="prescription-configure-state">{'State'}</label>
                        </div>
                        <div className="c-prescription-configure__form-field-input">
                            <input id="prescription-configure-state" name="state" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-prescription-configure__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Zip */}
            <div className="c-prescription-configure__form-field-row u-flexbox">
                <div className={`c-prescription-configure__form-field u-flex ${error ? 'c-prescription-configure__form-field-error' : ''}`}>
                    <div className="c-prescription-configure__form-field-inner">
                        <div className="c-prescription-configure__form-field-label-wrap">
                            <label className="c-prescription-configure__form-field-label" htmlFor="prescription-configure-zip">{'Zip'}</label>
                        </div>
                        <div className="c-prescription-configure__form-field-input">
                            <input id="prescription-configure-zip" name="zip" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-prescription-configure__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
