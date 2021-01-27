import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import { getAnalyticsManager } from '../../analytics'

const analyticsManager = getAnalyticsManager()
const DOCTOR_ADD_NEW_FORM_NAME = 'doctor-add-new'

const DoctorAddNew = (props) => {
    const { onDoctorAddNewSubmit } = props
    const [error, setError] = useState(false)
    const [nameValue, setNameValue] = useState('')
    const [cityValue, setCityValue] = useState('')
    const [stateValue, setStateValue] = useState('')
    const [zipValue, setZipValue] = useState('')

    const handleNameChange = (event) => {
        console.log('DoctorAddNew: handleNameChange()')
        return setNameValue(event.target.value)
    }

    const handleCityChange = (event) => {
        console.log('DoctorAddNew: handleCityChange()')
        return setCityValue(event.target.value)
    }

    const handleStateChange = (event) => {
        console.log('DoctorAddNew: handleStateChange()')
        return setStateValue(event.target.value)
    }

    const handleZipChange = (event) => {
        console.log('DoctorAddNew: handleZipChange()')
        return setZipValue(event.target.value)
    }

    const handleDoctorAddNewSubmit = (event) => {
        console.log('DoctorAddNew: handleDoctorAddNewSubmit()')
        const formData = new FormData(event.target)
        
        if (onDoctorAddNewSubmit) onDoctorAddNewSubmit(formData)
    }

    return (
        <form
            id={DOCTOR_ADD_NEW_FORM_NAME}
            className="c-doctor-add-new"
            data-analytics-name={DOCTOR_ADD_NEW_FORM_NAME}
            onSubmit={handleDoctorAddNewSubmit}
        >

            {/* Name */}
            <div className="c-doctor-add-new__form-field-row u-flexbox">
                <div className={`c-doctor-add-new__form-field u-flex ${error ? 'c-doctor-add-new__form-field-error' : ''}`}>
                    <div className="c-doctor-add-new__form-field-inner">
                        <div className="c-doctor-add-new__form-field-label-wrap">
                            <label className="c-doctor-add-new__form-field-label" htmlFor="doctor-add-new-name">{'Name'}</label>
                        </div>
                        <div className="c-doctor-add-new__form-field-input">
                            <input id="doctor-add-new-name" name="name" type="text" data-analytics-name="email" className="u-flex"
                                required onChange={handleNameChange} value={nameValue} />
                        </div>
                        {error && (
                            <div className="c-doctor-add-new__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* City */}
            <div className="c-doctor-add-new__form-field-row u-flexbox">
                <div className={`c-doctor-add-new__form-field u-flex ${error ? 'c-doctor-add-new__form-field-error' : ''}`}>
                    <div className="c-doctor-add-new__form-field-inner">
                        <div className="c-doctor-add-new__form-field-label-wrap">
                            <label className="c-doctor-add-new__form-field-label" htmlFor="doctor-add-new-city">{'City'}</label>
                        </div>
                        <div className="c-doctor-add-new__form-field-input">
                            <input id="doctor-add-new-city" name="city" type="text" data-analytics-name="email" className="u-flex"
                                required onChange={handleCityChange} value={cityValue} />
                        </div>
                        {error && (
                            <div className="c-doctor-add-new__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* State */}
            <div className="c-doctor-add-new__form-field-row u-flexbox">
                <div className={`c-doctor-add-new__form-field u-flex ${error ? 'c-doctor-add-new__form-field-error' : ''}`}>
                    <div className="c-doctor-add-new__form-field-inner">
                        <div className="c-doctor-add-new__form-field-label-wrap">
                            <label className="c-doctor-add-new__form-field-label" htmlFor="doctor-add-new-state">{'State'}</label>
                        </div>
                        <div className="c-doctor-add-new__form-field-input">
                            <input id="doctor-add-new-state" name="state" type="text" data-analytics-name="email" className="u-flex"
                                required onChange={handleStateChange} value={stateValue} />
                        </div>
                        {error && (
                            <div className="c-doctor-add-new__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Zip */}
            <div className="c-doctor-add-new__form-field-row u-flexbox">
                <div className={`c-doctor-add-new__form-field u-flex ${error ? 'c-doctor-add-new__form-field-error' : ''}`}>
                    <div className="c-doctor-add-new__form-field-inner">
                        <div className="c-doctor-add-new__form-field-label-wrap">
                            <label className="c-doctor-add-new__form-field-label" htmlFor="doctor-add-new-zip">{'Zip'}</label>
                        </div>
                        <div className="c-doctor-add-new__form-field-input">
                            <input id="doctor-add-new-zip" name="zip" type="text" data-analytics-name="email" className="u-flex"
                                required onChange={handleZipChange} value={zipValue} />
                        </div>
                        {error && (
                            <div className="c-doctor-add-new__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="c-doctor-add-new__form-field-row u-flexbox">
                <div className="c-doctor-add-new__form-field c-doctor-add-new__button u-flex-none u-margin-start-0">
                    <div className="c-doctor-add-new__form-field-inner">
                        <div className="c-doctor-add-new__form-field-input">
                            <div className="c-doctor-add-new__form-field-label" aria-hidden="true"></div>
                            <Button type="submit" className="pw--primary">Add New Doctor</Button>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    )

}

DoctorAddNew.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onDoctorAddNewSubmit: PropTypes.func
}

export default DoctorAddNew
